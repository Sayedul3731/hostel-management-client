import { useLoaderData } from "react-router-dom";



const RoomDetails = () => {
        const data = useLoaderData();
        console.log(data);
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center my-10">Room Details of {data.room_number}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    data?.seats?.map(seat => <div key={seat._id} className="card bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Seat No: {seat.seat_no}</h2>
                            <h2 className="card-title">Status: {seat.status}</h2>
                            {
                                seat.status === 'occupied' ? <p className="font-semibold"> Students Name: {seat.students_name}</p> : ' '
                              
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default RoomDetails;