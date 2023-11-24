import Banner from './Banner/Banner';
import HostelGallery from './HostelGallery/HostelGallery';
import MealsByCategory from './MealsByCategory/MealsByCategory';
import Memberships from './Memberships/Memberships';

const Home = () => {
    return (
        <div>
                <Banner></Banner>
                <MealsByCategory></MealsByCategory>
                <Memberships></Memberships>
                <HostelGallery></HostelGallery>
        </div>
    );
};

export default Home;