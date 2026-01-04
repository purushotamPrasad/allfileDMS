'use client'

import React, { useState, useEffect } from "react"
import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material"
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';


function loadFile(url, callback) {
  if (typeof window !== "undefined") { 
    // PizZipUtils.getBinaryContent(url, function(error, content) {
    //   if (error) {
    //     console.error("Error loading file:", error);
    //     return;
    //   }
    //   callback(content);
    // });
  } else {
    console.error("loadFile function must be called in the browser environment.");
  }
}

type Props = {
  handleChangeTemplate: (value: string) => void;
};

const Information=({ handleChangeTemplate }: Props) =>
{

  const [formData, setFormData] = useState({
    owningfacility: '',
    owningdepartment: '',
    country: '',
    impactedfacility: '',
    impacteddeparment:''
  });


  const [documentdata, setDocumentData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('documentdata');
    if (data) {
      setDocumentData(JSON.parse(data));
    }
  }, []);

  const owningfacility = [
    { value: 'Executed Records', label: 'Executed Records' },
    { value: 'Governance & Procedure', label: 'Governance & Procedure' },
    { value: 'Operations', label: 'Operations' },
  ];

  const owningdeparment = [
    { value: 'Guidance', label: 'Guidance' },
    { value: 'Policy', label: 'Policy' },
    { value: 'Standard Operating Procedure (SOP)', label: 'Standard Operating Procedure (SOP)' },
    { value: 'Work Instruction', label: 'Work Instruction' },
  ];

  const impactedfacility = [
    { value: 'Executed Records', label: 'Executed Records' },
    { value: 'Governance & Procedure', label: 'Governance & Procedure' },
    { value: 'Operations', label: 'Operations' },
  ];

  const impacteddeparment = [
    { value: 'Guidance', label: 'Guidance' },
    { value: 'Policy', label: 'Policy' },
    { value: 'Standard Operating Procedure (SOP)', label: 'Standard Operating Procedure (SOP)' },
    { value: 'Work Instruction', label: 'Work Instruction' },
  ];

  const country = [
    { value: 'classification1', label: 'classification1' },
    { value: 'classification2', label: 'classification2' },
 
  ];



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const generateDocument = () => {
    loadFile("/document-template.docx", (error, content) => {
      if (error) {
        alert("Error loading template: " + error.message);
        return;
      }
  
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
  
      try {
        doc.render({
          title: documentdata.title,
          name: documentdata.name,
          number: documentdata.version,
          department:documentdata.previousDocumentVersion,
    
        });
      } catch (err) {
        alert("Error rendering document: " + err.message);
        return;
      }
  
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
  
        localStorage.setItem('documentTemplate', JSON.stringify(base64data));
       
      };
      reader.readAsDataURL(out);
    });
  };
  

  const handleSubmit = () => {

    generateDocument()

    handleChangeTemplate('General')

    localStorage.setItem('tabpanel', 'General')

    localStorage.setItem('Sopgeneral', JSON.stringify(true))

  };

  
  const handleCancel=()=>
  {
    handleChangeTemplate('Periodic Review')

    localStorage.setItem('tabpanel', 'Periodic Review')
  }

    return (
      <>
         
   
      <Box sx={{ display: 'flex', height:"100%", flexDirection: 'column', gap:3, padding:"40px 20px"}}>

      <FormControl fullWidth style={{display:'grid', gridRowGap:'24px'}}>
      <TextField
        size="small" 
        name="owningfacility"
        label="Owing Facility"
        value={formData.owningfacility}
        onChange={handleInputChange} 
        select 
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        {owningfacility.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size="small" 
        name="owningdepartment"
        label='Owning Department'
        value={formData.owningdepartment}
        onChange={handleInputChange} 
        select 
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        {owningdeparment.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>


      <TextField
        size="small" 
        name="country"
        label="Country"
        value={formData.country}
        onChange={handleInputChange} 
        select 
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        
        {country.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      <TextField
        size="small" 
        name="impactedfacility"
        label="Impacted Facility"
        value={formData.impactedfacility}
        onChange={handleInputChange} 
        select 
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        {impactedfacility.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        size="small" 
        name="impacteddeparment"
        label='Impacted Department'
        value={formData.impacteddeparment}
        onChange={handleInputChange} 
        select 
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        {impacteddeparment.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>



    </FormControl>


     
    <Box className="buttonflex">
       <Button  onClick={handleCancel}  color="primary">Cancel</Button>
       <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">Save</Button>
    </Box>

    </Box>

     
      </>
    )
}

export default Information;