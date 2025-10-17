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

    const [Results, setResults] = useState(false);
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
        setResults(true);
        setShowResults(true);
    };

    return(
      <div className="form-container">
        <h1><strong>Recharge Basin Calculator</strong></h1>
        <p>Please Fill out the following information to determine if a recharge basin is a good investment for your farm.</p>

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
                    step="1000"
                />
                <label htmlFor="piplineFt">Pipline Feet</label>
                <input 
                    type="number" id="piplineFt" name="piplineFt" value={Input.piplineFt} onChange={handleChange} 
                    min="0"
                    max="1000000"
                    step="1000"
                />
                <label htmlFor="cubicYd">Cubic Yards</label>
                <input 
                    type="number" id="cubicYd" name="cubicYd" value={Input.cubicYd} onChange={handleChange} 
                    min="0"
                    max="1000000"
                    step="1000"
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
                    step="1000"
                />
                <label htmlFor="valueWater">Value of Water</label>
                <input 
                    type="number" id="valueWater" name="valueWater" value={Input.valueWater} onChange={handleChange} 
                    min="0"
                    max="1000000"
                    step="1000"
                />
                <label htmlFor="omCost">OM Cost</label>
                <input 
                    type="number" id="omCost" name="omCost" value={Input.omCost} onChange={handleChange} 
                    min="0"
                    max="1000000"
                    step="1000"
                />
                <button className="btn" onClick={handleSubmit}>Calculate</button>
            </div>
        </form>


      </div>
    );
}
export default Form;