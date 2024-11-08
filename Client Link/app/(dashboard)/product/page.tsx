import Link from 'next/link'
import React from 'react'
import ProductViews from './components/ProductViews'
import TopPageNavigation from '@/app/components/TopPageNavigation'

export default function ProductPage() {

  const IMG_URL = process.env.IMG_APIBASE_URL ?? '';


  return (
    <>
      <TopPageNavigation />

      <ProductViews IMG_URL={IMG_URL} />
    </>
  )
}
