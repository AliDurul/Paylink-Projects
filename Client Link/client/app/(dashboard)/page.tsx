// import { getAllEmails } from "./mailbox/components/mailAPI";

import Image from "next/image";
import DashboardMain from "./components/DashboardMain";
import TopPageNavigation from "../components/TopPageNavigation";

export const metadata = {
  title: "UBA Bank Dashboard",
  description: "UBA Bank Dashboard",
};

export default async function Home() {

  // const data = await getAllEmails()
  // console.log(data);
  return (
    <>
      {/* <Image src="/assets/images/undercons.jpg" alt="UBA Bank Logo" className="object-cover w-full " width={1000} height={1000} /> */}
      <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: 'Overview', url: '/' }} />
      <DashboardMain />
    </>
  );
}
