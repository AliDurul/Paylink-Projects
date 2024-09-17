import Link from 'next/link'
import React, { Suspense } from 'react'
import InvoiceTable from './components/InvoiceTable'
import TopPageNavigation from '@/app/components/TopPageNavigation'
import { getAllInvoices } from '@/lib/features/invoices/invoiceAPI'
import TableSkeleton from '@/app/components/common/TableSkeleton';
import dynamic from 'next/dynamic';

// const InvoiceTable = React.lazy(() => import('./components/InvoiceTable'));
// const InvoiceTable = dynamic(() => import('./components/InvoiceTable'), { loading: () => <TableSkeleton />, })

export const metadata = { title: 'Invoices' }

export default async function InvoiceListPage() {
  const response = await getAllInvoices();

  return (
    <>
      <TopPageNavigation />

      {/* <Suspense fallback={<TableSkeleton />}> */}
      <InvoiceTable invoices={response} />
      {/* </Suspense> */}
    </>
  )
}
