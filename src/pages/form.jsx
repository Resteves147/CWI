import "./form.css";
import * as calc from "./utils/calculations.js";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Form = () => {
    {/*input fields for the form*/}

    const location = useLocation();
    const rectangleData = location.state?.rectangleData;
    const topSoil = location.state?.topSoil;
    const longSideStr = rectangleData?.longSide.toFixed(2);
    const shortSideStr = rectangleData?.shortSide.toFixed(2);
    const longSide = parseFloat(longSideStr);
    const shortSide = parseFloat(shortSideStr);
    const acresStr= (longSide * shortSide) / 43560;
    const acres = parseFloat(acresStr);
    const soil = topSoil;


    const [Input, setInput] = useState({
        soilType: "",
        wetYearFrequency: "",
        monthDuration: "",
        landCost: "",
        piplineFt: "",
        cubicYd: "",
        interestRate: "",
        yearLoan: "",
        costRecharge: "",
        valueWater: "",
        omCost: "",
    });

    const [showResults, setShowResults] = useState(false);
    const [calculationResults, setCalculationResults] = useState(null); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value });
    };

    {/* Soil Type */}
    const soilType = [
        {value: "sand", label:"Sand", infiltrationRate: "1"},
        {value: "sandy", label:"Sandy with some fine layering", infiltrationRate: "0.7"},
        {value: "loam", label:"Loamy Soil", infiltrationRate: "0.6"},
        {value: "loamy", label:"Loam with some fine layering", infiltrationRate: "0.5"},
        {value: "silt/clay", label:"Silt or Clay loam", infiltrationRate: "0.4"},
        {value: "silt/clay/layering", label:"Silt or Clay with some fine layering", infiltrationRate: "0.3"},
        {value: "clay soil", label:"Clay Soil with restrictive layers", infiltrationRate: "0.05"},

        //default
        {value: "Default", label:"cannot read soil", infiltrationRate:"0.6"},
    ];



    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form first
        if (!validateForm()) {
            return;
        }
        
        // Calculate and store results
        const results = calculateResults();
        setCalculationResults(results);
        console.log("calculationResults: ", results);
        setShowResults(true);
    };

    const validateForm = () => {

        if(Input.wetYearFrequency < 0 || Input.wetYearFrequency > 100 || Input.wetYearFrequency === ""){
            alert("Please enter a wet year frequency");
            setShowResults(false);
            return false;
        }
        if(Input.monthDuration < 0 || Input.monthDuration > 12 || Input.monthDuration === ""){
            alert("Please enter a month duration between 0 and 12");
            setShowResults(false);
            return false;
        }
        if(Input.landCost < 0 || Input.landCost > 1000000 || Input.landCost === ""){
            alert("Please enter a land cost between 0 and 1000000");
            setShowResults(false);
            return false;
        }
        if(Input.piplineFt < 0 || Input.piplineFt > 1000000 || Input.piplineFt === ""){
            alert("Please enter a pipline feet between 0 and 1000000");
            setShowResults(false);
            return false;
        }
        if(Input.cubicYd < 0 || Input.cubicYd > 1000000 || Input.cubicYd === ""){
            alert("Please enter a cubic yards between 0 and 1000000");
            setShowResults(false);
            return false;
        }
        if(Input.interestRate < 0 || Input.interestRate > 100 || Input.interestRate === ""){
            alert("Please enter an interest rate between 0 and 100");
            setShowResults(false);
            return false;
        }
        if(Input.yearLoan < 0 || Input.yearLoan > 100 || Input.yearLoan === ""){
            alert("Please enter a year loan between 0 and 100");
            setShowResults(false);
            return false;
        }
        if(Input.costRecharge < 0 || Input.costRecharge > 1000000 || Input.costRecharge === ""){
            alert("Please enter a cost recharge between 0 and 1000000");
            setShowResults(false);
            return false;
        }
        if(Input.valueWater < 0 || Input.valueWater > 1000000 || Input.valueWater === ""){
            alert("Please enter a value of water between 0 and 1000000");
            setShowResults(false);
            return false;
        }
        if(Input.omCost < 0 || Input.omCost > 1000000 || Input.omCost === ""){
            alert("Please enter an OM cost between 0 and 1000000");
            setShowResults(false);
            return false;
        }
        return true;
    };


    const calculateResults = () => {

        console.log("infiltration rate:", {infiltrationRate})
        //parse the input values
        const wetYearFrequency = parseFloat(Input.wetYearFrequency / 100);

        console.log("wet year:", {wetYearFrequency});
        const monthDuration = parseFloat(Input.monthDuration);
        console.log("Month duration:" ,{monthDuration});
        const landCost = parseFloat(Input.landCost);
        console.log("landcost:", {landCost});
        const piplineFt = parseFloat(Input.piplineFt);
        console.log("pipline:",{piplineFt});
        const cubicYd = parseFloat(Input.cubicYd);
        console.log("cubicYD:", {cubicYd});
        const interestRate = parseFloat(Input.interestRate) / 100;
        console.log("interest rate:" ,{interestRate});
        const yearLoan = parseFloat(Input.yearLoan);
        console.log("yearLoan:", {yearLoan});
        const costRecharge = parseFloat(Input.costRecharge);
        console.log("costRecharge:" ,{costRecharge});
        const valueWater = parseFloat(Input.valueWater);
        console.log("value water:", { valueWater });
        const omCost = parseFloat(Input.omCost);
        console.log("omCost:", { omCost });

        console.log("longside:", { longSide });
        console.log("shortSide:", { shortSide });
        console.log("acres", { acres });

        //calculate the results
        const perimeter = calc.perimeter(longSide, shortSide);
        console.log("perm:", {perimeter})
        const area = calc.area(acres); // not needed
        //volume of the basin
        const center = calc.center(perimeter);
        console.log("center:", {center});
        const inside = calc.inside(perimeter);
        console.log("inside:", {inside});
        const outside = calc.outside(perimeter);
        console.log("outside:", {outside});
        const total_Volume = calc.total_Volume(center, inside, outside);
        console.log("total_Volume:", {total_Volume});
        const cost_Volume = calc.cost_Volume(total_Volume, cubicYd);
        console.log("total cost:", {cost_Volume});
        //wetted area
        const outsideLength = calc.outside_Length(perimeter);
        console.log("outsideLength", {outsideLength});
        const lessOutside = calc.less_Outside();
        console.log("lessOutside", {lessOutside});
        const lessTop = calc.less_Top();
        console.log("lessTop", {lessTop});
        const lessInside = calc.less_Inside();
        console.log("lessInside", {lessInside});
        const wettedInside = calc.wetted_Inside();
        console.log("wettedInside", {wettedInside});
        const netInside = calc.net_Inside(outsideLength, lessTop, lessInside, lessOutside, wettedInside);
        console.log("netInside", {netInside});
        const wettedArea = calc.wetted_Area(netInside);
        console.log("wettedarea", {wettedArea});
        const wettedAreaAcre = calc.wetted_Area_Acre(wettedArea);
        console.log("wettedareaacre", {wettedAreaAcre});
        const grossAcre = calc.gross_Acre(wettedAreaAcre, acres);
        console.log("gross acre:", { grossAcre });
        // land
        const land_Cost = calc.land_Cost(landCost, acres);
        console.log("land_cost:", { land_Cost });
        const land_Cost_Acre = calc.land_Cost_Acre(land_Cost, acres);
        console.log("land_Cost_Acre:", { land_Cost_Acre });
        // earthwork
        const earthwork_Cost = calc.earthwork_Cost(total_Volume, cubicYd);
        console.log("earthwork_cost:", { earthwork_Cost });
        const earthwork_Cost_Acre = calc.earthwork_Cost_Acre(earthwork_Cost, acres);
        console.log("earthwork_cost_acre:", { earthwork_Cost_Acre });
        // pipeline_inlets
        const pipeline_Cost = calc.pipeline_Cost(piplineFt);
        console.log("pipeline_cost:", { pipeline_Cost });
        const pipeline_Cost_Acre = calc.pipeline_Cost_Acre(pipeline_Cost, acres);
        console.log("pipeline_cost_acres:", { pipeline_Cost_Acre });
        //Pipline 30"
        const pipeline_thirty = calc.pipeline_30_Cost(piplineFt);
        console.log("pipline 30:", {pipeline_thirty})
        const pipeline_thirty_acres = calc.pipeline_30_acre(pipeline_thirty,acres);
        console.log("pipeline 30 acres:", {pipeline_thirty_acres});
        // fencing
        const fencing_Cost = calc.fencing_Cost(0, 6);
        console.log("fencing costs:", { fencing_Cost });
        const fencing_Cost_Acre = calc.fencing_Cost_Acre(fencing_Cost, acres);
        console.log("fencing cost acre:", { fencing_Cost_Acre });
        // subtotal
        const subtotal = calc.subtotal(land_Cost, earthwork_Cost, pipeline_Cost, fencing_Cost, pipeline_thirty);
        console.log("subtotal:", { subtotal });
        const subtotal_Acre = calc.subtotal_Acre(subtotal, acres);
        console.log("subtotal acre:", { subtotal_Acre });
        // e cost
        const e_Cost = calc.e_Cost(subtotal);
        console.log("engineering cost:", { e_Cost });
        const e_Cost_Acre = calc.e_Cost_Acre(e_Cost, acres);
        console.log("Engineering acre:", { e_Cost_Acre });
        const e_cost_total = calc.e_cost_total(subtotal, e_Cost);
        console.log("Total_Cost_Estimate:", { e_cost_total });
        
        // recharge calculations
        const infiltrationRate = parseFloat(Input.soilType) || 0;
        const annual_Capital = calc.annual_Capital_payment(e_cost_total,interestRate,yearLoan);
        console.log("Annual Capital Payment:", {annual_Capital});
        const avg_annual_recharge = calc.avg_annual_recharge(infiltrationRate, wettedAreaAcre);
        console.log("avg_annual_recharge:", {avg_annual_recharge});
        const net_Recharge = calc.net_Recharge(avg_annual_recharge, monthDuration, wetYearFrequency, 0.3);
        console.log("net recharge:", {net_Recharge});

        // annual capital payment --------------- stopped here 
        const annual_Capital_payment = calc.annual_Capital_payment(e_cost_total, interestRate, yearLoan);
        console.log("annual_Capital_payment:", { annual_Capital_payment})
        const annualized_Capital_Cost = calc.annualized_Capital_Cost(annual_Capital_payment, net_Recharge);
        console.log("annualized capital cost;", { annualized_Capital_Cost})
        const total_Annulaized = calc.total_Annulaized(annualized_Capital_Cost, costRecharge,omCost);
        console.log("total annualized: ", { total_Annulaized});
        const net_Benefits = calc.net_Benefits(valueWater, total_Annulaized);
        console.log("net benefits:", {net_Benefits});


        ///return on investments
        const results_Cost_0 = calc.results_Cost_0(e_cost_total);
        console.log("results_Cost_0:" , {results_Cost_0});
        const results_costs = calc.results_costs(costRecharge, omCost, net_Recharge, wettedAreaAcre, 0);
        console.log("results_costs:", {results_costs});
        const results_benefits = calc.results_benefits(net_Recharge, valueWater);
        console.log("results_benefits:", {results_benefits});
        const results_net_benefits = calc.results_net_benefits(results_benefits, results_costs);
        console.log("results net benefits:", {results_net_benefits});

        // Calculate yearly results
        const yearlyResults = [];
        
        // Year 0 - Initial investment (negative cost, no benefits)
        yearlyResults.push({
            year: 0,
            costs: calc.results_Cost_0(e_cost_total), // correct
            benefits: 0, // had to be 0
            netBenefits: calc.results_Cost_0(e_cost_total) // correct
        });
        
        // Years 1 through yearLoan - Recurring costs and benefits
        for (let year = 1; year <= yearLoan; year++) {
            const costs = calc.results_costs(costRecharge, omCost, net_Recharge, wettedAreaAcre,0); // correct
            const benefits = calc.results_benefits(net_Recharge, valueWater);
            const netBen = calc.results_net_benefits(benefits, costs);
            
            yearlyResults.push({
                year: year,
                costs: costs,
                benefits: benefits,
                netBenefits: netBen
            });
        }
        
        // Calculate NPV for each column
        const costArray = yearlyResults.map(r => r.costs);
        const benefitArray = yearlyResults.map(r => r.benefits);
        const netBenefitArray = yearlyResults.map(r => r.netBenefits);
        
        const npvCosts = calc.calculateNPV(costArray);
        const npvBenefits = calc.calculateNPV(benefitArray);
        const npvNetBenefits = calc.calculateNPV(netBenefitArray);
        
        // Calculate B/C ratio and ROI
        const bcRatio = calc.bcRatio(npvBenefits, npvCosts);
        const roiValue = calc.roi(netBenefitArray);

        return { 
            yearlyResults,
            npv: {
                costs: npvCosts,
                benefits: npvBenefits,
                netBenefits: npvNetBenefits
            },
            bcRatio,
            roi: roiValue,
            summary: {
                acres,
                wettedAreaAcre,
                net_Recharge,
                total_cost: e_cost_total,
                net_Benefits
            }
        };
        
    };


    {/*Form*/}
    return(
      <div className="form-header">
        <h1><strong>Recharge Basin Calculator</strong></h1>
        <p>Please Fill out the following information to determine if a recharge basin is a good investment for your farm.</p>
        {/*Form*/}
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <br></br>
                <label htmlFor = "LongSide">Long Side (ft)</label>
                <input 
                    type="number" id="longSide" name="longSide" value={longSide} onChange={handleChange} 
                    min="0"
                    max="1000000"
                />
                <label htmlFor = "ShortSide">Short Side</label>
                <input 
                    type="number" id="shortSide" name="shortSide" value={shortSide} onChange={handleChange} 
                    min="0"
                    max="1000000"
                />
                <label htmlFor="areaAcres">{acres.toFixed(2)} acres</label>
                
                <label htmlFor="soilType">Soil Type(click to select)</label>
                <select
                    id="soilType"
                    name="soilType"
                    value={Input.soilType}
                    onChange={handleChange}
                >
                    {soilType.map((option) => (
                        <option key={option.value} value={option.infiltrationRate}>{option.label}</option> // changed value to infiltrationRate
                    ))}
                </select>
                <label htmlFor="wetYearFrequency">Wet Year Frequency</label>
                <input 
                    type="number" 
                    id="wetYearFrequency" name="wetYearFrequency" value={Input.wetYearFrequency} onChange={handleChange} 
                    min="0"
                    max="100"
                    step="1"
                />
                <label htmlFor="monthDuration">Month Duration during wet years</label>
                <input 
                    type ="number" 
                    id="monthDuration" name="monthDuration" value={Input.monthDuration} onChange={handleChange} 
                    min="0"
                    max="12"
                    step="1"
                />
                <label htmlFor="landCost">Land Cost</label>
                <input 
                    type="number" id="landCost" name="landCost" value={Input.landCost} onChange={handleChange} 
                    min="0"
                    max="1000000"
                />
                <label htmlFor="piplineFt">Pipline Feet</label>
                <input 
                    type="number" id="piplineFt" name="piplineFt" value={Input.piplineFt} onChange={handleChange} 
                    min="0"
                    max="1000000"
                />
                <label htmlFor="cubicYd">Cubic Yards</label>
                <input 
                    type="number" id="cubicYd" name="cubicYd" value={Input.cubicYd} onChange={handleChange} 
                    min="0"
                    max="1000000"
                />
                <label htmlFor="interestRate">Interest Rate</label>
                <input 
                    type="number" id="interestRate" name="interestRate" value={Input.interestRate} onChange={handleChange} 
                    min="0"
                    max="100"
                    step="1"
                />
                <label htmlFor="yearLoan">Year Loan</label>
                <input 
                    type="number" id="yearLoan" name="yearLoan" value={Input.yearLoan} onChange={handleChange} 
                    min="0"
                    max="100"
                    step="1"
                />
                <label htmlFor="costRecharge">Cost of Recharge</label>
                <input 
                    type="number" id="costRecharge" name="costRecharge" value={Input.costRecharge} onChange={handleChange} 
                    min="0"
                    max="1000000"
                />
                <label htmlFor="valueWater">Value of Water</label>
                <input 
                    type="number" id="valueWater" name="valueWater" value={Input.valueWater} onChange={handleChange} 
                    min="0"
                    max="1000000"
                />
                <label htmlFor="omCost">OM Cost</label>
                <input 
                    type="number" id="omCost" name="omCost" value={Input.omCost} onChange={handleChange} 
                    min="0"
                    max="1000000"
                />
                <button className="btn" onClick={handleSubmit} >Calculate</button>
                </div>

            </form>


        </div>



        {/*Show Results*/}
        {showResults && calculationResults && (
            <div className="result-container">

                <h2>Results:</h2>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Costs</th>
                            <th>Benefits</th>
                            <th>Net Benefits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculationResults.yearlyResults.map((result) => (
                            <tr key={result.year}>
                                <td>{result.year}</td>
                                <td>${result.costs.toFixed(2)}</td>
                                <td>${result.benefits.toFixed(2)}</td>
                                <td>${result.netBenefits.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>PV</th>
                            <td>${calculationResults.npv.costs.toFixed(2)}</td>
                            <td>${calculationResults.npv.benefits.toFixed(2)}</td>
                            <td>${calculationResults.npv.netBenefits.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th className="bc-ratio">B/C Ratio</th>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>{calculationResults.bcRatio.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th className="roi">ROI</th>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td> 
                            <td>{(calculationResults.roi * 100).toFixed(2)}%</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )}
      </div>
    );
}
export default Form;