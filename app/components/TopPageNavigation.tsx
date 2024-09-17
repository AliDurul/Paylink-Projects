import Link from 'next/link'
import React from 'react'

interface TopPageNavigationProps {
    main: { title: string, url: string },
    subTitle: { title: string, url: string },
    miniTitle?: { title: string }
}

const TopPageNavigation = ({ main, subTitle, miniTitle }: TopPageNavigationProps) => {
    return (
        <ol className="flex pl-1 text-gray-500 font-semibold dark:text-white-dark ">
            <li>
                <Link href={main.url} className="hover:text-gray-500/70 dark:hover:text-white-dark/70">{main.title}</Link>
            </li>
            <li className="before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4">
                <Link href={`/${subTitle.url}`} className={`hover:text-gray-500/70 dark:hover:text-white-dark/70 ${!miniTitle && 'text-primary'}`}>{subTitle.title}</Link>
            </li>
            {
                miniTitle &&
                <li className="before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4">
                    <button className="text-primary">{miniTitle.title}</button>
                </li>
            }
            
        </ol>
    )
}

export default TopPageNavigation