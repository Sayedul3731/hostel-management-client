import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import './Banner.css';

import gallery9 from "../../../assets/gallery9.jpg"
import gallery10 from "../../../assets/gallery10.jpg"
import gallery11 from "../../../assets/gallery11.avif"
import gallery12 from "../../../assets/gallery12.avif"
import gallery13 from "../../../assets/gallery13.avif"

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className='max-w-7xl mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
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
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}

export default Banner;
