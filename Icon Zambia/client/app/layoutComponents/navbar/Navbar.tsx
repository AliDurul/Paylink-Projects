'use client'
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { SignOutBtn } from './SignOutBtn';
import useStreamStore from '@/stores/store';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import logo from '../../../public/images/logo.png'


const links = [
    { label: 'Movies', href: 'movie' },
    { label: 'Series', href: 'series' },
]

const profileLinks = [
    { label: 'Your Profile', href: '#' },
]

const TOP_OFFSET = 66;

export const Navbar = () => {
    const { data: session } = useSession()

    const [showbg, setShowbg] = useState(false)
    const { setContentType, contentType } = useStreamStore()
    const router = useRouter()
    const pathname = usePathname()


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > TOP_OFFSET) {
                setShowbg(true)
            } else {
                setShowbg(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    console.log(session?.user.picture);

    return (
        <Disclosure as="nav" className={`fixed w-full z-40 pt-3 transition duration-75 ${showbg && 'bg-zinc-900 bg-opacity-90 shadow-md backdrop-blur-md'}`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-12 sm:h-16 items-center justify-between">
                    <div className="flex items-center px-2 lg:px-0">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/stream')}>
                            <Image
                                placeholder='empty'
                                // width={70}
                                // height={70}
                                alt="Icon Zambia"
                                src={logo}
                                className=" w-[150px] "
                            />
                        </div>
                        <div className="hidden lg:ml-6 lg:block">
                            <div className="flex space-x-4">
                                {/* <button onClick={() => { setContentType('movie'); router.push('/stream') }} className={` ${pathname === '/stream' ? 'text-amber-700 font-bold' : 'text-white'} px-3 py-2 text-sm font-semibold text-white cursor-pointer hover:text-amber-600 transition`}>
                                    Home
                                </button> */}

                                {
                                    links.map((link, i) => (
                                        <button onClick={() => setContentType(link.href)} key={i}
                                            className={` ${contentType === link.href ? 'text-amber-700 font-bold' : 'text-white'} px-3 py-2 text-sm font-semibold cursor-pointer hover:text-amber-600 transition`}>
                                            {link.label}
                                        </button>
                                    ))
                                }
                                <Link href={'/stream/my_list'} className={` ${pathname === '/live' ? 'text-amber-700 font-bold' : 'text-white'} px-3 py-2 text-sm font-semibold  cursor-pointer hover:text-amber-600 transition`}>
                                    My List
                                </Link>
                                <button onClick={() => { setContentType('live'); router.push('/stream/live') }} className={` ${pathname === '/live' ? 'text-amber-700 font-bold' : 'text-white'} px-3 py-2 text-sm font-semibold  cursor-pointer hover:text-amber-600 transition`}>
                                    Live
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex lg:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="hidden lg:ml-4 lg:block">
                        <div className="flex items-center">
                            {/* Profile dropdown */}
                            {
                                session?.user ? (
                                    <div className='flex gap-5 justify-center items-center'>
                                        <Link href={"/search"}>
                                            <MagnifyingGlassIcon className='size-6 cursor-pointer text-white hover:text-amber-600 ' />
                                        </Link>
                                        <Menu as="div" className="relative  flex-shrink-0">
                                            <div>
                                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <Image
                                                        width={32}
                                                        height={32}
                                                        alt=""
                                                        src={session?.user?.picture.startsWith('https') ? session.user.picture : `/images${session.user.picture}`}
                                                        className="rounded-full"
                                                    />
                                                </MenuButton>
                                            </div>

                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-50  w-32 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                {
                                                    profileLinks.map((link, i) => (
                                                        <MenuItem key={i}>
                                                            <Link href={link.href} className="block px-4 py-2 text-sm text-white data-[focus]:text-gray-300">
                                                                {link.label}
                                                            </Link>
                                                        </MenuItem>
                                                    ))
                                                }
                                                <SignOutBtn isSmalScreen={false} />
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                ) : (
                                    <Link href="/auth" className="px-3 py-2 text-sm font-semibold text-white cursor-pointer hover:text-amber-600 transition">
                                        Sign In
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="lg:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 bg-zinc-900 bg-opacity-75">
                    {
                        links.map((link, i) => (
                            <DisclosureButton
                                key={i}
                                as="a"
                                href={link.href}
                                className="block rounded px-3 py-2 text-base font-medium text-white"
                            >
                                {link.label}
                            </DisclosureButton>
                        ))
                    }
                    {
                        !session?.user && (
                            <DisclosureButton
                                as="a"
                                href={'/auth'}
                                className="block rounded px-3 py-2 text-base font-medium text-white"
                            >
                                Sign In
                            </DisclosureButton>
                        )
                    }
                </div>
                {
                    session?.user && (
                        <div className="border-t border-gray-700 bg-zinc-900 bg-opacity-75 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <Image
                                        height={40}
                                        width={40}
                                        alt=""
                                        src={session?.user?.picture.startsWith('https') ? session.user.picture : `/images${session.user.picture}`}
                                        className="h-10 w-10 rounded-full"
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">{session?.user?.name}</div>
                                    <div className="text-sm font-medium text-gray-400">{session?.user?.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {
                                    profileLinks.map((link, i) => (
                                        <DisclosureButton
                                            key={i}
                                            as="a"
                                            href={link.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {link.label}
                                        </DisclosureButton>
                                    ))
                                }
                                <SignOutBtn isSmalScreen={true} />
                            </div>
                        </div>
                    )
                }

            </DisclosurePanel>
        </Disclosure>
    )
}
