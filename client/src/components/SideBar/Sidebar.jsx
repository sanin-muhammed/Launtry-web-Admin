import logo from "../../assets/logo.svg";
import categoryImg from "../../assets/category.svg";
import profileImg from "../../assets/profile.svg";
import ordersImg from "../../assets/calendar.svg";
import settingsImg from "../../assets/setting-2.svg";
import logoutImg from "../../assets/logout.svg";

import "./style.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allUsers, getAdmin } from "../../Actions/actions";
import { setUsers } from "../../Redux/reducers/users";
import { useEffect } from "react";
import { setAdmin } from "../../Redux/reducers/admin";

const Sidebar = () => {
    const dispatch = useDispatch();
    const fetchAllUsers = async () => {
        const response = await allUsers();
        if (response.error) {
            console.log("error fetching users");
            return;
        } else if (response.status) {
            dispatch(setUsers(response.data));
        }
    };
    const fetchAdmin = async () => {
        const response = await getAdmin();
        if (response.error) {
            console.log("error fetching Admin");
            return;
        } else if (response.status) {
            dispatch(setAdmin(response.data));
        }
    };

    useEffect(() => {
        fetchAllUsers();
        fetchAdmin();
    },[]);
    return (
        <div className="sidebar">
            <div className="banner">
                <img src={logo} alt="" />
                <h2>Laundrybin</h2>
            </div>
            <div className="sidebar_items">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active_item" : "item")}>
                    <img src={categoryImg} alt="" />
                    <h4>Dashboard</h4>
                </NavLink>
                <NavLink to="/users" className={({ isActive }) => (isActive ? "active_item" : "item")}>
                    <img src={profileImg} alt="" />
                    <h4>Users</h4>
                </NavLink>
                <NavLink to="/orders" className={({ isActive }) => (isActive ? "active_item" : "item")}>
                    <img src={ordersImg} alt="" />
                    <h4>Orders</h4>
                </NavLink>
            </div>
            <div className="sidebar_items">
                <NavLink to="/settings" className={({ isActive }) => (isActive ? "active_item" : "item")}>
                    <img src={settingsImg} alt="" />
                    <h4>Settings</h4>
                </NavLink>
                <div className="logout">
                    <img src={logoutImg} alt="" />
                    <h4>Logout</h4>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
