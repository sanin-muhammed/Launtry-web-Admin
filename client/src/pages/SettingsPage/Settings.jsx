import Sidebar from "../../components/SideBar/Sidebar";
import profileImg from "../../assets/photo2.jpeg";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./style.css";
import { all_banners, editBannerImg } from "../../Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Banner from "../../components/Banners/Banner";
import { enqueueSnackbar } from "notistack";
import { setBanners } from "../../Redux/reducers/banners";
import Offer from "../../components/Offers/Offer";
const Settings = () => {
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);

    const handleBannerImg = async (e) => {
        const bannerImage = e.target.files[0];
        console.log({ bannerImage });
        const formData = new FormData();
        formData.append("bannerImage", bannerImage);

        console.log({ formData });
        const response = await editBannerImg(formData);
        console.log({ response });
        if (response.status) {
            enqueueSnackbar(response.message, { variant: "success" });
        }
    };

    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchBanner = async () => {
        const response = await all_banners();
        dispatch(setBanners(response.data));
    };

    useEffect(() => {
        fetchBanner();
    });

    return (
        <div className="container">
            <Sidebar />
            <div className="main_bar">
                <div className="profile_div">
                    <div className="banner">
                        <img src={admin.bannerImage} alt="banner image" />
                    </div>
                    <div className="profile">
                        <img src={profileImg} alt="profile img" className="profileImg" />
                        <h1>{admin.username}</h1>
                        <label className="edit_banner" htmlFor="file">
                            Edit Profile Banner
                        </label>
                        <input id="file" type="file" className="choose_input" name="bannerImage" onChange={handleBannerImg} />
                    </div>
                </div>
                <Box className="box">
                    <TabContext value={value}>
                        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons={false} aria-label="scrollable prevent tabs example">
                            <Tab label="Banners" value="1" />
                            <Tab label="Offers" value="2" />
                            <Tab label="Services" value="3" />
                            <Tab label="Item Four" value="4" />
                            <Tab label="Item Five" value="5" />
                            <Tab label="Item Six" value="6" />
                            <Tab label="Item Seven" value="7" />
                        </Tabs>
                        <TabPanel value="1">
                            <Banner />
                        </TabPanel>
                        <TabPanel value="2">
                            <Offer />
                        </TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                        <TabPanel value="4">Item Four</TabPanel>
                        <TabPanel value="5">Item Three</TabPanel>
                        <TabPanel value="6">Item Three</TabPanel>
                        <TabPanel value="7">Item Seven</TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    );
};

export default Settings;
