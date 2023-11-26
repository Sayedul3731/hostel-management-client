import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider"


const useAuth = () => {

    const {user} = useContext(AuthContext);

    return user;
};

export default useAuth;