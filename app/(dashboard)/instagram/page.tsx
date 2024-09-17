import React from 'react'
import TopPageNavigation from '@/app/components/TopPageNavigation'

const InstagramPage = () => {
    return (
        <div>
            <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: "Instagram", url: 'instagram' }} />

           
        </div>
    )
}

export default InstagramPage