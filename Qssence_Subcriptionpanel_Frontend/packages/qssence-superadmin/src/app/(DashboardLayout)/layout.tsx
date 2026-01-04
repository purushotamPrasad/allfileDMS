"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "qssence-common";
import HeaderComponent from "@/components/Header";
import SidebarItems from "@/components/sidebar/SidebarItems";
import Logo from "@/components/shared/logo/Logo";
import { createTheme,useMediaQuery } from "@mui/material";
import useAuthGuard from "@/utils/hooks/Auth/authGaurd";
import { signIn, useSession } from "next-auth/react";
import Loading from "./loading";

import SuperAdmin from "@/components/shared/logo/SuperAdmin";
import SubHeader from "@/components/SubHeader";
import { getToken } from "@/utils/Auth/authService";



const MainWrapper = styled("div")(() => ({
	display: "flex",
	minHeight: "100vh",
	width: "100%",
}));

interface PageWrapperProps {
	collapseSidebar: boolean;
}

interface User {
	name: string;
	email: string;
	// Add any other properties you expect in your user object
  }
  
  interface SessionData {
	user: User | null; // user can be null if not authenticated
	// Add other session properties as needed
  }
  


  const PageWrapper = styled("div")<PageWrapperProps>(({ collapseSidebar }) => ({
	display: "flex",
	flexGrow: 1,
	// paddingBottom: "60px",
	flexDirection: "column",
	// zIndex: 1,
	backgroundColor: "transparent",
	paddingLeft: collapseSidebar ? "80px" : "240px",
	position: "absolute",
	width: "100%"
}));

interface Props {
	children: React.ReactNode;
}



export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {


    const theme = createTheme();

	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
	const [collapseSidebar, setCollapseSidebar] = useState(true);

	const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

	const { data, status } = useSession();
	const routers = useRouter();

	 const token = getToken();


	useEffect(() => {
		setCollapseSidebar(!lgUp);
	}, [lgUp]);

	if (status === "loading") {
		console.log("Loading");
		return <Loading />
	}  

	else if (!token) {
		console.log("Redirecting to login");
		routers.push("/login");
	} 

	else if (status === "unauthenticated") {
		console.log("Authenticated");
	//	userName = data.user.name;
	//	userEmail = data.user.email

		return (
			<MainWrapper className="mainwrapper">
				{/* ------------------------------------------- */}
				{/* Sidebar */}
				{/* ------------------------------------------- */}
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					isMobileSidebarOpen={isMobileSidebarOpen}
					collapseSidebar={collapseSidebar}
					setCollapseSidebar={setCollapseSidebar}
					onSidebarClose={() => setMobileSidebarOpen(false)}
				>
					<Box px={2}>
						<Logo collapseSidebar={collapseSidebar} />
					</Box>
					<Box px={2} style={{ height:"59px",borderBottom:"1px solid rgb(204, 214, 222)"}}>
						<SuperAdmin collapseSidebar={collapseSidebar} />
					</Box>
					<Box style={{position:'relative'}}>
					<SidebarItems collapseSidebar={collapseSidebar} />
					</Box>
					
				</Sidebar>
				{/* ------------------------------------------- */}
				{/* Main Wrapper */}
				{/* ------------------------------------------- */}
				<PageWrapper className="page-wrapper" collapseSidebar={collapseSidebar}>
					{/* ------------------------------------------- */}
					{/* Header */}
					{/* ------------------------------------------- */}
					<HeaderComponent
						collapseSidebar={collapseSidebar} />

					<div style={{ marginTop: "64px", }}>
						<SubHeader collapseSidebar={collapseSidebar} />
					</div>
				
					{/* ------------------------------------------- */}
					{/* PageContent */}
					{/* ------------------------------------------- */}
					<div
						style={{
								maxWidth: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
								paddingLeft:"0px",
								paddingRight:"0px"
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
		);
	}
}