import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { compareAsc, format } from "date-fns";
import editImg from "../../assets/edit.svg";
import deleteImg from "../../assets/trash.svg";
import { enqueueSnackbar } from "notistack";
import "./style.css";
import { addPickup, deletePickup, editPickup } from "../../Actions/pickupActions";
import { useSelector } from "react-redux";
const Pickup = () => {
    const { pickups } = useSelector((state) => state.pickups);
    const [pickupId, setPickupId] = useState("");
    console.log({ pickupId });
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [selectedSlots, setSelectedSlots] = useState([]);
    const [date, setDate] = useState("");
    console.log({ date });

    const slots = ["09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM", "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM"];
    const handleSlotChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedSlots([...selectedSlots, value]);
        } else {
            setSelectedSlots(selectedSlots.filter((slot) => slot !== value));
        }
    };
    const handleEditClose = () => {
        setDate("");
        setSelectedSlots([]);
        setEditOpen(false);
    };
    const handleDeleteClose = () => setDeleteOpen(false);

    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);

    const formatDate = (date) => {
        return format(new Date(date), "dd-MMM-yyyy");
    };
    const formatDateToEdit = (date) => {
        return format(new Date(date), "yyyy-MM-dd");
    };

    const handleEditOpen = async (id) => {
        console.log({ id });
        setPickupId(id);
        const pickup = pickups.find((item) => item._id === id);
        console.log("p ===", pickup);
        const fDate = formatDateToEdit(pickup.date);
        console.log({ fDate });
        setDate(fDate);
        setSelectedSlots(pickup.slotes);
        setEditOpen(true);
    };
    const handleDeleteOpen = (id) => {
        setPickupId(id);
        setDeleteOpen(true);
    };

    const handleEditPackup = async (e) => {
        e.preventDefault();
        if (!date) {
            enqueueSnackbar("enter a date", { variant: "warning" });
            return;
        } else if (selectedSlots.length === 0) {
            enqueueSnackbar("choose slotes", { variant: "warning" });
            return;
        }
        const formattedDate = formatDate(date);
        const response = await editPickup(pickupId, { date: formattedDate, slotes: selectedSlots });
        if (response.status) {
            enqueueSnackbar(response.message, { variant: "success" });
            setDate("");
            setEditOpen(false);
        } else {
            enqueueSnackbar(response.message, { variant: "error" });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedSlots);
        if (!date) {
            enqueueSnackbar("enter a date", { variant: "warning" });
            return;
        } else if (selectedSlots.length === 0) {
            enqueueSnackbar("choose slotes", { variant: "warning" });
            return;
        }
        console.log({ date, selectedSlots });
        const formattedDate = formatDate(date);

        const response = await addPickup({ date: formattedDate, slotes: selectedSlots });
        if (response.status) {
            enqueueSnackbar(response.message, { variant: "success" });
            setDate("");
            setCreateOpen(false);
        } else {
            enqueueSnackbar(response.message, { variant: "error" });
        }
    };
    const handleDeletePickup = async () => {
        const response = await deletePickup(pickupId);
        if (response.status) {
            enqueueSnackbar(response.message, { variant: "success" });
            setPickupId("");
            setDeleteOpen(false);
        } else {
            enqueueSnackbar(response.message, { variant: "error" });
        }
    };
    console.log("selected =", selectedSlots);
    return (
        <div className="banner_component">
            <div>
                <TriggerButton className="create_btn" type="button" onClick={handleCreateOpen}>
                    Create
                </TriggerButton>
                <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={createOpen} onClose={handleCreateClose} slots={{ backdrop: StyledBackdrop }}>
                    <ModalContent sx={{ width: 500 }}>
                        <h2 className="modal-title">Create Pickup</h2>
                        <form onSubmit={handleSubmit} id="unstyled-modal-description" className="create_offer_form">
                            <label htmlFor="date">Date :</label>
                            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            <label htmlFor="">Slotes :</label>
                            <div className="slotes_div">
                                {slots.map((slot) => (
                                    <div key={slot} className="slotes">
                                        <label>
                                            <input type="checkbox" value={slot} checked={selectedSlots.includes(slot)} onChange={handleSlotChange} />
                                            <p>{slot}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button className="edit_btn">Create</button>
                        </form>
                    </ModalContent>
                </Modal>
            </div>
            <table className="table" border="1px">
                <thead>
                    <tr key="">
                        <th>Sl</th>
                        <th>Date</th>
                        <th>Slotes</th>
                        <th className="action_th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pickups.map((item, index) => (
                        <tr key={index}>
                            <td className="sl_td">{index + 1}</td>
                            <td className="">{item.date}</td>
                            <td className="slote_td">
                                <ul>
                                    {item.slotes.map((slote, index) => (
                                        <li key={index}>{slote}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="actions">
                                <div>
                                    <TriggerButton type="button" onClick={() => handleEditOpen(item._id)}>
                                        <img src={editImg} alt="Edit" className="action_btn" />
                                    </TriggerButton>
                                </div>
                                <div>
                                    <TriggerButton type="button" onClick={() => handleDeleteOpen(item._id)}>
                                        <img src={deleteImg} alt="Delete" className="action_btn" />
                                    </TriggerButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={editOpen} onClose={handleEditClose} slots={{ backdrop: StyledBackdrop }}>
                    <ModalContent sx={{ width: 800 }}>
                        <h2 className="modal-title">Edit Pickup</h2>
                        <form onSubmit={handleEditPackup} id="unstyled-modal-description" className="create_offer_form">
                            <label htmlFor="date">Date :</label>
                            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            <label htmlFor="slotes">Slotes :</label>
                            <div className="slotes_div">
                                {slots.map((slot) => (
                                    <div key={slot} className="slotes">
                                        <label>
                                            <input type="checkbox" value={slot} checked={selectedSlots.includes(slot)} onChange={handleSlotChange} />
                                            <p>{slot}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {/* <input type="text" name="slotes" value={date} onChange={(e) => setDate(e.target.value)} /> */}
                            <button className="edit_btn">Edit</button>
                        </form>
                    </ModalContent>
                </Modal>
                <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={deleteOpen} onClose={handleDeleteClose} slots={{ backdrop: StyledBackdrop }}>
                    <ModalContent sx={{ width: 400 }}>
                        <h2 id="unstyled-modal-title" className="modal-title">
                            Delete Pickup
                        </h2>
                        <p className=" modal-description">
                            Are you sure you want to delete this pickup ?
                            <button className="delete_btn" onClick={handleDeletePickup}>
                                Delete
                            </button>
                        </p>
                    </ModalContent>
                </Modal>
            </table>
        </div>
    );
};

export default Pickup;

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
