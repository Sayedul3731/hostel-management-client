/* eslint-disable react/no-unescaped-entities */
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";


const MyReviews = () => {
    const user = useAuth();
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([]);
    const { control, handleSubmit, setValue } = useForm();
    const [updateMeal, setUpdateMeal] = useState({})

    const [currentPage, setCurrentPage] = useState(0);
    const [paginateReviewsMeals, setPaginateReviewsMeals] = useState([]);
    const [userReview, setUserReview] = useState({})

    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()]
    useEffect(() => {
        axiosSecure.get(`/reviews/${user?.email}`)
            .then(res => {
                setMeals(res.data)
            })
    }, [axiosSecure, user?.email])

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

    React.useEffect(() => {
        setValue('reviews', userReview.review);
    }, [setValue, userReview]);

    const handleUpdate = (meal) => {
        // const newInfo = {
        //     review: meal?.review
        // }
        setUpdateMeal(meal)
        document.getElementById('update_modal').showModal()

        axiosSecure.get(`/reviews/review/${meal?._id}`)
            .then(res => {
                setUserReview(res.data)
            });
    }

    const onSubmit = async (data) => {
        const newReview = {
            review: data.reviews
        }
        await axiosSecure.patch(`/reviews/review/${updateMeal?._id}`, newReview)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Your Review Updated Successfully.",
                        icon: "success"
                    });
                }
            })
    }


    useEffect(() => {
        axiosSecure.get(`/reviews/${user?.email}?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                setPaginateReviewsMeals(res.data)
            })
    }, [axiosSecure, currentPage, itemPerPage, user.email])

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
        <>
            {
                paginateReviewsMeals?.length > 0 ? <>
                    <div className="md:p-8">
                        <SectionTitle heading='my reviews'></SectionTitle>
                        <div className="overflow-x-auto lg:min-h-[600px]">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="bg-primary-100 text-white ">
                                        <th>SL.</th>
                                        <th>Title</th>
                                        <th>Likes</th>
                                        <th className="text-center">Reviews</th>
                                        <th className="text-center">Button</th>
                                        <th className="text-center">Button</th>
                                        <th className="text-center">Button</th>
                                        <th className="text-center">Button</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-100 text-black">
                                    {
                                        paginateReviewsMeals?.map((meal, index) => <tr key={meal?._id}>
                                            <th>{index + 1}</th>
                                            <td>{meal?.title}</td>
                                            <td className="text-center">{meal?.like}</td>
                                            <td className="text-center">{meal?.reviews}</td>
                                            <td className="text-center cursor-pointer">Edit</td>
                                            <td onClick={() => handleUpdate(meal)} className="text-center cursor-pointer">Update</td>
                                            <td onClick={() => handleDelete(meal?._id)} className="text-center cursor-pointer">Delete</td>
                                            <Link to={`/reviews/${meal._id}`}> <td className="text-center">View Meal</td></Link>
                                        </tr>)
                                    }
                                </tbody>

                            </table>
                        </div>
                        <div className="pagination">
                            <button onClick={handlePrevPage}>Prev</button>
                            {
                                pages.map((page, index) => <button
                                    onClick={() => handleCurrentPage(page)}
                                    className={currentPage === page ? 'selected' : ''}
                                    key={page}>{index + 1}</button>)
                            }
                            <button onClick={handleNextPage}>Next</button>
                        </div>

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="">
                                        <Controller
                                            name="reviews"
                                            control={control}
                                            render={({ field }) => <textarea {...field} style={{ width: "100%", minHeight: 100, padding: 5, backgroundColor: '#EFF3F7' }} />}
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-red-500 py-2   font-semibold rounded-sm">Update Review</button>
                                </form>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">✕</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </> : <div className="flex justify-center items-center min-h-[400px]">
                    <p className="text-xl font-semibold text-red-500">You didn't reviews for any meal!</p>
                </div>
            }
        </>
    );
};

export default MyReviews;