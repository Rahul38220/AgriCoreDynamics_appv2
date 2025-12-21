// =====================================================
// WEB BLUETOOTH UTILITIES FOR ESP32 (SINGLE-SHOT READ)
// Payload: 2 bytes -> [moisture(0-100), ec(0-100)]
// =====================================================

export interface SensorData {
  pH: number;
  moisture: number;
  tds: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

const ESP32_SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const ESP32_CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

function bytesToSensorData(moisture: number, ec: number): SensorData {
  // Per your current plan:
  // - moisture stays moisture
  // - EC shown as TDS + N + P + K (same value for now)
  return {
    pH: 0,
    moisture,
    tds: ec,
    nitrogen: ec,
    phosphorus: ec,
    potassium: ec,
  };
}

function parse2Bytes(value: DataView): { moisture: number; ec: number } {
  if (value.byteLength < 2) {
    throw new Error(`Expected 2 bytes (moisture, ec) but got ${value.byteLength}`);
  }
  const moisture = value.getUint8(0);
  const ec = value.getUint8(1);
  return { moisture, ec };
}

/**
 * Connect once and return a single averaged reading.
 * Uses notification first, then readValue() as fallback.
 */
export async function connectToESP32(timeoutMs = 6000): Promise<SensorData> {
  if (!navigator.bluetooth) {
    throw new Error("Web Bluetooth not supported. Use Chrome on laptop/Android.");
  }

  console.log("🔍 Requesting ESP32 device...");

  const device = await navigator.bluetooth.requestDevice({
    filters: [{ name: "ESP32-SoilSensor" }],
    optionalServices: [ESP32_SERVICE_UUID],
  });

  console.log("✅ Selected device:", device.name);

  const server = await device.gatt!.connect();
  console.log("🔗 GATT connected");

  try {
    const service = await server.getPrimaryService(ESP32_SERVICE_UUID);
    const characteristic = await service.getCharacteristic(ESP32_CHARACTERISTIC_UUID);

    // --- 1) Try notifications (single shot) ---
    await characteristic.startNotifications();
    console.log("📡 Notifications started, waiting for 1 packet...");

    const notifPromise = new Promise<SensorData>((resolve) => {
      const handler = (event: Event) => {
        const ch = event.target as BluetoothRemoteGATTCharacteristic;
        if (!ch.value) return;

        try {
          const { moisture, ec } = parse2Bytes(ch.value);
          console.log("✅ Notify packet:", { moisture, ec });

          ch.removeEventListener("characteristicvaluechanged", handler);
          resolve(bytesToSensorData(moisture, ec));
        } catch (e) {
          ch.removeEventListener("characteristicvaluechanged", handler);
          throw e;
        }
      };

      characteristic.addEventListener("characteristicvaluechanged", handler);
    });

    const timeoutPromise = new Promise<"timeout">((resolve) =>
      setTimeout(() => resolve("timeout"), timeoutMs)
    );

    const result = await Promise.race([notifPromise, timeoutPromise]);

    if (result !== "timeout") {
      return result;
    }

    // --- 2) Fallback: readValue() ---
    console.log("⚠️ No notify received in time, trying readValue() fallback...");
    const value = await characteristic.readValue();
    const { moisture, ec } = parse2Bytes(value);
    console.log("✅ ReadValue packet:", { moisture, ec });

    return bytesToSensorData(moisture, ec);
  } finally {
    // Always disconnect cleanly
    if (device.gatt?.connected) {
      device.gatt.disconnect();
      console.log("🔌 Disconnected");
    }
  }
}
