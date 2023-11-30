/* eslint-disable react/prop-types */
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const SectionTitle = ({ heading }) => {




  useEffect(() => {
    AOS.init({
      duration: 3000
    })
  }, [])
    return (
        <div data-aos="flip-right" className="flex flex-col justify-center mt-10 mb-10">
            <h1 className="text-4xl text-center font-semibold uppercase"><span className="shadow-lg shadow-green-600 hover:shadow-red-600 px-3 py-[2px]">{heading}</span></h1>
        </div>
    );
};

export default SectionTitle;