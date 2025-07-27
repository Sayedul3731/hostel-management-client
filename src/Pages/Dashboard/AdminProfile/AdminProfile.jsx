import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Area1Chart from "./Area1Chart";
import HostelChart from "./HostelChart";
import Line1Chart from "./Line1Chart";
import Pie1Chart from "./Pie1Chart";


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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-10 pt-5 px-2 md:px-10">
            <div className="max-w-6xl mx-auto">
                <SectionTitle heading="Admin Dashboard" />

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
                        <h1 className="text-lg font-semibold text-blue-700 mb-4 tracking-wide">Hostel Chart</h1>
                        <HostelChart />
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
                            <Pie1Chart />
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
                            <Area1Chart />
                        </div>
                    </div>
                </div>

                {/* Line Chart Section */}
                <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
                    <Line1Chart />
                </div>

                {/* Profile Card */}
                <div data-aos="zoom-in-up" className="flex justify-center mt-16">
                    <div className="w-full max-w-md bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl border border-blue-100 p-8 flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <figure className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-blue-200 bg-white mb-4">
                                <img className="object-cover w-full h-full" src={user?.photoURL} alt="user picture" />
                            </figure>
                            <h2 className="text-2xl font-bold text-blue-800 mb-1">{user?.displayName}</h2>
                            <p className="text-gray-600 mb-2"><span className="font-semibold text-blue-700">Email:</span> {user?.email}</p>
                            <p className="text-gray-600"><span className="font-semibold text-blue-700">Total Meals Added:</span> {meals.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;