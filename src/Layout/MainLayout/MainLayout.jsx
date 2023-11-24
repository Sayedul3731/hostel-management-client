import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>main layout</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;