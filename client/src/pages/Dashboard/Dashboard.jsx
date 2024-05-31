import Sidebar from "../../components/SideBar/Sidebar";
import OrdersCard from "../../components/Cards/OrdersCard";
import "./style.css";
import UsersCard from "../../components/Cards/UsersCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUsers } from "../../Redux/reducers/users";
import { allUsers } from "../../Actions/actions";
const Dashboard = () => {
    
    return (
        <div className="container">
            <Sidebar />
            <div className="main_bar">
                <div className="cards">
                    <OrdersCard />
                    <UsersCard />
                    <OrdersCard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
