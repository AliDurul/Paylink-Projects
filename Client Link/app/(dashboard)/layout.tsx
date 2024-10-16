import { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react";
import DefaultLayout from '../components/Layout/DefaultLayout'
import { auth } from "@/auth";


interface Props {
  readonly children: ReactNode;
}

export default async function layout({ children }: Props) {
  const session = await auth();
  return (
    <SessionProvider session={session} refetchInterval={60 * 60 * 24 * 3}>
      <DefaultLayout>{children}</DefaultLayout>
    </SessionProvider>
  )
}
