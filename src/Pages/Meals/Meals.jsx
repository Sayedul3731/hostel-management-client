import { useEffect, useState } from "react";
import MealCard from "../Home/MealsByCategory/MealCard/MealCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";


const Meals = () => {

    const [allMeals, setAllMeals] = useState([])

    useEffect(() => {
        fetch('meals.json')
            .then(res => res.json())
            .then(data => setAllMeals(data))
    }, [])
    return (
        <div>
            <h1 className="text-4xl font-medium text-center my-8">All Meals</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            allMeals.map(meal => <MealCard key={meal._id} meal={meal} />)
                        }
                    </div>
        </div>
    );
};

export default Meals;