import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import { useEffect } from "react"


const MainLayout = () => {
    const location = useLocation()

    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname == '/') {
            document.title = 'HappyHostel | Home'
        } else if(location.pathname == '/dashboard') {
            document.title = `HappyHostel ${location.pathname.replace('/', '| ')}`
        }else{
            document.title = `HappyHostel ${location.pathname.replace('/', '|')}`
        }
    }, [location.pathname])
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;