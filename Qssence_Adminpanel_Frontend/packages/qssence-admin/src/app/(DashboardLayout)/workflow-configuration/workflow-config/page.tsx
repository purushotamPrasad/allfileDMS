"use client";

import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function WorkflowConfig() {
  return (
    <div>
     
      <h1 className="header_title primary_color paddingBlock">
          Workflow Configuration
         </h1>
      <Box
        
        sx={{ backgroundColor: "white", padding: "20px", borderRadius: "5px" }}
      >
        <Grid container spacing={2}>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                border: "1px solid #D9D9D9",
                padding: "10px",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                width: "100%",
                fontWeight:"500",
                marginBottom:"10px"
              }}
            >
              Document Management
            </Typography>
            <Box style={{display:"grid", gridRowGap:"8px", paddingTop:"6px"}}>

            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/document_type/all_document_type">
               Document Type
              </Link>
            </Typography>

            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/document_flow/all_document_flow">
               Document Flow
              </Link>
            </Typography>
            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/meta_data/all_meta_data">Metadata Field</Link>
            </Typography>
            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/addtemplate/all-template">Document Template</Link>
            </Typography>
            </Box>
          </Grid>
         
  
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontFamily={"sans-serif"}
              sx={{
                border: "1px solid #D9D9D9",
                padding: "10px",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                width: "100%",
                fontWeight:"500",
                marginBottom:"10px"
              }}
            >
              Workflow Management
            </Typography>
            <Box style={{display:"grid", gridRowGap:"8px", paddingTop:"6px"}}>
            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/workflow/dms-workflow">DMS Workflow Management</Link>
            </Typography>
            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/workflow/qms-workflow">QMS Workflow Mangement</Link>
            </Typography>
            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/workflow/lms-workflow">LMS Workflow Management</Link>
            </Typography>
            </Box>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontFamily={"sans-serif"}
              sx={{
                border: "1px solid #D9D9D9",
                padding: "10px",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                width: "100%",
                fontWeight:"500",
                marginBottom:"10px"
              }}
            >
              Workflow Data
            </Typography>
            <Box style={{display:"grid", gridRowGap:"8px", paddingTop:"6px"}}>
            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/workflow/qms-workflow/workflow-timeline">Timeline Data</Link>
            </Typography>
            <Typography variant="h6" style={{paddingLeft:"10px"}}>
              <Link href="/workflow/state-data">State Data</Link>
            </Typography>
            </Box>
          </Grid> */}

        </Grid>
       
      </Box>
    </div>
  );
}

/*  <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontFamily={"sans-serif"}
              sx={{
                border: "1px solid #D9D9D9",
                padding: "10px",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                width: "90%",
              }}
            >
              Meta Data Management
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontFamily={"sans-serif"}
              sx={{
                border: "1px solid #D9D9D9",
                padding: "10px",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                width: "90%",
              }}
            >
              Template Management
            </Typography>
          </Grid> */