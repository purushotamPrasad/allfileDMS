"use client";
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { Sidebar } from "qssence-common";
import HeaderComponent from "@/components/Header";
import SidebarItems from "@/components/sidebar/SidebarItems";
import Logo from "@/components/shared/logo/Logo";
import { Box, useMediaQuery } from "@mui/material";
import SubHeader from "@/components/SubHeader";
import useAuthGuard from "@/utils/Auth/authGaurd";
import { GlobalContextProvider } from "../Context/store";
import { usePathname } from "next/navigation";


const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

interface PageWrapperProps {
  collapseSidebar: boolean;
  pathDirect:any;
}


const PageWrapper = styled("div")<PageWrapperProps>(({ collapseSidebar,pathDirect }) => ({
  display: "flex",
  flexGrow: 1,
  // paddingBottom: "60px",
  flexDirection: "column",
  // zIndex: 1,
  backgroundColor: "transparent",
  paddingLeft: collapseSidebar ? (!(pathDirect ==="groupMember" || pathDirect ==="workflowMember" )?"80px":"0px") : (!(pathDirect ==="groupMember" || pathDirect ==="workflowMember" )?"260px":"0px"),
  position: "absolute",
  width: "100%",
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  
  const pathname = usePathname();
  const pathDirect = pathname.split('/')[3];

  console.log("pathDirect",pathDirect)

  useEffect(() => {
    // If the screen is large (lg or larger), set collapseSidebar to false; otherwise, true.
    setCollapseSidebar(!lgUp);
  }, [lgUp]);

  useAuthGuard();

  return (
    <GlobalContextProvider>
      <MainWrapper>
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        {!(pathDirect ==="groupMember" || pathDirect ==="workflowMember" )  && <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          collapseSidebar={collapseSidebar}
          setCollapseSidebar={setCollapseSidebar}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        >
          <Box px={2}>
            <Logo collapseSidebar={collapseSidebar} />
          </Box>
          
          <SidebarItems collapseSidebar={collapseSidebar} />
          </Sidebar>
   }
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}
        <PageWrapper className="page-wrapper" collapseSidebar={collapseSidebar} pathDirect={pathDirect}>
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          {!(pathDirect ==="groupMember" || pathDirect ==="workflowMember" ) &&  <HeaderComponent collapseSidebar={collapseSidebar}  />}
          {!(pathDirect ==="groupMember" || pathDirect ==="workflowMember" ) &&    <div
            style={{
              marginTop: "64px",
              width:"100%",
            }}
          >
            <SubHeader />
          </div>}
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          <div
						style={{
								maxWidth: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
								paddingLeft:(!(pathDirect ==="groupMember" || pathDirect ==="workflowMember" ))?"20px":"0px",
								paddingRight:(!(pathDirect ==="groupMember" || pathDirect ==="workflowMember" ))?"20px":"0px"
						}}
					>
						{/* ------------------------------------------- */}
						{/* Page Route */}
						{/* ------------------------------------------- */}
						<Box
							sx={{
								minHeight: "calc(100vh - 170px)",
								padding: "0!important",
								// marginTop: "64px",
							}}
						>
							{children}
						</Box>
						{/* ------------------------------------------- */}
						{/* End Page */}
						{/* ------------------------------------------- */}
					</div>
        </PageWrapper>
      </MainWrapper>
    </GlobalContextProvider>
  );
}
