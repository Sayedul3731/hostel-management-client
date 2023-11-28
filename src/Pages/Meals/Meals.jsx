import MealCard from "../Home/MealsByCategory/MealCard/MealCard";
import useMeals from "../../hooks/useMeals";
import { useState } from "react";
import { useForm } from "react-hook-form";


const Meals = () => {

    const [meals] = useMeals();
    const [searchingItems, setSearchingItems] = useState([]);
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const searchItem = meals.filter(item => item.title.toLowerCase().includes(data.text.toLowerCase()))
        setSearchingItems(searchItem);
    }
    console.log(searchingItems);
    return (
        <div className="mb-5">
            <h1 className="text-4xl font-semibold text-center my-8">All Meals</h1>
            <div className="input-group flex justify-end mb-3">
                <form onSubmit={handleSubmit(onSubmit)} className="flex border h-[40px] border-2 justify-center items-center">
                    <input className='w-full h-full my-3 px-3 py-3' placeholder='Search...' {...register('text')} />
                    <button type="submit" className="bg-white text-black  px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    searchingItems.length > 0 ? searchingItems.map(meal => <MealCard key={meal._id} meal={meal} />) : meals.map(meal => <MealCard key={meal._id} meal={meal} />)
                }
            </div>
        </div>
    );
};

export default Meals;