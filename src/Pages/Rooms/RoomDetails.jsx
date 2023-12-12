import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";



const RoomDetails = () => {
    const user = useAuth();
    const axiosSecure = useAxiosSecure()
    console.log(user);
    const data = useLoaderData();
    console.log(data);
    const handleBooking = (seat) => {
        console.log(seat);
        const newBookingInfo = {
            room_number: data?.room_number,
            seat_no : seat?.seat_no,
            studentsEmail: user?.email
        }
        axiosSecure.post(`/bookedSeats`, newBookingInfo)
        .then(res => {
            console.log('booking successfully',res.data)
            if(res?.data){
                Swal.fire({
                    title: "Good job!",
                    text: "You Booked the room!",
                    icon: "success"
                  });
                const updateInfo ={
                    students_name: user?.displayName,
                    students_email: user?.email,
                    seat_no: seat?.seat_no
                }
                axiosSecure.patch(`/seats/${data?.room_number}`,updateInfo)
                .then(res => {
                    console.log(res.data);
                })
            }
        })
    }
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center my-10">Room Details of {data.room_number}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    data?.seats?.map(seat => <div key={seat._id} className="card bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <div className="min-h-[100px]">
                                <h2 className="card-title">Seat No: {seat.seat_no}</h2>
                                <h2 className="card-title">Status: {seat.status}</h2>
                                {
                                    seat.status === 'occupied' ? <p className="font-semibold"> Students Name: {seat.students_name}</p> : ' '

                                }
                            </div>
                            <div>
                               {
                                seat.status === 'occupied' ?  <button className="bg-red-600 px-3 py-2 text-white font-semibold rounded-sm w-full btn" disabled>Booking Now</button> :  <button onClick={() => handleBooking(seat)} className="bg-red-600 px-3 py-2 text-white font-semibold rounded-sm w-full btn">Booking Now</button>
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