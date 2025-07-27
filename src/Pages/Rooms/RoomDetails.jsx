import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsers from "../../hooks/useUsers";



const RoomDetails = () => {
    const user = useAuth();
    const [users] = useUsers();
    const [currentUser, setCurrentUser] = useState({})
    const axiosSecure = useAxiosSecure()
    const data = useLoaderData();
    useEffect(() => {
        AOS.init({
            duration: 3000
        })
    }, [])

    useEffect(() => {
        const filteredUser = users.filter(eachUser => eachUser?.email === user?.email)
        setCurrentUser(filteredUser[0])
    }, [currentUser, users, user?.email])

    const handleBooking = (seat) => {
        if (!user) {
            Swal.fire({
                title: "Oh!",
                text: "You are not logged in! Please login first.",
                icon: "error"
            });
            return;
        } else {
            Swal.fire({
                title: "Oh Sorry!",
                text: "You aren't purchase any package! Please purchase any package first...",
                icon: "error"
            });
        }
    };
    return (
        <div className="max-w-7xl mx-auto min-h-screen  py-6 px-2">
            <h1 className="text-2xl md:text-4xl font-bold text-center my-10 text-gray-800 drop-shadow-lg">
                Room <span className="text-primary-300">#{data.room_number}</span> Details
            </h1>
            <div
                data-aos="zoom-in"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {data?.seats?.map(seat => (
                    <div
                        key={seat._id}
                        className="glassmorphism-card animate-fadeIn rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-100 hover:scale-[1.03] transition-transform duration-300 bg-white/70 backdrop-blur-md"
                    >
                        <figure className="h-44 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img src={seat.img} alt="Seat" className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
                        </figure>
                        <div className="flex flex-col flex-1 p-6 gap-2">
                            <div className="flex flex-col gap-1 mb-2">
                                <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <span className="text-gray-500 font-medium">Seat</span>
                                    <span className="text-primary-300 text-2xl">#{seat.seat_no}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500">Status:</span>
                                    {seat.status === 'available' ? (
                                        <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-semibold border border-green-200">Available</span>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 text-xs font-semibold border border-red-200 capitalize">Occupied</span>
                                    )}
                                </div>
                                {seat.status === 'occupied' && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">Student Name:</span>
                                        <span className="text-base font-semibold text-gray-700">{seat.students_name}</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                {seat.status === 'occupied' ? (
                                    <button
                                        className="w-full py-2 rounded-lg font-bold bg-gray-100 text-gray-400 cursor-not-allowed shadow border border-gray-200"
                                        disabled
                                    >
                                        Booked
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBooking(seat)}
                                        className="w-full py-2 rounded-lg font-bold bg-gradient-to-r from-primary-300 to-orange-400 text-white shadow-lg hover:from-orange-400 hover:to-primary-300 transition-colors duration-200"
                                    >
                                        Booking Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    // Add fade-in animation and glassmorphism for cards
    // Add to your global CSS (e.g., index.css) if not already present:
    // @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none;} }
    // .animate-fadeIn { animation: fadeIn 0.8s both; }
    // .glassmorphism-card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(8px) saturate(1.2); border: 1.5px solid rgba(255,255,255,0.08); }
};

export default RoomDetails;