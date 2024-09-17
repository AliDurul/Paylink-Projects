import TopPageNavigation from '@/app/components/TopPageNavigation';
import React, { ReactNode } from 'react'
import MailMain from './components/MailMain';

interface Props {
    readonly children: ReactNode;
}

export default function MailLayout({ children }: Props) {
    return (
        <div>
            <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: "Email", url: '/mailbox' }} />
            <MailMain>
                {children}
            </MailMain>
        </div>
    )
}
