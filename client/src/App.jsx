import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Orders from "./pages/Orders/Orders";
import Settings from "./pages/SettingsPage/Settings";
import { useDispatch } from "react-redux";
import { allUsers } from "./Actions/actions";
import { setUsers } from "./Redux/reducers/users";
import { useEffect } from "react";
function App() {
    

    return (
        <>
            <Routes>
                <Route path="/" Component={LoginPage} />
                <Route path="/dashboard" Component={Dashboard} />
                <Route path="/users" Component={Users} />
                <Route path="/orders" Component={Orders} />
                <Route path="/settings" Component={Settings} />
            </Routes>
        </>
    );
}

export default App;
