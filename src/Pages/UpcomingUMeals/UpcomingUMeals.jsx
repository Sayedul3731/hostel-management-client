import SectionTitle from "../../components/SectionTitle/SectionTitle";
import UpcomingMealCard from "../../components/UpcomingMealCard/UpcomingMealCard";
import useUpcomingMeals from "../../hooks/useUpcomingMeals";

const UpcomingUMeals = () => {
    const [upcomingMeals] = useUpcomingMeals();
    console.log(upcomingMeals);
    return (
        <div className="py-5 lg:px-20  bg-primary-500">
            <SectionTitle heading='upcoming meals'></SectionTitle>
            <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {
                    upcomingMeals.map(meal => <UpcomingMealCard key={meal._id} meal={meal}></UpcomingMealCard>)
                }
            </div>
        </div>
    );
};

export default UpcomingUMeals;