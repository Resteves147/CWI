import "./header.css";
import logo from "../assets/fresnostate_logo.png";

const Header = () => {
    return(

        <header className="site-header">
            <div className="container">
                <img className="logo" 
                    src= {logo}
                    alt="fresnostate logo"
                />
            </div>
        </header>
        
    );
};

export default Header;