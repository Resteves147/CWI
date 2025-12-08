// import { irr npv } from "finanical";
import { irr, npv } from 'financial';

// Recharge Basin Calculations

//Basin Dimensions
const inside_slope = 4;
const outside_slope = 2;
const top_levee = 8;
const slope_pond = 0;
const freeboard = 1;
const water_depth = 1;


//Calculations
export const  area = (acres) => acres/640;
export const perimeter = (longSide, shortSide) => 2*(longSide + shortSide);

// Volume
export const center = (perimeter) => perimeter * (freeboard + water_depth) * top_levee / 27;
export const inside = (perimeter) => (freeboard + water_depth) *inside_slope * (freeboard + water_depth) * perimeter /2 / 27;
export const outside = (perimeter) => (freeboard + water_depth) *outside_slope *2 * perimeter/2 / 27;
export const total_Volume = (center, inside, outside) => center + inside + outside;
export const cost_Volume = (total_Volume, cubic_yards) => total_Volume * cubic_yards;

//Wetted Area
export const outside_Length = (perimeter) => perimeter /4;
export const less_Outside = () => (freeboard + water_depth) * outside_slope * 2;
export const less_Top = () => top_levee * 2;
export const less_Inside = () => (freeboard + water_depth) * inside_slope * 2;
export const wetted_Inside = () => water_depth * inside_slope * 2;
export const net_Inside = (outsideLength, lessTop, lessInside, lessOutside, wettedInside) => outsideLength - (lessTop + lessInside + lessOutside) + wettedInside;
export const wetted_Area = (net_Inside) => net_Inside * net_Inside / 9;
export const wetted_Area_Acre = (wettedArea) => wettedArea / 4840;
export const gross_Acre = (wettedAreaAcre, acres) => wettedAreaAcre / acres;



// Land Purchase
export const land_Cost = (opportunity_cost, acres) => opportunity_cost * acres;

export const land_Cost_Acre = (land_Cost, acres) => land_Cost / acres;

//EarthWork
export const earthwork_Cost = (total_Volume, cubic_yards) => {
    if (!total_Volume || total_Volume === 0)
        return 0;
    return total_Volume * cubic_yards;
}
export const earthwork_Cost_Acre = (earthwork_Cost, acres) => earthwork_Cost / acres;


// Pipline_inlets
const pipeline_unit = 20000;
const pipeline_inlets = 1;
export const pipeline_Cost = () =>  pipeline_unit * pipeline_inlets;
export const pipeline_Cost_Acre = (pipeline_Cost, acres) => pipeline_Cost / acres;

//Pipline (30")
//pipline is 2640
const pipeline_30_unit = 200;
export const pipeline_30_Cost = (pipeline) => pipeline_30_unit * pipeline;
export const pipeline_30_acre = (pipeline_30_Cost, acres) => pipeline_30_Cost / acres;

//Fencing
const fencing_quantity = 1;
const fencing_cost = 6;
export const fencing_Cost = (fencing_quantity, fencing_cost) => fencing_quantity * fencing_cost;
export const fencing_Cost_Acre = (fencing_Cost, acres) => fencing_Cost / acres;

//total cost
export const subtotal=(land_Cost, earthwork_Cost, pipeline_Cost, fencing_Cost, pipeline_30_Cost) => land_Cost + earthwork_Cost + pipeline_Cost + fencing_Cost + pipeline_30_Cost;
export const subtotal_Acre = (subtotal, acres) => subtotal / acres;

//Engineering and Contingency
const E_percent = .2;
export const e_Cost = (subtotal) => subtotal * E_percent;
export const e_Cost_Acre = (e_Cost, acres) => e_Cost / acres;
export const e_cost_total = (subtotal, e_Cost) => subtotal + e_Cost;


// others
export const annual_Capital_payment = (e_cost_total, interest_rate, year_loan) => {;
   if (interest_rate === 0 ) {
    return -(e_cost_total/ year_loan);
   }

   const r1 = Math.pow(1 + interest_rate, year_loan);
   const payment = -(e_cost_total * interest_rate * r1) / (r1 - 1);
   return -payment;
};
const evaporation_loss = .3;
const annual_loss_crop = 0;

export const avg_annual_recharge = (infiltration_rate, wetted_Area_Acre) => infiltration_rate * wetted_Area_Acre;
export const net_Recharge = (avg_annual_recharge, month_duration, wet_year_frequency) => {
    return avg_annual_recharge * 30 *month_duration * wet_year_frequency * (1 - evaporation_loss);
}
export const annualized_Capital_Cost = (annual_Capital_payment, net_Recharge) => annual_Capital_payment / net_Recharge;
const water_purchase_cost = 35;
const OM_cost = 5;
export const total_Annulaized = (annualized_Capital_Cost, water_purchase_cost, OM_cost) => annualized_Capital_Cost + water_purchase_cost + OM_cost;
export const net_Benefits = (value_water, total_Annulaized) => value_water - total_Annulaized;

//results
var discount_rate = .05;
export const results_Cost_0 = (e_cost_total) => e_cost_total * -1;
export const results_costs = (water_purchase_cost, OM_cost, net_recharge, wetted_Area_Acre) => {
    return -1 *(water_purchase_cost + OM_cost) * net_recharge + annual_loss_crop * wetted_Area_Acre;
}
export const results_benefits = (net_recharge, value_water) => net_recharge * value_water;
export const results_net_benefits = (results_benefits, results_costs) => results_benefits + results_costs;


export const calculateNPV = (cashflows) => {
    let npv = 0;
    for (let i = 0; i < cashflows.length; i++) {
        npv += cashflows[i] / Math.pow(1 + discount_rate, i);
    }
    return npv;
}


export const calculateNew = (cashflows) =>{
    return npv(discount_rate, cashflows);
}
export const bcRatio = (benefits, costs) => benefits / -costs;

export const roi = (cashflows) => {
    const tolerance = 0.00001;
    for (let i = 0; i < cashflows.length; i++){
        const npv = calculateNPV(cashflows);
        let derivative = 0;
        for (let j = 0; j < cashflows.length; j++){
            derivative -= j * cashflows[j] / Math.pow(1 + discount_rate, j+1);
        }

        if (Math.abs(npv) < tolerance){
            return discount_rate;
        }
        if (derivative ===0) {
            discount_rate += 0.0001;
        }
        else {
            discount_rate = discount_rate - npv / derivative;
        }
    }
    return NaN;
}

