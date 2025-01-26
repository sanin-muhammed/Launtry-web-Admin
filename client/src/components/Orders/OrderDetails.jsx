import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import React, { useEffect, useState } from "react";
import ChangeShedule from "./ChangeShedule";
import { allOrders } from "../../Actions/orderActions";
import { useDispatch } from "react-redux";
import { setOrder } from "../../Redux/reducers/orders";

const OrderDetails = ({ order }) => {
    const dispatch = useDispatch()
    const [createOpen, setCreateOpen] = useState(false);

    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);

    const fetchOrders = async () => {
        const response = await allOrders();
        if (response.status) {
            dispatch(setOrder(response.data));
        }
    };

    return (
        <td className="more_td">
            <svg onClick={handleCreateOpen} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
            </svg>
            <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={createOpen} onClose={handleCreateClose} slots={{ backdrop: StyledBackdrop }}>
                <ModalContent sx={{ width: 800, height: 500 }}>
                    <h2 className="modal-title">Order Details</h2>
                    <div className="detail_items">
                        <div className="detail_item">
                            <h4>Username :</h4> <span>{order.userDetails.username}</span>
                        </div>
                        <div className="detail_item">
                            <h4>Order id :</h4> <span>{order.orderId}</span>
                        </div>
                        <div className="detail_item">
                            <h4>Created date :</h4>
                            <p>{order.createdDate}</p>
                        </div>
                        <div className="detail_item">
                            <h4>Service :</h4> <img src={order.serviceDetails.serviceImage} alt="" /> <p>{order.serviceDetails.service}</p>
                        </div>
                        <div className="">
                            <h4>Products :</h4>
                            <div className="product_items">
                                {order.products.map((item, index) => (
                                    <div className="product_item" key={index}>
                                        <div className="image_div">
                                            <img src={item.productImage} alt="" />
                                            <div>
                                                <p>{item.product}</p>
                                                <p>₹{item.price}</p>
                                            </div>
                                        </div>
                                        <p>X{item.count}</p>
                                        <p>₹ {item.price * item.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {order.instructions ? (
                            <div className=" instructions__items">
                                <h4 id="head">Instructions:</h4>
                                <div className="instructions">
                                    <div>
                                        <h4>Water:</h4>
                                        <p>{order.instructions.water}</p>
                                    </div>
                                    <div>
                                        <h4>Fabric Softener:</h4>
                                        <p>{order.instructions.fabricSoftener}</p>
                                    </div>
                                    <div>
                                        <h4>Detergent:</h4>
                                        <p>{order.instructions.detergent}</p>
                                    </div>
                                    <div className="note_div">
                                        <h4>Note:</h4>
                                        <p>{order.instructions.note}</p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <div className="detail_item">
                            <h4>Pickup date :</h4>
                            <p>{order.pickupDate.date}</p>
                            <h4 className="slote_h4">Slote :</h4>
                            <p>{order.pickupDate.slote}</p>
                        </div>
                        <div className="detail_item">
                            <h4>Pickup address :</h4>
                            <p>{order.pickupAddressDetails.address}</p>
                        </div>
                        <div className="detail_item">
                            <h4>Delivery address :</h4>
                            <p>{order.deliveryAddress}</p>
                        </div>
                        <div className="detail_item">
                            <h4>Delivery date :</h4>
                            <p>{order.expectedDelivery}</p>
                        </div>
                        <div className="detail_item">
                            <h4>Express delivery :</h4>
                            <p>{order.expressDelivery === true ? "true" : "false"}</p>
                        </div>
                        <div className="detail_item">
                            <h4>Payment method :</h4>
                            <p>{order.paymentMethod}</p>
                        </div>
                        <div className="detail_item">
                            <h4>Payment status :</h4>
                            <p>{order.paymentStatus}</p>
                        </div>
                        <div className="detail_item">
                            <h4>Order status :</h4>
                            <p>{order.orderStatus}</p>
                            <ChangeShedule fetchOrders={fetchOrders} id={order._id} />
                        </div>
                        <div className="detail_item">
                            <h2>Total :</h2>
                            <h3>₹ {order.totalAmount}</h3>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </td>
    );
};

export default OrderDetails;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return <div className={clsx({ "base-Backdrop-open": open }, className)} ref={ref} {...other} />;
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: "#99CCFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0066CC",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
    ({ theme }) => css`
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 500;
        text-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
        padding: 24px;
        color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

        & .modal-title {
            margin: 0;
            line-height: 1.5rem;
            margin-bottom: 8px;
        }

        & .modal-description {
            margin: 0;
            line-height: 1.5rem;
            font-weight: 400;
            color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
            margin-bottom: 4px;
        }
    `
);

const TriggerButton = styled("button")(
    ({ theme }) => css`
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.5;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all 150ms ease;
        cursor: pointer;
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

        &:hover {
            background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
            border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
        }

        &:active {
            background: ${theme.palette.mode === "dark" ? grey[100] : grey[100]};
        }

        &:focus-visible {
            box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
            outline: none;
        }
    `
);
