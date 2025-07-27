import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useMeals from '../../hooks/useMeals';
import MealCard from '../Home/MealsByCategory/MealCard/MealCard';



const CategoriesMeals = () => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        AOS.init({
            duration: 200
        })
    }, [])
    const [meals] = useMeals();
    const [allMeals, setAllMeals] = useState([]);
    const [breakfastMeals, setBreakfastMeals] = useState([]);
    const [lunchMeals, setLunchMeals] = useState([]);
    const [dinnerMeals, setDinnerMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (meals && Array.isArray(meals)) {
            setLoading(false);
        }
    }, [meals]);



    const handleAllMeals = () => {
        setAllMeals(meals)
    }
    const handleBreakfastMeals = () => {
        const breakfastMeals = meals.filter(meal => meal.title.toLowerCase() === 'breakfast')
        setBreakfastMeals(breakfastMeals);
    }
    const handleLunchMeals = () => {
        const lunchMeals = meals.filter(meal => meal.title.toLowerCase() === 'lunch')
        setLunchMeals(lunchMeals);
    }
    const handleDinnerMeals = () => {
        const dinnerMeals = meals.filter(meal => meal.title.toLowerCase() === 'dinner')
        setDinnerMeals(dinnerMeals);
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-black pt-6 pb-10">
            <div className="max-w-7xl mx-auto px-2 lg:px-16">
                <SectionTitle heading="Meals by Category" />
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                    </div>
                ) : (
                    <Tabs selectedTabClassName="!bg-gradient-to-r !from-purple-400 !to-pink-400 !text-white !shadow-lg !rounded-lg">
                        <TabList className="flex gap-2 bg-white/80 rounded-xl shadow p-2 mb-8 mt-6">
                            <Tab onClick={handleAllMeals} className="px-6 py-2 text-base font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:bg-purple-100 focus:outline-none">All Meals</Tab>
                            <Tab onClick={handleBreakfastMeals} className="px-6 py-2 text-base font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:bg-purple-100 focus:outline-none">Breakfast</Tab>
                            <Tab onClick={handleLunchMeals} className="px-6 py-2 text-base font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:bg-purple-100 focus:outline-none">Lunch</Tab>
                            <Tab onClick={handleDinnerMeals} className="px-6 py-2 text-base font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:bg-purple-100 focus:outline-none">Dinner</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 px-2">
                                {
                                    allMeals.length > 0 ? allMeals?.map(meal => <MealCard key={meal._id} meal={meal} />) : meals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 px-2">
                                {
                                    breakfastMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 px-2">
                                {
                                    lunchMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 px-2">
                                {
                                    dinnerMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                )}
            </div>
        </div>
    );
};

export default CategoriesMeals;
