import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useRooms from "../../hooks/useRooms";


const Rooms = () => {
    // const [rooms, setRooms] = useState([])
    const [rooms] = useRooms();
    console.log(rooms);
    
    return (
        <div>
            <SectionTitle heading="All rooms"></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    rooms?.map(room => <div key={room.room_number} className="card bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Room No: {room.room_number}</h2>
                            <h2 className="card-title">Total Seat: {room.total_seat}</h2>
                            <p>{room.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Details</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Rooms;