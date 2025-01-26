import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const OrdersCard = () => {
    const { orders } = useSelector((state) => state.orders);
    const [ordersLength, setOrdersLength] = useState(0);

    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            if (count <= orders.length) {
                setOrdersLength(count);
                count++;
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [orders]);

    return (
        <Link to="/orders" className="orders_card">
            <h1>{ordersLength}</h1>
            <h5>Orders</h5>
        </Link>
    );
};

export default OrdersCard;
