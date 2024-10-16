'use client'
import React, { useState } from 'react'

export default function StreamVideo() {
    const [imgLoading, setImgLoading] = useState(false)

    return (
        <>
            {imgLoading && (
                <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
            )}
            <video
                autoPlay
                muted
                loop
                src='/videos/homeScreen.mp4'
                className='object-cover w-full h-full brightness-75 '
                onLoad={() => { setImgLoading(false); console.log('loaded') }}
            >
            </video>
        </>
    )
}
