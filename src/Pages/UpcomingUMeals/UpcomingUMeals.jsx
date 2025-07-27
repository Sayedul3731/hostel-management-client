import SectionTitle from "../../components/SectionTitle/SectionTitle";
import UpcomingMealCard from "../../components/UpcomingMealCard/UpcomingMealCard";
import useUpcomingMeals from "../../hooks/useUpcomingMeals";

const UpcomingUMeals = () => {
    const [upcomingMeals] = useUpcomingMeals();
    return (
        <div className="min-h-screen py-8 px-2 lg:px-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <SectionTitle heading="Upcoming Meals" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mb-8">
                {
                    upcomingMeals.map(meal => (
                        <UpcomingMealCard key={meal._id} meal={meal} />
                    ))
                }
            </div>
        </div>
    );
};

export default UpcomingUMeals;