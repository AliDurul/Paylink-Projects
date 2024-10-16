import React, { useState } from 'react'
import StreamVideo from './HeaderVideo'
import { HeaderPlayBtn } from './HeaderPlayBtn'
import { HeaderdInfoBtn } from './HeaderdInfoBtn'

const StreamHeader = () => {
  return (
    <div className='relative h-[56.25vh] bg-black/45'>
      <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />

      <StreamVideo />

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className='text-white text-2xl md:text-3xl h-full w-[50%] lg:text-4xl font-bold drop-shadow-xl'>
          The Icon Zambia
        </p>
        <p className="text-white text-[15px] md:text-lg mt-3 md:mt-8 w-[90%] lg:w-[50%] drop-shadow-xl  ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas sunt consequuntur pariatur amet quam voluptatem alias quia aut explicabo dolores?
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3 ">
          <HeaderPlayBtn />
          <HeaderdInfoBtn />
        </div>
      </div>
    </div>
  )
}

export default StreamHeader