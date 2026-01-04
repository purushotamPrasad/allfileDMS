"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "qssence-common";
import HeaderComponent from "@/components/Header";
import SidebarItems from "@/components/sidebar/SidebarItems";
import Logo from "@/components/shared/logo/Logo";
import { createTheme,useMediaQuery } from "@mui/material";
import SubHeader from "@/components/SubHeader";
// import useAuthGuard from "@/utils/hooks/Auth/authGaurd";
import { signIn, useSession } from "next-auth/react";
import Loading from "./loading";
import FilterItems from "@/components/sidebar/FilterItems";
import DocumentHeader from "@/components/DocumentHeader";

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '@recogito/recogito-js/dist/recogito.min.css';
import Doqssence from "@/components/shared/logo/Doqssence";


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


	// let userName: string = "Ravish Kumar"; 
    // let userEmail: string = "Unknown Email"; 

	useEffect(() => {
		setCollapseSidebar(!lgUp);
	}, [lgUp]);

	

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
						<Doqssence collapseSidebar={collapseSidebar} />
					</Box>
					<Box style={{position:'relative', overflow:'auto', height:"46%"}}>
					<SidebarItems collapseSidebar={collapseSidebar} />
					</Box>
					<Box style={{position:'relative', overflow:'auto', height:"27%"}}>
					<FilterItems collapseSidebar={collapseSidebar} />
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
						
						collapseSidebar={collapseSidebar}
					/>
					<div style={{ marginTop: "64px", }}>
						<SubHeader collapseSidebar={collapseSidebar} />
					</div>
					
					{/* ------------------------------------------- */}
					{/* PageContent */}
					{/* ------------------------------------------- */}
					<div
						style={{
								width: "100%",
								background: "#E5EEF5",
								minHeight: "100vh",
								paddingLeft:"0px",
								paddingRight:"0px",
								padding:"0px"
						}}
					>
						{/* ------------------------------------------- */}
						{/* Page Route */}
						{/* ------------------------------------------- */}
						<Box
							sx={{
								minHeight: "calc(100vh - 170px)",
								padding: "0px",
								// marginTop: "64px",
							}}
						>
							<div
						style={{
								width: "100%",
								background: "#E5EEF5",
								minHeight: "100vh",
								paddingLeft:"0px",
								paddingRight:"0px",
								padding:"0px"
						}}
					>
						{/* ------------------------------------------- */}
						{/* Page Route */}
						{/* ------------------------------------------- */}
						<Box
							sx={{
								minHeight: "calc(100vh - 170px)",
								padding: "0px",
								margin:'0px'
								// marginTop: "64px",
							}}
						>
							 {children} 
						</Box>
						{/* ------------------------------------------- */}
						{/* End Page */}
						{/* ------------------------------------------- */}
					</div>
						</Box>

						{/* ------------------------------------------- */}
						{/* End Page */}
						{/* ------------------------------------------- */}
					</div>
				</PageWrapper>
			</MainWrapper>
		);
	
}

/*if (status === "loading") {
		console.log("Loading");
		return <Loading />
	}  
	else if (status === "unauthenticated") {
		console.log("Redirecting to login");
		routers.push("/login");
	} 
	else if (status === "authenticated") {
		console.log("Authenticated");
		let userName = data?.user?.name;
		let userEmail = data.user.email
}
		userName={userName}
						userEmail={userEmail}

		*/