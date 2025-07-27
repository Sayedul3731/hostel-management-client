import { useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from 'react-infinite-scroll-component';
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useMeals from "../../hooks/useMeals";
import MealCard from "../Home/MealsByCategory/MealCard/MealCard";


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
        <div className="min-h-screen pb-8 px-2 lg:px-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-black">
            <div className="pt-6 mb-6">
                <SectionTitle heading="All Meals" />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-8">
                {/* Filters Panel */}
                <div className="w-full md:w-1/3 lg:w-1/4 bg-white/80 rounded-xl shadow-lg p-6 mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold mb-4 text-purple-700">Filter Meals</h3>
                    <form onSubmit={handleSubmit(handleFilterByCategory)} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" {...register("category")}>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Meat">Meat</option>
                            <option value="Rice">Rice</option>
                        </select>
                        <button className="mt-2 w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 rounded-lg shadow hover:from-purple-500 hover:to-pink-500 transition-all" type="submit">Filter by Category</button>
                    </form>
                    <form onSubmit={handleSubmit(handleFilterByPrice)} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                        <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white" {...register("price")}>
                            <option value="40-70">40-70</option>
                            <option value="70-120">71-120</option>
                            <option value="120-200">121-200</option>
                        </select>
                        <button className="mt-2 w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-2 rounded-lg shadow hover:from-pink-500 hover:to-purple-500 transition-all" type="submit">Filter by Price</button>
                    </form>
                </div>
                {/* Search and Meals Grid */}
                <div className="flex-1 flex flex-col">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex h-[44px] mb-6 rounded-lg overflow-hidden shadow-lg bg-white/80">
                        <input className="flex-1 px-4 py-2 text-gray-700 focus:outline-none bg-transparent placeholder-gray-400" placeholder="Search by title..." {...register('text')} />
                        <button type="submit" className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 flex items-center justify-center hover:from-purple-500 hover:to-pink-500 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                    <InfiniteScroll dataLength={meals.length}
                        loader={<h4 className="text-center text-purple-400 font-semibold">Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                                <b className="text-pink-500">Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                            {
                                searchingItems.length > 0 ? searchingItems.map(meal => <MealCard key={meal._id} meal={meal} />) :
                                    categoryItems.length > 0 ? categoryItems.map(meal => <MealCard key={meal._id} meal={meal} />) :
                                        priceRangeItems.length > 0 ? priceRangeItems.map(meal => <MealCard key={meal._id} meal={meal} />) :
                                            meals.map(meal => <MealCard key={meal._id} meal={meal} />)
                            }
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default Meals;