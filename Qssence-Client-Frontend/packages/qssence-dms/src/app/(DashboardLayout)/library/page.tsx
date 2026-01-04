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
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconCheckbox, IconEdit, IconPencil, IconStar } from "@tabler/icons-react";
import Dropdown from "../../../../public/dropdown.svg"
import Cart from "../../../../public/cart.svg"
import Download from "../../../../public/download.svg"
import Vector from "../../../../public/Vector.png"
import Hamburger from "../../../../public/hamburger.svg"
import List from "../../../../public/list.svg"
import Compact from "../../../../public/compact.svg"
import HorizontalIcon from "../../../../public/horizontal.svg"
import Linkcopy from "../../../../public/link.svg"
import VectorLink from "../../../../public/Vector.svg"
import Downloadnotes from "../../../../public/download.svg"
import Users from "../../../../public/users.svg"
import Audit from "../../../../public/audit.svg"
import Copy from "../../../../public/copy.svg"
import Trash from "../../../../public/trash.svg"
import Plus from "../../../../public/plus.svg"
import Login from "../../../../public/log-in.svg"
import Upload from "../../../../public/upload.svg"
import Rotation from "../../../../public/rotate-cw.svg"
import unlock from "../../../../public/unlock.svg"
import File from "../../../../public/file-text.svg"
import Gitmerge from "../../../../public/git-merge.svg"
import Clock from "../../../../public/clock.svg"
import Pdf from "../../../../public/pdf-file.svg"
import Image from "next/image";
import Generaldocument from "./document/page";
import Soptemplate from "./document/template";
import Applicability from "./document/applicability";
import Training from "./document/training";
import Statusdates from "./document/status";
import Periodic from "./document/perodic";
import Information from "./document/information";
import DocumentHeader from "@/components/DocumentHeader";


export default function FullLibrary() {

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };



  const [tabpanel, setTabpanel] = useState(null);

  const [sopgeneral, setSopgeneral] = useState(null);

  const [template, setTemplate]=useState(null)

  useEffect(() => {
    const savedTabpanel = localStorage.getItem('tabpanel');

    const Sopgeneral= JSON.parse(localStorage.getItem('Sopgeneral'))

    const Template= JSON.parse(localStorage.getItem("template"))

    setTemplate(Template?Template:null)
    setSopgeneral(Sopgeneral?Sopgeneral:null)

    setTabpanel(savedTabpanel?savedTabpanel:"General");
  }, []);

  const [value, setValue] = React.useState(tabpanel);


  useEffect(()=>
  {
    if(tabpanel)
    {
      setValue(tabpanel)
    }
  },[tabpanel])

  const [open, SetOpen] = useState(false)

  const [openAction, setOpenaction] = useState(false)

  const [openDownload, setOpendownload] = useState(false)



  const handleChangeTemplate = (valuetemplate: string) => {
  
      setValue(valuetemplate)
  }

  const handlehumber=()=>
  {
     SetOpen(!open)
  }

  const handleAction=()=>
  
  {

    setOpenaction(!openAction)
  }

  const handleDownload=()=>
  {
   
     setOpendownload(!openDownload)
  }

  const VerticalDivider = () => {
    return (
      <Box
        sx={{
          height: '100%',      
          width: '1px',        
          backgroundColor: 'rgba(206, 190, 190, 1)',    
        }}
      />
    );
  };



  return (
    <>

     {template? 
     <>
    {(sopgeneral && value) ?

      <DocumentHeader/>

      :
      <div style={{
        maxWidth: "100%!important",
    }}>
     <div className="description documenttemplatedata" >

     <h1 className="header_title">Document From Template(Step 2)</h1>

     </div>
     </div>
     }
     
     <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
                paddingInline:"20px"
						}}>
     <PageContainer title="Dashboard" description="this is Dashboard" >
    
        <Box sx={{ typography: 'body1' }} style={sopgeneral?{marginTop:"20px"}:{}}>
          <TabContext value={value}>
          
              <TabList
                onChange={(event, newValue) => {
                 localStorage.setItem('tabpanel', newValue);  
                  setValue(newValue);
                }}
                aria-label="lab API tabs example"
                sx={{
                  display: 'inline-flex',
                  padding: 0, 
                  margin: 0, 
                }}
              >
                <Tab label="General" value="General" style={{ padding: '8px 16px', background:'#ffffff', textTransform:'none',fontWeight:600 }} />
                <Tab label="Applicability" value="Applicability" style={{ padding: '8px 16px',background:'#ffffff',textTransform:'none' }} />
                <Tab label="Training" value="Training" style={{ padding: '8px 16px',background:'#ffffff',textTransform:'none' }} />
                <Tab label="Status Dates" value="Status Dates" style={{ padding: '8px 16px',background:'#ffffff',textTransform:'none' }} />
                <Tab label="Periodic Review" value="Periodic Review" style={{ padding: '8px 16px',background:'#ffffff',textTransform:'none' }} />
                <Tab label="Change information" value="Change information" style={{ padding: '8px 16px',background:'#ffffff',textTransform:'none' }} />
              </TabList>
          
            <TabPanel value="General" style={{padding:"0px"}}>
               <Box>
               <CardContainer>
                <Grid container>
                  
                  <Grid item md={3.6} sm={3.6}>

                  <Generaldocument handleChangeTemplate={handleChangeTemplate}/>

                  </Grid>

                  <Grid item md={0.2} sm={0.2} justifyContent="center">
                    
                    <VerticalDivider />
                 
                  </Grid>
 
                  <Grid item md={8.2} sm={8.2} justifyContent="center">
                    
                    <Soptemplate/>
                 
                  </Grid>

                </Grid>
                </CardContainer>
               </Box>
             
        
            </TabPanel>
            <TabPanel value="Applicability" style={{padding:"0px"}}>
              
            <Box>
              <CardContainer>
               <Grid container>
                 
                 <Grid item md={3.6} sm={3.6}>

                 <Applicability handleChangeTemplate={handleChangeTemplate}/>

                 </Grid>

                 <Grid item md={0.2} sm={0.2} justifyContent="center">
                   
                   <VerticalDivider />
                
                 </Grid>

                 <Grid item md={8.2} sm={8.2} justifyContent="center">
                   
                   <Soptemplate/>
                
                 </Grid>

               </Grid>
               </CardContainer>
              </Box>
              
              </TabPanel>
            <TabPanel value="Training" style={{padding:"0px"}}>
              
            <Box>
            <CardContainer>
               <Grid container>
                 
                 <Grid item md={3.6} sm={3.6}>

                 <Training handleChangeTemplate={handleChangeTemplate}/>

                 </Grid>

                 <Grid item md={0.2} sm={0.2} justifyContent="center">
                   
                   <VerticalDivider />
                
                 </Grid>

                 <Grid item md={8.2} sm={8.2} justifyContent="center">
                   
                   <Soptemplate/>
                
                 </Grid>

               </Grid>
               </CardContainer>
              </Box>
              
             
              </TabPanel>

            <TabPanel value="Status Dates" style={{padding:"0px"}}>
              
            <Box>
            <CardContainer>
               <Grid container>
                 
                 <Grid item md={3.6} sm={3.6}>

                 <Statusdates handleChangeTemplate={handleChangeTemplate}/>

                 </Grid>

                 <Grid item md={0.2} sm={0.2} justifyContent="center">
                   
                   <VerticalDivider />
                
                 </Grid>

                 <Grid item md={8.2} sm={8.2} justifyContent="center">
                   
                   <Soptemplate/>
                
                 </Grid>

               </Grid>
               </CardContainer>
              </Box>
              
             
              </TabPanel>

            <TabPanel value="Periodic Review" style={{padding:"0px"}}>
             
            <Box>
           <CardContainer>
               <Grid container>
                 
                 <Grid item md={3.6} sm={3.6}>

                 <Periodic handleChangeTemplate={handleChangeTemplate}/>

                 </Grid>

                 <Grid item md={0.2} sm={0.2} justifyContent="center">
                   
                   <VerticalDivider />
                
                 </Grid>

                 <Grid item md={8.2} sm={8.2} justifyContent="center">
                   
                   <Soptemplate/>
                
                 </Grid>

               </Grid>
               </CardContainer> 
              </Box>
              
             
              </TabPanel>

            <TabPanel value="Change information" style={{padding:"0px"}}>
              
            <Box>
              <CardContainer>
               <Grid container>
                 
                 <Grid item md={3.6} sm={3.6}>

                 <Information handleChangeTemplate={handleChangeTemplate}/>

                 </Grid>

                 <Grid item md={0.2} sm={0.2} justifyContent="center">
                   
                   <VerticalDivider />
                
                 </Grid>

                 <Grid item md={8.2} sm={8.2} justifyContent="center">
                   
                   <Soptemplate/>
                
                 </Grid>

               </Grid>
               </CardContainer>  
              </Box>
              
              
              </TabPanel>
         
          </TabContext>
        </Box>
     
    </PageContainer>
    </div> 
</>

        : 
       
        <> 
        <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
                paddingInline:"20px"
						}}>
        <div className="description">

        <h1 className="header_title">All Full Library</h1>

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
      <Table>
        <TableHead >
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', fontSize:"16px" }}>Document File</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>User Name</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>Document No</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>Document Type</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>Status</TableCell>
            <TableCell  style={{ display:'grid',justifyContent:'center', paddingLeft:"20px", position:'relative' }} >
           
            <Image onClick={handlehumber} src={Dropdown} alt="logo" height={20} width={40} priority />
           
            {open &&
            <div className="dropdowndata">
            <ul>
           
            <li className="flex"> 
            <Image src={List} alt="logo" className="thumbnail" priority />
    
              Details
              </li>
            <li className="flex">
            <Image src={Hamburger} alt="logo" className="thumbnail" priority />
  
              Thumbnail
              </li>
            <li className="flex">
            <Image src={Compact} alt="logo" className="thumbnail" priority />
               Compact
                </li>
            <li className="flex">
            <Image src={Vector} alt="logo" className="thumbnail" style={{transform:"scale(0.8)"}} priority /> 
              Grid 
              </li>

            </ul>
           </div>
          
          }
            </TableCell>
          </TableRow>
        </TableHead>
       
        
        <TableBody style={{position:"relative",top:"6px"}}>
        <TableRow>
        <TableCell>
      
         <Box className="document-upload">
           <div className="document-image">Document Image</div> 
            <IconStar className="stars" />
         </Box>

          </TableCell>
            <TableCell className="text-color" >Rohan(v0.2)</TableCell>
            <TableCell>ECV - 01264</TableCell>
            <TableCell>{"Operations > Employee"}</TableCell>
            <TableCell >
            
            <div className="full-status">
              In Draft
              </div>
              
              </TableCell>
            <TableCell>
              
            <Box className="downloaddata">

        
          <Image src={Download} onClick={handleDownload} alt="logo"  priority style={{
          filter: openDownload
          ? 'invert(23%) sepia(53%) saturate(483%) hue-rotate(162deg) brightness(92%) contrast(97%)'
          : 'none',
            position:'relative'
        }}  />

          {openDownload &&
            <div className="dropdowndownload">
            <ul>
           
            <li className="flex-download"> 
            <Image src={File} alt="logo"  priority />
    
             Source File
              </li>
            <li className="flex-download">
            <Image src={Pdf} alt="logo"  priority />
  
              View Rendition
              </li>
           

            </ul>
           </div>
          
          }


          <Image src={HorizontalIcon}  onClick={handleAction} alt="logo"  priority style={{position:'relative'}} />

          {openAction &&
            <div className="dropdownaction">
           
             <Box className="dropdowntitle">Manage</Box>
            <ul className="dropdownlist">
             
            <li className="flex"> 
            <Image src={VectorLink} alt="logo"  priority />
    
             Send as link
              </li>
            <li className="flex">
            <Image src={Linkcopy} alt="logo"  priority />
  
            Copy Link
              </li>
            <li className="flex">
            <Image src={Login} alt="logo"  priority />
            Download Notes
                </li>
            <li className="flex">
            <Image src={Users} alt="logo"  style={{transform:"scale(0.8)"}} priority /> 
             Sharing Settings
              </li>

            </ul>

            <Box className="dropdowntitle">View</Box>
            <ul className="dropdownlist">
             
            <li className="flex"> 
            <Image src={Clock} alt="logo"  priority />
             Workflow History 
              </li>
            <li className="flex">
            <Image src={Gitmerge} alt="logo"  priority />
  
              Where Used 
              </li>
            <li className="flex">
            <Image src={Compact} alt="logo" priority />
             Version History
                </li>
            <li className="flex">
            <Image src={Audit} alt="logo" priority /> 
              Audit Trail
              </li>

            </ul>

            <Box className="dropdowntitle">Edit</Box>
            <ul className="dropdownlist">
             
            <li className="flex"> 
            <Image src={unlock} alt="logo"  priority />
           Check Out
              </li>
            <li className="flex">
            <Image src={Upload} alt="logo"  priority />
  
             Upload new Version
              </li>
            <li className="flex">
            <Image src={Plus} alt="logo"  priority />
            Create Draft
                </li>
            <li className="flex">
            <Image src={Rotation} alt="logo"  priority /> 
             Re-render Document
              </li>

              <li className="flex">
            <Image src={File} alt="logo"  priority /> 
            Word Rendition Settings
              </li>


              <li className="flex">
            <Image src={Copy} alt="logo"  priority /> 
            Make a Copy
              </li>


              <li className="flex">
            <Image src={Trash} alt="logo"  priority /> 
             Delete
              </li>

            </ul>

           </div>
          
          }

          </Box>

            </TableCell>
        </TableRow>

        <TableRow>
        <TableCell >
    
        
        <Box className="document-upload">
           <div className="document-image">Document Image</div> 
            <IconStar className="stars" />
         </Box>
          
          </TableCell>
          <TableCell className="text-color">Vikash(v0.2)</TableCell>
            <TableCell>ECV - 01232</TableCell>
            <TableCell>{"Operations > Employee"}</TableCell>
            <TableCell>
            
            <div className="full-status">
              In Review
              </div>

              </TableCell>
            <TableCell>
          
              <Box className="downloaddata">

      
             <Image src={Download} alt="logo"  priority />
             <Image src={HorizontalIcon} alt="logo"  priority />
            
             </Box>
         

            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell> 
       
        <Box className="document-upload">
           <div className="document-image">Document Image</div> 
            <IconStar className="stars" />
         </Box>

          </TableCell>
          <TableCell className="text-color">Suman(v0.2)</TableCell>
            <TableCell>ECV - 01208</TableCell>
            <TableCell>{"Operations > Employee"}</TableCell>
            <TableCell >
         
              <div className="full-status">
              Approved
              </div>

              </TableCell>
            <TableCell>
            
            <Box className="downloaddata">

          <Image src={Download} alt="logo"  priority />
          <Image src={HorizontalIcon}  alt="logo"  priority />

          </Box>

            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell> 
         
         <Box className="document-upload">
           <div className="document-image">Document Image</div> 
            <IconStar className="stars" />
         </Box>

          </TableCell>
          <TableCell className="text-color">Ankit(v0.2)</TableCell>
          <TableCell>ECV - 01218</TableCell>
          <TableCell>{"Operations > Employee"}</TableCell>
            <TableCell>
            <div className="full-status">
              In Training
              </div>
              </TableCell>
            <TableCell>
              
            <Box className="downloaddata">

          <Image src={Download} alt="logo"  priority />
          <Image src={HorizontalIcon} alt="logo"  priority />

          </Box>

            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell> 
        
         <Box className="document-upload">
           <div className="document-image">Document Image</div> 
            <IconStar className="stars" />
         </Box>

          </TableCell>
          <TableCell className="text-color">Abhay(v0.2)</TableCell>
          <TableCell>ECV - 01215</TableCell>
            <TableCell>{"Operations > Employee"}</TableCell>
            <TableCell>
              <div className="full-status">
              In Approved
                </div></TableCell>
            <TableCell>
              
            <Box className="downloaddata">

 
          <Image src={Download} alt="logo"  priority />
          <Image src={HorizontalIcon} alt="logo"  priority />

          </Box>

            </TableCell>
        </TableRow>
        </TableBody>
      </Table>

        </CardContainer>
      </PageContainer>
      </div>
      </>
      
        }
      </>
  );
} 



