'use client'
import React, { useState } from "react";
import { Navigation, A11y, Autoplay, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import useStreamStore from "@/stores/store";
import MovieCard from "./MovieCard/MovieCard";

interface ContentItem {
  id: number;
  backdrop_path: string;
  title: string;
  name?: string;
}

export default function SliderCom({ category }: { category: any }) {

  const { contentType } = useStreamStore();

  const [content, setContent] = useState<ContentItem[]>([
    { id: 1, backdrop_path: '/images/header.jpg', title: 'Movie 0' },
    { id: 2, backdrop_path: '/images/poster.png', title: 'Movie 1' },
    { id: 3, backdrop_path: '/images/poster.png', title: 'Movie 2' },
    { id: 4, backdrop_path: '/images/poster.png', title: 'Movie 3' },
    { id: 5, backdrop_path: '/images/poster.png', title: 'Movie 3' },
    { id: 6, backdrop_path: '/images/poster.png', title: 'Movie 3' },
  ]);

  const formattedCategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  return (
    <div className="text-white px-10 pt-10 ">

      <h2 className='mb-4 text-2xl font-bold'>
        {formattedCategoryName} {formattedContentType}
      </h2>

      <Swiper
        modules={[Navigation, A11y, Keyboard]}
        spaceBetween={10}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        navigation
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {
          content.map((item, index) => (
            <SwiperSlide key={index}>
              <MovieCard data={item} />
            </SwiperSlide>
          ))

        }
      </Swiper>
    </div>
  );
}