'use client'
import useStreamStore from '@/stores/store';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

interface ContentItem {
  id: number;
  backdrop_path: string;
  title: string;
  name?: string;
}

export default function MovieSlider({ category }: { category: string }) {
  const { contentType } = useStreamStore();
  const [content, setContent] = useState<ContentItem[]>([
    { id: 1, backdrop_path: '/images/header.jpg', title: 'Movie 0' },
    { id: 2, backdrop_path: '/images/poster.png', title: 'Movie 1' },
    { id: 3, backdrop_path: '/images/poster.png', title: 'Movie 2' },
    { id: 4, backdrop_path: '/images/poster.png', title: 'Movie 3' },
    { id: 5, backdrop_path: '/images/poster.png', title: 'Movie 3' },
    { id: 6, backdrop_path: '/images/poster.png', title: 'Movie 3' },
  ]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      // const res = await axios.get(`/api/v1/${contentType}/${category}`);
      // setContent(res.data.content);
    };

    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      console.log(sliderRef.current);
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };
  return (
    <div
      className='bg-black text-white relative px-5 md:px-20'
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className='mb-4 text-2xl font-bold'>
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div className='flex space-x-4 overflow-x-hidden ' ref={sliderRef}>
        {content.map((item) => (
          <Link href={`/watch/${item.id}`} className='min-w-[350px] relative group' key={item.id}>
            <div className='rounded-lg overflow-hidden'>
              <img
                src={item.backdrop_path}
                alt='Movie image'
                className='transition-transform duration-300 ease-in-out group-hover:scale-125'
              />
            </div>
            <p className='mt-2 text-center'>{item.title || item?.name}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
          size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
          '
            onClick={scrollLeft}
          >
            <ChevronLeftIcon className='size-24' />
          </button>

          <button
            className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
          size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
          '
            onClick={scrollRight}
          >
            <ChevronRightIcon className='size-24' />
          </button>
        </>
      )}
    </div>
  )
}
