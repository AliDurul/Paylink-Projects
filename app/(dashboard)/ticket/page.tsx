import React from 'react'
import TicketStats from './components/TicketStats'
import TopPageNavigation from '@/app/components/TopPageNavigation'

export const metadata = { title: 'Tickets' }

import dynamic from 'next/dynamic';

const TicketTable = dynamic(() => import('./components/TicketTable'), {
  ssr: false 
});

export default async function TicketListPage() {

  // const session = await auth();
  // const accessToken = session?.accessToken;
  // console.log(accessToken);

  return (
    <>
      <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: 'Tickets', url: 'ticket' }} />

      <TicketStats />

      <TicketTable />
    </>
  )
}
