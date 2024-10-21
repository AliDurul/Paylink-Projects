import React from 'react'
import TopPageNavigation from '@/app/components/TopPageNavigation'

const FacebookPage = () => {
    return (
        <div>
            <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: "Faceebook", url: 'facebook' }} />


        </div>
    )
}

export default FacebookPage