"use client"
import { PageContainer, CardContainer, AlertHandler } from "qssence-common";
import { useState } from "react";


import { AlertColor } from "@mui/material";

import AllCompanyPlanList from "./list";


export default function AllCompany() {



  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });



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

        <h1 className="header_title primary_color">All Company Plans</h1>
       
        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
       <AllCompanyPlanList  setAlertHandler={setAlertHandler}/>

        </CardContainer>
      </PageContainer>
      </div>
      </>
  );
}