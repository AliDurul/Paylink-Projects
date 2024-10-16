'use client'
import useStreamStore from '@/stores/store'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React from 'react'

export const MovieCardChevronBtn = () => {
    const { openModal } = useStreamStore()

    return (
        <div onClick={()=>openModal('1234')} className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
            <ChevronDownIcon className='h-5 w-5 text-white group-hover/item:text-neutral-300' />
        </div>
    )
}
