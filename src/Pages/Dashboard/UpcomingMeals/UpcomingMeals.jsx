import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUpcomingMeals from "../../../hooks/useUpcomingMeals";
import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';



const UpcomingMeals = () => {
    const [meals, refetch] = useUpcomingMeals();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [paginateUpcomingMeals, setPaginateUpcomingMeals] = useState([])

    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()];

    useEffect(() => {
        AOS.init()
    }, [])

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
        axiosSecure.get(`/upcomingMeals?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                setPaginateUpcomingMeals(res.data)
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

    return (
        <div className="md:p-8">
            <SectionTitle heading='upcoming meals'></SectionTitle>
            <div
                data-aos="zoom-in"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="overflow-x-auto lg:min-h-[600px]
                ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-primary-100  ">
                            <th>SL.</th>
                            <th>Title</th>
                            <th className="text-center">Likes</th>
                            <th className="text-center">Reviews</th>
                            <th className="text-center">Admin Name</th>
                            <th className="text-center">Admin Email</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                            paginateUpcomingMeals?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td className="text-center">{meal?.like}</td>
                                <td className="text-center">
                                    {meal?.reviews}
                                </td>
                                <td className="text-center">{meal?.adminName}</td>
                                <td className="text-center">{meal?.adminEmail}</td>
                                <td onClick={() => handlePublish(meal)} className="text-center cursor-pointer">publish</td>
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

export default UpcomingMeals;