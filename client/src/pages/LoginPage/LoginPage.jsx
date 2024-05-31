import "./LoginPage.css";
import frame_img from "../../assets/Frame.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { validateEmail } from "../../Actions/validation";
import "./LoginPage.css";
import { loginUser } from "../../Actions/auth";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMsg("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email) {
            setErrorMsg("enter email ");
            return;
        } else if (!validateEmail(email)) {
            setErrorMsg("Invalid email format");
            return;
        } else if (!password) {
            setErrorMsg("enter password");
            return;
        }
        try {
            const response = await loginUser(formData);
            console.log("response =", response);
            if (response.status) {
                enqueueSnackbar(response.message, { variant: "success" });
                navigate("/dashboard");
            } else if (response.error) {
                setErrorMsg(response.message);
                return;
            }
        } catch (error) {
            console.log("loginUser error");
        }
    };

    return (
        <div className="loginPage_container">
            <h2 className="brand_name"> Admin Login Page</h2>
            <form onSubmit={handleSubmit}>
                {errorMsg && (
                    <Alert className="error_msg" variant="outlined" severity="error">
                        {errorMsg}
                    </Alert>
                )}
                <input type="text" name="email" placeholder="Enter Email " onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Enter your password" onChange={handleInputChange} />
                <button className="auth_btn" style={{ background: "#fff", color: "#1facf3" }}>
                    Log In
                </button>
            </form>
            <img src={frame_img} className="frame_img" alt="frame_img" />
        </div>
    );
};

export default LoginPage;
