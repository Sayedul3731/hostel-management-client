import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMeals from "../../../hooks/useMeals";
import "./pagination.css";


const AllMeals = () => {
    const [meals, refetch] = useMeals();
    const [identifiedMeal, setIdentifiedMeal] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState("");
    const { title, category, price, image, like, rating, reviews, adminEmail, adminName, Ingredients, Description, _id } = identifiedMeal;
    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()];
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        AOS.init({
            duration: 2000
        })
    }, [])
    const dataLoad = (id) => {
        const clickableMeal = meals.filter(meal => meal._id === id)
        setIdentifiedMeal(clickableMeal[0])
    }
    const handleUpdate = (id) => {
        if (id) {
            document.getElementById('update_modal').showModal()
            dataLoad(id)
        }
    };

    const onSubmit = async (data) => {
        await axiosSecure.patch(`/meals/${_id}`, data)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Meal Updated Successfully.",
                        icon: "success"
                    });
                    reset();
                    refetch();
                }
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/meals/${id}`)
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "The meal has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                        }
                    })
            }
        });


    }

    useEffect(() => {
        axiosSecure.get(`/meals?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                setFoods(res.data)
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
    // Filter foods by search
    const filteredFoods = foods.filter(meal =>
        meal?.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 mt-4">
                <SectionTitle heading="all meals" />
                {/* Total and Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="text-lg font-semibold text-gray-700">Total Meals: {totalData}</div>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                </div>
                <div data-aos="fade-left"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="overflow-x-auto rounded-xl shadow-md border border-gray-100 bg-white mt-6">
                    <table className="min-w-full text-sm text-left">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-4 font-semibold">SL.</th>
                                <th className="py-3 px-4 font-semibold">Title</th>
                                <th className="py-3 px-4 font-semibold">Likes</th>
                                <th className="py-3 px-4 font-semibold text-center">Reviews</th>
                                <th className="py-3 px-4 font-semibold text-center">Admin Name</th>
                                <th className="py-3 px-4 font-semibold text-center">Admin Email</th>
                                <th className="py-3 px-4 font-semibold text-center">Update</th>
                                <th className="py-3 px-4 font-semibold text-center">Delete</th>
                                <th className="py-3 px-4 font-semibold text-center">View</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {
                                filteredFoods?.map((meal, index) => (
                                    <tr key={meal?._id} className="hover:bg-blue-50 transition-colors">
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4 font-medium">{meal?.title}</td>
                                        <td className="py-3 px-4">{meal?.like}</td>
                                        <td className="py-3 px-4 text-center">{meal?.reviews}</td>
                                        <td className="py-3 px-4 text-center">{meal?.adminName}</td>
                                        <td className="py-3 px-4 text-center">{meal?.adminEmail}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button onClick={() => handleUpdate(meal._id)} className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Update</button>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button onClick={() => handleDelete(meal._id)} className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">Delete</button>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <Link to={`/meal/${meal._id}`} className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold text-xs px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">View Meal</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {/* Modal for update */}
                <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-white rounded-xl shadow-lg p-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Title</label>
                                    <select value={title} className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none" {...register("title")}>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Category</label>
                                    <input defaultValue={category} type='text' className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Category' {...register('category', { required: true })} />
                                    {errors.category && <span className="text-red-500 text-xs absolute mt-1">Category is required</span>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Meal Image URL</label>
                                    <input defaultValue={image} className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Meal imageURL' {...register('image', { required: true })} />
                                    {errors.image && <span className="text-red-500 text-xs absolute mt-1">Image URL is required</span>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Ingredients</label>
                                    <input defaultValue={Ingredients} className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Ingredients' {...register('Ingredients', { required: true })} />
                                    {errors.Ingredients && <span className="text-red-500 text-xs absolute mt-1">Ingredients are required</span>}
                                </div>
                                <div className="relative md:col-span-2">
                                    <label className="block text-gray-700 font-semibold mb-1">Description</label>
                                    <input defaultValue={Description} className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Description' {...register('Description', { required: true })} />
                                    {errors.Description && <span className="text-red-500 text-xs absolute mt-1">Description is required</span>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Price</label>
                                    <input defaultValue={price} type="number" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Price' {...register('price', { required: true, min: 0 })} />
                                    {errors.price?.type === 'min' && <span className='text-red-500 text-xs absolute mt-1'>Price must be at least 0</span>}
                                    {errors.price?.type === 'required' && <span className='text-red-500 text-xs absolute mt-1'>Price is required</span>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Rating</label>
                                    <input defaultValue={rating} type="number" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Rating' {...register('rating', { required: true, min: 0, max: 5 })} />
                                    {errors.rating?.type === 'min' && <span className='text-red-500 text-xs absolute mt-1'>Rating must be at least 0</span>}
                                    {errors.rating?.type === 'max' && <span className='text-red-500 text-xs absolute mt-1'>Rating must be up to 5</span>}
                                    {errors.rating?.type === 'required' && <span className='text-red-500 text-xs absolute mt-1'>Rating is required</span>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Posting Date</label>
                                    <input type="date" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Posting Time' {...register('time', { required: true })} />
                                    {errors.time && <span className='text-red-500 text-xs absolute mt-1'>Date is required</span>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Likes</label>
                                    <input defaultValue={like} type="number" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Likes' {...register('like', { required: true, min: 0 })} />
                                    {errors.like?.type === 'min' && <span className='text-red-500 text-xs absolute mt-1'>Likes must be at least 0</span>}
                                    {errors.like?.type === 'required' && <span className='text-red-500 text-xs absolute mt-1'>Likes is required</span>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Reviews</label>
                                    <input defaultValue={reviews} type="number" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Reviews' {...register('reviews', { required: true, min: 0 })} />
                                    {errors.reviews?.type === 'min' && <span className='text-red-500 text-xs absolute mt-1'>Reviews must be at least 0</span>}
                                    {errors.reviews?.type === 'required' && <span className='text-red-500 text-xs absolute mt-1'>Reviews is required</span>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Admin Name</label>
                                    <input defaultValue={adminName} className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-100' placeholder='Admin Name' {...register('adminName', { required: true })} readOnly />
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-1">Admin Email</label>
                                    <input defaultValue={adminEmail} className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-100' placeholder='Admin Email' {...register('adminEmail', { required: true })} readOnly />
                                </div>
                            </div>
                            <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 mt-4'>
                                Update
                            </button>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog>
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

export default AllMeals;