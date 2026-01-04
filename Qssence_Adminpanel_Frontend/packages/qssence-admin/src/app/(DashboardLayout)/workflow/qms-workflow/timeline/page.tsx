"use client";
import {
  AlertColor,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField, AlertHandler, PageContainer, CardContainer, PrimaryMultiSelectField, CommonDialog, CommonDialogWorkflow, CommonDataGridAllMetaDataList } from "qssence-common";
import { del, get, put } from "@/utils/ApiConfig";
import { IconMinus, IconPlus, IconUsersGroup } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import countries from "world-countries";
import { useSelector} from "react-redux";
import { RootState } from "@/components/Redux/store";
import { useRouter } from "next/navigation";
import AddMetadata from "@/components/add_metadata/addMetadata";
import { GridColDef, GridRowModel, GridValidRowModel } from "@mui/x-data-grid";

interface GroupData {
  id: string;
  workflowName: string;
  timeLine: string;
}

type AddPlantFormInputs = {
   selectTimeline?:string[];
   timeline?: {
    timelineName?:string;
     buttonName?: string;
     viewName?: any;
     selectmetadata?:string[];
     child?:string;
     api?:string;
  }[];
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface OptionInterface {
    label: string;
    value: string;
  }

// interface addPlantProps {
//   setClose: Dispatch<SetStateAction<boolean>>;
//   setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
// }

export default function Timeline() {

  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [groupData, setGroupData] = useState<GroupData[]>([]);

  const [selectedOptions, setSelectedOptions] = useState({}); 



  const AddUserSchema = yup.object().shape({
    selectTimeline: yup
    .array()
    .of(
      yup.string()
    ),
    timeline: yup.array().of(
      yup.object().shape({
        timelineName: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, "Button Name should contain only alphabets")
        .required("Button name is required"),
        buttonName: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, "Button Name should contain only alphabets"),
        viewName: yup
        .string()
        .matches(/^\d+$/, "View Name should contain only numbers"),
        child: yup
        .string(), 
        api: yup
        .string(),  
        selectmetadata: yup
        .array()
        .of(
          yup.string()
        ), 
      })
    ),
  
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      timeline: [{ buttonName: "", viewName:""}],
      selectTimeline:[]
    },
  });

  const routers = useRouter();

  const [userGroupData, setUserGroupData] = useState<OptionInterface[]>([]);


  const [userMetaData, setUserMetaData] = useState<OptionInterface[]>([]);

  const [showTimeline, setShowTimeline] = useState(false)

  const [open, setOpen] = useState(false);

  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

 const isSmScreen = useMediaQuery('(max-width:768px)');


 const [userData, setUserData] = useState()

 const workflowId = useSelector((state: RootState) => state.workflowId);

 const [type, setType] = useState<string | null>(null);

 useEffect(() => {
   if (typeof window !== "undefined") {
     const storedStage = localStorage.getItem("Stage");
     setType(storedStage);
   }
 }, []);


 useEffect(()=>
{
    const fetchData = async () => {
        try {
          const data = await get<any>(
            `/plants/getById/${workflowId}`,
            {},
            "instance1",
            setAlertHandler
          );
         
  
          const formattedData = data.data.data.map((plant: any, index:any) => {
  
            return {
              index: index+1,
              id:plant.id,
              plantName: plant.plantName,
              location:plant.location,
              region:plant.region,
              country:plant.country,
              department: plant.department.map((dept: any) => ({
                departmentId: dept.departmentId,
                departmentName: dept.departmentName,
                section: dept.section.map((sec: any) => ({
                  id: sec.id,
                  sectionName: sec.sectionName,
                })),
              })),
              
            };
          });
          
          setUserData(formattedData);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
  
        fetchData(); 
    
},[])


  const onSubmit = async (data: AddPlantFormInputs) => {

     //console.log("data", data)
    // try {
     

    //   const response = await post<any>(
    //     "/plants/create",
    //      data,
    //     setAlertHandler
    //   );

    //   console.log(response);
    //   // setClose(false);
    //   // setAlertHandler({
    //   //   hasAlert: true,
    //   //   alertMessage: "Plant created successfully!",
    //   //   alertType: "success",
    //   //   alertTitle: "Success",
    //   // });
    //   if (response.data.success === true) {
    //     setAlertHandler({
    //       hasAlert: true,
    //       alertMessage: "Plant created successfully!",
    //       alertType: "success",
    //       alertTitle: "Success",
    //     });
       
    //     setClose(false);
    //   } else {
    //     setClose(true);
    //   }
    // } catch (error) {
    //   console.log("Error fetching data:", error);
    // }
  };

;



const [additionalTimeline, setAdditionalTimeline] = useState([
  { id: 0 },
]);



const handleAddMetadataField=()=>
{
    setOpen(true)
}

const handleAddMoreTimeline = () => {
  setAdditionalTimeline([
    ...additionalTimeline,
    { id: additionalTimeline.length},
  ]);
};

  const handleRemoveMoreTimeline = (deptIndex: number) => {
    setAdditionalTimeline((prevFields) =>
      prevFields.filter((_, index) => index !== deptIndex)
    );

    setSelectedOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };
      delete updatedOptions[deptIndex];
      return updatedOptions;
    });
  };

  const handleCancel=()=>
  {
    routers.push("/workflow/qms-workflow")
  }

  useEffect(() => {
    const iconButton = document.getElementById("my-icon-button");
    if (iconButton) {
      iconButton.style.backgroundColor = "#0B4A6F";
    }
  }, []);


  const handleOptionChange = (timelineIndex, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [timelineIndex]: value, // Update the selected option for the specific timelineIndex
    }));
  };


  return (
    <>
      {type && (
       <div>

         <AlertHandler alertHandler={alertHandler} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
              <h1 className="header_title primary_color paddingBlock">
               Workflow Timeline
              </h1>

              <Box style={{ display: "flex", gridColumnGap: "20px" }}>
              <Button
              variant="outlined"
              size="small"
              onClick={handleCancel}
              sx={{
                height: "45px",
                fontWeight: 700,
              }}
              style={{backgroundColor:"#ffffff", paddingInline:"30px"}}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{
                height: "45px",
                fontWeight: 700,
                
              }}
              style={{backgroundColor:"rgba(11, 74, 111, 1)", paddingInline:"30px"}}
            >
              Save
            </Button>
            </Box>

          </div>   
          <PageContainer title="Dashboard" description="this is Dashboard" >
          <CardContainer>
            <>  
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
        style={{padding:"16px 20px",overflow:'scroll'}}
      >
        <Grid container rowSpacing={2} columnSpacing={6}>
          
           {(type.includes("Region") || type.includes("Local")) &&
          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>

          <Box style={{display:"flex"}}>
                  <strong className="title_heading">Region:</strong>
                  <div className="page_title">Africa</div>
                </Box>

          </Grid>
      }

        {type.includes("Local") &&
                <Grid item xs={12} md={6} sm={isSmScreen ? 12 : 6}>
                <Box style={{display:"flex"}}>
                      <strong className="title_heading">Country:</strong>
                      <div className="page_title">India</div>
                    </Box>
            </Grid>
        }

     {type.includes("Local") &&
          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
          <Box style={{display:"flex"}}>
                 <strong className="title_heading">Plant Name:</strong>
                 <div className="page_title">Plant 1</div>
               </Box>
          </Grid>
     }

    {type.includes("Local") &&
              <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
              <Box style={{display:"flex"}}>
                    <strong className="title_heading">Department:</strong>
                    <div className="page_title">Department 1</div>
                  </Box>
              </Grid>
        }


          <Grid item xs={12} md={type.includes("Global")?12:6} sm={isSmScreen?12:type.includes("Global")?12:6}>
             <Box style={{display:"flex"}}>
               <strong className="title_heading"> WorkFlow Name:</strong>
               <div className="page_title">CAPA</div>
             </Box>
          </Grid>

          {type.includes("Local") &&
          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
          <Box style={{display:"flex"}}>
                 <strong className="title_heading">Location:</strong>
                 <div className="page_title">Ranchi, Jharkhand</div>
               </Box>
          </Grid>
     }

        </Grid>
      </form>

        <Box style={{padding:"16px 20px 0px", overflow:"scroll", height:"70vh"}}>
       
             
            <Grid container spacing={3} style={{display:'flex', alignItems:'center', paddingBottom:"22px"}}>
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>
        
        <Typography variant="h4" fontSize={"16px"} fontWeight={600} style={{whiteSpace:"nowrap"}}>
              Select Timeline
            </Typography>
          <Controller
            name="selectTimeline"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryMultiSelectField
              label={<>Select Timeline</>}
              id="selectTimeline"
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={userGroupData}
              selectedItems={field.value || []}
              onSelect={(selectedItem) => {
                const updatedSelection = [...field.value, selectedItem];
                field.onChange(updatedSelection); // Update selected values
              }}
              onRemove={(removedItem) => {
                const updatedSelection = field.value.filter((item) => item !== removedItem);
                field.onChange(updatedSelection); // Remove the value from selection
              }}
            />
            
            )}
    />
    </Box>

          </Grid>
         
          <Grid item xs={12} md={6} style={{display:"flex", gridColumnGap:"4px"}}>
            <Typography variant="h4" fontSize={"16px"}>
              Create Timeline
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={handleAddMoreTimeline}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus height={18} width={18} />
            </IconButton>

          </Grid>
            
          </Grid>

           


          {additionalTimeline.map((timeline, timelineIndex) => (
            <div key={timeline.id}>

        {timelineIndex!==0 &&   <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content", marginBottom:"18px", alignItems:"center"}}>


       
            <Typography variant="h4" fontSize={"16px"} fontWeight={600}>
                New Timeline Data
              </Typography>
              <IconButton
              id="my-icon-button"
              onClick={handleAddMoreTimeline }
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus />
              </IconButton>

              <IconButton
                id="my-icon-button"
                onClick={() => handleRemoveMoreTimeline(timelineIndex)}
                style={{
                  color: "white",
                  backgroundColor: "#073b54",
                  borderRadius: "50%",
                  padding: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <IconMinus  height={18} width={18} />
              </IconButton>
            </Box>
}

      {timelineIndex!==0 &&  <> 
      
      <FormControl component="fieldset" style={{width:"100%", paddingBottom:"20px"}}>
      <FormLabel component="legend">Choose an Option:</FormLabel>
      <RadioGroup
        aria-label="options"
        name={`radio-buttons-group-${timelineIndex}`}
        value={selectedOptions[timelineIndex] || ""}
        onChange={(e) =>
          handleOptionChange(timelineIndex, e.target.value)
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControlLabel
              value="Api Integration"
              control={<Radio />}
              label="API Integration"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControlLabel
              value="New Timeline Data"
              control={<Radio />}
              label="New Timeline Data"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControlLabel
              value="Child Workflow"
              control={<Radio />}
              label="Child Workflow"
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
      
    {selectedOptions[timelineIndex]==="New Timeline Data" &&  <Grid container spacing={3} style={{display:'flex', alignItems:'center', marginBottom:"18px"}}>

        <Grid item xs={12} sm={isSmScreen?12:6} md={4}>
                        <Controller
                          name={`timeline.${timelineIndex}.timelineName`}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <PrimaryTextField
                              id={`-${timelineIndex}`}
                              label={
                                <>
                                Enter Timeline Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                                </>
                                }
                              haserror={Boolean(error)}
                              errortext={error?.message}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

              <Grid item xs={12} sm={isSmScreen?12:6} md={4}>
                <Controller
                  name={`timeline.${timelineIndex}.buttonName`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <PrimaryTextField
                      id={`-${timelineIndex}`}
                      label={
                        <>
                        Enter Button Name
                        </>
                        }
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
       
          <Grid item xs={12} sm={isSmScreen?12:6} md={4}>
            <Controller
              name={`timeline.${timelineIndex}.viewName`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  id={`Timeline-${timelineIndex}`}
                  label={<>
                    Select Show View Data
                  </>}
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  {...field}  
                  menuItems={[
                    { value: "List View", label: " Show List View" },
                    { value: "Table View", label: "Show Table View" },
                  ]}         
                  />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>
        
        <Typography variant="h4" fontSize={"16px"} fontWeight={600} style={{whiteSpace:"nowrap"}}>
              Select Metadata
            </Typography>
          <Controller
             name={`timeline.${timelineIndex}.selectmetadata`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryMultiSelectField
              label={<>Select Metadata</>}
              id={`Timeline-${timelineIndex}`}
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={userMetaData}
              selectedItems={field.value || []}
              onSelect={(selectedItem) => {
                const updatedSelection = [...field.value, selectedItem];
                field.onChange(updatedSelection); // Update selected values
              }}
              onRemove={(removedItem) => {
                const updatedSelection = field.value.filter((item) => item !== removedItem);
                field.onChange(updatedSelection); // Remove the value from selection
              }}
            />
            
            )}
      />
      </Box>
      </Grid>
         <Grid item xs={12} md={6} style={{display:"flex", gridColumnGap:"4px"}}>
            <Typography variant="h4" fontSize={"16px"}>
              Add Metadata Field
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={handleAddMetadataField}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus height={18} width={18} />
            </IconButton>

          </Grid>
 
      </Grid>
   }

      {selectedOptions[timelineIndex]==="Child Workflow" &&  <Grid container spacing={3} style={{display:'flex', alignItems:'center', marginBottom:"18px"}}>

      <Grid item xs={12} sm={isSmScreen?12:6} md={4}>
                <Controller
                  name={`timeline.${timelineIndex}.timelineName`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id={`-${timelineIndex}`}
                    label={
                      <>
                      Enter Timeline Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                  )}
                />
                    </Grid>
    
        <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
        <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>
        <Typography variant="h4" fontSize={"16px"} style={{whiteSpace:"nowrap"}}>
            Child Workflow
          </Typography>
          <Controller
            name={`timeline.${timelineIndex}.child`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimarySelectField
                id={`timeline.${timelineIndex}`}
                label={<>
                  Select Child Workflow
                </>}
                hasError={Boolean(error)}
                errorText={error?.message}
                {...field}  
                menuItems={[
                  { value: "CAPA", label: "CAPA" },
                  { value: "Change Control", label: "Change Control" },
                ]}         
                />
            )}
          />
          </Box>
        </Grid>

      </Grid>
      }

    {selectedOptions[timelineIndex]==="Api Integration" &&  <Grid container spacing={3} style={{display:'flex', alignItems:'center', marginBottom:"18px"}}>

    <Grid item xs={12} sm={isSmScreen?12:6} md={4}>
              <Controller
                name={`timeline.${timelineIndex}.timelineName`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id={`-${timelineIndex}`}
                  label={
                    <>
                    Enter Timeline Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                    }
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field}
                />
                )}
              />
                  </Grid>

      <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
    
        <Controller
            name={`timeline.${timelineIndex}.api`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                id={`timeline-${timelineIndex}`}
                label={
                  <>
                  Enter API Endpoint<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                  </>
                  }
                haserror={Boolean(error)}
                errortext={error?.message}
                {...field}
              />
            )}
          />
       
      </Grid>

    </Grid>
    }

      </> 
}
  </div>
))}

    
           </Box>

          <CommonDialogWorkflow
              dialogTitle="Add Metadata Field"
              dialogContent={
                <AddMetadata setClose={setOpen} setAlertHandler={setAlertHandler}  />
              }
              onSave={() => {
                console.log("save");
              }}
              open={open}
              setOpen={setOpen}
            />
        
        </>

      


        </CardContainer>
        </PageContainer>
      </div>
    )}
    </>
    );
}

/*


  <IconButton
              id="my-icon-button"
              onClick={handleAddMore}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus />
            </IconButton>

            {additionalFields.map((state, stateIndex) => (
            <div key={state.id}>

            {stateIndex!==0 &&  <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content", marginBottom:"18px", alignItems:"center"}}>

            <Typography variant="h4" fontSize={"16px"} fontWeight={600}>
                State Name & Order Number
              </Typography>
              <IconButton
              id="my-icon-button"
              onClick={handleAddMore}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus />
              </IconButton>

              <IconButton
                id="my-icon-button"
                onClick={() => handleRemoveMore(stateIndex)}
                style={{
                  color: "white",
                  backgroundColor: "#073b54",
                  borderRadius: "50%",
                  padding: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <IconMinus  height={18} width={18} />
              </IconButton>
            </Box>
            }

            <Grid container spacing={3} style={{display:'flex', alignItems:'end', marginBottom:"18px"}}>
              <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
                <Controller
                  name={`state.${stateIndex}.stateName`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <PrimaryTextField
                      id={`State-${stateIndex}`}
                      label={
                        <>
                        Enter State Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                        </>
                        }
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
       
      <Grid item xs={12} sm={isSmScreen?11:6} md={6}>
        <Controller
          name={`state.${stateIndex}.orderNumber`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimaryTextField
              id={`State-${stateIndex}`}
              label={
                <>
                 Enter Order Number <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
                }
              haserror={Boolean(error)}
              errortext={error?.message}
              {...field}
            />
          )}
        />
      </Grid>
       
      <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:'flex', gridColumnGap:"10px", alignItems:"end"}}>
        <Controller
          name={`state.${stateIndex}.memberName`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimaryTextField
              id={`State-${stateIndex}`}
              label={
                <>
                 Show Member Name <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
                }
                InputProps={{
                  readOnly: true,
                }}
              haserror={Boolean(error)}
              errortext={error?.message}
              {...field}
            />
          )}
        />
         
        <IconUsersGroup height={18} width={18} className="primary_color"style={{cursor:"pointer"}}  
         onClick={() =>
                  routers.push("/workflow/dms-workflow/workflowMember")
        }/>

      </Grid>
      
      <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
      <Controller
          name={`state.${stateIndex}.selectTimeline`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryMultiSelectField
              label={<>Select Timeline</>}
              id={`State-${stateIndex}`}
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={userGroupData}
              selectedItems={field.value || []}
              onSelect={(selectedItem) => {
                const updatedSelection = [...field.value, selectedItem];
                field.onChange(updatedSelection); // Update selected values
              }}
              onRemove={(removedItem) => {
                const updatedSelection = field.value.filter((item) => item !== removedItem);
                field.onChange(updatedSelection); // Remove the value from selection
              }}
            />
            
            )}
/>
     </Grid>


      <Grid item xs={12} sm={12} md={12}>
        <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content"}}>
      <Typography variant="h4" fontSize={"16px"} fontWeight={600}>
              Branch
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={() => handleAddBranch(stateIndex)}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus height={18} width={18} />
            </IconButton>
            </Box>
          </Grid>

          <Grid container spacing={3} style={{padding:"16px 24px"}} >
      {state.branch.map((branch, branchIndex) => (
        <Grid item key={branch.id} xs={12}  sm={isSmScreen?12:6} md={6} style={{display:'flex', gridColumnGap:"8px", height:"fit-content", alignItems:'center'}}>
          <Controller
            name={`state.${stateIndex}.branch.${branchIndex}.branchName`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                id={`Branch-${stateIndex}-${branchIndex}`}
                label={
                  <>
                   Enter Branch Name
                  </>
                  }
                haserror={Boolean(error)}
                errortext={error?.message}
                {...field}
              />
            )}
          />
         {branchIndex!==0 &&
          <IconButton
              id="my-icon-button"
              onClick={() => handleRemoveBranch(stateIndex,branchIndex)}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconMinus height={18} width={18}/>
            </IconButton>
}
        </Grid>
      ))}
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content"}}>
      <Typography variant="h4" fontSize={"16px"} fontWeight={600}>
              Activity
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={() => handleAddActivity(stateIndex)}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus height={18} width={18} />
            </IconButton>
            </Box>
          </Grid>

          <Grid container spacing={3} style={{padding:"16px 24px"}} >
      {state.activity.map((activity, activityIndex) => (
        <Grid item key={activity.id} xs={12}  sm={isSmScreen?12:6} md={6} style={{display:'flex', gridColumnGap:"8px", height:"fit-content", alignItems:'center'}}>
          <Controller
            name={`state.${stateIndex}.activity.${activityIndex}.activityName`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                id={`Activity-${stateIndex}-${activityIndex}`}
                label={
                  <>
                   Enter Activity Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                  </>
                  }
                haserror={Boolean(error)}
                errortext={error?.message}
                {...field}
              />
            )}
          />
         {activityIndex!==0 &&
          <IconButton
              id="my-icon-button"
              onClick={() => handleRemoveActivity(stateIndex,activityIndex)}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconMinus height={18} width={18}/>
            </IconButton>
}
        </Grid>
      ))}
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content"}}>
      <Typography variant="h4" fontSize={"16px"} fontWeight={600}>
              Child
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={() => handleAddChild(stateIndex)}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus height={18} width={18} />
            </IconButton>
            </Box>
          </Grid>
          <Grid container spacing={3} style={{padding:"16px 24px"}} >
      {state.child.map((child, childIndex) => (
        <Grid item key={child.id} xs={12}  sm={isSmScreen?12:6} md={6} style={{display:'flex', gridColumnGap:"8px", height:"fit-content", alignItems:'center'}}>
          <Controller
            name={`state.${stateIndex}.child.${childIndex}.childName`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                id={`Activity-${stateIndex}-${childIndex}`}
                label={
                  <>
                   Enter Child Activity Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                  </>
                  }
                haserror={Boolean(error)}
                errortext={error?.message}
                {...field}
              />
            )}
          />
         {childIndex!==0 &&
          <IconButton
              id="my-icon-button"
              onClick={() => handleRemoveChild(stateIndex,childIndex)}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconMinus height={18} width={18}/>
            </IconButton>
 }
        </Grid>
      ))}
      </Grid>
       
    </Grid>

    

  </div>
))}*/
