import React from 'react'
import MovieCard from './MovieCard/MovieCard'
import SliderComponent from './SliderCom'


export const MovieList = () => {
    const movieList = [1, 2, 3, 4]
    const myList = [1, 2,]

    return (
        <div className='px-4 md:px-12 mt-4 space-y-4'>
            <p className="text-white tex-md md:text-xl lg:text-2xl font-semibold mb-4">
                Trending Shows
            </p>
            <div className='grid grid-cols-3 md:grid-cols-4 gap-4'>
                {
                    movieList.map((movie) => (
                        <MovieCard key={movie} data={movieList} />
                    ))
                }
            </div>
            <p className="text-white tex-md md:text-xl lg:text-2xl font-semibold mb-4 mt-2">
                My List
            </p>
            {/* <div className='grid grid-cols-4 gap-4 slider-container'>
                {
                    myList.map((movie) => (
                        <MovieCard key={movie} data={myList} />
                    ))
                }


            </div> */}
            <SliderComponent myList={myList} />
        </div>
    )
}
