/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivetRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <div className="flex justify-center mt-24"><span className="loading loading-bars loading-lg "></span></div>
    }
    if(user){
        return children;
    }
    console.log('location', location);
    return <Navigate to="/login" state={{from: location}} replace></Navigate> ;
};

export default PrivetRoutes;