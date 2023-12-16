import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ServeMeals = () => {
    const user = useAuth();
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([]);
    const [searchingUser, setSearchingUser] = useState([]);
    const { register, handleSubmit } = useForm();
    const [currentPage, setCurrentPage] = useState(0);
    const [paginateServeMeals, setPaginateServeMeals] = useState([])

    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()]

    console.log(user?.email);

    useEffect(() => {
        AOS.init()
    }, [])

    useEffect(() => {
        axiosSecure.get(`/requestedMeals`)
            .then(res => {
                console.log(res.data);
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
                    console.log(res.data);
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
        console.log('searching user', res.data);
        setSearchingUser(res.data);

    }
    useEffect(() => {
        console.log(currentPage, itemPerPage);
        axiosSecure.get(`/requestedMeals?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                console.log(res.data);
                setPaginateServeMeals(res.data)
            })
    }, [axiosSecure, currentPage, itemPerPage])

    const handleCurrentPage = (page) => {
        console.log(page);
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
    return (
        <div className="md:p-8">
            <SectionTitle heading='serve meals'></SectionTitle>
            <div data-aos="fade-down" className="input-group flex justify-start mb-3">
                <form onSubmit={handleSubmit(onSubmit)} className="flex h-[40px] justify-center items-center">
                    <input className='w-full h-full my-3 px-3 py-3' placeholder='Search...' {...register('text')} />
                    <button type="submit" className="bg-white text-black h-full px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>

            </div>
            <div
                data-aos="zoom-in"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="overflow-x-auto lg:min-h-[600px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#6C0A0F] text-white">
                            <th>SL.</th>
                            <th>Title</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Button</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                            searchingUser.length > 0 ? searchingUser?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td className="text-center">{meal?.userEmail}</td>
                                <td className="text-center">{meal?.userName}</td>
                                <td className="text-center cursor-pointer">{meal?.status}</td>
                                <td onClick={() => handleServe(meal)} className="text-center cursor-pointer">Serve</td>
                            </tr>) : paginateServeMeals?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td className="text-center">{meal?.userEmail}</td>
                                <td className="text-center">{meal?.userName}</td>
                                <td className="text-center cursor-pointer">{meal?.status}</td>
                                <td onClick={() => handleServe(meal)} className="text-center cursor-pointer">Serve</td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
            <div className="pagination ">
                <button onClick={handlePrevPage}>Prev</button>
                {
                    pages.map((page, index) => <button
                        onClick={() => handleCurrentPage(page)}
                        className={currentPage === page ? 'selected' : ''}
                        key={page}>{index + 1}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default ServeMeals;