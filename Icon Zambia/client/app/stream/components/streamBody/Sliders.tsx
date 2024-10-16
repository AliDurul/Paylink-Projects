'use client'
import { MOVIE_CATEGORIES, TV_CATEGORIES } from '@/utils/constants'
import React from 'react'
import MovieSlider from './MovieSlider'
import useStreamStore from '@/stores/store'
import SliderCom from '../SliderCom'

export default function Sliders() {
  const { contentType } = useStreamStore()
  return (
    <>
      {
        contentType === 'movie'
          ? MOVIE_CATEGORIES.map(category => <SliderCom key={category} category={category} />)
          : TV_CATEGORIES.map(category => <SliderCom key={category} category={category} />)
      }
    </>
  )
}
