import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import React, { useState } from "react";
import { editOrderStatus } from "../../Actions/orderActions";
import { enqueueSnackbar } from "notistack";

const ChangeShedule = ({ fetchOrders, id }) => {
    const [createOpen, setCreateOpen] = useState(false);

    const handleChange = async (status) => {
        console.log({ id });
        console.log({ status });

        const response = await editOrderStatus(id, status);
        if (response.status) {
            enqueueSnackbar(response.message, { variant: "success" });
            await fetchOrders();
            setCreateOpen(false);
        }
    };

    return (
        <>
            <button onClick={() => setCreateOpen(true)}>change</button>
            <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={createOpen} onClose={() => setCreateOpen(false)} slots={{ backdrop: StyledBackdrop }}>
                <ModalContent sx={{ width: 600, height: 200 }}>
                    <h3 className="modal-title">Change Order Status</h3>

                    <div className="change_btns">
                        <button onClick={() => handleChange("Sheduled")}>Scheduled</button>
                        <button onClick={() => handleChange("Picked up")}>Picked up</button>
                        <button onClick={() => handleChange("Washing")}>Washing</button>
                        <button onClick={() => handleChange("Out for delivery")}>Out for delivery</button>
                        <button onClick={() => handleChange("Completed")}>Completed</button>
                        <button onClick={() => handleChange("Cancelled")}>Cancelled</button>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChangeShedule;

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
        background-color: ${theme.palette.mode === "dark" ? grey[900] : "#ffffff31"};
        backdrop-filter: blur(2px);
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
        & h3 {
            color: #fff;
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
