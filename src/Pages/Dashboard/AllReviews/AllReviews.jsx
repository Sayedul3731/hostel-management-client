import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMeals from "../../../hooks/useMeals";


const AllReviews = () => {
    const [, refetch] = useMeals();
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [paginateReviews, setPaginateReviews] = useState([])

    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()];

    useEffect(() => {
        AOS.init()
    }, [])

    useEffect(() => {
        axiosSecure.get(`/reviews`)
            .then(res => {
                setMeals(res.data)
            })
    }, [axiosSecure])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "The reviews has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    })
            }
        });
    }
    useEffect(() => {
        axiosSecure.get(`/reviews?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                setPaginateReviews(res.data)
            })
    }, [axiosSecure, currentPage, itemPerPage])

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

    // Filter reviews by search
    const filteredReviews = paginateReviews.filter(meal =>
        meal?.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 mt-4">
                <SectionTitle heading="all reviews" />
                {/* Total and Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="text-lg font-semibold text-gray-700">Total Reviews: {totalData}</div>
                    <input
                        type="text"
                        placeholder="Search by title..."
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
                                <th className="py-3 px-4 font-semibold text-center">Delete</th>
                                <th className="py-3 px-4 font-semibold text-center">View</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {
                                filteredReviews?.map((meal, index) => (
                                    <tr key={meal?._id} className="hover:bg-blue-50 transition-colors">
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4 font-medium">{meal?.title}</td>
                                        <td className="py-3 px-4 text-center">{meal?.like}</td>
                                        <td className="py-3 px-4 text-center">{meal?.reviews}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button onClick={() => handleDelete(meal?._id)} className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Delete</button>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <Link to={`/reviews/${meal._id}`} className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">View Meal</Link>
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

export default AllReviews;