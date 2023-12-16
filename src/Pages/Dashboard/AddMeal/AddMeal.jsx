import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"


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
        console.log(data);
        await axiosSecure.post('/meals', data)
            .then(res => {
                console.log(res.data);
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
                console.log(res.data);
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
        <div className="p-0 md:p-8">
            <SectionTitle heading="add meal"></SectionTitle>
            <form
                data-aos="zoom-in"
                data-aos-easing="linear"
                data-aos-duration="1500"
                onSubmit={handleSubmit(onSubmit)} className="p-8 bg-[#6C0A0F]">
                <div className="flex flex-col md:flex-row gap-5 w-full justify-center items-center relative">
                    <label htmlFor="" className="absolute -mt-[132px] md:-mt-14 mr-[278px] md:mr-[356px] lg:mr-[860px]">Title:</label>
                    <select className="w-full md:w-1/2 h-8" {...register("title")}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                    <p className="w-full md:w-1/2">
                        <input type='text' className='w-full my-4 px-3 py-1' placeholder='Category' {...register('category', { required: true })} />
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <p className="w-full md:w-1/2">
                        <input className='w-full my-4 px-3 py-1' placeholder='Meal imageURL' {...register('image', { required: true })} />
                    </p>
                    <p className="w-full md:w-1/2">
                        <input className='w-full my-4 px-3 py-1' placeholder='Ingredients' {...register('Ingredients', { required: true })} />
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <p className="w-full md:w-1/2">
                        <input className='w-full my-4 px-3 py-1' placeholder='Description' {...register('Description', { required: true })} />
                    </p>
                    <p className="w-full md:w-1/2">
                        <input type="number" className='w-full my-4 px-3 py-1' placeholder='Price' {...register('price', { required: true, min: 0 })} />
                    </p>
                    {errors.price?.type === 'min' && <p className='text-red-600 absolute mt-[49px] ml-[460px]'>Price must be at least 0</p>}
                </div>
                <div className="flex flex-col md:flex-row gap-5 w-full relative">
                    <p className="w-full md:w-1/2">
                        <input type="number" className='w-full my-4 px-3 py-1' placeholder='Rating' {...register('rating', {
                            required: true, min: 0,
                            max: 5
                        })} />
                    </p>
                    {errors.rating?.type === 'min' && <p className='text-red-600 absolute mt-[49px]'>Rating must be at least 0</p>}
                    {errors.rating?.type === 'max' && <p className='text-red-600 absolute mt-[49px]'>Rating must be up to 5</p>}
                    <p className="w-full md:w-1/2">
                        <input type="date" className='w-full my-4 px-3 py-1' placeholder='Posting Time' {...register('time', { required: true })} />
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-5 w-full relative">
                    <p className="w-full md:w-1/2">
                        <input type="number" className='w-full my-4 px-3 py-1' placeholder='Likes' {...register('like', { required: true, min: 0 })} />
                    </p>
                    {errors.like?.type === 'min' && <p className='text-red-600 absolute mt-[49px]'>Likes must be at least 0</p>}
                    <p className="w-full md:w-1/2">
                        <input type="number" className='w-full my-4 px-3 py-1' placeholder='Reviews' {...register('reviews', { required: true, min: 0 })} />
                    </p>
                    {errors.reviews?.type === 'min' && <p className='text-red-600 absolute mt-[49px] ml-[460px]'>Reviews must be at least 0</p>}
                </div>
                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <p className="w-full md:w-1/2">
                        <input value={user?.displayName} className='w-full my-4 px-3 py-1' placeholder='Admin Name' {...register('adminName', { required: true })} />
                    </p>
                    <p className="w-full md:w-1/2">
                        <input value={user?.email} className='w-full my-4 px-3 py-1' placeholder='Admin Email' {...register('adminEmail', { required: true })} />
                    </p>
                </div>
                <button type="submit" className='text-center font-semibold text-white w-full mt-5 btn btn-outline py-2'>
                    Add Meal
                </button>
                <button onClick={handleSubmit(handleUpcomingMeal)} className='text-center font-semibold text-white w-full mt-5 btn btn-outline py-2'>
                    Upcoming Meal
                </button>
            </form>
        </div>
    );
};

export default AddMeal;