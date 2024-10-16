import { PlayIcon, PlusIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import { MovieCardChevronBtn } from './MovieCardChevronBtn'

interface MovieCardProps {
    data: any
}

const MovieCard = ({ data }: MovieCardProps) => {
    return (
        <div className='group bg-zinc-900 col-span relative z-50'>
            <Image src='/images/thumbnail.jpg' height={300} width={200} alt='thumbnail' loading={'lazy'} className='cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full ' />

            <div className='
            opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-100
            md:group-hover:-translate-y-[5vw]
            group-hover:opacity-100'
            >
                <Image src='/images/thumbnail.jpg' height={400} width={400} alt='thumbnail' className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full' />
                <div className=' z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition  shadow-md rounded-b-md '>
                    <div className='flex flex-row items-center gap-3'>
                        <div className="cursor-pointer w-66 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300 ">
                            <PlayIcon className='h-5 w-5 text-black' />
                        </div>
                        <div className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
                            <PlusIcon className='h-7 w-7 text-white' />
                        </div>
                        <MovieCardChevronBtn />
                    </div>
                    <p className='text-green-400 font-semibold mt-4'>New <span className='text-white '>2024</span></p>
                    <div className="flex flex-wrap mt-4 gap-2 items-center justify-between">
                        <div className="text-white text-[10px] lg:text-sm">110 mins</div>
                        <div className="text-white text-[10px] lg:text-sm">Show</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MovieCard