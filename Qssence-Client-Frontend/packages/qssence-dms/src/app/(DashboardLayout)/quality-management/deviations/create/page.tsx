"use client";

import React, { useEffect, useState } from "react";
import { PageContainer, CardContainer } from "qssence-common";
import {
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react";
import { DeviationTimeline, NewdeviationTimeline } from "@/components/sidebar/MenuItems";
import Timeline from "@/components/Timeline";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import {useDispatch, useSelector } from 'react-redux';
import { TimelineData } from "@/components/Redux/action";
import { RootState } from "@/components/Redux/store";
import DataTimeline from "../data";

export default function DeviationTimelinedata() {
  
  const dispatch= useDispatch()

  const currentTimeline = useSelector((state: RootState) => state.currentTimeline);

  
  const [openId, setOpenId] = useState<string | null>(currentTimeline);

useEffect(()=>
{
  if(currentTimeline)
  {
    setOpenId(currentTimeline)
  }

},[currentTimeline])

  console.log("currentTimeMainbar",currentTimeline)

  const handleClick = (id: string) => {

    dispatch(TimelineData(id))
    setOpenId((prevOpenId) => (prevOpenId === id ? null : id));
  };

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

  const newdeviation=JSON.parse(localStorage.getItem('newdeviation'))

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave=()=>
  {
    localStorage.setItem("newdeviation",JSON.stringify(false))
  }


  const renderDetails = (id: string) => {

    const conditions = {

      1: <>
         <Box style={{width:"100%", padding:"20px 20px 20px 30px"}}>
              <Grid container spacing={6}>

              <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{display:'grid', gridRowGap:'20px'}}>
                 
                 <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Name</div>
                 <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Quality Event Type</div>
                  <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Title</div>
                 <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Description</div>
                 <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Justifications</div>
                <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Temporary Change</div>
                 <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Type</div>
                 <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Owning Facility</div>
                 <div>Deviations</div>
                  </div>

                </Grid>

        

              <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{display:'grid', gridRowGap:'0px'}}>
                 
                 <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Department</div>
                 <div>Deviations</div>
                  </div>

                
                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Owner</div>
                 <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Rating</div>
                 <div>Deviations</div>
                  </div>


                  <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr"}}>
                <div>Current Due Date</div>
                <div>Deviations</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr"}}>
                <div>Original Due Date</div>
                <div>Deviations</div>
              </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>Comments</div>
                 <div>Deviations</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                 <div>RIM Event ID</div>
                 <div>Deviations</div>
                  </div>

                </Grid>

                </Grid>
              </Box>
              
         </>,
      2: <DataTimeline/>,
      3: <DataTimeline/>,
      4: <DataTimeline/>,
      5: <DataTimeline/>,
      6: <DataTimeline/>,
      7: <DataTimeline/>,
      8: <DataTimeline/>,
      9: <DataTimeline/>,
      10: <DataTimeline/>,
      11: <DataTimeline/>,
      12: <DataTimeline/>,
      13: <DataTimeline/>,
      14: <DataTimeline/>,
      15: <DataTimeline/>,
      16: <DataTimeline/>,
      17: <DataTimeline/>, 
      18: <DataTimeline/>,
      19: <DataTimeline/>
    };
    
    const matchedIndex = DeviationTimeline.findIndex(item => item.id === id);
    
    return matchedIndex !== -1 ? conditions[matchedIndex] : null;
  };

  return (
    <>
    {
      newdeviation ? 
      <>
     <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
                paddingInline:"20px"
						}}>

        <div className="description"style={{display:'flex', justifyContent:"space-between"}}>

        <h1 className="header_title">Deviations</h1>

        <Box style={{display:'flex', gridColumnGap:"20px"}}>
          <Button variant="contained" style={{backgroundColor:"#ffffff", color:"rgba(35, 96, 142, 1)"}}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} color="primary">Save</Button>
        </Box>

        </div>
        <PageContainer title="Dashboard" description="this is Dashboard">
        <CardContainer>
        <div style={{ height: "90vh", overflow: "scroll" }}>
              {NewdeviationTimeline.map((item) => (
                <div>
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0px 12px 12px",
                    borderBottom: "1px solid rgba(35, 96, 142, 1)",
                  }}
                >
                  <div onClick={() => handleClick(item.id)} style={{ cursor: "pointer" }}>
                    {openId === item.id ? (
                      <IconChevronUp height={18} width={18} />
                    ) : (
                      <IconChevronRight height={18} width={18} />
                    )}
                  </div>
                  <span style={{ marginLeft: "6px" }}>{item.title}</span>

                            </div>
                <div style={{padding:"20px"}}>
            {openId === item.id && (
                                          
              <Box style={{width:"100%"}}>
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
              </Box>
              
              )}
              </div>
              </div>
              ))}
          

            </div>

           

          </CardContainer>
          </PageContainer>
          </div>
      </>
      :
         <>

      <Timeline />

      <div style={{ padding: "20px" }}>
        <PageContainer title="Dashboard" description="this is Dashboard">
          <CardContainer>
            <div style={{ height: "90vh", overflow: "scroll" }}>
              {DeviationTimeline.map((item) => (
                <div
                  key={item.id}
                 
                >
                  <div   style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0px 12px 12px",
                    borderBottom: "1px solid rgba(35, 96, 142, 1)",
                  }}>
                  <div onClick={() => handleClick(item.id)} style={{ cursor: "pointer",marginLeft:"10px" }}>
                    {openId === item.id ? (
                      <IconChevronUp height={18} width={18} />
                    ) : (
                      <IconChevronRight height={18} width={18} />
                    )}
                  </div>
                  <span style={{ marginLeft: "10px" }}>{item.title}</span>
                  </div>
                  {openId === item.id && (
                  <div style={{marginTop: "10px" }}>
                    {renderDetails(item.id)}
                  </div>
                )}
                </div>
              ))}
            </div>
          </CardContainer>
        </PageContainer>
      </div>
      </>
}
    </>
  );
}





