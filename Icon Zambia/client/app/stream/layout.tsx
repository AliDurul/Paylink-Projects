import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Navbar } from "../layoutComponents/navbar/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Icon Zambia",
    description: "--",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const session = await auth();

    return (
        <section >
            <SessionProvider session={session} refetchInterval={60 * 60 * 24 * 3}>
                <Navbar />
                {children}
            </SessionProvider>
        </section>
    );
}
