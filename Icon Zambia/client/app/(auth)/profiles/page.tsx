import { auth } from '@/auth'
import React from 'react'
import ProfileBox from './components/ProfileBox'

const ProfilePage = async () => {
    const session = await auth()

    return (
        <div className='flex items-center h-full justify-center'>
            <div className="flex flex-col">
                <h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching ? </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <ProfileBox />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage