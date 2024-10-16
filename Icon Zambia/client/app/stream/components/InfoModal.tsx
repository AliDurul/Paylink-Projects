'use client'
import useStreamStore from '@/stores/store'
import { XMarkIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderPlayBtn from './streamHeader/HeaderPlayBtn'

interface InfoModalProps {
    visible: boolean
    onClose?: any
}


export const InfoModal = () => {
    const [isVisible, setIsVisible] = useState(false)
    const { movieId, closeModal, isOpen } = useStreamStore()

    useEffect(() => {
        setIsVisible(!!isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        setIsVisible(false)
        setTimeout(() => {
            closeModal()
        }, 300)
    }, [closeModal])

    if (!isVisible) return null



    return (
        <div className='z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 px-2 md:px-0'>
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transfrom duration-300 relative flex-auto bg-zinc-900 drop-shadow-sm`}>
                    <div className='relative h-60 md:h-96'>
                        <video
                            autoPlay
                            // controls
                            loop
                            className='w-full brightness-[60%] object-cover h-full'
                            poster='/images/logo.jpg'
                            src='/videos/The Icon Zambia.mp4'
                        ></video>
                        <div onClick={handleClose} className='h-10 w-10 rounded-full bg-black text-white absolute top-3 right-3 cursor-pointer bg-opacity-70 flex items-center justify-center '>
                            <XMarkIcon className='h-6 w-6 text-white' />
                        </div>

                        <div className="absolute bottom-[10%] left-10">
                            <p className='text-white text-2xl md:text-3xl h-full lg:text-4xl font-bold mb-8'>The Icon Zambia</p>

                            <div className="flex flex-row gap-4 items-center">
                                <HeaderPlayBtn />
                                <div className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
                                    <PlusIcon className=' h-7 w-7 text-white' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-5 flex flex-col gap-5">
                        <div className='flex  justify-between'>

                            <p className="text-green-400 font-semibold text-lg">New</p>
                            <p className="text-white text-lg ">action</p>
                            <p className="text-white text-lg">110 Minutes</p>

                        </div>
                        <div className=''>
                            <p className="text-white text-base  md:text-lg">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, natus?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
