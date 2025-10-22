import "./header.css";
import logo from "../assets/fresnostate_logo.png";
import Form from "../pages/form.jsx";
import { Link } from "react-router-dom";

const Header = () => {
    return(

        <header className="site-header">
            <div className="container">
                <img className="logo" 
                    src= {logo}
                    alt="fresnostate logo"
                />
                <nav className="nav">
                    <ul className="nav-list">
                        <li><Link to="/">About</Link></li>
                        <li><a href="/form">Calculator</a></li>
                        <li><Link to="https://www.californiawater.org/">CWI</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        
    );
};

export default Header;