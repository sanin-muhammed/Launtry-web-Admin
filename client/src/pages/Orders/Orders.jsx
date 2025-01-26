import { useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import "./style.css";
import { useSelector } from "react-redux";
import OrderDetails from "../../components/Orders/OrderDetails";
const Orders = () => {
    
    const { orders } = useSelector((state) => state.orders);

    return (
        <div className="container">
            <Sidebar />
            <div className="main_bar">
                <table border="1px" className="table order_table">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Order Id</th>
                            <th id="username">Username</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Order Status</th>
                            <th id="p">Payment Method</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td> {item.orderId} </td>
                                <td> {item.userDetails.username} </td>
                                <td> {item.serviceDetails.service} </td>
                                <td> {item.createdDate} </td>
                                <td> {item.orderStatus} </td>
                                <td> {item.paymentMethod} </td>

                                <OrderDetails order={item} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
