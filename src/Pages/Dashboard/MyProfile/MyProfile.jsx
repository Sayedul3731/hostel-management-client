import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const MyProfile = () => {

    const user = useAuth();
    const axiosPublic = useAxiosPublic();
    const [identifiedUser, setIdentifiedUser] = useState({})

    useEffect(() => {
        axiosPublic.get(`/users/${user?.email}`)
            .then(res => {
                setIdentifiedUser(res.data[0])
            })
    }, [axiosPublic, user.email])

    console.log(user);
    return (
        <div>
            <SectionTitle heading="my profile"></SectionTitle>
            <div className="card bg-base-100 shadow-xl mx-10">
                <figure><img src={user?.photoURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.displayName}</h2>
                    <p> Email: {user?.email}</p>
                    <p>Badge: {identifiedUser?.Badge}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;