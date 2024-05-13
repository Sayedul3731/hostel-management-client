import EducationalSlogan from '../../components/EducationalSlogan/EducationalSlogan';
import Banner from './Banner/Banner';
import HostelGallery from './HostelGallery/HostelGallery';
import MealsByCategory from './MealsByCategory/MealsByCategory';
import Memberships from './Memberships/Memberships';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <EducationalSlogan></EducationalSlogan>
            <Memberships></Memberships>
            <MealsByCategory></MealsByCategory>
            <HostelGallery></HostelGallery>
        </div>
    );
};

export default Home;