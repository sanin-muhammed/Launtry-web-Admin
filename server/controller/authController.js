const Admin = require("../models/admin");

// @des:Login api
// method:post
// api:/logins

exports.post_login = async (req, res) => {
    console.log("req body =", req.body);
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email, password }, { password: 0 });
        if (!admin) {
            console.log("admin not exist".red.bold);
            res.status(400).json({ error: true, message: "admin not exist" });
            return;
        }
        console.log({ admin });
        console.log("Admin Logined Successfully".bold.yellow);
        res.status(200).json({ error: false, status: true, message: "Admin Logined Successfully", data: admin });
    } catch (error) {
        console.log("server error ", error);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
