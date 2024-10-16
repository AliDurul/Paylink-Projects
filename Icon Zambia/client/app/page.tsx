import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HomeScreenForm from './(auth)/auth/components/HomeScreenForm'
import logo from '../public/images/logo.png'

export default async function MainPage() {

    return (
        <div className='relative'>
            {/* Navbar */}
            <div className='hero-bg'>

                <header className='max-w-7xl mx-auto flex items-center justify-between p-4 pb-10 flex-wrap '>
                    <Image src={logo} alt='Icon ZM Logo' className='w-40 md:w-40 mx-auto sm:mx-0' />
                    <div className="flex gap-8 md:gap-10 text-base">
                        <Link href={'/stream'} style={{ color: 'black' }} className=' bg-pr py-1 px-3 rounded  hover:bg-yellow-400  transition text-[13px] md:text-base md:font-bold'>
                            Watch Now
                        </Link>

                        <Link href={"/auth"} className='text-white bg-pr  hover:bg-yellow-400 py-1 px-3 rounded hover:text-gray-950 transition'>
                            Buy A Ticket
                        </Link>
                        <Link href={"/auth"} className='text-white bg-pr py-1 px-3 rounded hover:bg-yellow-400 transition'>
                            Sign In
                        </Link>
                    </div>
                </header>


                {/* hero section */}
                <div className='flex flex-col items-center justify-center text-center pt-14  md:pt-40 pb-20  text-white max-w-6xl mx-auto'>
                    <h1 className='text-3xl md:text-5xl font-bold mb-4 '>Zambia Top Rated Talent Live Show</h1>
                    <p className='text-lg mb-4 font-semibold'>  Where Every Note atters</p>
                    <p className='mb-4 font-semibold'>Create Account to Vote Your Favorites Contestants </p>

                    <HomeScreenForm />
                </div>
            </div>

            {/* separator */}
            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            {/* 1st section */}
            <div className='py-10 bg-black text-white'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
                    {/* left side */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-3xl md:text-4xl font-extrabold mb-4'>Experience the thrill of Icon Zambia like never before</h2>
                        <Link href={'/stream'} className='w-fit  text-black bg-pr py-1 px-3 rounded font-bold hover:bg-yellow-400   transition'>
                            Watch Now ..
                        </Link>
                    </div>
                    {/* right side */}
                    <div className='flex-1 relative'>
                        <Image width={600} height={600} src='/images/tv.png' alt='Tv image' className='mt-4 z-20 relative' />
                        <video
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10 object-cover '
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                            src='/videos/homeScreen.mp4'
                        >
                            {/* <source src='/images/homeScreen.mp4' type='video/mp4' /> */}
                        </video>
                    </div>
                </div>
            </div>

            {/* separator */}
            {/* <div className='h-2 w-full bg-[#232323]' aria-hidden='true' /> */}

            {/* 2nd section */}
            {/* <div className='py-10 bg-black text-white'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2'>
                    <div className='flex-1 relative'>
                        <div className='relative'>
                            <img src='/images/stranger-things-lg.png' alt='Stranger Things img' className='mt-4' />

                            <div
                                className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
                                <img src='/images/stranger-things-sm.png' alt='image' className='h-full' />
                                <div className=' flex justify-between items-center w-full'>
                                    <div className='flex flex-col gap-0'>
                                        <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                                        <span className='text-sm text-blue-500'>Downloading...</span>
                                    </div>

                                    <img src='/download-icon.gif' alt='' className='h-12' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 md:text-left text-center'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>
                            Download your shows to watch offline
                        </h2>
                        <p className='text-lg md:text-xl'>
                            Save your favorites easily and always have something to watch.
                        </p>
                    </div>
                </div>
            </div> */}

            {/* separator */}

            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            {/* 3rd section */}
            {/* <div className='py-10 bg-black text-white'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h2>
                        <p className='text-lg md:text-xl'>
                            Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
                        </p>
                    </div>

                    <div className='flex-1 relative overflow-hidden'>
                        <Image width={600} height={600} src='/images/device-pile.png' alt='Device image' className='mt-4 z-20 relative' />
                        <video
                            className='absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]'
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                            src='/videos/video-devices.m4v'
                        >
                        </video>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
