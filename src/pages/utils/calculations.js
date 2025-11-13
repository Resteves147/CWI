// Recharge Basin Calculations

/**
 * Hard coded values for the project
 */
const hardCodedValues = {
    "top_levee": 8,
    "freeboard": 1,
    "water_depth": 1,
    "inside_slope": 1,
    "outside_slope": 2,
};

const DevelopmentCosts={
    "land_cost": 6000,
    "pipline_cost": 2640,
    "earthwork_cost": 12,
    "interest rate": .05, // 5% interest rate
    "loan_term": 10,
};  

/**
 * Get infiltration rate based on soil type
 */
export const getInfiltrationRate = (soilType) => {
  const soilRates = {
    "sand": 1,
    "sandy": 0.7,
    "loam": 0.6,
    "loamy": 0.5,
    "silt/clay": 0.4,
    "silt/clay/layering": 0.3,
    "clay soil": 0.05,
  };
  return soilRates[soilType] || 0;
};


export const calculateArea = (acre) => {
    return acre / 640;
};

export const calculateParameter= (length, width) => {
    return 2 * (length + width);
};
/**
 * Calculate the volume of earthwork
 */

// Center of levee
export const calculateCenterOfLevee = (top_levee,freeboard, water_depth) => {
    const perimeter = calculateParameter(length, width);
    return perimeter * (freeboard + water_depth) * top_levee / 27;
};

export const calculateInsideLevee = (inside_slope, freeboard, water_depth) => {
    const perimeter = calculateParameter(length, width);
    return (freeboard + water_depth) * inside_slope * (freeboard + water_depth) * perimeter / 2 / 27;
};

export const calculateOutsideLevee = (outside_slope, freeboard, water_depth) => {
    const perimeter = calculateParameter(length, width);
    return (freeboard + water_depth) * outside_slope * (freeboard + water_depth) * perimeter / 2 / 27;
};


const calculateVolume = (center_of_levee, inside_levee, outside_levee) => {
    return center_of_levee + inside_levee + outside_levee;
};

const calculateTotalCost = (earthwork) => {
    const volume = calculateVolume(center_of_levee, inside_levee, outside_levee);
    return earthwork * volume;
};

/**
 * Calculate the wetted Area
 */

const calculateOutSideLength = () =>{
    const perimeter = calculateParameter(length, width);
    return perimeter / 4;
}

const calculateOutsideLevee = (outside_slope, freeboard, water_depth) =>{
    return (freeboard + water_depth) * outside_slope * 2;

}
const calculateLessTop = (top_levee) =>{
    return top_levee * 2;
}
const calculateLessInside = (inside_slope, freeboard, water_depth) =>{
    return (freeboard + water_depth) * inside_slope * 2;
}
const calculateWettedInside = (water_depth, inside_slope) =>{
    return water_depth * inside_slope * 2;
}
const calculateWetLength = (calculateLessTop, calculateLessInside, calculateWettedInside, calculateOutsideLevee) =>{
    return calculateLessTop + calculateLessInside + calculateWettedInside + calculateOutsideLevee;
}
const calculateWettedArea = (calculateWetLength) =>{
    return calculateWetLength * 2;
}
