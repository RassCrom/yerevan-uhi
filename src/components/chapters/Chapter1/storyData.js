export const STORY_STEPS = [
  {
    stepIndex: 0,
    timeOfDay: 'Morning',
    description: 'The characters start at their homes. The city is still relatively cool from the night, but Yerevan surfaces are already warming fast.',
    yerevan: {
      locationName: 'Home',
      coords: [44.5126, 40.1811], // Start
      airTemp: '28°C',
      surfaceTemp: '32°C',
      humidity: '45%',
      shade: 'Low',
      greenSpace: 'Limited',
      exposure: 'moderate'
    },
    vienna: {
      locationName: 'Home',
      coords: [16.3700, 48.2000],
      airTemp: '24°C',
      surfaceTemp: '26°C',
      humidity: '50%',
      shade: 'High',
      greenSpace: 'Abundant',
      exposure: 'low'
    }
  },
  {
    stepIndex: 1,
    timeOfDay: 'Late Morning',
    description: 'Walking to work. Sun intensity climbs. Concrete sidewalks begin storing thermal energy rapidly.',
    yerevan: {
      locationName: 'Commute',
      coords: [44.5140, 40.1840],
      airTemp: '31°C',
      surfaceTemp: '45°C',
      humidity: '40%',
      shade: 'Low',
      greenSpace: 'Limited',
      exposure: 'high'
    },
    vienna: {
      locationName: 'Commute',
      coords: [16.3720, 48.2040],
      airTemp: '27°C',
      surfaceTemp: '33°C',
      humidity: '48%',
      shade: 'Moderate',
      greenSpace: 'Abundant',
      exposure: 'moderate'
    }
  },
  {
    stepIndex: 2,
    timeOfDay: 'Midday',
    description: 'At the workplace. Peak heat intensity. The urban canyon effect traps heat between Yerevan\'s dense buildings.',
    yerevan: {
      locationName: 'Workplace',
      coords: [44.5152, 40.1872],
      airTemp: '34°C',
      surfaceTemp: '52°C',
      humidity: '38%',
      shade: 'Low',
      greenSpace: 'Limited',
      exposure: 'extreme' // Treat extreme as high for visual styling
    },
    vienna: {
      locationName: 'Workplace',
      coords: [16.3738, 48.2082], 
      airTemp: '30°C',
      surfaceTemp: '39°C',
      humidity: '42%',
      shade: 'Moderate',
      greenSpace: 'Abundant',
      exposure: 'moderate'
    }
  },
  {
    stepIndex: 3,
    timeOfDay: 'Afternoon',
    description: 'Lunch break at a nearby restaurant. Thermal stress peaks in areas lacking tree canopies.',
    yerevan: {
      locationName: 'Restaurant',
      coords: [44.5200, 40.1900],
      airTemp: '35°C',
      surfaceTemp: '50°C',
      humidity: '35%',
      shade: 'Low',
      greenSpace: 'Limited',
      exposure: 'extreme'
    },
    vienna: {
      locationName: 'Restaurant',
      coords: [16.3800, 48.2100],
      airTemp: '31°C',
      surfaceTemp: '37°C',
      humidity: '40%',
      shade: 'High',
      greenSpace: 'Abundant',
      exposure: 'moderate'
    }
  },
  {
    stepIndex: 4,
    timeOfDay: 'Evening',
    description: 'Stopping for groceries. The sun drops, but asphalt surfaces radiate stored heat (UHI effect) heavily.',
    yerevan: {
      locationName: 'Grocery Store',
      coords: [44.5180, 40.1840],
      airTemp: '32°C',
      surfaceTemp: '42°C',
      humidity: '40%',
      shade: 'Moderate',
      greenSpace: 'Limited',
      exposure: 'high'
    },
    vienna: {
      locationName: 'Grocery Store',
      coords: [16.3770, 48.2040],
      airTemp: '27°C',
      surfaceTemp: '31°C',
      humidity: '50%',
      shade: 'Moderate',
      greenSpace: 'Abundant',
      exposure: 'low'
    }
  },
  {
    stepIndex: 5,
    timeOfDay: 'Night',
    description: 'Return home. Yerevan remains deeply warm due to the heat island effect, preventing nighttime cooling.',
    yerevan: {
      locationName: 'Home',
      coords: [44.5126, 40.1811], // Back home
      airTemp: '29°C',
      surfaceTemp: '38°C',
      humidity: '45%',
      shade: 'High', // It's night, so direct sun shade is moot, but for layout we keep it
      greenSpace: 'Limited',
      exposure: 'high'
    },
    vienna: {
      locationName: 'Home',
      coords: [16.3700, 48.2000],
      airTemp: '23°C',
      surfaceTemp: '25°C',
      humidity: '60%',
      shade: 'High',
      greenSpace: 'Abundant',
      exposure: 'low'
    }
  }
];
