import Link from 'next/link'
import React from 'react'
import InvoiceTable from './components/InvoiceTable'
import TopPageNavigation from '@/app/components/TopPageNavigation'

export const metadata = { title: 'Invoices' }

export default function InvoiceListPage() {
  return (
    <div className="flex flex-col space-y-5">
      <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: 'Invoices', url: 'invoice' }} />
      
      <InvoiceTable />
    </div>
  )
}
