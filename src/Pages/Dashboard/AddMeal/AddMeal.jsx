import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddMeal = () => {
    const axiosSecure = useAxiosSecure();
    const user = useAuth();

    useEffect(() => {
        AOS.init()
    }, [])
    const { register, handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        await axiosSecure.post('/meals', data)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Meal Added Successfully.",
                        icon: "success"
                    });
                    // reset()
                }
            })

    }
    const handleUpcomingMeal = async (data) => {

        await axiosSecure.post('/upcomingMeals', data)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Upcoming Meal Added Successfully.",
                        icon: "success"
                    });
                    reset()
                }
            })

    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 mt-4">
                <SectionTitle heading="add meal" />
                <form
                    data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 mt-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Title</label>
                            <select className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none" {...register("title")}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Category</label>
                            <input type='text' className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Category' {...register('category', { required: true })} />
                            {errors.category && <span className="text-red-500 text-xs absolute mt-1">Category is required</span>}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Meal Image URL</label>
                            <input className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Meal imageURL' {...register('image', { required: true })} />
                            {errors.image && <span className="text-red-500 text-xs absolute mt-1">Image URL is required</span>}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Ingredients</label>
                            <input className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Ingredients' {...register('Ingredients', { required: true })} />
                            {errors.Ingredients && <span className="text-red-500 text-xs absolute mt-1">Ingredients are required</span>}
                        </div>
                        <div className="relative md:col-span-2">
                            <label className="block text-gray-700 font-semibold mb-1">Description</label>
                            <input className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Description' {...register('Description', { required: true })} />
                            {errors.Description && <span className="text-red-500 text-xs absolute mt-1">Description is required</span>}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Price</label>
                            <input type="number" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Price' {...register('price', { required: true, min: 0 })} />
                            {errors.price?.type === 'min' && <span className='text-red-500 text-xs absolute mt-1'>Price must be at least 0</span>}
                            {errors.price?.type === 'required' && <span className='text-red-500 text-xs absolute mt-1'>Price is required</span>}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Rating</label>
                            <input type="number" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Rating' {...register('rating', { required: true, min: 0, max: 5 })} />
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
                            <input type="number" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Likes' {...register('like', { required: true, min: 0 })} />
                            {errors.like?.type === 'min' && <span className='text-red-500 text-xs absolute mt-1'>Likes must be at least 0</span>}
                            {errors.like?.type === 'required' && <span className='text-red-500 text-xs absolute mt-1'>Likes is required</span>}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Reviews</label>
                            <input type="number" className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none' placeholder='Reviews' {...register('reviews', { required: true, min: 0 })} />
                            {errors.reviews?.type === 'min' && <span className='text-red-500 text-xs absolute mt-1'>Reviews must be at least 0</span>}
                            {errors.reviews?.type === 'required' && <span className='text-red-500 text-xs absolute mt-1'>Reviews is required</span>}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Admin Name</label>
                            <input value={user?.displayName} className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-100' placeholder='Admin Name' {...register('adminName', { required: true })} readOnly />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-1">Admin Email</label>
                            <input value={user?.email} className='w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-100' placeholder='Admin Email' {...register('adminEmail', { required: true })} readOnly />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-8">
                        <button type="submit" className='w-full md:w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200'>
                            Add Meal
                        </button>
                        <button type="button" onClick={handleSubmit(handleUpcomingMeal)} className='w-full md:w-1/2 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200'>
                            Upcoming Meal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;