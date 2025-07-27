import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsers from "../../../hooks/useUsers";


const ManageUsers = () => {

    const [users, refetch] = useUsers();
    const [searchingUser, setSearchingUser] = useState([])
    const [searchActive, setSearchActive] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, setValue, watch } = useForm();
    const searchInput = watch('text', '');
    const debounceRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [paginateUsers, setPaginateUsers] = useState([])
    const totalData = users.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()]

    useEffect(() => {
        AOS.init({
            duration: 2000
        })
    }, [])

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is An Admin Now!`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }
    // Debounced instant search
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!searchInput || searchInput.trim() === "") {
            setSearchingUser([]);
            setSearchActive(false);
            return;
        }
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await axiosSecure.get(`/users/search?query=${encodeURIComponent(searchInput)}`);
                setSearchingUser(res.data || []);
                setSearchActive(true);
            } catch (err) {
                setSearchingUser([]);
                setSearchActive(false);
            }
        }, 400);
        return () => clearTimeout(debounceRef.current);
    }, [searchInput, axiosSecure]);

    const handleClearSearch = () => {
        setSearchingUser([]);
        setSearchActive(false);
        setValue('text', '');
    };
    useEffect(() => {
        axiosSecure.get(`/users?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                setPaginateUsers(res.data)
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
    // Delete/archive user handler
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to delete ${user.name}. This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data?.deletedCount > 0) {
                            refetch();
                            Swal.fire('Deleted!', `${user.name} has been deleted.`, 'success');
                        }
                    })
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 py-6 px-2">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 mt-4">
                <SectionTitle heading="manage users" />
                <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="text-lg font-semibold text-blue-700 mb-2 md:mb-0">Total Users: {totalData}</div>
                    <div data-aos="fade-down" className="flex justify-between items-center gap-2">
                        <form className="flex w-full max-w-md h-12 rounded-lg shadow-sm overflow-hidden border border-gray-200 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200" onSubmit={e => e.preventDefault()}>
                            <input className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700 placeholder-gray-400" placeholder="Search users by name or email..." {...register('text')} autoComplete="off" />
                            <span className="bg-blue-500 text-white px-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                        </form>
                        {searchActive && (
                            <button onClick={handleClearSearch} className="ml-2 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold transition-colors duration-200">Clear</button>
                        )}
                    </div>
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
                                <th className="py-3 px-4 font-semibold">Name</th>
                                <th className="py-3 px-4 font-semibold">Email</th>
                                <th className="py-3 px-4 font-semibold text-center">Action</th>
                                <th className="py-3 px-4 font-semibold text-center">Membership</th>
                                <th className="py-3 px-4 font-semibold text-center">Delete/Archive</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {
                                searchActive
                                    ? (searchingUser.length > 0
                                        ? searchingUser.map((user, index) => (
                                            <tr key={user?._id} className="hover:bg-blue-50 transition-colors">
                                                <td className="py-3 px-4">{index + 1}</td>
                                                <td className="py-3 px-4 font-medium">{user?.name}</td>
                                                <td className="py-3 px-4">{user?.email}</td>
                                                <td className="py-3 px-4 text-center">
                                                    {user?.role === 'Admin' ? (
                                                        <span className="bg-green-100 text-green-700 font-semibold px-5 py-1 rounded-lg text-xs shadow-sm">Admin</span>
                                                    ) : (
                                                        <button onClick={() => handleMakeAdmin(user)} className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Make Admin</button>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${user?.Badge === 'Gold' ? 'bg-yellow-100 text-yellow-700' : user?.Badge === 'Silver' ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-700'}`}>{user?.Badge}</span>
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <button onClick={() => handleDeleteUser(user)} className="bg-gray-100 hover:bg-red-200 text-red-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr><td colSpan="6" className="text-center py-4 text-gray-400">No users found.</td></tr>
                                    )
                                    : paginateUsers?.map((user, index) => (
                                        <tr key={user?._id} className="hover:bg-blue-50 transition-colors">
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4 font-medium">{user?.name}</td>
                                            <td className="py-3 px-4">{user?.email}</td>
                                            <td className="py-3 px-4 text-center">
                                                {user?.role === 'Admin' ? (
                                                    <span className="bg-green-100 text-green-700 font-semibold px-5 py-1 rounded-lg text-xs shadow-sm">Admin</span>
                                                ) : (
                                                    <button onClick={() => handleMakeAdmin(user)} className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Make Admin</button>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${user?.Badge === 'Gold' ? 'bg-yellow-100 text-yellow-700' : user?.Badge === 'Silver' ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-700'}`}>{user?.Badge}</span>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button onClick={() => handleDeleteUser(user)} className="bg-gray-100 hover:bg-red-200 text-red-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
                {!searchActive && (
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
                )}
            </div>
        </div>
    );
};

export default ManageUsers;