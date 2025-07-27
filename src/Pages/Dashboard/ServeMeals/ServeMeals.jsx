import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ServeMeals = () => {
    const user = useAuth();
    // console.log("User", user);
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([]);
    const [searchingUser, setSearchingUser] = useState([]);
    const [search, setSearch] = useState("");
    const { register, handleSubmit } = useForm();
    const [currentPage, setCurrentPage] = useState(0);
    const [paginateServeMeals, setPaginateServeMeals] = useState([])

    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()]

    useEffect(() => {
        AOS.init()
    }, [])

    useEffect(() => {
        axiosSecure.get(`/requestedMeals`)
            .then(res => {
                setMeals(res.data)
            })
    }, [axiosSecure])
    const handleServe = (meal) => {
        if (meal?.status === 'delivered') {
            Swal.fire({
                title: "Oh!",
                text: "Already Served this meal.",
                icon: "error"
            });
        } else {
            const newInfo = {
                status: 'delivered'
            }
            axiosSecure.patch(`/requestedMeals/${meal._id}`, newInfo)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "The meal has been served",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
    }

    const onSubmit = async (data) => {
        const res = await axiosSecure.get(`/requestedMeals/${data.text}`)
        setSearchingUser(res.data);

    }
    useEffect(() => {
        axiosSecure.get(`/requestedMeals?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                setPaginateServeMeals(res.data)
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
    // Filter meals by search (title, userName, userEmail)
    const filteredMeals = (searchingUser.length > 0 ? searchingUser : paginateServeMeals).filter(meal => {
        const s = search.toLowerCase();
        return (
            meal?.title?.toLowerCase().includes(s) ||
            meal?.userName?.toLowerCase().includes(s) ||
            meal?.userEmail?.toLowerCase().includes(s)
        );
    });

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 mt-4">
                <SectionTitle heading="serve meals" />
                {/* Total and Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="text-lg font-semibold text-gray-700">Total Meals: {totalData}</div>
                    <input
                        type="text"
                        placeholder="Search by user, email or meal..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                </div>
                <div data-aos="fade-down" className="flex justify-between items-center mb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-md h-12 rounded-lg shadow-sm overflow-hidden border border-gray-200 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200">
                        <input className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700 placeholder-gray-400" placeholder="Search by user or meal..." {...register('text')} />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 flex items-center transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </form>
                </div>
                <div
                    data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="overflow-x-auto rounded-xl shadow-md border border-gray-100 bg-white">
                    <table className="min-w-full text-sm text-left">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-4 font-semibold">SL.</th>
                                <th className="py-3 px-4 font-semibold">Title</th>
                                <th className="py-3 px-4 font-semibold text-center">Email</th>
                                <th className="py-3 px-4 font-semibold text-center">Name</th>
                                <th className="py-3 px-4 font-semibold text-center">Status</th>
                                <th className="py-3 px-4 font-semibold text-center">Serve</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {
                                filteredMeals?.map((meal, index) => (
                                    <tr key={meal?._id} className="hover:bg-blue-50 transition-colors">
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4 font-medium">{meal?.title}</td>
                                        <td className="py-3 px-4 text-center">{meal?.userEmail}</td>
                                        <td className="py-3 px-4 text-center">{meal?.userName}</td>
                                        <td className={`py-3 px-4 text-center font-semibold ${meal?.status === "pending" ? "text-red-600" : "text-green-500"}`}>{meal?.status}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button onClick={() => handleServe(meal)} className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Serve</button>
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

export default ServeMeals;