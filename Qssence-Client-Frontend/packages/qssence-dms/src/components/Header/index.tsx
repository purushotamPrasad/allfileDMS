"use client"
import {
    Box,
    Stack,
    IconButton,
    Badge,
    Chip,
  } from "@mui/material";
import Logo from "../shared/logo/Logo";
// components
import Profile from "./Profile";
import { IconBellRinging } from "@tabler/icons-react";
import Search from "./search";
import { Header } from "qssence-common";
import { useState } from "react";
import Mail from "../../../public/mail.svg"
import Image from "next/image";
import { IconX } from '@tabler/icons-react';

  interface ItemType {
    collapseSidebar:Boolean
  }
const HeaderComponent=({collapseSidebar}: ItemType)=>{

  const [openNotification, setopenNotification] = useState(false)

  const handleNotification=()=>
  {
    setopenNotification(!openNotification)
  }

  const handleMail=()=>
  {

  }

  const handleClose=()=>
  {

  }

    return(
     <Header>
        <Box sx={{width:{lg:"300px",xs:"auto"}}}>
        <Logo collapseSidebar={collapseSidebar} />
        </Box>
        <Box flexGrow={1} />
        <Search />
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="right" sx={{width:{lg:"300px",sm:"auto"}}}>
        
          <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"

            onClick={handleNotification}
          >
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>
          </IconButton>


          <Profile />

        {
          openNotification && 
          <div className="dropdownsopaction notifications">
              <Box className="notificationshow">
              <Box style={{fontSize:"16px", fontWeight:600}}>Notifications</Box>
              <Box style={{display:"flex", gridColumnGap:"10px"}}>
              <Chip
              label="Unread"
              sx={{
                color: 'rgba(35, 96, 142, 0.8)', 
                backgroundColor: 'rgba(35, 96, 142, 0.1)', 
                borderRadius: '20px', 
                padding: '4px 8px',
                cursor:'pointer'
              }}
            />
             <Chip
              label="All"
              sx={{
                color: 'rgba(140, 140, 140, 1)', 
                backgroundColor: 'rgba(67, 67, 67, 0.2)', 
                borderRadius: '20px', 
                padding: '4px 8px',
                cursor:"pointer"
              }}
            />
              </Box>
              </Box>

            <Box>

               <ul className="custom-list" >
                <Box>
                <li> You have been assigned the following task Verification &
                   Processing request:  VV-001587</li>

                   <Box style={{display:"flex", justifyContent:"space-between",padding:"4px 20px 0px"}}>
            
                  <Box style={{display:"flex",gridColumnGap:"4px"}}>
                    <Box style={{color:"rgba(67, 67, 67, 1)"}}>05 May 2024</Box>
                    <Box style={{color:"rgba(67, 67, 67, 1)"}}>06:32</Box>
                  </Box>

                  <Box style={{display:"flex",gridColumnGap:"8px"}}>
                  <Image src={Mail} onClick={handleMail}  alt="logo"  priority />
                  <IconX height={20} width={20} onClick={handleClose}  style={{cursor:"pointer", transform:"scale(0.9)"}}/>
                  </Box>

                  </Box>
                  </Box>

               </ul>

            </Box>

              </div>
          }
        </Stack>
     </Header>
    )
}
export default HeaderComponent;

 
// <Profile userName={userName} userEmail={userEmail} />