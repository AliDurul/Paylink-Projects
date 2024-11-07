import React from 'react'
import InvoiceTable from './components/InvoiceTable'
import TopPageNavigation from '@/app/components/TopPageNavigation'


export const metadata = { title: 'Invoices' }

export default async function InvoiceListPage() {

  const IMG_URL = process.env.IMG_APIBASE_URL ?? '';

  return (
    <>
      <TopPageNavigation />

      <InvoiceTable  IMG_URL={IMG_URL} />
    </>
  )
}
