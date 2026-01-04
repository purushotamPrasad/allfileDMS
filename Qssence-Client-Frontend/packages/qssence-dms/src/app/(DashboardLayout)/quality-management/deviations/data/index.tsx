"use client"

import { Box, Button, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, TextField, } from "@mui/material"
import { IconPlus, IconSearch } from "@tabler/icons-react"
import {CommonDataGrid, CustomTextField, AlertHandler} from "qssence-common"
import React, { useRef, useState } from "react"
import { useMediaQuery } from "@mui/material";


import { AlertColor } from "@mui/material";
import AllTimelineDataList from "./list"

const DataTimeline=()=>
{

    const [alertHandler, setAlertHandler] = useState({
        hasAlert: false,
        alertType: "success" as AlertColor,
        alertMessage: "",
        alertTitle: "",
      });

    const tableRef = useRef(null);

    const [showfield, setShowField] = useState(false)

    const [formData,  setFormData]=useState({
        name:"",
        department:"",
        quality_event_type:"",
        owner:"",
        title:"",
        rating:"",
        description:"",
        current_due_date:"",
        original_due_date:"",
        justification:"",
        comments:"",
        temporary_change:"",
        rim_event_id:"",
        type:"",
        rim_event_link:"",
        owning_facility:""
   
     })
   
     const isSmScreen = useMediaQuery('(max-width:768px)');

     const handleCreateForm =()=>
     {
        setShowField(true)
     }

    const handleSearch=()=>
    {
    
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSave=()=>
      {
         

        setShowField(false)
      }

      const handleCancel=()=>
      {
        setShowField(false)
      }

    return (
        <>
        
          
          {showfield ?
           
            <>
                 <Box style={{width:"100%",padding:"20px 20px 20px 30px"}} ref={tableRef}>
              <Grid container spacing={6}>

              <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{display:'grid', gridRowGap:'20px'}}>
                 
                 <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr"}}>
                 <div>Name</div>
                <TextField
                  fullWidth
                  size="small"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr"}}>
                 <div>Quality Event Type</div>
                  <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr"}}>
                 <div>Title<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <TextField
                  size="small"
                  multiline
                  fullWidth
                  rows={3}
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr"}}>
                 <div>Description<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <TextField
                  size="small"
                  multiline
                  fullWidth
                  rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>
                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr"}}>
                 <div>Justifications<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <TextField
                    size="small"
                    multiline
                    fullWidth
                    rows={3}
                    name="justification"
                    value={formData.justification}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr", alignItems:'center'}}>
                 <div>Temporary Change</div>
                 <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="temporary-change-label"
                    name="temporary_change"
                    value={formData.temporary_change} 
                    onChange={handleInputChange} 
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr"}}>
                 <div>Type</div>
                <TextField
                  fullWidth
                  size="small"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', justifySelf:"end", background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr"}}>
                 <div>Owning Facility<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <TextField
                  fullWidth
                  size="small"
                    name="owning_facility"
                    value={formData.owning_facility}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                </Grid>

        

              <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{display:'grid', gridRowGap:'0px'}}>
                 
                 <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr", height:'fit-content'}}>
                 <div>Department<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <TextField
                  fullWidth
                  size="small"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                
                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr", height:'fit-content'}}>
                 <div>Owner</div>
                <TextField
                  fullWidth
                  size="small"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr", height:'fit-content'}}>
                 <div>Rating</div>
                <TextField
                  size="small"
           
                  fullWidth
                
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: "0.5fr 1fr", alignItems: 'center', gap: '10px' }}>
                <div>Current Due Date</div>
                <TextField
                  size="small"
                  fullWidth
                  type="date"
                  name="current_due_date"
                  value={formData.current_due_date}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ 
                    boxShadow: 'none', 
                    background: "#E4EDF6", 
                    borderRadius: "4px", 
                    '.MuiOutlinedInput-notchedOutline': { border: 0 } 
                  }}
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: "0.5fr 1fr", alignItems: 'center', gap: '10px' }}>
                <div>Original Due Date</div>
                <TextField
                  size="small"
                  fullWidth
                  type="date"
                  name="original_due_date"
                  value={formData.original_due_date}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ 
                    boxShadow: 'none', 
                    background: "#E4EDF6", 
                    borderRadius: "4px", 
                    '.MuiOutlinedInput-notchedOutline': { border: 0 } 
                  }}
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr", height:'fit-content'}}>
                 <div>Comments</div>
                <TextField
                    size="small"
                    multiline
                    fullWidth
                    rows={3}
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', justifySelf:"end", background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.5fr 1fr", height:'fit-content'}}>
                 <div>RIM Event ID</div>
                <TextField
                  fullWidth
                  size="small"
                    name="rim_event_id"
                    value={formData.rim_event_id}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                  />
                  </div>

                </Grid>

                </Grid>
                   
                <Box style={{display:'flex', gridColumnGap:"20px", justifyContent:"flex-end", paddingTop:"20px"}}>
                 <Button variant="contained" style={{backgroundColor:"#ffffff", color:"rgba(35, 96, 142, 1)"}}onClick={handleCancel} >Cancel</Button>
                 <Button variant="contained" onClick={handleSave} color="primary">Save</Button>
               </Box>

              </Box>
              
            </>
          
          :
          <>
            <AlertHandler alertHandler={alertHandler} />
            <Box  style={{display:"flex", gridColumnGap:"30px",padding:"20px 20px 20px 26px"}}>
        <Button
        onClick={handleCreateForm}
        style={{ color: "white", backgroundColor: "#23608E", fontWeight:500  }}
      >
        <IconPlus height={18} width={18} /> &nbsp;
            Create
        </Button>

       
        <CustomTextField size="small" placeholder="Search Roles" id="search" variant="outlined"    sx={{ boxShadow: 'none', width:"300px", position:"relative", background:"#E4EDF6",borderRadius:"8px", '.MuiOutlinedInput-notchedOutline': { border:"1px solid rgba(67, 67, 67, 1)" } }}   InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconSearch height={20} width={20} onClick={handleSearch} style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                ),
                }}>

            </CustomTextField>
            </Box>

            <AllTimelineDataList setAlertHandler={setAlertHandler}/>
            
    </>
            
            }
          
        </>
    )
}

export default DataTimeline

