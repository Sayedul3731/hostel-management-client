import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const MealsByCategory = () => {
    return (
        <div>
           <SectionTitle heading='Meals By Category'></SectionTitle>
            <Tabs>
                <TabList>
                    <Tab>All Meals</Tab>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>

                <TabPanel>
                    <h2>All Meals</h2>
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