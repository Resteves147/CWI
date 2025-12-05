import "./form.css";
import * as calc from "./utils/calculations.js";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Form = () => {
    {/*input fields for the form*/}

    const location = useLocation();
    const rectangleData = location.state?.rectangleData;
    const topSoil = location.state?.topSoil;
    const longSide = rectangleData?.longSide;
    const shortSide = rectangleData?.shortSide;
    const acres = (longSide * shortSide) / 43560;
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

        if(Input.wetYearFrequency < 0 || Input.wetYearFrequency > 10 || Input.wetYearFrequency === ""){
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
        //parse the input values
        const wetYearFrequency = parseFloat(Input.wetYearFrequency / 10);
        const monthDuration = parseFloat(Input.monthDuration);
        const landCost = parseFloat(Input.landCost);
        const piplineFt = parseFloat(Input.piplineFt);
        const cubicYd = parseFloat(Input.cubicYd);
        const interestRate = parseFloat(Input.interestRate);
        const yearLoan = parseFloat(Input.yearLoan);
        const costRecharge = parseFloat(Input.costRecharge);

        //calculate the results
        const perimeter = calc.perimeter(longSide, shortSide);
        const area = calc.area(acres);
        //volume of the basin
        const center = calc.center(perimeter);
        const inside = calc.inside(perimeter);
        const outside = calc.outside(perimeter);
        const total_Volume = calc.total_Volume(center, inside, outside);
        const cost_Volume = calc.cost_Volume(total_Volume, cubicYd);
        //wetted area
        const outsideLength = calc.outside_Length(perimeter);
        const lessOutside = calc.less_Outside();
        const lessTop = calc.less_Top();
        const lessInside = calc.less_Inside();
        const wettedInside = calc.wetted_Inside();
        const netInside = calc.net_Inside(outsideLength, lessTop, lessInside, lessOutside, wettedInside);
        const wettedArea = calc.wetted_Area(netInside);
        const wettedAreaAcre = calc.wetted_Area_Acre(wettedArea);
        const grossAcre = calc.gross_Acre(wettedAreaAcre, acres);
        // land
        const land_Cost = calc.land_Cost(landCost, acres);
        const land_Cost_Acre = calc.land_Cost_Acre(land_Cost, acres);
        // earthwork
        const earthwork_Cost = calc.earthwork_Cost(total_Volume, cubicYd);
        const earthwork_Cost_Acre = calc.earthwork_Cost_Acre(earthwork_Cost, acres);
        // pipeline
        const pipeline_Cost = calc.pipeline_Cost(piplineFt);
        const pipeline_Cost_Acre = calc.pipeline_Cost_Acre(pipeline_Cost, acres);
        // fencing
        const fencing_Cost = calc.fencing_Cost(1, 6);
        const fencing_Cost_Acre = calc.fencing_Cost_Acre(fencing_Cost, acres);
        // subtotal
        const subtotal = calc.subtotal(land_Cost, earthwork_Cost, pipeline_Cost, fencing_Cost);
        const subtotal_Acre = calc.subtotal_Acre(subtotal, acres);
        // e cost
        const e_Cost = calc.e_Cost(subtotal);
        const e_Cost_Acre = calc.e_Cost_Acre(e_Cost, acres);
        const e_cost_total = calc.e_cost_total(subtotal, e_Cost);
        
        // recharge calculations
        const infiltrationRate = parseFloat(Input.soilType) || 0;
        const avg_annual_recharge = calc.avg_annual_recharge(infiltrationRate, wettedAreaAcre);
        const net_Recharge = calc.net_Recharge(avg_annual_recharge, monthDuration, wetYearFrequency, 0.3);
        
        // annual capital payment
        const annual_Capital_payment = calc.annual_Capital_payment(e_cost_total, interestRate / 100, yearLoan);
        const valueWater = parseFloat(Input.valueWater) || 0;
        const omCost = parseFloat(Input.omCost) || 0;
        const annualized_Capital_Cost = calc.annualized_Capital_Cost(annual_Capital_payment, net_Recharge);
        const total_Annulaized = calc.total_Annulaized(annualized_Capital_Cost, costRecharge, omCost);
        const net_Benefits = calc.net_Benefits(valueWater, total_Annulaized);
        const results_Cost_0 = calc.results_Cost_0(e_cost_total);
        const results_costs = calc.results_costs(costRecharge, omCost, net_Recharge, wettedAreaAcre, 0);
        const results_benefits = calc.results_benefits(net_Recharge, valueWater);
        const results_net_benefits = calc.results_net_benefits(results_benefits, results_costs);
        
        // Calculate yearly results
        const yearlyResults = [];
        
        // Year 0 - Initial investment (negative cost, no benefits)
        yearlyResults.push({
            year: 0,
            costs: calc.results_Cost_0(e_cost_total),
            benefits: 0,
            netBenefits: calc.results_Cost_0(e_cost_total)
        });
        
        // Years 1 through yearLoan - Recurring costs and benefits
        for (let year = 1; year <= yearLoan; year++) {
            const costs = calc.results_costs(costRecharge, omCost, net_Recharge, wettedAreaAcre, 0);
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
        
        const npvCosts = calc.calculateNPV(costArray, 0.05);
        const npvBenefits = calc.calculateNPV(benefitArray, 0.05);
        const npvNetBenefits = calc.calculateNPV(netBenefitArray, 0.05);
        
        // Calculate B/C ratio and ROI
        const bcRatio = calc.bcRatio(npvBenefits, Math.abs(npvCosts));
        const roiValue = calc.roi(npvBenefits, Math.abs(npvCosts));

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
                <label htmlFor = "LongSide">Long Side</label>
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
                <label htmlFor="areaAcres">{acres} acres</label>
                
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
                    max="10"
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