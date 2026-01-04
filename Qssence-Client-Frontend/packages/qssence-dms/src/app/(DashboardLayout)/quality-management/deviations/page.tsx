'use client'

import React, { useEffect, useState } from "react";
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
  Tab,
  Box,
  Grid,
  Container,
} from '@mui/material';


export default function FullLibrary() {

 
  return (
    <>

        <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
                paddingInline:"20px"
						}}>
        <div className="description">

        <h1 className="header_title">All Deviations</h1>

        </div>
      
        <PageContainer title="Dashboard" description="this is Dashboard">
  <CardContainer>
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Quality Event Type</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Lifecycle State</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Title</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Rating</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Impact and Risk Analysis</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>CAPA Required?</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Date Closed</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Owning Facility</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Department</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: "12px", whiteSpace: 'nowrap' }}>Description</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          <TableRow>
            <TableCell style={{ fontSize: "12px",whiteSpace: 'nowrap' }}>QE-000264</TableCell>
            <TableCell style={{ fontSize: "12px",whiteSpace: 'nowrap' }}>Deviation</TableCell>
            <TableCell style={{ fontSize: "12px",whiteSpace: 'nowrap' }}>Closed</TableCell>
            <TableCell style={{ fontSize: "12px",whiteSpace: 'nowrap' }}>Temperature Excursion</TableCell>
            <TableCell style={{ fontSize: "12px" }}>High</TableCell>
            <TableCell style={{ fontSize: "12px" }}>Medium risk... Show more</TableCell>
            <TableCell style={{ fontSize: "12px" }}>Yes</TableCell>
            <TableCell style={{ fontSize: "12px" }}>15/11/2024</TableCell>
            <TableCell style={{ fontSize: "12px",whiteSpace: 'nowrap' }}>San Diego</TableCell>
            <TableCell style={{ fontSize: "12px",whiteSpace: 'nowrap' }}>Clinical Operations</TableCell>
            <TableCell style={{ fontSize: "12px" }}>Temperature Excursion... Show more</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </CardContainer>
</PageContainer>

      </div>
      </>
      
  );
}