import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useRooms from "../../hooks/useRooms";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const Rooms = () => {
    const [rooms] = useRooms();
    useEffect(() => {
        AOS.init({
            duration: 3000
        })
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <div className=" bg-secondary-100 py-5 lg:px-20">
            <SectionTitle heading="All rooms"></SectionTitle>
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {
                    rooms?.map(room => <div
                        data-aos="flip-left"
                        key={room.room_number} className="card bg-base-100 shadow-xl text-white">
                        <figure><img src={room.img} className="h-[250px] w-full" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Room No: {room.room_number}</h2>
                            <h2 className="font-semibold"> <span className="text-lg">Total Seat:</span> {room.total_seat}</h2>
                            <p>{room.description}</p>
                            <div>
                                <Link to={`/roomDetails/${room.room_number}`}>
                                    <button className=" w-full py-1 font-semibold text-white bg-primary-300  ">Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Rooms;