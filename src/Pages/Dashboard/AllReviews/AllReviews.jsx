import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMeals from "../../../hooks/useMeals";
import AOS from 'aos';
import 'aos/dist/aos.css';


const AllReviews = () => {
    const [, refetch] = useMeals();
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([]);

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
                console.log(res.data);
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
                        console.log(res.data);
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
        console.log(currentPage, itemPerPage);
        axiosSecure.get(`/reviews?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                console.log(res.data);
                setPaginateReviews(res.data)
            })
    }, [axiosSecure, currentPage, itemPerPage])

    const handleCurrentPage = (page) => {
        console.log(page);
        setCurrentPage(page)
    }
    console.log(currentPage);
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
            <SectionTitle heading='all reviews'></SectionTitle>
            <div

                data-aos="zoom-in"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="overflow-x-auto lg:min-h-[600px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-green-500 text-black">
                            <th>SL.</th>
                            <th>Title</th>
                            <th className="text-center">Likes</th>
                            <th className="text-center">Reviews</th>
                            <th className="text-center">Button</th>
                            <th className="text-center">Button</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                            paginateReviews?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td className="text-center">{meal?.like}</td>
                                <td className="text-center">{meal?.reviews}</td>
                                <td onClick={() => handleDelete(meal?._id)} className="text-center cursor-pointer">Delete</td>
                                <Link to={`/reviews/${meal?._id}`}><td className="text-center">View Meal</td></Link>
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

export default AllReviews;