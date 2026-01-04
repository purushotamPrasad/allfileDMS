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

const DocumentHeader=()=>
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



    const [opendialog, setopendialog]=useState(false)

    const [documentReview, setDocumentReview]=useState(false)


    const [documentApprove, setDocumentApprove]=useState(false)

    const [documentTraining, setDocumentTraining]=useState(false)
   
    const [formData, setFormData] = useState('');

    const [qaformData, setqaFormData] = useState('');

    const [selectedValue, setSelectedValue] = useState('');


    const selectableOptions = [
      { value: 'Management', label: 'Management Review' },
      { value: 'Quality', label: 'Quality Review' },
      { value: 'Regulatory', label: 'Regulatory Review' },
      { value: 'Validation', label: 'Validation Review' },
      { value: 'Environmental', label: 'Environmental Health & Safety Review' },
      { value: 'DidNotReview', label: 'Did not Review' },
    ];

    const selectableTask = [
      { value: 'Owner', label: 'Owner Assessment' },
    ];
    const [formValues, setFormValues] = useState({
      username: '',
      password: ''
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
    };
  
    
    const handleInputChange = (e) => {
     
      setFormData(e.target.value);
      
    };

    const handleInputChangeApproval=(e)=>
    {
      setqaFormData(e.target.value)
    }

  
    const handleRemoveLine = (indexToRemove) => {
      const lines = formData.split('\n');
      const updatedLines = lines.filter((_, index) => index !== indexToRemove).join('\n');
      setFormData(updatedLines);
    };

    const handleRemoveLineApproval = (indexToRemove) => {
      const lines = formData.split('\n');
      const updatedLines = lines.filter((_, index) => index !== indexToRemove).join('\n');
      setqaFormData(updatedLines);
    };
  
    const handleRadioChange = (event) => {
      setSelectedValue(event.target.value); 
    };


      const [selectedDate, setSelectedDate] = useState(null);

      const [openReviewtask, setopenReviewtask]=useState(false)

      const [openReviewcontext, setopenReviewcontext]=useState(false)

      const [openApprovalcontext, setopenApprovalcontext]=useState(false)



      let completeStatus = JSON.parse(localStorage.getItem("complete")) || false;

      const [complete, setcomplete]=useState(completeStatus)

      const todaydate = new Date();
     
      const handleDateChange = date => {
        setSelectedDate(date);
      };

    const handleFlow=()=>
    {
        setopendialog(!opendialog)
    }

    const handleDraft=()=>
    {

    }

    const handleEdit=()=>
    {
        
    }

    const handleAction=()=>
    {
        
    }



    const handleEditing=()=>
    {

    }

    const handleReview=()=>
    
    {
         setopendialog(false)
        setDocumentReview(true)
    }

    const handleApproval=()=>
    {
       setopendialog(false)
       setDocumentApprove(true)
    }

    const handleComplete=()=>
    {
       if(documentStatus[0]==="draft" && !(documentStatus.includes("review")))
       {
         setopenReviewcontext(true)
       }
       else if(documentStatus[1]==="review" && !(documentStatus.includes("approval")))
       {
         setopenApprovalcontext(true)
       }
       
       // setopenReviewtask(true)
    }

    const renderStatus = () => {

      if ((documentStatus[0]==="draft") && !(documentStatus.includes("review"))) {
       
        if(complete)
        {
          return (
            <div style={{ fontSize: "16px", color: "rgba(56, 158, 13, 1)" }}>
              Due 26 Mar 2024
            </div>
          );
        }

        else 
        {
          return  <Chip label="Draft" color="success" />
        }
       
      } 

      else if((documentStatus[1]==="review") && !(documentStatus.includes("approval")))
       {
           if(complete)
            {
              return (
                <div style={{ fontSize: "16px", color: "rgba(56, 158, 13, 1)" }}>
                  Due 26 Mar 2024
                </div>
              );
            } 
           
            else 
            {
              return <Chip label="Ready for approval" color="success" />
            }

       }
      
    };

    const handleDocumentReview=()=>
    {
      localStorage.setItem("documentStatus", JSON.stringify(["draft"]));
      localStorage.setItem("complete",JSON.stringify(true))
        setcomplete(true)
        setDocumentReview(false)
    }

    const handleDocumentTraining=()=>
    {
      documentStatus.push("training");
        localStorage.setItem("documentStatus", JSON.stringify(documentStatus));
        localStorage.setItem("complete",JSON.stringify(false))
        setcomplete(false)
        setDocumentTraining(false)
    }

    const handleDocumentApproval=()=>
    {
  
       localStorage.setItem("complete",JSON.stringify(true))
        setcomplete(true)
        setDocumentApprove(false)
    }

    const handleCloseDocumentReview=()=>
    {
        setDocumentReview(false)
    }

    const handleCloseDocumentApproval=()=>
      {
          setDocumentApprove(false)
      }

      const handleCloseDocumentTraining=()=>
        {
            setDocumentTraining(false)
        }
   
 
    const handleReviewtask=()=>
    {
      setopenReviewtask(false)
    }

    const handleCloseReviewtask=()=>
      {
        setopenReviewtask(false)
      }

    const handleReviewcontext=()=>
      {
        documentStatus.push("review");
        localStorage.setItem("documentStatus", JSON.stringify(documentStatus));
        localStorage.setItem("complete",JSON.stringify(false))
        setcomplete(false)
        setopenReviewcontext(false)
      }
  
      const handleCloseReviewcontext=()=>
        {
          setopenReviewcontext(false)
        }

        const handleApprovalcontext=()=>
          {
            documentStatus.push("approval");
            localStorage.setItem("documentStatus", JSON.stringify(documentStatus));
            localStorage.setItem("complete",JSON.stringify(false))
            setcomplete(false)
            setopenApprovalcontext(false)
          }
      
          const handleCloseApprovalcontext=()=>
            {
              setopenApprovalcontext(false)
            }

         const handleRead=()=>
          {

          }  

        const handleEffective=()=>
          {
            setDocumentTraining(true)
          }  
          
          
  
        console.log("openDialog", opendialog)
        console.log("documentStaus", documentStatus.length)

     return (
        <>
       
            <Box style={{position:'relative'}}>

            <div style={{display:'flex', justifyContent:'space-between'}} className='sop' >
            
            <div className="flex-gap">
            <Image src={Star} alt="logo" className="thumbnail" priority />
            <div className="text-color section_title">SOP for Line Clearance(v0.1)</div>
            <Stack direction="row" spacing={1}>
             {renderStatus()}
            </Stack>
            </div>
            
            <div className='flex'>

            {!complete && <Image src={Arrow} onClick={handleFlow} className='arrowhover' alt="logo"  priority />}
            <Image src={Edit} alt="logo" onClick={handleEdit} className="thumbnail arrowhover" priority />
            <Image src={Horizontal} alt="logo" onClick={handleAction} className="thumbnail arrowhover" style={{paddingLeft:"6px"}} priority />
            
            {complete && <Button style={{ backgroundColor: "#23608E", color: '#ffffff', borderRadius: "4px", cursor: 'pointer',padding:"2px 8px"}}>
            <Box style={{ fontWeight: "550", fontSize: "14px"}} onClick={handleComplete}>Complete</Box>
            </Button>
            }
            

            </div>

         </div>

         {opendialog && (
       <>
       
      
      {(() => {
      
        if (documentStatus.length === 0 || documentStatus[0] === "draft" && !documentStatus.includes("review")) {
          return (
            <div className="dropdownsopaction">
          <Box className="dropdownsoptitle">START WORKFLOW</Box>
            <ul className="dropdownsoplist">
              <li style={{ padding: "2px 8px" }} onClick={handleEditing}>
                Send for Editing
              </li>
              <li style={{ padding: "2px 8px" }} onClick={handleReview}>
                Send for Review
              </li>
              <li style={{ padding: "2px 8px" }} onClick={handleApproval}>
                Send for Approval
              </li>
            </ul>
            </div>
          );
        } 
    
        else if (documentStatus[1] === "review" && !documentStatus.includes("approval")) {
          return (
            <>
                <div className="dropdownsopaction">
                <Box className="dropdownsoptitle">START WORKFLOW</Box>
              <ul className="dropdownsoplist">
                <li style={{ padding: "2px 8px" }} onClick={handleReview}>
                  Send for Re-Review
                </li>
                <li style={{ padding: "2px 8px" }} onClick={handleApproval}>
                  Send for Approval
                </li>
              </ul>
              <Box className="dropdownsoptitle">CHANGE STATE</Box>
              <ul className="dropdownsoplist">
                <li style={{ padding: "2px 8px" }} onClick={handleDraft}>
                  Send back to Draft
                </li>
              </ul>
              </div>
            </>
          );
        }

        else if (documentStatus[2] === "approval" && !documentStatus.includes("training")) {
          return (
            <>
                <div className="dropdownsopaction">
                <Box className="dropdownsoptitle">START WORKFLOW</Box>
              <ul className="dropdownsoplist">
                <li style={{ padding: "2px 8px" }} onClick={handleRead}>
                  Send for Read & Understood
                </li>
                <li style={{ padding: "2px 8px" }} onClick={handleEffective}>
                  Make Effective
                </li>
              </ul>
              </div>
            </>
          );
        }
      
      })()}
   
  </>
)}


   <Dialog open={documentReview} onClose={handleCloseDocumentReview} maxWidth="sm" fullWidth>
       
       <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Review</DialogTitle>
       <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseDocumentReview}><IconX/></DialogTitle>
       </Box>

       <DialogContent style={{display:'grid', gridRowGap:"16px"}}>
       
       <Box>You are about to start to review workflow for “SOP for Line Clearance”. 
        Please complete the following field to begin the workflow.</Box>

          <Box>
        <Box className="flexdesign">
            <Box style={{fontSize:"18px",fontWeight:'500'}}>Reviewer(s)*</Box>
            <Box style={{fontSize:"16px",fontWeight:'400'}}>Assigned to every user</Box>
        </Box>

      
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#E4EDF6',
        borderRadius: '4px',
        padding: '4px',
        marginBottom: '8px',
      }}
    >

      <TextField
        size='small'
        fullWidth
        multiline
        value={formData}
        variant="outlined"
        onChange={handleInputChange}
        sx={{
          background: 'transparent',
          borderRadius: '4px',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      />

      {formData.split('\n').map((line, index) => (
        line.trim() !== '' && (  
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gridColumnGap:'20px',
              background: '#E4EDF6',
              borderRadius: '4px',
              padding:"2px 12px",
            }}
          >
            <Box sx={{width:'fit-content'}}>{line}</Box>
            <IconButton onClick={() => handleRemoveLine(index)} size="small">
              <Image src={Close} alt="clear" width={16} height={16} />
            </IconButton>
          </Box>
        )
      ))}
    </Box>
     

     
        </Box>

        <Box style={{fontSize:"16px",fontWeight:'500'}} className="text-color">
            Add task instruction
        </Box>

        <Box>
            <Box style={{fontWeight:'400'}}>Due Date*</Box>
            <div>
            <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={todaydate}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/yyyy"
          
        />
        </div>
        </Box>
    
       </DialogContent>

       <DialogActions style={{padding:'20px 24px',display:'flex', justifyContent:'space-between'}}>
       

        <Box style={{color:"rgba(67, 67, 67, 1)", fontSize:"14px", fontWeight:"300"}}>
          <i>*Required to proceed</i>
        </Box>

        <Box style={{display:'flex', gridColumnGap:'20px'}}>
         <Button onClick={handleCloseDocumentReview} color="primary">
           Cancel
         </Button>

              <Button style={{backgroundColor: "#23608E", color: '#ffffff'}} onClick={()=>handleDocumentReview()} variant='contained' component="span">
                 Start
              </Button>
           
            
            </Box>
          
         
        
       </DialogActions>
     </Dialog>

     <Dialog open={openReviewtask} onClose={handleCloseReviewtask} maxWidth="sm" fullWidth>
       
       <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Review Task</DialogTitle>
       <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseReviewtask}><IconX/></DialogTitle>
       </Box>

       <DialogContent style={{display:'grid', gridRowGap:"16px"}}>
       
       <Box>Please select the context of your review to complete this task.</Box>

      
       <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#E4EDF6',
        borderRadius: '4px',
        padding: '4px',
        marginBottom: '8px',
      }}
    >
  
      <TextField
        size='small'
        fullWidth
        select 
        value={formData} 
        variant="outlined"
        onChange={handleInputChange}
        sx={{
          background: 'transparent',
          borderRadius: '4px',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        {/* Loop through selectableOptions to create menu items */}
        {selectableOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
     
        <Box style={{fontSize:"16px",fontWeight:'500'}} className="text-color">
            Add comments
        </Box>

       </DialogContent>

       <DialogActions style={{padding:'20px 24px',display:'flex', justifyContent:'space-between'}}>
       

        <Box style={{color:"rgba(67, 67, 67, 1)", fontSize:"14px", fontWeight:"300"}}>
          <i>*Required to proceed</i>
        </Box>

        <Box style={{display:'flex', gridColumnGap:'20px'}}>
         <Button onClick={handleCloseReviewtask} color="primary">
           Cancel
         </Button>

              <Button style={{backgroundColor: "#23608E", color: '#ffffff'}} onClick={handleReviewtask} variant='contained' component="span">
                 Complete
              </Button>
           
            
            </Box>
          
         
        
       </DialogActions>
     </Dialog>



     <Dialog open={openReviewcontext} onClose={handleCloseReviewcontext} maxWidth="sm" fullWidth>
       
       <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Review Task</DialogTitle>
       <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseReviewcontext}><IconX/></DialogTitle>
       </Box>

       <DialogContent style={{display:'grid', gridRowGap:"16px"}}>
       
       <Box>Please select the context of your review to complete this task.</Box>

      
       <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#E4EDF6',
        borderRadius: '4px',
        padding: '4px',
        marginBottom: '8px',
      }}
    >
  
      <TextField
        size='small'
        fullWidth
        select 
        value={formData} 
        variant="outlined"
        onChange={handleInputChange}
        sx={{
          background: 'transparent',
          borderRadius: '4px',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
       
        {selectableTask.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>

    <FormControl component="fieldset">
        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
       
          <FormControlLabel
            value="change-required"
            control={<Radio />}
            label="Change Required - Send Back to Draft"
          />

          <FormControlLabel
            value="no-change"
            control={<Radio />}
            label="No Change Required - Ready for Approval"
          />
        </RadioGroup>
      </FormControl>
     
        <Box style={{fontSize:"16px",fontWeight:'500'}} className="text-color">
            Add comments
        </Box>

       </DialogContent>

       <DialogActions style={{padding:'20px 24px',display:'flex', justifyContent:'space-between'}}>
       

        <Box style={{color:"rgba(67, 67, 67, 1)", fontSize:"14px", fontWeight:"300"}}>
          <i>*Required to proceed</i>
        </Box>

        <Box style={{display:'flex', gridColumnGap:'20px'}}>
         <Button onClick={handleCloseReviewcontext} color="primary">
           Cancel
         </Button>

              <Button style={{backgroundColor: "#23608E", color: '#ffffff'}} onClick={handleReviewcontext} variant='contained' component="span">
                 Complete
              </Button>
           
            
            </Box>
          
         
        
       </DialogActions>
     </Dialog>


     <Dialog open={openApprovalcontext} onClose={handleCloseApprovalcontext} maxWidth="sm" fullWidth>
       
       <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Approval Task</DialogTitle>
       <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseApprovalcontext}><IconX/></DialogTitle>
       </Box>

       <DialogContent style={{display:'grid', gridRowGap:"12px"}}>
       
       <Box>Pease select a meaning and outcomes for this approval task, enter your user name and password to complete this task.
         You are performing an electronic signature, which is the legally binding equivalent of a hand written signature</Box>

    <Box>
      <Box style={{fontSize:"18px",fontWeight:'500'}}>Electronic Signature Approval Meaning*</Box>

       <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#E4EDF6',
        borderRadius: '4px',
        marginBottom: '8px',
      }}
    >
  
      <TextField
        size='small'
        fullWidth
        select 
        value={formData} 
        variant="outlined"
        onChange={handleInputChange}
        sx={{
          background: 'transparent',
          borderRadius: '4px',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
       
        {selectableTask.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
    </Box>

    <FormControl component="fieldset">
        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
       
          <FormControlLabel
            value="approval"
            control={<Radio />}
            label="Approval"
          />

          <FormControlLabel
            value="reject"
            control={<Radio />}
            label="Reject"
          />
        </RadioGroup>
      </FormControl>
     
      <Box
       sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        marginBottom: '8px',
        gridRowGap:"10px"
      }}
    >
      <Box>
      <Box style={{fontSize:"18px",fontWeight:'500'}}>Username*</Box>
      <TextField
       size='small'
       fullWidth
        name="username"
        variant="outlined"
        value={formValues.username}
        onChange={handleChange}
        sx={{
          background: '#E4EDF6',
          borderRadius: '4px',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      />
      </Box>

      <Box>
      <Box style={{fontSize:"18px",fontWeight:'500'}}>Password*</Box>
      <TextField
       size='small'
       fullWidth
        name="password"
        type="password"
        variant="outlined"
        value={formValues.password}
        onChange={handleChange}
        sx={{
          background: '#E4EDF6',
          borderRadius: '4px',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      />
      </Box>
    </Box>

        <Box style={{fontSize:"16px",fontWeight:'500'}} className="text-color">
            Add comments
        </Box>

       </DialogContent>

       <DialogActions style={{padding:'20px 24px',display:'flex', justifyContent:'space-between'}}>
       

        <Box style={{color:"rgba(67, 67, 67, 1)", fontSize:"14px", fontWeight:"300"}}>
          <i>*Required to proceed</i>
        </Box>

        <Box style={{display:'flex', gridColumnGap:'20px'}}>
         <Button onClick={handleCloseApprovalcontext} color="primary">
           Cancel
         </Button>

              <Button style={{backgroundColor: "#23608E", color: '#ffffff'}} onClick={handleApprovalcontext} variant='contained' component="span">
                 Complete
              </Button>
           
            
            </Box>
          
         
        
       </DialogActions>
     </Dialog>


     <Dialog open={documentApprove} onClose={handleCloseDocumentApproval} maxWidth="sm" fullWidth>
       
       <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Approval</DialogTitle>
       <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseDocumentApproval}><IconX/></DialogTitle>
       </Box>

       <DialogContent style={{display:'grid', gridRowGap:"16px"}}>
       
       <Box>You are about to start to approval workflow for “SOP for Line Clearance”. 
        Please complete the following field to begin the workflow.</Box>

          <Box>
        <Box className="flexdesign">
            <Box style={{fontSize:"18px",fontWeight:'500'}}>Approval(s)*</Box>
            <Box style={{fontSize:"16px",fontWeight:'400'}}>Assigned to every user</Box>
        </Box>

      
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#E4EDF6',
        borderRadius: '4px',
        padding: '4px',
        marginBottom: '8px',
      }}
    >

      <TextField
        size='small'
        fullWidth
        multiline
        value={formData}
        variant="outlined"
        onChange={handleInputChange}
        sx={{
          background: 'transparent',
          borderRadius: '4px',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      />

      {formData.split('\n').map((line, index) => (
        line.trim() !== '' && (  
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gridColumnGap:'20px',
              background: '#E4EDF6',
              borderRadius: '4px',
              padding:"2px 12px",
            }}
          >
            <Box sx={{width:'fit-content'}}>{line}</Box>
            <IconButton onClick={() => handleRemoveLine(index)} size="small">
              <Image src={Close} alt="clear" width={16} height={16} />
            </IconButton>
          </Box>
        )
      ))}
    </Box>
     

     
        </Box>

        <Box>
        <Box className="flexdesign">
            <Box style={{fontSize:"18px",fontWeight:'500'}}>QA Approval*</Box>
            <Box style={{fontSize:"16px",fontWeight:'400'}}>Available to any user</Box>
        </Box>

      
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#E4EDF6',
        borderRadius: '4px',
        padding: '4px',
        marginBottom: '8px',
      }}
    >

      <TextField
        size='small'
        fullWidth
        multiline
        value={qaformData}
        variant="outlined"
        onChange={handleInputChangeApproval}
        sx={{
          background: 'transparent',
          borderRadius: '4px',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      />

      {qaformData.split('\n').map((line, index) => (
        line.trim() !== '' && (  
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gridColumnGap:'20px',
              background: '#E4EDF6',
              borderRadius: '4px',
              padding:"2px 12px",
            }}
          >
            <Box sx={{width:'fit-content'}}>{line}</Box>
            <IconButton onClick={() => handleRemoveLineApproval(index)} size="small">
              <Image src={Close} alt="clear" width={16} height={16} />
            </IconButton>
          </Box>
        )
      ))}
    </Box>
     

     
        </Box>


        <Box style={{fontSize:"16px",fontWeight:'500'}} className="text-color">
            Add task instruction
        </Box>

        <Box>
            <Box style={{fontWeight:'400'}}>Due Date*</Box>
            <div>
            <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={todaydate}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/yyyy"
          
        />
        </div>
        </Box>

        <Box>
          <Box>Pease complete the required fields below:</Box>
          <Box style={{display:"flex", justifyContent:"center", alignItems:"center", gridColumnGap:"8px"}}>
              <Box style={{fontSize:"14px"}}>Taining Impact*</Box>
              
              <FormControl component="fieldset" >
        <RadioGroup value={selectedValue} onChange={handleRadioChange} style={{display:"flex", flexDirection:"row"}}>
       
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
          />

          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
      </FormControl>

          </Box>
        </Box>
    
       </DialogContent>

       <DialogActions style={{padding:'20px 24px',display:'flex', justifyContent:'space-between'}}>
       

        <Box style={{color:"rgba(67, 67, 67, 1)", fontSize:"14px", fontWeight:"300"}}>
          <i>*Required to proceed</i>
        </Box>

        <Box style={{display:'flex', gridColumnGap:'20px'}}>
         <Button onClick={handleCloseDocumentApproval} color="primary">
           Cancel
         </Button>

              <Button style={{backgroundColor: "#23608E", color: '#ffffff'}} onClick={()=>handleDocumentApproval()} variant='contained' component="span">
                 Start
              </Button>
           
            
            </Box>
          
         
        
       </DialogActions>
     </Dialog>

     <Dialog open={documentTraining} onClose={handleCloseDocumentTraining} maxWidth="sm" fullWidth>
       
       <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Make Effective</DialogTitle>
       <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseDocumentTraining}><IconX/></DialogTitle>
       </Box>

       <DialogContent style={{display:'grid', gridRowGap:"16px"}}>
       
       <Box>Continuing will make "SOP for Line Clearance" Effective. Do you want to proceed</Box>
    
       </DialogContent>

       <DialogActions style={{padding:'20px 24px',display:'flex', justifyContent:'space-between'}}>
       

        <Box style={{color:"rgba(67, 67, 67, 1)", fontSize:"14px", fontWeight:"300"}}>
          <i>*Required to proceed</i>
        </Box>

        <Box style={{display:'flex', gridColumnGap:'20px'}}>
         <Button onClick={handleCloseDocumentTraining} color="primary">
           Cancel
         </Button>

              <Button style={{backgroundColor: "#23608E", color: '#ffffff'}} onClick={()=>handleDocumentTraining()} variant='contained' component="span">
                 Start
              </Button>
           
            
            </Box>
          
         
        
       </DialogActions>
     </Dialog>



         </Box>

         <div className="document-stepper">
               <Grid container display="flex" justifyContent="space-between">
                <Grid item md={2.4} display="flex" justifyContent="center">
               <div style={{display:'flex'}}>
              <div className='draft' style={documentStatus.includes("draft")?completeddraftcolor:Initialdraftcolor}>Draft</div> 
              <div style={documentStatus.includes("draft")?customstylefinalstage:customstylecurrentstage}></div>
              </div>
              </Grid>
              <Grid item md={2.4} display="flex" justifyContent="center">
              <div style={{display:'flex'}}>
              <div className='reviewdata'></div>
              <div className='review' style={documentStatus.includes("draft")?documentStatus.includes("review")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Review</div> 
              <div style={documentStatus.includes("draft")?documentStatus.includes("review")?customstylefinalstage:customstylecurrentstage:customstylefilled}></div>
              </div>
            </Grid>
            <Grid item md={2.4}  display="flex" justifyContent="center" >
              <div style={{display:'flex'}}>
              <div className='reviewdata' ></div>
              <div className='review' style={documentStatus.includes("review")?documentStatus.includes("approval")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Approval</div> 
              <div style={documentStatus.includes("review")?documentStatus.includes("approval")?customstylefinalstage:customstylecurrentstage:customstylefilled}></div>
              </div>
             </Grid>
             <Grid item md={2.4}  display="flex" justifyContent="center">
              <div style={{display:'flex'}}>
              <div className='reviewdata'></div>
              <div className='review' style={documentStatus.includes("approval")?documentStatus.includes("training")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Training</div> 
              <div style={documentStatus.includes("approval")?documentStatus.includes("training")?customstylefinalstage:customstylecurrentstage:customstylefilled}></div>
              </div>
              </Grid>
              <Grid item md={2.4}  display="flex" justifyContent="center">
              <div style={{display:'flex'}}>
              <div className='reviewdata' ></div>
              <div className='released' style={documentStatus.includes("training")?documentStatus.includes("released")?completeddraftcolor:Initialdraftcolor:Initialreviewcolor}>Released</div> 
           
              </div>  
              </Grid>  
              </Grid>
        
         </div>
        </>
     )
}

export default DocumentHeader

/* 
 Approval
 Training
 Relaesed
*/