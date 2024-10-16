import Image from 'next/image'
import React from 'react'
import SignInForm from './components/SignInForm'
import logo from '../../../public/images/logo.png'

export default function AuthPage() {
    return (
        <div className="realative h-full w-full bg-[url('/images/header.jpg')] bg-center bg-fixed bg-no-repeat bg-cover" >
            <div className="bg-black w-full h-full lg:bg-opacity-60">
                <nav className='px-12 py-0 md:py-5'>
                    <Image src={logo} className='w-40 mx-auto' alt='logo' />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-80 px-10 py-0 md:py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
                        <SignInForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
