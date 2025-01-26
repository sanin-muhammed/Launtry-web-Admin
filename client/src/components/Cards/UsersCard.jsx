import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersCard = () => {
    const { totalUsers } = useSelector((state) => state.users);
    const [usersLength, setUsersLength] = useState(0);

    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            if (count <= totalUsers) {
                setUsersLength(count);
                count++;
            } else {
                clearInterval(interval);
            }
        }, 70);

        return () => clearInterval(interval);
    }, [totalUsers]);

    return (
        <Link to="/users" className="orders_card">
            <h1>{usersLength}</h1>
            <h5>Users</h5>
        </Link>
    );
};

export default UsersCard;
