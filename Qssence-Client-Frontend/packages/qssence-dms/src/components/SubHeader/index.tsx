import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, useTheme, IconButton, 
  Box ,Dialog, DialogTitle, DialogContent,
   DialogActions, TextField,
  FormControl,
  InputLabel,
  Select,
  RadioGroup, Radio, Input,
  
  FormControlLabel,
  Grid} from '@mui/material';
import Link from 'next/link';
import { item } from '../sidebar/MenuItems';
import { usePathname } from 'next/navigation';
import { IconChevronDown, IconChevronsDown, IconChevronsRight,
   IconChevronUp, IconLayoutGrid, IconPlus, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";




type SubHeaderProps = {
  collapseSidebar: boolean;
};

type InputValueType = {
  documenttype: string;
  documentsubtype: string;
  classification: string;
};

const SubHeader: React.FC<SubHeaderProps> = ({ collapseSidebar }) => {
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: null | HTMLElement }>({});
  const [chevronExpanded, setChevronExpanded] = useState(false); 
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const [documentdialogoopen, setdocumentdialogopen]=useState(false)
  const [documentTemplateopen, setdocumentTemplateopen]=useState(false)
  const [time, settime]=useState(false)
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
 
  const [inputValue, setInputValue] = useState<InputValueType>({
    documenttype: '',
    documentsubtype: '',
    classification: '',
  });

  const documenttype = [
    { value: 'Executed Records', label: 'Executed Records' },
    { value: 'Governance & Procedure', label: 'Governance & Procedure' },
    { value: 'Operations', label: 'Operations' },
  ];

  const documentsubtype = [
    { value: 'Guidance', label: 'Guidance' },
    { value: 'Policy', label: 'Policy' },
    { value: 'Standard Operating Procedure (SOP)', label: 'Standard Operating Procedure (SOP)' },
    { value: 'Work Instruction', label: 'Work Instruction' },
  ];

  const classification = [
    { value: 'classification1', label: 'classification1' },
    { value: 'classification2', label: 'classification2' },
 
  ];


  const handleChangedocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    assignedTo: '',
    dueDate: '',
    completionDate: '',
    timeDuration: '',
    completeTask: '',
    description: ''
  });

  const routers = useRouter();

  const [show, setShow]=useState(false)

  const [filedocument, setFile] = useState<File | null>(null);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id: string) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: null,
    }));
  };


 useEffect(()=>
  {
      
    if(pathname.startsWith("/library"))
    {
    
    }
    else if(pathname.includes("/deviations"))
      {
       
      }
      
  },[pathname])


  const handleDashboard = () => {
    routers.push("/");
  };

  const handleCloseX=()=>
  {
     setDialogOpen(false)
  }

  useEffect(()=>
  {
    if(Boolean(menuAnchor))
    {
      setChevronExpanded(true); 
    }
    else
    {
      setChevronExpanded(false); 
    }
     
  },[menuAnchor])

  const handleDropdownClick = () => {
    setDropdownOpen((prev) => !prev); 
  };


  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

   

  const visibleItems = collapseSidebar?item.slice(0, 8):item.slice(0, 7); 
  const overflowItems = collapseSidebar?item.slice(8):item.slice(7); 

  const handleTask = () => {
    setDropdownOpen(false)
    setDialogOpen(true);
  };

  const handleDeviation=()=>
  {
    localStorage.setItem("newdeviation",JSON.stringify(true))
    routers.push('/quality-management/deviations/create')
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDocument=()=>
  {
     setDropdownOpen(false)
     setdocumentdialogopen(true)
  }

  const handleCloseDocumentDialog=()=>
  {

    setdocumentdialogopen(false)
  }

  const handleCloseDocumentTemplate=()=>
  {
      setdocumentTemplateopen(false)
  }

  const handleDocumentTemplateRendering=()=>
  {
     localStorage.setItem("template", JSON.stringify(true))
     setdocumentTemplateopen(false)
     setInputValue({
      documenttype: '',
      documentsubtype: '',
      classification: '',
     })
  }



  const handleInputChange = (event) => {

    const {name, value} = event.target;

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleDocumentRendering=(selectedOption: string)=>
  {
    
      if(selectedOption==="documentFromTemplate")
      {
        setSelectedOption('')
        setdocumentdialogopen(false)
        setdocumentTemplateopen(true)
        
      }

     if(time)
     {
      setdocumentdialogopen(false)
     }



  }

  useEffect(()=>
  {
    
      if (filedocument) {
  
        console.log("file",filedocument)
        const reader = new FileReader();
        reader.readAsDataURL(filedocument);
        reader.onload = () => {
          localStorage.setItem('uploadedPdf', reader.result as string);
          settime(true)
           routers.push('/library/document')
        };
      }
     

  },[filedocument])

  console.log("file",filedocument)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0];

    console.log("selectedFile", selectedFile)
    console.log(event)

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  console.log("selectedOption",selectedOption)

  return (
    <AppBar position="static" sx={{ background: "#fff", borderBottom: "1px solid #CCD6DE" }} elevation={0}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: 'relative',
          gap: '4px',
          paddingLeft: '0px',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handleDashboard}>
          <IconLayoutGrid fontSize="inherit" />
        </IconButton>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
          {visibleItems.map((items) => (
            <React.Fragment key={items.id}>
              {items.type === 'single' ? (
                <Link href={items.link || '#'} passHref>
                  <Button
                    sx={{
                      color: pathname.startsWith(items.link) ? theme.palette.primary.main : "#434343",
                      fontWeight: pathname.startsWith(items.link) ? "700" : "600",
                      textDecoration: pathname.startsWith(items.link) ? '2px underline' : null,
                      textUnderlineOffset: pathname.startsWith(items.link) ? '10px' : null,
                      fontSize: "13px",
                    }}
                  >
                    {items.title}
                  </Button>
                </Link>
              ) : (
                <div key={items.id}>
                  <Button
                    aria-controls={items.id}
                    aria-haspopup="true"
                    onClick={(e) => handleMenu(e, items.id)}
                    sx={{
                      color: pathname.includes(items.link || "#") ? theme.palette.primary.main : "#434343",
                      fontWeight: pathname === items.link ? "700" : "600",
                      textDecoration: `1px solid ${theme.palette.primary.main}`,
                      fontSize: "13px",
                    }}
                    endIcon={Boolean(anchorEl[items.id]) ? <IconChevronUp width={18} height={18} /> : <IconChevronDown width={18} height={18} />} // Dropdown arrow
                  >
                    {items.title}
                  </Button>
                  <Menu
                    id={items.id}
                    anchorEl={anchorEl[items.id]}
                    keepMounted
                    open={Boolean(anchorEl[items.id])}
                    onClose={() => handleClose(items.id)}
                  >
                    {items.data?.map((subItem) => (
                      <Link key={subItem.id} href={subItem.link || '#'} passHref>
                        <MenuItem onClick={() => handleClose(items.id)} sx={{
                          color: pathname === subItem.link ? theme.palette.primary.main : "#434343",
                          fontWeight: pathname === subItem.link ? "700" : "600",
                          fontSize: "14px",
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                          }
                        }}>
                          {subItem.title}
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </div>
              )}
            </React.Fragment>
          ))}

   
          {overflowItems.length > 0 && (
            <IconButton onClick={handleMenuClick}>
              {chevronExpanded ? (
                <IconChevronsDown fontSize="inherit" style={{ color: '#236083', backgroundColor: "#e4edf6", borderRadius: '50%', strokeWidth: '1.5' }} />
              ) : (
                <IconChevronsRight fontSize="inherit" style={{ color: '#236083', backgroundColor: "#e4edf6", borderRadius: '50%', strokeWidth: '1.5' }} />
              )}
            </IconButton>
          )}

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            {overflowItems.map((item) => (
              <Link key={item.id} href={item.link || '#'} passHref>
                <MenuItem onClick={handleMenuClose} sx={{
                  color: pathname === item.link ? theme.palette.primary.main : "#434343",
                  fontWeight: pathname === item.link ? "700" : "600",
                  fontSize: "13px",
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  }
                }}>
                  <div style={{display:'flex',justifyContent:'space-between', width:"100%"}}> 
                  {item.title}
                  {item.type === 'multiple' && <IconChevronDown fontSize="inherit" style={{ color: '#434343', marginLeft: '10px' }} />}  
                   </div>
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </div>

        <Box style={{ display: 'flex', gridColumnGap: "2px", alignItems: 'center',position:"relative" }}>
          <Button style={{ backgroundColor: "#23608E", color: '#ffffff', borderRadius: "10px 0px 0px 10px", cursor: 'pointer', padding: "0px", minWidth: "0px" }}>
            <IconButton>
              <IconPlus fontSize="inherit" style={{ color: "#ffffff", strokeWidth: '2' }} />
            </IconButton>
            <Box style={{ fontWeight: "550", fontSize: "14px", paddingRight: "10px" }}>Create Record</Box>
          </Button>
          <Button
            style={{
              backgroundColor: "#23608E",
              color: '#ffffff',
              borderRadius: "0px 10px 10px 0px",
              cursor: 'pointer',
              padding: "0px",
              minWidth: "0px",
              position:'relative'
            }}
            onClick={handleDropdownClick} 
          >
            <IconButton>
              <IconChevronDown fontSize="inherit" style={{ color: "#ffffff", strokeWidth: '1.5' }} />
            </IconButton>
          </Button>
          {dropdownOpen &&
           <>
            {(()=>
            {
                
            if(pathname.startsWith("/library"))
              {
                 return (
                  <>
                   <div className='dropdown'>
                  <ul>
                    <li onClick={handleTask}>
                    <IconButton>
                      <IconPlus  style={{ color: "#000000", transform:"scale(0.8)" }} />
                    </IconButton>
                    User Task
                    </li>
                    <li onClick={handleDocument}>
                    <IconButton>
                      <IconPlus  style={{ color: "#000000", transform:"scale(0.8)" }} />
                    </IconButton>
                    Document
                    </li>
                  </ul>

                  </div>
                  </>
                 )
              }
              else if(pathname.includes("/deviations"))
                {
                  return (
                    <>
                     <div className='dropdown'>
                    <ul>
                      <li onClick={handleDeviation}>
                      <IconButton>
                        <IconPlus  style={{ color: "#000000", transform:"scale(0.8)" }} />
                      </IconButton>
                        Deviations
                      </li>
                    </ul>
  
                    </div>
                    </>
                   )
                }
             
            })()}

         
          </>
          
          }
       
        </Box>
       
      </Toolbar>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
       
        <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Create User Task</DialogTitle>
        <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseX}><IconX/></DialogTitle>
        </Box>

        <DialogContent>
        <form noValidate autoComplete="off">
          
          <Box>
            
             <Grid container spacing={{sm:2,md:2,xs:2}} display="flex" justifyContent="space-between">
              
              <Grid item md={6} sm={6} xs={12} style={{paddingTop:"0px"}} >

              <TextField
              size='small'
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                background: 'rgba(35, 96, 142, 0.1)',
                borderRadius: '4px',
                '.MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(140, 140, 140, 0.5)' },
              }}
            />

            </Grid>
            
            <Grid item md={6} sm={6} xs={12} style={{paddingTop:"0px"}}>
            <TextField
              size='small'
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                background: 'rgba(35, 96, 142, 0.1)',
                borderRadius: '4px',
                '.MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(140, 140, 140, 0.5)' },
              }}
            />
           </Grid>

           <Grid item md={12} sm={12} xs={12} style={{paddingTop:"0px"}}>
           
            <FormControl fullWidth margin="normal" 
                 size='small' 
                  sx={{
                  background: 'rgba(35, 96, 142, 0.1)',
                  borderRadius: '4px',
                  '.MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(140, 140, 140, 0.5)' },
                }}>
              <InputLabel>Assigned To</InputLabel>
              <Select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                label="Assigned To"
              >
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>

            </Grid>


            <Grid item md={6} sm={6} xs={12} style={{paddingTop:"0px"}}>

            <TextField
              size='small'
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{
                background: 'rgba(35, 96, 142, 0.1)',
                borderRadius: '4px',
                '.MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(140, 140, 140, 0.5)' },
              }}
            />
           
           </Grid>

             <Grid item md={6} sm={6} xs={12} style={{paddingTop:"0px"}}>

            <TextField
              size='small'
              label="Completion Date"
              name="completionDate"
              type="date"
              value={formData.completionDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{
                background: 'rgba(35, 96, 142, 0.1)',
                borderRadius: '4px',
                '.MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(140, 140, 140, 0.5)' },
              }}
            />
            </Grid>

            <Grid item md={6} sm={6} xs={12} style={{paddingTop:"0px"}}>
            
            <TextField
               size='small'
              label="Time Duration"
              name="timeDuration"
              value={formData.timeDuration}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                background: 'rgba(35, 96, 142, 0.1)',
                borderRadius: '4px',
                '.MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(140, 140, 140, 0.5)' },
              }}
            />

            </Grid>
            <Grid item md={6} sm={6} xs={12} style={{paddingTop:"0px"}}>

            <FormControl fullWidth margin="normal"  size='small'  sx={{
                  background: 'rgba(35, 96, 142, 0.1)',
                  borderRadius: '4px',
                  '.MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(140, 140, 140, 0.5)' },
                }}>
              <InputLabel>Complete Task</InputLabel>
              <Select
                
                name="completeTask"
                value={formData.completeTask}
                onChange={handleChange}
                label="completeTask"
              >
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>

            </Grid>
            <Grid item md={12} sm={12} xs={12} style={{paddingTop:"0px"}}>
            
            <TextField
              size='small'
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={2}
              sx={{
                background: 'rgba(35, 96, 142, 0.1)',
                borderRadius: '4px',
                '.MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(140, 140, 140, 0.5)' },
              }}
            />

          </Grid>
          
          </Grid>
          
          </Box>
         
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Reset
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={documentdialogoopen} onClose={handleCloseDocumentDialog} maxWidth="sm" fullWidth>
       
       <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Create Document</DialogTitle>
       <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseDocumentDialog}><IconX/></DialogTitle>
       </Box>

       <DialogContent>
       <form noValidate autoComplete="off">
       <FormControl component="fieldset">
      <RadioGroup
        aria-label="document-options"
        name="document-options"
        value={selectedOption}
        onChange={handleChangedocument}
      >
        <FormControlLabel
          value="uploadDocument"
          control={<Radio color="primary" />}
          label="Upload document"
        />
        <FormControlLabel
          value="Placeholder"
          control={<Radio color="primary" />}
          label="Placeholder"
        />
        <FormControlLabel
          value="documentFromTemplate"
          control={<Radio color="primary" />}
          label="Document from template"
        />
        <FormControlLabel
          value="binder"
          control={<Radio color="primary" />}
          label="Binder"
        />
      </RadioGroup>
    </FormControl>
         </form>
       </DialogContent>
       <DialogActions style={{padding:'20px 24px'}}>
         <Button onClick={handleCloseDocumentDialog} color="primary">
           Cancel
         </Button>
         {selectedOption === 'uploadDocument' && (
            <Box>
              <Input
                type="file"
                inputProps={{ accept: '.pdf' }}
                onChange={handleFileSelect}
                style={{ display: 'none' }} 
                id="fileInput"
              />
              <label htmlFor="fileInput">
              <Button color="primary" onClick={()=>handleDocumentRendering(selectedOption)} variant='contained' component="span">
                 Continue
              </Button>
              </label>
            
            </Box>
          )}
          {selectedOption!=='uploadDocument' && ( 

                <Button onClick={()=>handleDocumentRendering(selectedOption)} color="primary" variant='contained'>
                Continue
              </Button>)
          }
        
       </DialogActions>
     </Dialog>

     <Dialog open={documentTemplateopen} onClose={handleCloseDocumentTemplate} maxWidth="sm" fullWidth>
       
       <Box style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <DialogTitle style={{fontSize:"20px", fontWeight:"600"}}>Document from Template(Step 1)</DialogTitle>
       <DialogTitle style={{cursor:"pointer"}} onClick={handleCloseDocumentTemplate}><IconX/></DialogTitle>
       </Box>

       <DialogContent>
       <form noValidate autoComplete="off">
       <FormControl fullWidth style={{display:'grid', gridRowGap:'20px'}}>
      <TextField
        size="small" 
        name="documenttype"
        label="Document Type Select"
        value={inputValue.documenttype}
        onChange={handleInputChange} 
        select 
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        {documenttype.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size="small" 
        name="documentsubtype"
        label='Document subtype Select'
        value={inputValue.documentsubtype}
        onChange={handleInputChange} 
        select 
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        {documentsubtype.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>


      <TextField
        size="small" 
        name="classification"
        label="Classification"
        value={inputValue.classification}
        onChange={handleInputChange} 
        select 
        variant="outlined"
        sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        
        {classification.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>

         </form>
       </DialogContent>
       <DialogActions style={{padding:'20px 24px'}}>
         <Button onClick={handleCloseDocumentTemplate} color="primary">
           Cancel
         </Button>
       
         <Button onClick={()=>handleDocumentTemplateRendering()} color="primary" variant='contained'>
           Next
          </Button>
          
        
       </DialogActions>
     </Dialog>
          
          
     
    </AppBar>
    
  );
};

export default SubHeader;

/*  <Menu
            anchorEl={dropdownOpen ? document.body : null}
            open={dropdownOpen}
            onClose={handleDropdownClick} 
           style={{position:'absolute'}}
          >
            <MenuItem onClick={handleDropdownClick}>+ User task</MenuItem>
            <MenuItem onClick={handleDropdownClick}>+ Document</MenuItem>
          </Menu>
          */
