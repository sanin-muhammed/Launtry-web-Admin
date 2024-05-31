import { useSelector } from "react-redux";
import Sidebar from "../../components/SideBar/Sidebar";
import "./style.css";
const Users = () => {
    const { users } = useSelector((state) => state.users);

    return (
        <div className="container">
            <Sidebar />
            <div className="main_bar">
                <table border="1px" className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email / Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index+1}>
                                <td>{index+1}</td>
                                <td>{user.username}</td>
                                <td>{user.emailOrPhone}</td>
                                <td>Active</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
