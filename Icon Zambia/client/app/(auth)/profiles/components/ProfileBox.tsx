'use client'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfileBox = () => {
    const { userInfo } = useCurrentUser()
    console.log(userInfo);
    const router = useRouter()
    return (
        <div onClick={() => { router.push('/stream') }}>
            <div className="group flex-row w-44 mx-auto cursor-pointer">
                <div className="w-44 h-44 rounded-md flex items-center border-2 border-transparent group-hover:border-white overflow-hidden">
                    <Image src='/images/default-blue.png' alt='profile' width={176} height={176} />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{userInfo?.name}</div>
            </div>
        </div>
    )
}

export default ProfileBox