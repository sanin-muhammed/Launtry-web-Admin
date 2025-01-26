import Sidebar from "../../components/SideBar/Sidebar";
import OrdersCard from "../../components/Cards/OrdersCard";
import UsersCard from "../../components/Cards/UsersCard";
import "./style.css";

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
