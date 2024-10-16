import { clients } from "../constants";
import styles from "../style";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';


const Clients = () => (
  <section id="products" className={`${styles.flexCenter} my-4 pt-10 `}>
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        300: {
          slidesPerView: 1,
          spaceBetween: 10,
      },
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
    }}
      // pagination={{
      //   clickable: true,
      // }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {/* <div className={`flex items-stretch flex-wrap w-full gap-x-16 gap-y-8`}> */}
      {clients.map((client) => (
        <SwiperSlide key={client.id} >
          <div className={`flex-1 ${styles.flexCenter} rounded-[20px] sm:min-w-[192px] min-w-[170px]  flex justify-between flex-col client-card px-6 py-5 h-96`}>
            <img src={client.logo} alt="client_logo" className="sm:w-[192px] w-[200px] object-contain" />
            <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-dimWhite my-5">
              {client.desc}
            </p>
          </div>
        </SwiperSlide>
      ))}
      {/* </div> */}

    </Swiper>
    {/*   <div className={`flex justify-center flex-wrap w-full gap-x-16 gap-y-8`}>
      {clients.map((client) => (
        <div key={client.id} className={`flex-1 ${styles.flexCenter} rounded-[20px] sm:min-w-[192px] min-w-[170px]  flex justify-between flex-col client-card px-6 py-5 `}>
          <img src={client.logo} alt="client_logo" className="sm:w-[192px] w-[200px] object-contain" />
          <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-dimWhite my-5">
            {client.desc}
          </p>
        </div>
      ))}
    </div> */}
  </section >
);

export default Clients;
