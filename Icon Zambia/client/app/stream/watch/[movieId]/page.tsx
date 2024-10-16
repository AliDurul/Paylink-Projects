import { ArrowLeftIcon, BackspaceIcon, BackwardIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { WatchBackBtn } from './components/WatchBackBtn';

export const MovieIdPage = ({ params }: { params: string }) => {

  return (
    <div className='h-screen w-screen pt-16 bg-transparent'>
      <WatchBackBtn />
      <video autoPlay controls poster='/images/poster.png' className='w-full h-full' src='/videos/The Icon Zambia.mp4'></video>
    </div>
  )
}

export default MovieIdPage
