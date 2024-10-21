
import TopPageNavigation from '@/app/components/TopPageNavigation'
import Records from './components/Records'
import RecordsHeader from './components/RecordsHeader'

const VoiceRecordPage = () => {



    return (
        <div>
            <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: 'Redords', url: 'voice-records' }} />

            <RecordsHeader />

            <Records />
        </div>
    )
}

export default VoiceRecordPage