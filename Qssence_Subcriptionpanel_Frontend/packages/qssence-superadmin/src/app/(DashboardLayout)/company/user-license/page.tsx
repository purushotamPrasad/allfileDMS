"use client"

import { PageContainer, AlertHandler, CardContainer } from "qssence-common";
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
  Button,
  Box,
} from '@mui/material';
import { IconCheckbox, IconEdit, IconEye, IconMinus, IconPencil, IconPlus } from "@tabler/icons-react";
import AllUserLicenseList from "./list";
import { AlertColor } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Userlicense() {

  const router = useRouter()

  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const formatDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    
    return now.toLocaleString('en-IN', options).replace(',', '');
  };

  const handleCreateLicense=()=>
  {
     router.push("/company/user-license/create")
  }

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

        <h1 className="header_title primary_color">User License</h1>
        <Button
        onClick={handleCreateLicense}
        style={{ color: "white", backgroundColor: "#23608E", fontWeight:500  }}
      >
        <IconPlus height={18} width={18} /> &nbsp;
          Create License
      </Button>

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
       <AllUserLicenseList  setAlertHandler={setAlertHandler}/>

        </CardContainer>
      </PageContainer>
      </div>
      </>
  );
}