'use client'
import { PlayIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React from 'react'

export const HeaderPlayBtn = () => {
    const router = useRouter()
    const videoId = 1234
    return (
        <div className='bg-white text-black cursor-pointer rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition' onClick={() => router.push(`/stream/watch/${videoId}`)}>
            <PlayIcon className='h-5 w-5 mr-1' />
            Play
        </div>
    )
}

export default HeaderPlayBtn