import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HostelChart from "./HostelChart";
import Pie1Chart from "./Pie1Chart";
import Line1Chart from "./Line1Chart";
import Area1Chart from "./Area1Chart";


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
        <div className="bg-white pb-10 pt-5 mr-10 -ml-20">
            <SectionTitle heading="admin dashboard"></SectionTitle>

            <div className="mt-10 p-5">
                <h1>Hostel Chart</h1>
                <HostelChart></HostelChart>
            </div>
            <div className="flex w-full px-5 my-10">
                <div className="w-1/2">
                    <Pie1Chart></Pie1Chart>
                </div>
                <div className="w-1/2">
                    <Area1Chart></Area1Chart>
                </div>

            </div>
            <div className="px-5">
                <Line1Chart></Line1Chart>
            </div>
            <div data-aos="zoom-in-up" className=" bg-base-100 mb-10 mx-10 mt-20">
                <div className="flex justify-center min-h-[150px] ">
                    <figure><img className="mt-5 object-cover" src={user?.photoURL} alt="user picture" /></figure>
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