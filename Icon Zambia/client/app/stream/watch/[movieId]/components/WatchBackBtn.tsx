'use client'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React from 'react'

export const WatchBackBtn = () => {
    const router = useRouter()
    return (
        <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-3 md:gap-8  '>
            <ArrowLeftIcon className='h-6 md:h-10 text-white cursor-pointer' onClick={()=>router.back()} />
            <p className='text-white text-base md:text-3xl font-bold'>
                <span className='font-light'>Watching : </span> The Icon Zambia
            </p>
        </nav>
    )
}
