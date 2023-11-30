import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AOS from 'aos';
import 'aos/dist/aos.css';


const AdminProfile = () => {
    const user = useAuth();
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([])
  
  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])

    useEffect(() => {
        axiosSecure.get(`/meals/${user?.email}`)
            .then(res => {
                setMeals(res.data);
            })
    }, [axiosSecure, user.email])


    return (
        <div>
            <SectionTitle heading="admin profile"></SectionTitle>
            <div data-aos="zoom-in-up" className=" bg-base-100  shadow-md shadow-green-600 hover:shadow-red-600 mx-10">
                <div className=" flex justify-center min-h-[150px]">
                    <figure><img className=" object-cover" src={user?.photoURL} alt="Shoes" /></figure>
                </div>
                <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="card-body">
                    <h2 className="card-title">{user?.displayName}</h2>
                    <p> <span className="font-semibold">Email:</span> {user?.email}</p>
                    <p> <span className="font-semibold">Total Meals Added:</span> {meals.length}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;