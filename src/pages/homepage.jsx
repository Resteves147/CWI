import farm from "../assets/farming.jpg";
import "./homepage.css";

const Homepage = () => {
    return (
        <section className ="Body">
            <div className ="Image">
                <img
                    src={farm}
                    alt="homepage photo"
                />
            </div>

            <div className ="About">
                <p><strong>Division of Reaserch & Eductaion</strong></p>
                <p>
                The division address water-related issues by engaging Fresno State's faculty, staff, students and our collaborative network of water experts.
                We form teams to pursue current and sustainable water resource management solution
                through education, collaboration and research.
                </p>    
                          
                <p>
                    This calculator is intended to help farmers determine whether a recharge basin on oor near their
                    property is worthwhile. This tool provides only a preliminary cost estimate.
                    Recharge basins should be professionally designed to reduce the risk of basin failure.
                    Farmers should consult with your water district manager regarding the frequency of availability and
                    cost of recharge water.
                    At this moment, this calculator is a work in progress and has been discussed at just one Technical Committee Meeting of the Water Blueprint.
                    At this moment, the calculator assumes one basin on flat land.
                </p>
            </div>

            <button className="calc">
                Get Started
            </button>
        </section>
    );
}

export default Homepage;