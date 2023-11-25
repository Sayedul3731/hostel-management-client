import MealCard from "../Home/MealsByCategory/MealCard/MealCard";
import useMeals from "../../hooks/useMeals";


const Meals = () => {

    const [meals] = useMeals()
    return (
        <div>
            <h1 className="text-4xl font-medium text-center my-8">All Meals</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            meals.map(meal => <MealCard key={meal._id} meal={meal} />)
                        }
                    </div>
        </div>
    );
};

export default Meals;