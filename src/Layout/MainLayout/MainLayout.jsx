import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Container from '@mui/material/Container';

const MainLayout = () => {
    return (
        <div>
            <Container maxWidth='lg'>
                <Navbar></Navbar>
                <h1>main layout</h1>
                <Outlet></Outlet>
            </Container>
        </div>
    );
};

export default MainLayout;