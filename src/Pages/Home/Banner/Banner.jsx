import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Banner.css';

import gallery9 from "../../../assets/gallery9.jpg"
import gallery10 from "../../../assets/gallery10.jpg"
import gallery11 from "../../../assets/gallery11.avif"
import gallery12 from "../../../assets/gallery12.avif"
import gallery13 from "../../../assets/gallery13.avif"

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

const Banner = () => {
  const progressContent = useRef(null);
  return (
    <div className='bg-primary-500 py-5'>
      <div className='max-w-7xl mx-auto'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
          style={{
            marginTop: "40px",
            marginBottom: "0px"
          }}
        >
          <SwiperSlide>
            <img src={gallery12} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gallery11} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gallery13} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gallery9} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gallery10} alt="" />
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;
