'use client'

import TabContext from "@mui/lab/TabContext";
import { PageContainer, CardContainer } from "qssence-common";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Tab,
  Box,
  Grid,
} from '@mui/material';
import { IconCheckbox, IconEdit, IconPencil } from "@tabler/icons-react";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

import Mail from "../../../../public/mail.svg"
import Star from "../../../../public/favourite.svg"
import Image from "next/image";

import { IconX } from '@tabler/icons-react';

export default function Home() {


const [value, setValue] = useState('All');

const [isHovered, setIsHovered] = useState(false);

// Handlers for hover events
const handleMouseEnter = () => setIsHovered(true);
const handleMouseLeave = () => setIsHovered(false);

const handleMail=()=>
{

}

const handleClose=()=>
{

}

  return (
    <>
      
      <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
                paddingInline:"20px"
						}}>

        <div className="description">

        <h1 className="header_title">Notifications</h1>

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

    
        <TabContext value={value}>
          
          <TabList
            onChange={(event, newValue) => { 
              setValue(newValue);
            }}
            aria-label="lab API tabs example"
            sx={{
              display: 'inline-flex',
              padding: 0, 
              margin: 0, 
            }}
          >
            <Tab icon={ <Image src={Mail}  alt="logo"  priority />}
             label="All" value="All"
             iconPosition="start" 
              sx={{ padding: '8px 16px', background:'#ffffff', textTransform:'none',fontWeight:600,display:'flex'
               }} />
            <Tab icon={ <Image src={Mail}  alt="logo"  priority />} label="Unread" value="Unread"   iconPosition="start" sx={{ padding: '8px 16px',background:'#ffffff',textTransform:'none',display:'flex' }} />
            <Tab icon={ <Image src={Star}  alt="logo"  priority />} label="Favorite" value="Favorite"  iconPosition="start" sx={{ padding: '8px 16px',background:'#ffffff',textTransform:'none', display:'flex' }} />
          </TabList>
      
        <TabPanel value="All" style={{padding:"0px"}}>
           <Box>
           <CardContainer>
            <Grid container>
              
            <ul className="custom-list" style={{width:"100%"}} >
                <Box style={{display:"flex", justifyContent:'space-between', alignItems:"center"}}  onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}> 
                <li> You have been assigned the following task Verification &
                   Processing request:  VV-001587</li>

                   <Box style={{display:"flex", justifyContent:"space-between",padding:"4px 20px 0px"}}>
            
                  <Box style={{display:"flex",gridColumnGap:"8px"}}>
                 {!isHovered && <Box style={{color:"rgba(67, 67, 67, 1)"}}>06:32</Box>}
                 {isHovered && (
                  <>
                  <Image src={Mail} onClick={handleMail}  alt="logo"  priority />
                  <IconX height={20} width={20} onClick={handleClose}  style={{cursor:"pointer"}}/>
                  </>
                )} 
                  </Box>

                  </Box>
                  </Box>

               </ul>

           </Grid>
           </CardContainer>  
          </Box>
          
          
          </TabPanel>

          <TabPanel value="Unread" style={{padding:"0px"}}>
           <Box>
           <CardContainer>
            <Grid container>
              
             

           </Grid>
           </CardContainer>  
          </Box>
          
          
          </TabPanel>

          <TabPanel value="Favorite" style={{padding:"0px"}}>
           <Box>
           <CardContainer>
            <Grid container>
              
             

           </Grid>
           </CardContainer>  
          </Box>
          
          
          </TabPanel>
     
      </TabContext>
     

      </PageContainer>
      </div>
      </>
  );
}