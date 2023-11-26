import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminProfile = () => {
    const user = useAuth();
    const axiosSecure =useAxiosSecure();
    const [meals, setMeals] = useState([])

    useEffect(() => {
        axiosSecure.get(`/meals/${user?.email}`)
            .then(res => {
                setMeals(res.data);
            })
    }, [axiosSecure, user.email])

   
    return (
        <div>
            <SectionTitle heading="admin profile"></SectionTitle>
            <div className="card bg-base-100 shadow-xl mx-10">
                <figure><img src={user?.photoURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.displayName}</h2>
                    <p> Email: {user?.email}</p>
                    <p>Add Meals: {meals.length}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;