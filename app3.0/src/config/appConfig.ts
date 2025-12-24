// =====================================================
// CHANGEABLE CONFIG - EDIT THESE VALUES AS NEEDED
// =====================================================

export const APP_CONFIG = {
  // App Colors
  colors: {
    primary: '#4CAF50',
    accent: '#FF9800',
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#2C3E50',
    textLight: '#7F8C8D',
  },

  // Thresholds for Soil Parameters
  thresholds: {
    pH: {
      min: 6.0,
      max: 7.5,
      optimal: 6.5,
    },
    nitrogen: {
      low: 150,
      medium: 250,
      high: 350,
    },
    phosphorus: {
      low: 30,
      medium: 50,
      high: 70,
    },
    potassium: {
      low: 150,
      medium: 250,
      high: 350,
    },
    moisture: {
      low: 20,
      medium: 40,
      high: 60,
    },
  },

  // Fertilizer recommendations (kg per acre)
  fertilizers: {
    urea: {
      lowN: 50,
      veryLowN: 75,
    },
    dap: {
      lowP: 40,
      veryLowP: 60,
    },
    mop: {
      lowK: 30,
      veryLowK: 50,
    },
  },

  // Season Options
  seasons: [
    { value: 'rabi', labelEn: 'Rabi (Winter)', labelHi: 'रबी (शीतकालीन)', labelGu: 'રબી (શિયાળો)' },
    { value: 'kharif', labelEn: 'Kharif (Monsoon)', labelHi: 'खरीफ (मानसून)', labelGu: 'ખરીફ (ચોમાસું)' },
    { value: 'zaid', labelEn: 'Zaid (Summer)', labelHi: 'जायद (ग्रीष्मकालीन)', labelGu: 'ઝાઈદ (ઉનાળો)' },
  ],

  // Weather Options
  weatherOptions: [
    { value: 'sunny', labelEn: 'Sunny', labelHi: 'धूप', labelGu: 'સની', icon: '☀️' },
    { value: 'cloudy', labelEn: 'Cloudy', labelHi: 'बादल', labelGu: 'વાદળછાયું', icon: '☁️' },
    { value: 'rainy', labelEn: 'Rainy', labelHi: 'बारिश', labelGu: 'વરસાદ', icon: '🌧️' },
    { value: 'windy', labelEn: 'Windy', labelHi: 'हवादार', labelGu: 'પવન', icon: '💨' },
    { value: 'humid', labelEn: 'Humid', labelHi: 'नम', labelGu: 'ભેજવાળું', icon: '💧' },
    { value: 'foggy', labelEn: 'Foggy', labelHi: 'कोहरा', labelGu: 'ધુમ્મસવાળું', icon: '🌫️' },
  ],

  // Land Area Units
  landUnits: [
    { value: 'acre', labelEn: 'Acre', labelHi: 'एकड़', labelGu: 'એકર' },
    { value: 'hectare', labelEn: 'Hectare', labelHi: 'हेक्टेयर', labelGu: 'હેક્ટર' },
  ],
};

// Crop Recommendation Rules
// TODO: Adjust these rules based on your local conditions
export const CROP_RECOMMENDATIONS = {
  // Rules format: conditions that must be met
  rules: [
    {
      crops: ['Wheat', 'Maize', 'Corn'],
      cropsHi: ['गेहूं', 'मक्का', 'मकई'],
      cropsGu: ['ઘઉં', 'મકાઈ', 'કોર્ન'],
      conditions: {
        pHMin: 6.0,
        pHMax: 7.5,
        nMin: 200,
        pMin: 35,
        kMin: 200,
        dominantWeather: ['sunny', 'cloudy'],
        season: ['rabi', 'kharif'],
      },
    },
    {
      crops: ['Rice', 'Paddy'],
      cropsHi: ['धान', 'चावल'],
      cropsGu: ['ચોખા', 'ડાંગર'],
      conditions: {
        pHMin: 5.5,
        pHMax: 7.0,
        moistureMin: 40,
        dominantWeather: ['rainy', 'humid'],
        season: ['kharif'],
      },
    },
    {
      crops: ['Chickpea', 'Lentil', 'Peas'],
      cropsHi: ['चना', 'दाल', 'मटर'],
      cropsGu: ['ચણા', 'દાળ', 'વટાણા'],
      conditions: {
        pHMin: 6.0,
        pHMax: 7.5,
        nMin: 100,
        dominantWeather: ['cloudy', 'windy', 'sunny'],
        season: ['rabi'],
      },
    },
    {
      crops: ['Cotton', 'Soybean'],
      cropsHi: ['कपास', 'सोयाबीन'],
      cropsGu: ['કપાસ', 'સોયાબીન'],
      conditions: {
        pHMin: 6.0,
        pHMax: 7.5,
        nMin: 150,
        pMin: 30,
        kMin: 150,
        dominantWeather: ['sunny', 'humid'],
        season: ['kharif'],
      },
    },
    {
      crops: ['Sugarcane'],
      cropsHi: ['गन्ना'],
      cropsGu: ['શેરડી'],
      conditions: {
        pHMin: 6.0,
        pHMax: 7.5,
        nMin: 250,
        kMin: 200,
        moistureMin: 35,
        dominantWeather: ['sunny', 'humid', 'rainy'],
      },
    },
    {
      crops: ['Potato', 'Vegetables'],
      cropsHi: ['आलू', 'सब्जियां'],
      cropsGu: ['બટાકા', 'શાકભાજી'],
      conditions: {
        pHMin: 5.5,
        pHMax: 7.0,
        pMin: 35,
        kMin: 200,
        dominantWeather: ['cloudy', 'sunny'],
        season: ['rabi', 'zaid'],
      },
    },
  ],

  // Default fallback if no rules match
  default: {
    cropsEn: ['General Crops', 'Vegetables'],
    cropsHi: ['सामान्य फसलें', 'सब्जियां'],
    cropsGu: ['સામાન્ય પાક', 'શાકભાજી'],
  },
};
