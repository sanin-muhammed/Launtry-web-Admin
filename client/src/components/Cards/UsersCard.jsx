import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersCard = () => {
    const { totalUsers } = useSelector((state) => state.users);
    return (
        <Link to="/users" className="orders_card">
            <h1>{totalUsers}</h1>
            <h5>Users</h5>
        </Link>
    );
};

export default UsersCard;
