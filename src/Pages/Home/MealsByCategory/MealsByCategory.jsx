import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useState } from 'react';
import MealCard from './MealCard/MealCard';

const MealsByCategory = () => {

    const [allMeals, setAllMeals] = useState([])

    const handleAllMeals = () => {
        fetch('meals.json')
            .then(res => res.json())
            .then(data => setAllMeals(data))
    }
    return (
        <div>
            <SectionTitle heading='Meals By Category'></SectionTitle>
            <Tabs>
                <TabList>
                    <Tab onClick={handleAllMeals}>All Meals</Tab>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 grid-cols-2 grid-cols-3 gap-5'>
                        {
                            allMeals.map(meal => <MealCard key={meal._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Breakfast</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Lunch</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Dinner</h2>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default MealsByCategory;