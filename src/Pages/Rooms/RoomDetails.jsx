import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUsers from "../../hooks/useUsers";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';



const RoomDetails = () => {
    const user = useAuth();
    const [users] = useUsers();
    const [currentUser, setCurrentUser] = useState({})
    console.log(users);
    const axiosSecure = useAxiosSecure()
    console.log(user);
    const data = useLoaderData();
    useEffect(() => {
        AOS.init({
            duration: 3000
        })
    },[])

    useEffect(() => {
        const filteredUser = users.filter(eachUser => eachUser?.email === user?.email)
        setCurrentUser(filteredUser[0])
        console.log(currentUser);
    }, [currentUser, users, user?.email])

    const handleBooking = (seat) => {
        console.log(seat);
        if(!user){
            Swal.fire({
                title: "Oh!",
                text: "You are not logged in! Please login first.",
                icon: "error"
            });
        }else{
            const newBookingInfo = {
                room_number: data?.room_number,
                seat_no: seat?.seat_no,
                studentsEmail: user?.email
            }
            if (currentUser.Badge !== 'Bronze') {
                axiosSecure.post(`/bookedSeats`, newBookingInfo)
                    .then(res => {
                        console.log('booking successfully', res.data)
                        if (res?.data) {
                            Swal.fire({
                                title: "Good job!",
                                text: "You Booked the room!",
                                icon: "success"
                            });
                            const updateInfo = {
                                students_name: user?.displayName,
                                students_email: user?.email,
                                seat_no: seat?.seat_no
                            }
                            axiosSecure.patch(`/seats/${data?.room_number}`, updateInfo)
                                .then(res => {
                                    console.log(res.data);
                                })
                        }
                    })
            }else{
                Swal.fire({
                    title: "Oh Sorry!",
                    text: "You aren't purchase any package! Please purchase any package first...",
                    icon: "error"
                });
            }
        }
    }
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-semibold text-center my-10 text-white"> <span className="text-primary-300">{data.room_number}</span> No. Room Details </h1>
            <div
            data-aos="zoom-in"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {
                    data?.seats?.map(seat => <div key={seat._id} className="rounded-md bg-base-100 shadow-xl">
                        <figure><img src={seat.img} alt="Shoes" /></figure>
                        <div className="card-body">
                            <div className="min-h-[100px]">
                                <h2 className="card-title">Seat No: {seat.seat_no}</h2>
                                <p className=" my-1"><span className="text-lg font-medium">Status:</span> {seat.status === 'available' ? <span className="text-green-300">{seat.status}</span> : <span className="">{seat.status}</span>}</p>
                                {
                                    seat.status === 'occupied' ? <h2 className=" "> <span className="text-lg font-medium">Students Name:</span> {seat.students_name}</h2> : ' '

                                }
                            </div>
                            <div>
                                {
                                    seat.status === 'occupied' ? <button className="bg-primary-300 px-3 py-2 text-white font-semibold rounded-sm w-full btn" disabled>Booking Now</button> : <button onClick={() => handleBooking(seat)} className="bg-primary-300 px-3 py-2 text-white font-semibold rounded-sm w-full btn">Booking Now</button>
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default RoomDetails;