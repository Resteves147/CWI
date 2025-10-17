import farm from "../assets/farming.jpg";
import "./homepage.css";
import { Link } from "react-router-dom";

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
                <h2><strong>Division of Reaserch & Education</strong></h2>
                <p>
                The division address water-related issues by engaging Fresno State's faculty, staff, students and our collaborative network of water experts.
                We form teams to pursue current and sustainable water resource management solution
                through education, collaboration and research.
                </p>    
                <br></br>
                <h2><strong>The Problem</strong></h2>
                <p>
                    California is in the midst of a severe drought. The state is experiencing a shortage of water, and the situation is only getting worse.
                    New laws are restricting drilling for new wells as its drying up the ground water. Soon, it'll be more difficult to get water from the ground.
                    So, what can we do?
                </p>

                <br></br>
                <h2><strong>The Solution</strong></h2>
                <p>
                    Recharge basins are man-made ponds designed to allow storm water and surplus surface water to infiltrate into the ground.
                    This will replenish the ground water as well as prevent flooding. It's also a way to store water for future uess. 
                    With this drought, we need to be proactive and start building recharge basins. This will also help farmers to spend money to
                    make money. And this calculator will help them determine if it's worth it.
                </p>
                <br></br>
                <h2><strong>Recharge Basin Calculator</strong></h2> 
                <p>
                    This calculator is intended to help farmers determine whether a recharge basin on or near their
                    property is worthwhile. This tool provides only a preliminary cost estimate.
                    Recharge basins should be professionally designed to reduce the risk of basin failure.
                    Farmers should consult with your water district manager regarding the frequency of availability and
                    cost of recharge water.
                    At this moment, this calculator is a work in progress and has been discussed at just one Technical Committee Meeting of the Water Blueprint.
                    At this moment, the calculator assumes one basin on flat land.
                </p>
                <Link to="form">
                <button className="calc">
                    Get Started
                </button>
                </Link>
            </div>     
        </section>
    );
}

export default Homepage;