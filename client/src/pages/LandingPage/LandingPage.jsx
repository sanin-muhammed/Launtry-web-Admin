import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./LandingPage.css";
const LandingPage = () => {
    return (
        <Link className="landingPage_container" to="/login">
                <img src={logo} className="logo" alt="logo" />

                <h1 className="brand_name">Admin Dashboard</h1>
        </Link>
    );
};

export default LandingPage;
