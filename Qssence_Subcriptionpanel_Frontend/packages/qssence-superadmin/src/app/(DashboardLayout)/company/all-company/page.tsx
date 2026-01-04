"use client"
import { PageContainer, CardContainer, AlertHandler, CommonDialog } from "qssence-common";
import { useState } from "react";


import { AlertColor } from "@mui/material";

import AllCompanyList from "./list";
import CreateCompany from "./create";

export default function AllCompany() {

  const [open, setOpen] = useState(false);

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

        <h1 className="header_title primary_color">All Company</h1>
       
        <CommonDialog

              buttonText="Create Company"
              dialogTitle="Create Company"
              dialogContent={<CreateCompany
                setClose={setOpen}
                setAlertHandler={setAlertHandler}
              />}
              onSave={() => {
                console.log("save");
              }}
              open={open}
              setOpen={setOpen}
            />
       

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
       <AllCompanyList  setAlertHandler={setAlertHandler}/>

        </CardContainer>
      </PageContainer>
      </div>
      </>
  );
}

/* <Table>
        <TableHead >
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', fontSize:"14px" }}>Company ID</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"14px" }}>Company Name</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"14px" }}>Location</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"14px" }}>License No</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"14px" }}>GST No.</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"14px" }}>Time Zone</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"14px" }}>Created at</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"14px" }}>Status</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"14px" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody style={{position:"relative",top:"6px"}}>
       
        <TableRow>

            <TableCell style={{paddingBlock:"4px"}} >XYZ-1254 </TableCell>
            <TableCell style={{paddingBlock:"4px"}}>XYZ Private Ltd</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Bhopal</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>01232658</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>GST020154</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>India</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>{formatDate()}</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Active</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>
             <IconButton className="primary_color">
             <IconEdit/>
             </IconButton>
             <IconButton className="primary_color">
             <IconEye/>
             </IconButton>
            </TableCell>

        </TableRow>

        <TableRow>

            <TableCell style={{paddingBlock:"4px"}} >XYZ-1254 </TableCell>
            <TableCell style={{paddingBlock:"4px"}}>XYZ Private Ltd</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Bhopal</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>01232658</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>GST020154</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>India</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>{formatDate()}</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Active</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>
            <IconButton className="primary_color">
             <IconEdit/>
             </IconButton>
             <IconButton className="primary_color">
             <IconEye/>
             </IconButton>
            </TableCell>

        </TableRow>

        <TableRow>

            <TableCell style={{paddingBlock:"4px"}} >XYZ-1254 </TableCell>
            <TableCell style={{paddingBlock:"4px"}}>XYZ Private Ltd</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Bhopal</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>01232658</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>GST020154</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>India</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>{formatDate()}</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>Inactive</TableCell>
            <TableCell style={{paddingBlock:"4px"}}>
            <IconButton className="primary_color">
             <IconEdit/>
             </IconButton>
             <IconButton className="primary_color">
             <IconEye/>
             </IconButton>

            </TableCell>
        </TableRow>


        </TableBody>
      </Table> */



