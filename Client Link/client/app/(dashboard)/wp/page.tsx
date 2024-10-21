import React from 'react'
import WpMain from './components/WpMain'
import TopPageNavigation from '@/app/components/TopPageNavigation'
import { getAllChatRooms } from '@/lib/features/chat/chatAPI'


const WpPage = async () => {

  const chatRooms = await getAllChatRooms();

  return (
    <>
      <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: "Whatsapp", url: 'wp' }} />

      <WpMain
        chatRooms={chatRooms}
        chatTitle={'WhatsApp'}
        image={'whatsapp'}
      />
    </>
  )
}

export default WpPage