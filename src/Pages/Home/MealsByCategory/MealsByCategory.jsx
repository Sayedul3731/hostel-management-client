/* eslint-disable react/no-unescaped-entities */
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import image1 from "../../../assets/meat2.jpg"
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

const MealsByCategory = () => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <div className='pt-4 bg-secondary-100 text-black'>
            <SectionTitle data-aos="fade-up" heading='Meals By Category'></SectionTitle>
            <div className='flex justify-between items-start flex-col-reverse md:flex-col-reverse lg:flex-row px-2 lg:px-20 pt-10'>
                <div className='flex flex-col justify-center items-center lg:w-1/3'>
                    <p className='px-3 text-justify md:px-10 lg:pt-20'>
                        Our hostel food is very standard as well as delicious. If you want to eat good food everyday so our hostel food is enough for you. There are 3 categories food in this hostel. They are Breakfast, Launch, Dinner. The every food item is very delicious of every categories food. If you want to see our categories food pleas click on the 'See more' button.
                    </p>
                    <NavLink to="/categoriesMeals">
                        <button type="button" className='mt-10 bg-primary-300 px-5 py-2 font-semibold text-white flex justify-center items-center gap-1'>See more <FaArrowRight></FaArrowRight> </button>
                    </NavLink>
                </div>
                <div className='lg:w-2/3 flex justify-center lg:justify-end mb-5 md:mb-10 '>
                    <img src={image1} alt="" className='w-5/6' />
                </div>
            </div>
        </div>
    );
};

export default MealsByCategory;