import "./form.css";
import { useState } from "react";



const Form = () => {
    {/*input fields for the form*/}
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
                <label htmlFor="soilType">Soil Type(click to select)</label>
                <select
                    id="soilType"
                    name="soilType"
                    value={Input.soilType}
                    onChange={handleChange}
                >
                    {soilType.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
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
        {showResults && validateForm() && (
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
                        {Array.from({ length: parseInt(Input.yearLoan) || 0 }, (_, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {/*Costs*/}
                                <td>$0.00</td>
                                {/*Benefits*/}
                                <td>$0.00</td>
                                {/*Net Benefits*/}
                                <td>$0.00</td>
                                {/*These are hard coded for now*/}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>PV</th>
                            <td>$0.00</td>
                            <td>$0.00</td>
                            <td>$0.00</td>
                        </tr>
                        <tr>
                            <th className="bc-ratio">B/C Ratio</th>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>$0.00</td>
                        </tr>
                        <tr>
                            <th className="roi">ROI</th>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td> 
                            <td>0%</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )}
      </div>
    );
}
export default Form;