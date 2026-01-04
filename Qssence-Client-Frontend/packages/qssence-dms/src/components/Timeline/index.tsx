'use client'

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Star from "../../../public/Star.svg"
import Horizontal from "../../../public/more-horizontal.svg"
import Edit from "../../../public/edit-3.svg"
import Arrow from "../../../public/arrow.svg"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import {  IconX } from "@tabler/icons-react";
import Close from "../../../public/circle-close.svg"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Timeline=()=>
{

  const customstylecurrentstage={
    borderLeft:"16px solid rgba(35, 96, 142, 1)",
    borderTop:"14px solid transparent",
    borderBottom:"14px solid transparent"
  }

  const customstylefinalstage={
    borderLeft:"16px solid rgba(115, 209, 61, 1)",
    borderTop:"14px solid transparent",
    borderBottom:"14px solid transparent"
  }

  const customstylefilled={
  borderLeft:"16px solid rgba(200, 199, 199, 1)",
  borderTop:"14px solid transparent",
  borderBottom:"14px solid transparent"
  }

  const Initialdraftcolor={
    backgroundColor: 'rgba(35, 96, 142, 1)',
    color:'#ffffff'
  }

  const completeddraftcolor={
    backgroundColor: 'rgba(115, 209, 61, 1)',
    color:'#ffffff'
  }

  const Initialreviewcolor={
    backgroundColor: 'rgba(200, 199, 199, 1)',
    color: 'rgba(140, 140, 140, 1)'
  }



    let documentStatus = JSON.parse(localStorage.getItem("documentStatus")) || [];

        console.log("documentStaus", documentStatus.length)

        const renderStatus = () => {
             return  <Chip label="Initiated" color="success" />
          }
           
    const handleFlow=()=>
      {
        
      }
    
          const handleEdit=()=>
            {
                
            }
        
            const handleAction=()=>
            {
                
            }

         

     return (
        <>
          
          <div style={{display:'flex', justifyContent:'space-between'}} className='sop' >
            
            <div className="flex-gap">
            <Image src={Star} alt="logo" className="thumbnail" priority />
            <div className="text-color section_title">Deviations: QE-094567</div>
            <Stack direction="row" spacing={1}>
             {renderStatus()}
            </Stack>
            </div>
            
            <div className='flex'>

            <Image src={Arrow} onClick={handleFlow} className='arrowhover' alt="logo"  priority />
            <Image src={Edit} alt="logo" onClick={handleEdit} className="thumbnail arrowhover" priority />
            <Image src={Horizontal} alt="logo" onClick={handleAction} className="thumbnail arrowhover" style={{paddingLeft:"6px"}} priority />
            
          
            

            </div>

         </div>
       
         <div className="document-stepper">
               <Grid container display="flex" justifyContent="space-between" rowSpacing={1.5}>
                <Grid item md={2} display="flex" justifyContent="center">
               <div style={{display:'flex'}}>
              <div className='initiated' style={documentStatus.includes("initiated")?completeddraftcolor:Initialdraftcolor}>Initiated</div> 
              <div style={documentStatus.includes("initiated")?customstylefinalstage:customstylecurrentstage}></div>
              </div>
              </Grid>
              <Grid item md={2} display="flex" justifyContent="center">
              <div style={{display:'flex'}}>
              <div className='reviewdata'></div>
              <div className='investigation' style={documentStatus.includes("initiated")?documentStatus.includes("review")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Review</div> 
              <div style={documentStatus.includes("initiated")?documentStatus.includes("review")?customstylefinalstage:customstylecurrentstage:customstylefilled}></div>
              </div>
            </Grid>
            <Grid item md={2}  display="flex" justifyContent="center" >
              <div style={{display:'flex'}}>
              <div className='reviewdata' ></div>
              <div className='investigation' style={documentStatus.includes("review")?documentStatus.includes("investigation")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Investigation</div> 
              <div style={documentStatus.includes("review")?documentStatus.includes("investigation")?customstylefinalstage:customstylecurrentstage:customstylefilled}></div>
              </div>
             </Grid>
             <Grid item md={2}  display="flex" justifyContent="center">
              <div style={{display:'flex'}}>
              <div className='reviewdata'></div>
              <div className='investigation' style={documentStatus.includes("investigation")?documentStatus.includes("planning")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Planning</div> 
              <div style={documentStatus.includes("investigation")?documentStatus.includes("planning")?customstylefinalstage:customstylecurrentstage:customstylefilled}></div>
              </div>
              </Grid>
              <Grid item md={2}  display="flex" justifyContent="center">
              <div style={{display:'flex'}}>
              <div className='reviewdata'></div>
              <div className='investigation' style={documentStatus.includes("planning")?documentStatus.includes("approval")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Approval</div> 
              <div style={documentStatus.includes("planning")?documentStatus.includes("approval")?customstylefinalstage:customstylecurrentstage:customstylefilled}></div>
              </div>
              </Grid>
              <Grid item md={2}  display="flex" justifyContent="center">
              <div style={{display:'flex'}}>
              <div className='reviewdata' ></div>
              <div className='released' style={documentStatus.includes("approval")?documentStatus.includes("closed")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Closed</div> 
           
              </div>  
              </Grid>  
              </Grid>
        
         </div>
        </>
     )
}

export default Timeline