"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { AlertHandler, CommonDialogWorkflow } from "qssence-common";
import Typography from "@mui/material/Typography";
import { AlertColor, Button, Grid, Menu, MenuItem, Popover, Tab } from "@mui/material";
import AllDmsWorkflowDataList from "@/components/workflow/dms-workflow/AllDmsWorkflowList";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useMediaQuery } from "@mui/material";
import {useForm, Controller } from "react-hook-form";
import { PrimarySelectField, PrimaryTextField } from "qssence-common"
import countries from "world-countries";
import { IconPlus } from "@tabler/icons-react";
import AddWorkFlow from "@/components/workflow/qms-workflow/addWorkFlow/page";
import AllWorkflowStateList from "@/components/workflow/AllWorkflowStateList/page";



export default function AllPlants() {
  const { setActiveTab } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [tabData, setTabData] = useState(null);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const handleTabData = (row) => {
    setTabData(row);
  };

  useEffect(() => {
    setActiveTab("");
  }, [setActiveTab]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
   
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
  
  });

  const [value, setValue] = React.useState("Global Workflow");

  const isSmScreen = useMediaQuery('(max-width:768px)');

  const [selectedField, setSelectedField] =useState("")

  const [showfield, setShowfield]=useState(false)

  const [countriesList, setCountriesList] = useState([]);

  const [selectCountry, setSelectCountry] = useState("")

  const [plantList, setPlantList]=useState([])

  const [anchorEl, setAnchorEl] = useState(null);

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState(null);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleChange = (value: string) => {

    setShowfield(false)
    setSelectedField(value)
  
};

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
  setPopoverOpen(true);
};

const handleClose = () => {
  setPopoverOpen(false);
  setAnchorEl(null);
};

const handleMenuItemClick = (option) => {
  handleClose(); 
  setDialogTitle(option.title)
  setDialogContent(option.content)
  setOpen(true);

 
};



const handleCountryChange = (value: string) => {

   setSelectCountry(value)

};

const handleSearch=()=>
{
    setShowfield(true)
}

const handleClickOpen = () => {
  setOpen(true);
};



const workflowOptions = [
  {
    title: "Create Global Workflow",
    content: <AddWorkFlow type="Global" setAlertHandler={setAlertHandler} setClose={setOpen} />,
  },
  {
    title: "Create Region Workflow",
    content: <AddWorkFlow type="Region" setAlertHandler={setAlertHandler}  setClose={setOpen} />,
  },
  {
    title: "Create Local Workflow",
    content: <AddWorkFlow type="Local" setAlertHandler={setAlertHandler}  setClose={setOpen} />,
  },
];

useEffect(() => {
  if (selectedField) {
     if(selectedField==="North America"||selectedField==="South America"||selectedField==="Caribbean")
     {
    const filteredCountries = countries
      .filter((country) => country.subregion === selectedField)
      .map((country) => ({
        value: country.name.common, 
        label: country.name.common, 
      }));
    setCountriesList(filteredCountries);
     }
     else {
      const filteredCountries = countries
      .filter((country) => country.region === selectedField)
      .map((country) => ({
        value: country.name.common, 
        label: country.name.common, 
      }));
    setCountriesList(filteredCountries);
     }
  } else {
    setCountriesList([]);
  }
}, [selectedField]);

//  onClick={handleClickOpen}


  return (
   
        <>
          <AlertHandler alertHandler={alertHandler} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 className="header_title primary_color paddingBlock">
              Workflow State
            </h1>

            {/* <Button
              style={{ color: "white", backgroundColor: "#23608E" }}
              onMouseEnter={handleMenuOpen}
            
            >

          <IconPlus height={18} width={18}    /> &nbsp;
              Create Workflow
             </Button> */}

            <CommonDialogWorkflow
              dialogTitle={dialogTitle}
              dialogContent={dialogContent}
              onSave={() => {
                console.log("save");
              }}
              open={open}
              setOpen={setOpen}
            />
          
          <Popover
          id="workflow-popover"
          open={popoverOpen}
          style={{
            pointerEvents: "auto",
            cursor: "pointer",
            marginTop: "6px",
            zIndex: "1300",
          }}
          anchorEl={anchorEl}
          onClose={handleClose}
          onMouseLeave={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
      >
        {workflowOptions.map((option, index) => (
          <MenuItem
            key={index}
            style={{ cursor: "pointer" }}
   
            onClick={() => handleMenuItemClick(option)}
          >
            {option.title}
          </MenuItem>
        ))}
      </Popover>
          </div>
          
        
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
            <Tab label="Global Workflow" value="Global Workflow" style={{ padding: '8px 16px', background:'#ffffff', textTransform:'none',fontWeight:600 }} />
            <Tab label="Region Workflow" value="Region Workflow" style={{ padding: '8px 16px',background:'#ffffff',textTransform:'none' }} />
            <Tab label="Local Workflow" value="Local Workflow" style={{ padding: '8px 16px',background:'#ffffff',textTransform:'none' }} />
  
          </TabList>
      
        <TabPanel value="Global Workflow" style={{padding:"0px"}}>
        <div
            style={{
             
              background: "#fff",
              minHeight: "90vh",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >  
        <AllWorkflowStateList
              selectedField={null}
              value="Global Workflow"
              open={open}
              setAlertHandler={setAlertHandler}
            />
         </div>
          </TabPanel>

        <TabPanel value="Region Workflow" style={{padding:"0px"}}>
          
        <div
            style={{
             
              background: "#fff",
              minHeight: "90vh",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >  
          <Grid container spacing={3} style={{paddingBlock:"20px"}}>
          

          <Grid item xs={12} md={5} sm={isSmScreen?12:6} style={{display:"flex", gridColumnGap:"20px"}}>
        
         <Controller
            name="region"
            control={control}
            render={({ field, fieldState: { error } }) => (
            
        <PrimarySelectField
          {...field}
          id="region"
          label={
            <>
              Select Region<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
            </>
          }

         
          onChange={(e) => {
            field.onChange(e); 
            handleChange(e.target.value as string); 
          }}

          hasError={Boolean(error)}
          errorText={error?.message}
          menuItems={[
            { value: "Asia", label: "Asia" },
            { value: "Africa", label: "Africa" },
            { value: "North America", label: "North America" },
            { value: "South America", label: "South America" },
            { value: "Europe", label: "Europe" },
            { value: "Oceania", label: "Oceania" },
            { value: "Antarctica", label: "Antarctica" },
          ]}
          
        />
      )}
    />
      
         <Button variant="contained" color="primary" style={{paddingInline:"30px"}} onClick={handleSearch}>Search</Button>
          </Grid>
          </Grid>
         {showfield ? <AllWorkflowStateList
              value="Region Workflow"
              selectedField={selectedField}
              open={open}
              setAlertHandler={setAlertHandler}
            /> : 
            
             <div style={{display:'flex',justifyContent:'center', fontSize:"16px", fontWeight:"500", paddingTop:"20px"}}>No data available</div>

            }
         </div>
         
          </TabPanel>

        <TabPanel value="Local Workflow" style={{padding:"0px"}}>
          
        <div
            style={{
             
              background: "#fff",
              minHeight: "90vh",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >  

       <Grid container spacing={3} style={{paddingBlock:"20px"}}>
     
          
          <Grid item xs={12} md={3.5} sm={isSmScreen?12:6}>
        
         <Controller
            name="region"
            control={control}
            render={({ field, fieldState: { error } }) => (
            
        <PrimarySelectField
          {...field}
          id="region"
          label={
            <>
              Select Region<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
            </>
          }

         
          onChange={(e) => {
            field.onChange(e); 
            handleChange(e.target.value as string); 
          }}

          hasError={Boolean(error)}
          errorText={error?.message}
          menuItems={[
            { value: "Asia", label: "Asia" },
            { value: "Africa", label: "Africa" },
            { value: "North America", label: "North America" },
            { value: "South America", label: "South America" },
            { value: "Europe", label: "Europe" },
            { value: "Oceania", label: "Oceania" },
            { value: "Antarctica", label: "Antarctica" },
          ]}
          
        />
      )}
    />
          </Grid>

          <Grid item xs={12} md={3.5} sm={isSmScreen?12:6}>
          <Controller
          name="country"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimarySelectField
              {...field}
              id="country"
              label={
                <>
                  Select Country
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }

              onChange={(e) => {
                field.onChange(e); 
                handleCountryChange(e.target.value as string); 
              }}

              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={countriesList}
            />
          )}
        />
          </Grid>

          <Grid item xs={12} md={4.75} sm={isSmScreen?12:6} style={{display:'flex', gridColumnGap:"30px"}}>
          <Controller
          name="plantName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimarySelectField
              {...field}
              id="plantName"
              label={
                <>
                  Select Plant Name
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={plantList}
            />
          )}
        />
         
          <Button variant="contained" color="primary" style={{paddingInline:"30px"}} onClick={handleSearch}>Search</Button>
          </Grid>  
          </Grid>
        <AllWorkflowStateList
             value="Local Workflow"
             selectedField={selectedField}
              open={open}
              setAlertHandler={setAlertHandler}
            />
         </div>
          
          </TabPanel>
     
      </TabContext>
           
    </>
  );
}