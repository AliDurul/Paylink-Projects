import React from 'react'
import { MovieList } from './components/MovieList'
import { InfoModal } from './components/InfoModal'
import StreamHeader from './components/streamHeader/Header'
import { MOVIE_CATEGORIES } from '../../utils/constants'
import MovieSlider from './components/streamBody/MovieSlider'
import Sliders from './components/streamBody/Sliders'
import { auth } from '@/auth';

export default async function page() {
    const session = await auth();

    return (
        <>
            <StreamHeader />
            {/* <MovieList /> */}


            <Sliders />


            <div className="pb-40" />
            <InfoModal />
        </>
    )
}
