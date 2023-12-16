import EducationalSlogan from '../../components/EducationalSlogan/EducationalSlogan';
import Banner from './Banner/Banner';
import HostelGallery from './HostelGallery/HostelGallery';
import MealsByCategory from './MealsByCategory/MealsByCategory';
import Memberships from './Memberships/Memberships';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
                <Banner></Banner>
                <EducationalSlogan></EducationalSlogan>
                <MealsByCategory></MealsByCategory>
                <Memberships></Memberships>
                <HostelGallery></HostelGallery>
        </div>
    );
};

export default Home;