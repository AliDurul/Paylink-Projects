// import { getAllEmails } from "./mailbox/components/mailAPI";

import Image from "next/image";
import DashboardMain from "./components/DashboardMain";
import TopPageNavigation from "../components/TopPageNavigation";

export const metadata = {
  title: "OneLife Dashboard",
  description: "OneLife Dashboard",
};

export default async function Home() {

  return (
    <>
      <TopPageNavigation />
      <DashboardMain />
    </>
  );
}
