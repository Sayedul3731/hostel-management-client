import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
import MealCard from '../Home/MealsByCategory/MealCard/MealCard';
import useMeals from '../../hooks/useMeals';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SectionTitle from '../../components/SectionTitle/SectionTitle';



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
        <div className='bg-secondary-100 text-black pt-4'>
            <div className='lg:px-20 lg:py-10'>
                <SectionTitle heading="meals by category"></SectionTitle>
                <Tabs>
                    <TabList className=" ">
                        <Tab onClick={handleAllMeals}>All Meals</Tab>
                        <Tab onClick={handleBreakfastMeals}>Breakfast</Tab>
                        <Tab onClick={handleLunchMeals}>Lunch</Tab>
                        <Tab onClick={handleDinnerMeals}>Dinner</Tab>
                    </TabList>

                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2'>
                            {
                                allMeals.length > 0 ? allMeals?.map(meal => <MealCard key={meal._id} meal={meal} />) : meals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2'>
                            {
                                breakfastMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2'>
                            {
                                lunchMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2'>
                            {
                                dinnerMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                            }
                        </div>
                    </TabPanel>

                </Tabs>
            </div>
        </div>

    );
};

export default CategoriesMeals;
