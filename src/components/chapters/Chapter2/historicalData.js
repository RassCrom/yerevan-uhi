// Represents historical climate shifts from 1950 to 2024 in Yerevan
export const HISTORICAL_CLIMATE_DATA = {
  // Key physical facts that don't change
  facts: {
    latitude: '40.19°N',
    elevation: '1006m',
    classification: 'Continental Semi-Arid (Dfb)',
    annualPrecipitation: '365mm',
    sunshineHours: '3,886 hours',
  },
  
  // Decadal data for interpolation
  decades: [
    {
      year: 1950,
      annualAvgTemp: 11.2,
      summerAvg: 23.5,
      winterAvg: -4.0,
      vegetationDensity: 0.8, // 0 to 1 scale indicating lushness/canopy
      months: [
        { month: 'Jan', temp: -5.0, precip: 22, sunshine: 120 },
        { month: 'Feb', temp: -3.0, precip: 25, sunshine: 140 },
        { month: 'Mar', temp: 3.0, precip: 30, sunshine: 180 },
        { month: 'Apr', temp: 10.0, precip: 45, sunshine: 210 },
        { month: 'May', temp: 15.0, precip: 55, sunshine: 280 },
        { month: 'Jun', temp: 20.0, precip: 35, sunshine: 340 },
        { month: 'Jul', temp: 24.0, precip: 15, sunshine: 380 },
        { month: 'Aug', temp: 23.5, precip: 10, sunshine: 370 },
        { month: 'Sep', temp: 18.0, precip: 15, sunshine: 310 },
        { month: 'Oct', temp: 11.0, precip: 35, sunshine: 230 },
        { month: 'Nov', temp: 4.0, precip: 30, sunshine: 160 },
        { month: 'Dec', temp: -2.0, precip: 20, sunshine: 130 }
      ]
    },
    {
      year: 1970,
      annualAvgTemp: 11.6,
      summerAvg: 24.2,
      winterAvg: -3.5,
      vegetationDensity: 0.75, // Early urban expansion
      months: [
        { month: 'Jan', temp: -4.0, precip: 24, sunshine: 125 },
        { month: 'Feb', temp: -2.5, precip: 27, sunshine: 145 },
        { month: 'Mar', temp: 4.0, precip: 32, sunshine: 185 },
        { month: 'Apr', temp: 11.0, precip: 42, sunshine: 215 },
        { month: 'May', temp: 16.0, precip: 50, sunshine: 285 },
        { month: 'Jun', temp: 21.0, precip: 32, sunshine: 345 },
        { month: 'Jul', temp: 25.0, precip: 14, sunshine: 380 },
        { month: 'Aug', temp: 24.5, precip: 12, sunshine: 370 },
        { month: 'Sep', temp: 19.0, precip: 18, sunshine: 310 },
        { month: 'Oct', temp: 12.0, precip: 38, sunshine: 230 },
        { month: 'Nov', temp: 5.0, precip: 32, sunshine: 160 },
        { month: 'Dec', temp: -1.0, precip: 22, sunshine: 135 }
      ]
    },
    {
      year: 1990,
      annualAvgTemp: 12.0,
      summerAvg: 25.0,
      winterAvg: -2.8,
      vegetationDensity: 0.60, // Post-Soviet energy crisis and logging impact
      months: [
        { month: 'Jan', temp: -3.5, precip: 20, sunshine: 130 },
        { month: 'Feb', temp: -2.0, precip: 24, sunshine: 150 },
        { month: 'Mar', temp: 5.0, precip: 35, sunshine: 190 },
        { month: 'Apr', temp: 11.5, precip: 40, sunshine: 220 },
        { month: 'May', temp: 16.5, precip: 48, sunshine: 290 },
        { month: 'Jun', temp: 21.5, precip: 30, sunshine: 350 },
        { month: 'Jul', temp: 25.5, precip: 12, sunshine: 385 },
        { month: 'Aug', temp: 25.0, precip: 10, sunshine: 375 },
        { month: 'Sep', temp: 20.0, precip: 15, sunshine: 315 },
        { month: 'Oct', temp: 12.5, precip: 35, sunshine: 240 },
        { month: 'Nov', temp: 5.5, precip: 30, sunshine: 165 },
        { month: 'Dec', temp: -1.0, precip: 20, sunshine: 135 }
      ]
    },
    {
      year: 2010,
      annualAvgTemp: 12.5,
      summerAvg: 26.2,
      winterAvg: -1.5,
      vegetationDensity: 0.35, // Rapid concrete development in city center
      months: [
        { month: 'Jan', temp: -2.0, precip: 18, sunshine: 140 },
        { month: 'Feb', temp: -1.0, precip: 22, sunshine: 155 },
        { month: 'Mar', temp: 6.0, precip: 38, sunshine: 200 },
        { month: 'Apr', temp: 12.5, precip: 35, sunshine: 230 },
        { month: 'May', temp: 17.5, precip: 45, sunshine: 300 },
        { month: 'Jun', temp: 23.0, precip: 25, sunshine: 360 },
        { month: 'Jul', temp: 26.5, precip: 10, sunshine: 390 },
        { month: 'Aug', temp: 26.5, precip: 8, sunshine: 380 },
        { month: 'Sep', temp: 21.0, precip: 12, sunshine: 320 },
        { month: 'Oct', temp: 13.5, precip: 30, sunshine: 250 },
        { month: 'Nov', temp: 6.5, precip: 25, sunshine: 170 },
        { month: 'Dec', temp: 0.0, precip: 18, sunshine: 140 }
      ]
    },
    {
      year: 2024,
      annualAvgTemp: 12.9,
      summerAvg: 27.5,
      winterAvg: -0.5,
      vegetationDensity: 0.2, // Current extreme UHI baseline
      months: [
        { month: 'Jan', temp: -1.0, precip: 15, sunshine: 145 },
        { month: 'Feb', temp: 0.0, precip: 18, sunshine: 160 },
        { month: 'Mar', temp: 7.0, precip: 35, sunshine: 205 },
        { month: 'Apr', temp: 13.5, precip: 32, sunshine: 240 },
        { month: 'May', temp: 18.5, precip: 42, sunshine: 310 },
        { month: 'Jun', temp: 24.5, precip: 20, sunshine: 365 },
        { month: 'Jul', temp: 28.0, precip: 5, sunshine: 395 },
        { month: 'Aug', temp: 28.0, precip: 5, sunshine: 390 },
        { month: 'Sep', temp: 22.5, precip: 10, sunshine: 330 },
        { month: 'Oct', temp: 14.5, precip: 28, sunshine: 260 },
        { month: 'Nov', temp: 8.0, precip: 20, sunshine: 175 },
        { month: 'Dec', temp: 1.0, precip: 15, sunshine: 145 }
      ]
    }
  ]
};

// Helper function to interpolate values between available decades based on current slider year
export const interpolateClimateData = (targetYear) => {
  const decades = HISTORICAL_CLIMATE_DATA.decades;
  
  if (targetYear <= decades[0].year) return decades[0];
  if (targetYear >= decades[decades.length - 1].year) return decades[decades.length - 1];

  let lower = decades[0];
  let upper = decades[1];

  for(let i=0; i<decades.length - 1; i++){
    if(targetYear >= decades[i].year && targetYear <= decades[i+1].year){
      lower = decades[i];
      upper = decades[i+1];
      break;
    }
  }

  const fraction = (targetYear - lower.year) / (upper.year - lower.year);

  // Interpolate top level numbers
  const interpolated = {
    year: targetYear,
    annualAvgTemp: Number((lower.annualAvgTemp + (upper.annualAvgTemp - lower.annualAvgTemp) * fraction).toFixed(1)),
    summerAvg: Number((lower.summerAvg + (upper.summerAvg - lower.summerAvg) * fraction).toFixed(1)),
    winterAvg: Number((lower.winterAvg + (upper.winterAvg - lower.winterAvg) * fraction).toFixed(1)),
    vegetationDensity: Number((lower.vegetationDensity + (upper.vegetationDensity - lower.vegetationDensity) * fraction).toFixed(2)),
    months: []
  };

  // Interpolate monthly arrays
  lower.months.forEach((lMonth, index) => {
    const uMonth = upper.months[index];
    interpolated.months.push({
      month: lMonth.month,
      temp: Number((lMonth.temp + (uMonth.temp - lMonth.temp) * fraction).toFixed(1)),
      precip: Math.round(lMonth.precip + (uMonth.precip - lMonth.precip) * fraction),
      sunshine: Math.round(lMonth.sunshine + (uMonth.sunshine - lMonth.sunshine) * fraction)
    });
  });

  return interpolated;
};
