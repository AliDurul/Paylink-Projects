import { MailBoxSkeleton } from '../mailbox/components/MailSkeletons'
import FaqList from './components/FaqList'
import TopPageNavigation from '@/app/components/TopPageNavigation'

export default function page() {

    return (
        <div>
            <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: 'Fruqently Asked Questions', url: 'ticket' }} />

            <FaqList />

        </div>
    )
}
