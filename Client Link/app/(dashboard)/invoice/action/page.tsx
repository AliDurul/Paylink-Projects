import React from 'react'
import TopPageNavigation from '@/app/components/TopPageNavigation'
import InvoiceAction from '../components/InvoiceAction'

export default function InvoiceActionPage() {
  return (
    <>
      <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: 'Invoices', url: 'invoice' }} miniTitle={{ title: 'Invoce Action' }} />

      <InvoiceAction />
    </>
  )
}
