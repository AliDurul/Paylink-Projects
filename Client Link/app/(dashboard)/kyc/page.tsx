'use server'
import TopPageNavigation from '@/app/components/TopPageNavigation'
import KycHeaderBtns from './components/KycHeaderBtns'
import KycListTable from './components/KycListTable'
import KycGridTable from './components/KycGridTable'

// export const metadata = { title: 'Kycs' }



export default async function KycPage() {

  const IMG_URL = process.env.IMG_APIBASE_URL ?? '';



  return (
    <>
      <TopPageNavigation />

      <div className="flex justify-end">
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="flex gap-3">
            <KycHeaderBtns />
          </div>
        </div>
      </div>

      <KycListTable IMG_URL={IMG_URL} />
      <KycGridTable />
    </>
  )
}
