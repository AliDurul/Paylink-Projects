import Link from 'next/link'
import React from 'react'
import ProductViews from './components/ProductViews'
import TopPageNavigation from '@/app/components/TopPageNavigation'

export default function ProductPage() {
  return (
    <>
      <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: 'Products', url: 'product' }} />

      <ProductViews />
    </>
  )
}