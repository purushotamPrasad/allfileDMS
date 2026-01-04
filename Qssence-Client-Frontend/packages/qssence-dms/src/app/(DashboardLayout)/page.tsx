"use client"

import { PageContainer, CardContainer,AlertHandler } from "qssence-common";
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
} from '@mui/material';
import { IconCheckbox, IconEdit, IconPencil } from "@tabler/icons-react";
import { useState } from "react";

import { AlertColor } from "@mui/material";
import AllTaskList from "./list";


export default function Home() {


  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });




  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
       <AlertHandler alertHandler={alertHandler} />
      <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
                paddingInline:"20px"
						}}>

        <div className="description">

        <h1 className="header_title">All Task</h1>

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
        <AllTaskList setAlertHandler={setAlertHandler}/>

        </CardContainer>
      </PageContainer>
      </div>
      </>
  );
}

/*  <Table>
      
        
        <TableBody style={{position:"relative",top:"6px"}}>
        <TableRow>
        <TableCell style={{paddingBlock:"4px"}} >
      
          <div style={{display:'flex',gridColumnGap:"8px", alignItems:"center"}}>
           <img src="/check-circle.svg" style={{backgroundColor:"#65BA35",borderRadius:"50%",padding:"6px"}} alt="check-circle-icon"/>
           {truncateText('Change Execuation & Release', 27)}
          </div>
          
          </TableCell>
            <TableCell style={{paddingBlock:"4px"}}>QS-000424</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>20 mar 2024</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>You</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Closed</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>
             <IconButton>
             <IconPencil/>
             </IconButton>

            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{paddingBlock:"4px"}} >
    
          <div style={{display:'flex',gridColumnGap:"8px", alignItems:"center"}}>
           <img src="/check-circle.svg" style={{backgroundColor:"#65BA35",borderRadius:"50%",padding:"6px"}} alt="check-circle-icon"/>
           {truncateText('Change Execuation & Release', 27)}
          </div>
          
          </TableCell>
            <TableCell style={{paddingBlock:"4px"}}>QS-000428</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>20 mar 2024</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>You</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Closed</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>
             <IconButton>
             <IconPencil/>
             </IconButton>

            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{paddingBlock:"4px"}}> 
          <div style={{display:'flex',gridColumnGap:"8px", alignItems:"center"}}>
           <img src="/Icon.svg" style={{backgroundColor:"#E54345",borderRadius:"50%",padding:"6px"}} alt="check-circle-icon"/>
          {truncateText('Review and Approval the User', 27)}
          </div>
          </TableCell>
            <TableCell style={{paddingBlock:"4px"}}>QS-000452</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>20 mar 2024</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>You</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Active</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>
             <IconButton>
              <IconPencil/>
             </IconButton>

            </TableCell>
        </TableRow>
        </TableBody>
      </Table>*/