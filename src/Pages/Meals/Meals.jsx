import MealCard from "../Home/MealsByCategory/MealCard/MealCard";
import useMeals from "../../hooks/useMeals";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from 'react-infinite-scroll-component';
import SectionTitle from "../../components/SectionTitle/SectionTitle";


const Meals = () => {

    const [meals] = useMeals();
    const [searchingItems, setSearchingItems] = useState([]);
    const [categoryItems, setCategoryItems] = useState([]);
    const [priceRangeItems, setPriceRangeItems] = useState([])
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const searchItem = meals.filter(item => item.title.toLowerCase().includes(data.text.toLowerCase()))
        setSearchingItems(searchItem);
        setCategoryItems([])
        setPriceRangeItems([])
    }
    const handleFilterByCategory = data => {
        const searchCategory = meals.filter(item => item.category.toLowerCase().includes(data.category.toLowerCase()))
        setCategoryItems(searchCategory);
        setSearchingItems([])
        setPriceRangeItems([])
    }
    const handleFilterByPrice = data => {
        const minPrice = data.price.split('-')[0]
        const maxPrice = data.price.split('-')[1]
        const searchPrice = meals.filter(item => item.price >= minPrice && item.price <= maxPrice);
        setPriceRangeItems(searchPrice)
        setCategoryItems([])
        setSearchingItems([])
    }

    return (
        <div className=" pb-2 lg:px-20 bg-secondary-100 text-black px-2 ">
            <div className="pt-1"><SectionTitle heading='All meals'></SectionTitle></div>
            <div className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-1/2 lg:w-1/3 ">
                    <div className="w-3/4 md:w-5/6 ">
                        <form onSubmit={handleSubmit(handleFilterByCategory)} className="flex bg-slate-100  justify-evenly">

                            <select className="bg-slate-100 md:w-1/2 h-8" {...register("category")}>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Meat">Meat</option>
                                <option value="Rice">Rice</option>
                            </select>
                            <button className="font-normal" type="submit">filter by category</button>
                        </form>
                    </div>
                    <div className="w-3/4 md:w-5/6 mt-3">
                        <form onSubmit={handleSubmit(handleFilterByPrice)}
                            className="flex bg-slate-100  justify-evenly">
                            <select className="bg-slate-100 md:w-1/2 -ml-3  h-8" {...register("price")}>
                                <option value="40-70">40-70</option>
                                <option value="70-120">71-120</option>
                                <option value="120-200">121-200</option>
                            </select>
                            <button className="font-normal pl-" type="submit">filter by price</button>
                        </form>
                    </div>
                </div>
                <div className="input-group flex w-3/4 md:w-1/2 lg:w-2/3 md:justify-end lg:justify-end md:mt-[36px]  mt-5 md:mt-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex h-[40px] mb-2 justify-center items-center">
                        <input className='w-full h-full my-3 px-3 py-3 text-white' placeholder='Search by title...' {...register('text')} />
                        <button type="submit" className="bg-white text-wh h-full px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
            <InfiniteScroll dataLength={meals.length}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                        <b className=" ">Yay! You have seen it all</b>
                    </p>
                }

            >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>

                    {
                        searchingItems.length > 0 ? searchingItems.map(meal => <MealCard key={meal._id} meal={meal} />) : categoryItems.length > 0 ? categoryItems.map(meal => <MealCard key={meal._id} meal={meal} />) : priceRangeItems.length > 0 ? priceRangeItems.map(meal => <MealCard key={meal._id} meal={meal} />) : meals.map(meal => <MealCard key={meal._id} meal={meal} />)
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Meals;