import useUpcomingMeals from "../../../hooks/useUpcomingMeals";



const UpcomingMeals = () => {
    const [meals] = useUpcomingMeals();
    console.log(meals);
    
    return (
        <div>
            upcoming meals
        </div>
    );
};

export default UpcomingMeals;