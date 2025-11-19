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
const acpond = 160;
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
const calculateWetLength = (calculateoutSideLength, calculateLessTop, calculateLessInside, calculateWettedInside, calculateOutsideLevee) =>{
    return calculateoutSideLength - (calculateOutsideLevee + calculateLessTop + calculateLessInside + calculateWettedInside)
}
const calculateWettedArea = (calculateWetLength) =>{
    return calculateWetLength * 2 / 9;
}
const acres =(cacluatedwettedArea)=> {
    return cacluatedwettedArea / 4840;
}
const grossAC = (acres) => {
    return acres / acpond;
}


/* OUTPUT VALUES */

const LandPurchase = acpond; // acres
const Earthwork = 10951; // cubic yards
const PiplineInlets = 1; // each
const Pipline = 2640; // feet
const fencing = 0; // hardcoded, not suppose to be constant
const Engineering_contingency = .2;

const unitCost_pipline_inlets = 20000; // dollars per inlet (30")
const unitCost_pipline = 200; // dollars per foot
const unitCost_fencing = 6; // dollars per foot

const totalLandCost = LandPurchase * DevelopmentCosts.land_cost;
const totalEarthworkCost = Earthwork * DevelopmentCosts.earthwork_cost;
const totalPiplineInletsCost = PiplineInlets * unitCost_pipline_inlets;
const totalPiplineCost = Pipline * unitCost_pipline;
const totalFencingCost = fencing * unitCost_fencing;

const totalCost = totalLandCost + totalEarthworkCost + totalPiplineInletsCost + totalFencingCost + totalPiplineCost;

const calculateEngineeringContingency = Engineering_contingency * totalCost;

const totalEstimatedCost = totalCost + calculateEngineeringContingency;


/**
 * Calculate PMT (Payment) function for loan payments
 * @param {number} principal - Total loan amount (totalEstimatedCost)
 * @param {number} interestRate - Annual interest rate as a percentage (e.g., 5 for 5%)
 * @param {number} years - Loan term in years
 * @returns {number} Annual payment amount
 */
// Annual Capital Payment
export const calculatePMT = (principal, interestRate, years) => {
    // Handle edge cases
    if (!principal || principal <= 0) return 0;
    if (!years || years <= 0) return 0;
    if (!interestRate || interestRate < 0) return principal / years; // Simple division if no interest
    
    // Convert interest rate from percentage to decimal (e.g., 5% -> 0.05)
    const rate = interestRate / 100;
    
    // If interest rate is 0, return simple division
    if (rate === 0) {
        return principal / years;
    }
    
    // PMT formula: PMT = PV * (r * (1 + r)^n) / ((1 + r)^n - 1)
    // Where: PV = principal, r = rate per period, n = number of periods
    const ratePerPeriod = rate; // Annual rate for annual payments
    const numberOfPeriods = years;
    
    const numerator = ratePerPeriod * Math.pow(1 + ratePerPeriod, numberOfPeriods);
    const denominator = Math.pow(1 + ratePerPeriod, numberOfPeriods) - 1;
    
    const payment = principal * (numerator / denominator);
    
    return payment;
}
const AnnualNetRecharge = acres * getInfiltrationRate(soilType); // ft/day
const netRecharge = AnnualNetRecharge * 30 *  4 * .3 * (1-.3)// ft/year
const capitalPerAcre= calculatePMT(totalEstimatedCost, DevelopmentCosts.interestRate, DevelopmentCosts.loan_term) / netRecharge;

const costRechargeWater = 35
const costOM = 5
const totalRechargeWater= cacluatePMT(costRechargeWater, DevelopmentCosts.interestRate, DevelopmentCosts.loan_term) + costRechargeWater + costO&M;
const netBenefit = 200 - totalRechargeWater;// 200 is the af values of stored water