import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useRooms from "../../hooks/useRooms";


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
        <div className="min-h-screen bg-gradient-to-br from-secondary-100 via-primary-50 to-secondary-200 py-8 px-2 lg:px-20 relative overflow-x-hidden">
            {/* Soft background pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-30 z-0" style={{ background: 'radial-gradient(circle at 20% 40%, #fbbf24 0%, transparent 60%), radial-gradient(circle at 80% 60%, #38bdf8 0%, transparent 60%)' }}></div>
            <div className="relative z-10">
                <SectionTitle heading="All rooms" />
                <div className="w-24 h-1 bg-primary-300 rounded-full mx-auto mb-8 opacity-60"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                    {rooms?.map(room => (
                        <div
                            data-aos="fade-up"
                            key={room.room_number}
                            className="card glassmorphism-card shadow-2xl text-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:border-gradient hover:shadow-primary-200/60 hover:shadow-2xl border border-primary-100 animate-fadeIn group"
                            style={{ animationDelay: `${room.room_number * 80}ms` }}
                        >
                            <figure className="relative">
                                <img src={room.img} className="h-[220px] w-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary-200/40 shadow-lg" alt="Room" />
                                <span className="absolute top-3 left-3 bg-primary-300 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Room {room.room_number}</span>
                            </figure>
                            <div className="card-body flex flex-col gap-2">
                                <h2 className="font-bold text-lg text-primary-300 drop-shadow">Total Seats: <span className="text-white drop-shadow">{room.total_seat}</span></h2>
                                <p className="text-gray-100 text-sm flex-1 drop-shadow-sm">{room.description}</p>
                                <div className="mt-3">
                                    <Link to={`/roomDetails/${room.room_number}`}
                                        title={`View details for Room ${room.room_number}`}
                                    >
                                        <button className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-primary-300 to-primary-200 hover:from-primary-200 hover:to-primary-300 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 active:scale-95 group-hover:shadow-xl group-hover:-translate-y-1" aria-label={`Details for Room ${room.room_number}`}>Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    // Add fade-in animation and glassmorphism for cards
    // Add to your global CSS (e.g., index.css) if not already present:
    // @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none;} }
    // .animate-fadeIn { animation: fadeIn 0.8s both; }
    // .glassmorphism-card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(8px) saturate(1.2); border: 1.5px solid rgba(255,255,255,0.08); }
    // .hover\:border-gradient:hover { border-image: linear-gradient(90deg, #fbbf24, #38bdf8) 1; border-width: 2px; }
}

export default Rooms;