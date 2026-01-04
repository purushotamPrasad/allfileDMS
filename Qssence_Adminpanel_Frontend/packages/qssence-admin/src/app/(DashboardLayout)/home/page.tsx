'use client'
import { PageContainer, CardContainer } from "qssence-common";
import { useGlobalContext } from '@/app/Context/store';
import { useEffect } from "react";
import { getSession } from "next-auth/react";

export default function Home() {
  const {setActiveTab}=useGlobalContext();
  useEffect(() => {
    setActiveTab("")
  }, [setActiveTab])
  return (
      <PageContainer title="Dashboard" description="this is Dashboard" >
        <CardContainer title="Title" subtitle="sub">
          <div>
            Home code
          </div>
        </CardContainer>
      </PageContainer>
  );
}