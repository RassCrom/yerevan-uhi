export const MILESTONES = [
  {
    decade: "1920s",
    title: "Soviet Industrialization Begins",
    description: "Alexander Tamanian drafts the first master plan for Yerevan. The city is designed for a population of 150,000, emphasizing radial geometry, green belts, and grand civic spaces.",
    population: 65000,
    urbanArea: 30, // km2
    greenSpace: 40, // %
    yearEnd: 1930
  },
  {
    decade: "1960s",
    title: "Rapid Growth & Modernism",
    description: "The population surges past the original master plan. Extensive Soviet housing blocks (Khrushchyovkas) are constructed around the city center to accommodate the influx.",
    population: 500000,
    urbanArea: 90,
    greenSpace: 35,
    yearEnd: 1970
  },
  {
    decade: "1980s",
    title: "Peak Urbanization",
    description: "Yerevan reaches a population of 1 million. Heavy industrial zones and massive residential suburbs dominate the landscape, significantly increasing the city's thermal mass.",
    population: 1100000,
    urbanArea: 180,
    greenSpace: 28,
    yearEnd: 1990
  },
  {
    decade: "2000s",
    title: "Unplanned Sprawl Intensifies",
    description: "Following independence and economic transitions, rapid and often unregulated construction fills in the remaining green spaces in the city center with dense concrete structures.",
    population: 1150000,
    urbanArea: 220,
    greenSpace: 18,
    yearEnd: 2010
  },
  {
    decade: "2020s",
    title: "The Heat Island Reality",
    description: "The metropolitan area houses over 1.2 million people. The near complete elimination of the original green belts and massive concrete footprint results in severe urban heat island traps during summer.",
    population: 1200000,
    urbanArea: 250,
    greenSpace: 12,
    yearEnd: 2024
  }
];

// Continuous data for line charts (1950 - 2024)
export const TIMELINE_DATA = [
  { year: 1950, population: 300000, urbanArea: 50, greenSpace: 38 },
  { year: 1960, population: 500000, urbanArea: 90, greenSpace: 35 },
  { year: 1970, population: 760000, urbanArea: 130, greenSpace: 32 },
  { year: 1980, population: 1050000, urbanArea: 170, greenSpace: 29 },
  { year: 1990, population: 1180000, urbanArea: 200, greenSpace: 25 },
  { year: 2000, population: 1100000, urbanArea: 210, greenSpace: 20 },
  { year: 2010, population: 1150000, urbanArea: 230, greenSpace: 16 },
  { year: 2020, population: 1190000, urbanArea: 245, greenSpace: 13 },
  { year: 2024, population: 1210000, urbanArea: 255, greenSpace: 12 },
];
