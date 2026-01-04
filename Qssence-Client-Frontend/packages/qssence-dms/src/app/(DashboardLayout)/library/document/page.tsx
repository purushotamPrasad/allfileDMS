'use client'

import React, { useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import Image from "next/image"
import edit from "../../../../../public/edit.svg"



const Generaldocument: React.FC<any> = ({ handleChangeTemplate }) => {


  const Sopgeneral=JSON.parse(localStorage.getItem('Sopgeneral'))

  const documentdata=JSON.parse(localStorage.getItem('documentdata'))

  const [formData, setFormData] = useState({
    name: documentdata ?documentdata.name:'',
    version:documentdata? documentdata.version : '',
    title:documentdata? documentdata.title : '',
    previousDocumentVersion: documentdata? documentdata.previousDocumentVersion : ''
  });

  const [showgeneral, setshowgeneral] = useState(Sopgeneral)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleEdit=()=>
{
  setshowgeneral(false)
  localStorage.setItem('Sopgeneral', JSON.stringify(false))
}
 

  const handleSubmit = () => {

    handleChangeTemplate('Applicability')
   localStorage.setItem('tabpanel', 'Applicability')

   setshowgeneral(false)
   localStorage.setItem('Sopgeneral', JSON.stringify(false))
   localStorage.setItem('documentdata', JSON.stringify(formData))

  };

  const handleCancel=()=>
  {
      localStorage.removeItem("template")
  }

    return (
      <>
         
   {documentdata && showgeneral ? 
     <Box sx={{ display: 'flex', height:"100%", flexDirection: 'column', gap:3, padding:"20px 20px"}}>
        <Box style={{display:'flex', justifyContent:'flex-end', cursor:'pointer'}} onClick={handleEdit} ><Image src={edit} alt="logo" priority /></Box>
         <Box className="grid">
      <div className="label">Name:</div>
      <div className="value">{documentdata.name}</div>
      
      <div className="label">Type:</div>
      <div className="value">Governance and procedure</div>
      
      <div className="label">Subtype:</div>
      <div>
       <div className="value">
       Equipmener Maintains-India
        </div>
        <div className="value text-color">
         Reclassify
        </div>
        </div>
      
      <div className="label">Template Document:</div>
      <div className="value"></div>
      
      <div className="label">Document No:</div>
      <div className="value">{documentdata.previousDocumentVersion}</div>

      <div className="label">Lifecycle state stage Id:</div>
      <div className="value">{documentdata.title}</div>

      <div className="label">Lifecycle stage:</div>
      <div className="value">Draft</div>
    </Box>


     </Box>
   
   : 
      <Box sx={{ display: 'flex', height:"100%", flexDirection: 'column', gap:3, padding:"40px 20px"}}>

      <TextField
        fullWidth
        size="small"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      />
      <TextField
      fullWidth
        size="small"
        label="Version"
        name="version"
        value={formData.version}
        onChange={handleInputChange}
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      />
      <TextField
      fullWidth
       size="small"
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      />
      <TextField
      fullWidth
        size="small"
        label="Document Number"
        name="previousDocumentVersion"
        value={formData.previousDocumentVersion}
        onChange={handleInputChange}
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      />
       
       
       {/* <Box className="grid">
      <div className="label">Lifecycle state stage ID:</div>
      <div className="value"></div>
      
      <div className="label">Lifecycle stage:</div>
      <div className="value"></div>
      
      <div className="label">Subtype:</div>
      <div className="value">Standard Operating Procedure</div>
      
      <div className="label">Type:</div>
      <div className="value">Governance and procedure</div>
      
      <div className="label">Tags:</div>
      <div className="value"></div>
    </Box> */}

    <Box className="buttonflex">
       <Button  onClick={handleCancel}  color="primary">Cancel</Button>
       <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">Next</Button>
    </Box>

    </Box>
}
     
      </>
    )
}

export default Generaldocument

