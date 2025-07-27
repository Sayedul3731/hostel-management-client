import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUpcomingMeals from "../../../hooks/useUpcomingMeals";

// Loader Component
const Loader = () => (
    <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-400"></div>
    </div>
);



const UpcomingMeals = () => {
    const [meals, refetch] = useUpcomingMeals();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [paginateUpcomingMeals, setPaginateUpcomingMeals] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()];

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        if (paginateUpcomingMeals && Array.isArray(paginateUpcomingMeals)) {
            setLoading(false);
        }
    }, [paginateUpcomingMeals]);

    const handlePublish = (meal) => {
        if (meal.like >= 10) {
            axiosSecure.post('/meals', meal)
                .then(res => {
                    if (res.data) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "The meal has been saved in meal collection.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        axiosSecure.delete(`/upcomingMeals/${meal._id}`)
                            .then(res => {
                                console.log(res.data);
                                refetch()
                            })
                    }

                })
        }
    }

    useEffect(() => {
        setLoading(true);
        axiosSecure.get(`/upcomingMeals?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                setPaginateUpcomingMeals(res.data);
            })
            .finally(() => setLoading(false));
    }, [axiosSecure, currentPage, itemPerPage]);

    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPage - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Filter upcoming meals by search (title, adminName, adminEmail)
    const filteredMeals = paginateUpcomingMeals.filter(meal => {
        const s = search.toLowerCase();
        return (
            meal?.title?.toLowerCase().includes(s) ||
            meal?.adminName?.toLowerCase().includes(s) ||
            meal?.adminEmail?.toLowerCase().includes(s)
        );
    });

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 mt-4">
                <SectionTitle heading="upcoming meals" />
                {/* Total and Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="text-lg font-semibold text-gray-700">Total Upcoming Meals: {totalData}</div>
                    <input
                        type="text"
                        placeholder="Search by title, admin name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                </div>
                <div
                    data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="overflow-x-auto rounded-xl shadow-md border border-gray-100 bg-white mt-6">
                    <table className="min-w-full text-sm text-left">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-4 font-semibold">SL.</th>
                                <th className="py-3 px-4 font-semibold">Title</th>
                                <th className="py-3 px-4 font-semibold text-center">Likes</th>
                                <th className="py-3 px-4 font-semibold text-center">Reviews</th>
                                <th className="py-3 px-4 font-semibold text-center">Admin Name</th>
                                <th className="py-3 px-4 font-semibold text-center">Admin Email</th>
                                <th className="py-3 px-4 font-semibold text-center">Publish</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {
                                filteredMeals?.map((meal, index) => (
                                    <tr key={meal?._id} className="hover:bg-blue-50 transition-colors">
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4 font-medium">{meal?.title}</td>
                                        <td className="py-3 px-4 text-center">{meal?.like}</td>
                                        <td className="py-3 px-4 text-center">{meal?.reviews}</td>
                                        <td className="py-3 px-4 text-center">{meal?.adminName}</td>
                                        <td className="py-3 px-4 text-center">{meal?.adminEmail}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button onClick={() => handlePublish(meal)} className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Publish</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center gap-2 mt-8 select-none">
                    <button onClick={handlePrevPage} className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-blue-100 text-gray-700 font-medium transition-colors duration-200 shadow-sm">Prev</button>
                    {
                        pages.map((page, index) => (
                            <button
                                onClick={() => handleCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg border border-gray-200 font-medium shadow-sm transition-colors duration-200 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 text-gray-700'}`}
                                key={page}>{index + 1}</button>
                        ))
                    }
                    <button onClick={handleNextPage} className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-blue-100 text-gray-700 font-medium transition-colors duration-200 shadow-sm">Next</button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingMeals;