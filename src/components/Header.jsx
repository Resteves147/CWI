import "./header.css";
import logo from "../assets/fresnostate_logo.png";
import Form from "../pages/form.jsx";

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
                        <li><a href="/">Home</a></li>
                        <li><a href="/form">Form</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        
    );
};

export default Header;