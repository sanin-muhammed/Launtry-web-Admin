import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import React, { useState } from "react";
import editImg from "../../assets/edit.svg";
import deleteImg from "../../assets/trash.svg";
import { addService, deleteService, editService } from "../../Actions/actions";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import "./style.css";

const Service = () => {
    const { services } = useSelector((state) => state.services);

    const [serviceImage, setServiceImage] = useState("");
    const [service, setService] = useState("");
    const [ServiceId, setServiceId] = useState("");
    console.log({ ServiceId });

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const handleEditClose = () => setEditOpen(false);
    const handleDeleteClose = () => setDeleteOpen(false);

    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);

    const handleserviceImage = (e) => {
        e.preventDefault();
        setServiceImage(e.target.files[0]);
    };
    const handleInputChange = (e) => {
        setService(e.target.value);
    };
    const handleEditOpen = (id) => {
        const item = services.find((item) => {
            return item._id === id;
        });

        setServiceId(item._id);
        setService(item.service);
        console.log("service =", item);

        setEditOpen(true);
    };

    const handleDeleteOpen = (id) => {
        setServiceId(id);
        setDeleteOpen(true);
    };

    const handleSubmitService = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("serviceImage", serviceImage);
        formData.append("service", service);
        const response = await addService(formData);
        console.log({ response });
        if (response.status) {
            enqueueSnackbar(response.message, { variant: "success" });
            handleCreateClose();
        }
    };
    const handleEditService = async (e) => {
        e.preventDefault();
        if(!serviceImage && !service){
            enqueueSnackbar("fill the field you want to update ", { variant: "warning" });
            return
        }
        console.log("formdata =", { service });
        const formData = new FormData();
        formData.append("serviceImage", serviceImage);
        formData.append("service", service);
        const response = await editService(formData, ServiceId);
        console.log({ response });
        if (response.status) {
            enqueueSnackbar(response.message, { variant: "success" });
            handleEditClose();
        }
    };

    const handleDeleteService = async () => {
        const response = await deleteService(ServiceId);
        console.log({ response });
        if (response.error) {
            enqueueSnackbar(response.message, { variant: "error" });
            return;
        } else if (response.status) {
            enqueueSnackbar(response.message, { variant: "success" });
        }
        setDeleteOpen(false);
    };
    return (
        <div className="banner_component">
            <div>
                <TriggerButton className="create_btn" type="button" onClick={handleCreateOpen}>
                    Create Service
                </TriggerButton>
                <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={createOpen} onClose={handleCreateClose} slots={{ backdrop: StyledBackdrop }}>
                    <ModalContent sx={{ width: 600 }}>
                        <h2 className="modal-title">Create Service</h2>
                        <form onSubmit={handleSubmitService} id="unstyled-modal-description" className="create_offer_form">
                            <label htmlFor="">Image :</label>
                            <input type="file" name="serviceImage" onChange={handleserviceImage} />
                            <label htmlFor="">Service :</label>
                            <input type="text" name="service" placeholder="Enter the Service name" onChange={handleInputChange} />
                            <button className="edit_btn">Create</button>
                        </form>
                    </ModalContent>
                </Modal>
            </div>
            <table className="table" border="1px">
                <thead>
                    <tr key="">
                        <th>Sl</th>
                        <th>Images</th>
                        <th>Services</th>
                        <th className="action_th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((item, index) => (
                        <tr key={index}>
                            <td className="sl_td">{index + 1}</td>
                            <td className="service_images">
                                <img src={item.serviceImage} alt={`${item.service} image`} />
                            </td>
                            <td>{item.service}</td>
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
                        <h2 className="modal-title">Edit Service</h2>
                        <form onSubmit={handleEditService} id="unstyled-modal-description" className="create_offer_form">
                            <label htmlFor="">Image :</label>
                            <input type="file" name="serviceImage" onChange={handleserviceImage} />
                            <label htmlFor="">Service :</label>
                            <input type="text" name="service" value={service} onChange={handleInputChange} />
                            <button className="edit_btn">Edit</button>
                        </form>
                    </ModalContent>
                </Modal>
                <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={deleteOpen} onClose={handleDeleteClose} slots={{ backdrop: StyledBackdrop }}>
                    <ModalContent sx={{ width: 400 }}>
                        <h2 id="unstyled-modal-title" className="modal-title">
                            Delete Service
                        </h2>
                        <p className=" modal-description">
                            Are you sure you want to delete this service?
                            <button className="delete_btn" onClick={handleDeleteService}>
                                Delete
                            </button>
                        </p>
                    </ModalContent>
                </Modal>
            </table>
        </div>
    );
};

export default Service;

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
