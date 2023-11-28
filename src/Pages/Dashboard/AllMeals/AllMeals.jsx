import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMeals from "../../../hooks/useMeals";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./pagination.css"


const AllMeals = () => {
    const [meals,refetch] = useMeals();
    const [identifiedMeal, setIdentifiedMeal] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [foods, setFoods] = useState([])
    const { title, category, price, image, like, rating, reviews, adminEmail, adminName, Ingredients, Description, _id } = identifiedMeal;
    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()]
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
        console.log(data);
        await axiosSecure.patch(`/meals/${_id}`, data)
            .then(res => {
                console.log(res.data);
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
                    console.log(res.data);
                   if(res.data){
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

    useEffect( () => {
        console.log(currentPage, itemPerPage);
        axiosSecure.get(`/meals?page=${currentPage}&size=${itemPerPage}`)
        .then(res => {
            console.log(res.data);
            setFoods(res.data)
        })
    },[axiosSecure, currentPage, itemPerPage])

    const handleCurrentPage = (page) => {
        console.log(page);
        setCurrentPage(page)
    }
    console.log(currentPage);
    const handlePrevPage = () =>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () =>{
        if(currentPage < totalPage - 1){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div className="p-8">
            <SectionTitle heading='all meals'></SectionTitle>
            <div className="overflow-x-auto min-h-[600px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-green-500 text-black">
                            <th>SL.</th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th className="text-center">Reviews</th>
                            <th className="text-center">Admin Name</th>
                            <th className="text-center">Admin Email</th>
                            <th className="text-center">Action</th>
                            <th className="text-center">Action</th>
                            <th className="text-center">Button</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                            foods?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td>{meal?.like}</td>
                                <td className="text-center">
                                    {meal?.reviews}
                                </td>
                                <td className="text-center">{meal?.adminName}</td>
                                <td className="text-center">{meal?.adminEmail}</td>
                                <td onClick={() => handleUpdate(meal._id)} className="text-center cursor-pointer">Update</td>
                                <td onClick={() => handleDelete(meal._id)} className="text-center cursor-pointer">Delete</td>
                               <Link to={`/meal/${meal._id}`} > <td className="text-center cursor-pointer">View Meal</td></Link>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 mr-2 mt-3 bg-green-300">
                        <div className="flex flex-col md:flex-row gap-5 w-full justify-center items-center relative">
                            <label htmlFor="" className="absolute -mt-[132px] md:-mt-14 mr-[278px] md:mr-[356px] lg:mr-[860px]">Title:</label>
                            <select value={title} className="w-full md:w-1/2 h-8" {...register("title")}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                            <p className="w-full md:w-1/2">
                                <input defaultValue={category} type='text' className='w-full my-4 px-3 py-1' placeholder='Category' {...register('category', { required: true })} />
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <p className="w-full md:w-1/2">
                                <input defaultValue={image} className='w-full my-4 px-3 py-1' placeholder='Meal imageURL' {...register('image', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input defaultValue={Ingredients} className='w-full my-4 px-3 py-1' placeholder='Ingredients' {...register('Ingredients', { required: true })} />
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <p className="w-full md:w-1/2">
                                <input defaultValue={Description} className='w-full my-4 px-3 py-1' placeholder='Description' {...register('Description', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input defaultValue={price} type="number" className='w-full my-4 px-3 py-1' placeholder='Price' {...register('price', { required: true, min: 0 })} />
                            </p>
                            {errors.price?.type === 'min' && <p className='text-red-600 absolute mt-[49px] ml-[460px]'>Price must be at least 0</p>}
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full relative">
                            <p className="w-full md:w-1/2">
                                <input defaultValue={rating} type="number" className='w-full my-4 px-3 py-1' placeholder='Rating' {...register('rating', {
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
                                <input defaultValue={like} type="number" className='w-full my-4 px-3 py-1' placeholder='Likes' {...register('like', { required: true, min: 0 })} />
                            </p>
                            {errors.like?.type === 'min' && <p className='text-red-600 absolute mt-[49px]'>Likes must be at least 0</p>}
                            <p className="w-full md:w-1/2">
                                <input defaultValue={reviews} type="number" className='w-full my-4 px-3 py-1' placeholder='Reviews' {...register('reviews', { required: true, min: 0 })} />
                            </p>
                            {errors.reviews?.type === 'min' && <p className='text-red-600 absolute mt-[49px] ml-[460px]'>Reviews must be at least 0</p>}
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <p className="w-full md:w-1/2">
                                <input defaultValue={adminName} className='w-full my-4 px-3 py-1' placeholder='Admin Name' {...register('adminName', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input defaultValue={adminEmail} className='w-full my-4 px-3 py-1' placeholder='Admin Email' {...register('adminEmail', { required: true })} />
                            </p>
                        </div>
                        <button type="submit" className='text-center modal-backdrop font-semibold text-white w-full mt-5 bg-red-500 py-2'>
                            Update
                        </button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <div className="pagination ">
               <button onClick={handlePrevPage}>Prev</button>
               {
                pages.map((page, index) => <button
                onClick={() => handleCurrentPage(page )}
                className={currentPage === page  ? 'selected' : ''}
                 key={page}>{index + 1}</button> )
               }
               <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default AllMeals;