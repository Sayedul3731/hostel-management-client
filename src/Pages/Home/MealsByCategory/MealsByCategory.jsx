import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useState, useEffect } from 'react';
import MealCard from './MealCard/MealCard';
import useMeals from '../../../hooks/useMeals';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const MealsByCategory = () => {

    useEffect(() => {
        AOS.init({
            duration: 200
        })
    },[])
    const [meals] = useMeals();
    const [allMeals, setAllMeals] = useState([]);
    const [breakfastMeals, setBreakfastMeals] = useState([]);
    const [lunchMeals, setLunchMeals] = useState([]);
    const [dinnerMeals, setDinnerMeals] = useState([]);
    console.log(meals);



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
        <div className='pt-4'>
            <SectionTitle data-aos="fade-up" heading='Meals By Category'></SectionTitle>
            <Tabs>
                <TabList className="text-white">
                    <Tab onClick={handleAllMeals}>All Meals</Tab>
                    <Tab onClick={handleBreakfastMeals}>Breakfast</Tab>
                    <Tab onClick={handleLunchMeals}>Lunch</Tab>
                    <Tab onClick={handleDinnerMeals}>Dinner</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            allMeals.length > 0 ? allMeals?.map(meal => <MealCard key={meal._id} meal={meal} />) : meals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            breakfastMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            lunchMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            dinnerMeals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default MealsByCategory;