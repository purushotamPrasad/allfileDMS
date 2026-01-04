"use client";
import {
  AlertColor,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField, AlertHandler, PageContainer, CardContainer } from "qssence-common";
import { get, post, postData, putData } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import { IconMinus, IconPlus, IconUsersGroup } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import countries from "world-countries";
import { useSelector} from "react-redux";
import { RootState } from "@/components/Redux/store";
import { useRouter } from "next/navigation";
import { WorkflowData } from "@/components/Redux/action";


type AddPlantFormInputs = {
  state?: {
    stateName?: string;
    orderNumber?: any;
    memberName?:string;
    branch?: {
      branchName?: string;
    }[];
    activity?: {
      activityName?: string;
    }[];
    child?: {
      childName?: string;
    }[];
  }[];
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

// interface addPlantProps {
//   setClose: Dispatch<SetStateAction<boolean>>;
//   setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
// }

export default function AddWorkFlowState() {
  const AddUserSchema = yup.object().shape({
    state: yup.array().of(
      yup.object().shape({
        stateName: yup
          .string()
          .matches(/^[^0-9]+$/, "State Name should not contain numbers")
          .required("State name is required"),
        orderNumber: yup
        .string()
        .matches(/^\d+$/, "Order number should contain only numbers")
        .required("Order Number is required"), 
        memberName: yup
        .string()
        .matches(/^[^0-9]+$/, "Member Name should not contain numbers")
        .required("Member name is required"), 
        branch: yup.array().of(
          yup.object().shape({
            branchName: yup
              .string()
              .matches(/^[^0-9]+$/, "Branch should not contain numbers")
              .required("Branch name is required"),
          })
        ).required("At least one branch is required"),
        activity: yup.array().of(
          yup.object().shape({
            activityName: yup
              .string()
              .matches(/^[^0-9]+$/, "Activity should not contain numbers")
              .required("Activity name is required"),
          })
        ).required("At least one activity is required"),
        child: yup.array().of(
          yup.object().shape({
            childName: yup
              .string()
              .matches(/^[^0-9]+$/, "Child Activity should not contain numbers")
          })
        ),
      })
    ).required("At least one state is required"),
  
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      state: [{ stateName: "", orderNumber:"", memberName:"",branch: [{ branchName: "" }], activity: [{ activityName: "" }], child: [{ childName: "" }] }],
    },
  });

  const routers = useRouter();

  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

 const isSmScreen = useMediaQuery('(max-width:768px)');


 const [userData, setUserData] = useState()

 const workflowData = useSelector((state: RootState) => state.workflowId);

 const [type, setType] = useState<string | null>(null);

 useEffect(() => {
   if (typeof window !== "undefined") {
     const storedStage = localStorage.getItem("Stage");
     setType(storedStage);
   }
 }, []);


 useEffect(()=>
{
    if (workflowData) {
        console.log("Workflow Data from Redux:", workflowData);
        setUserData(workflowData);
        
        // Pre-populate form with existing states if available
        if (workflowData.states && workflowData.states.length > 0) {
            const formattedStates = workflowData.states.map((state: any) => {
                // Format user names for display
                const memberNames = state.users && state.users.length > 0 ? 
                    state.users.map((user: any) => 
                        `${user.userFirstName || ''} ${user.userMiddleName || ''} ${user.userLastName || ''}`.trim()
                    ).filter(name => name).join(", ") : "";
                
                return {
                    stateName: state.stateName || "",
                    orderNumber: state.orderNumber?.toString() || "",
                    memberName: memberNames,
                    branch: state.branches ? state.branches.map((branch: any) => ({ 
                        branchName: branch.branchName || "" 
                    })) : [{ branchName: "" }],
                    activity: state.activities ? state.activities.map((activity: any) => ({ 
                        activityName: activity.activityName || "" 
                    })) : [{ activityName: "" }],
                    child: state.child ? state.child.map((child: any) => ({ 
                        childName: child.childName || "" 
                    })) : [{ childName: "" }]
                };
            });
            
            reset({ state: formattedStates });
            
            // Update additionalFields to match the number of states
            const newAdditionalFields = formattedStates.map((_, index) => ({
                id: index,
                branch: Array.from({ length: formattedStates[index].branch.length }, (_, i) => ({ id: i })),
                activity: Array.from({ length: formattedStates[index].activity.length }, (_, i) => ({ id: i })),
                child: Array.from({ length: formattedStates[index].child.length }, (_, i) => ({ id: i }))
            }));
            setAdditionalFields(newAdditionalFields);
        }
    }
},[workflowData, reset])




    const onSubmit = async (data: AddPlantFormInputs) => {
    try {
    
      const isEditMode = workflowData && workflowData.states && workflowData.states.length > 0;
      
            // Transform data to match API expected format
      const transformedData = data.state?.map((state: any, stateIndex: number) => {
        const stateNumber = stateIndex + 1;
        
        let memberIds: number[] = [];
        let groupId: number | null = null;
        
        if (isEditMode) {
          // In edit mode, use existing data from workflowData
          const existingState = workflowData.states[stateIndex];
          if (existingState) {
            groupId = existingState.groupId;
            // Extract user IDs from existing users data
            if (existingState.users && existingState.users.length > 0) {
              memberIds = existingState.users.map((user: any) => user.userId).filter((id: number) => id);
            }
          }
        } else {
          // In create mode, get data from localStorage
          const selectedMemberData = localStorage.getItem(`selectedMemberData_State${stateNumber}`);
          
          if (selectedMemberData) {
            try {
              const parsedMemberData = JSON.parse(selectedMemberData);
              memberIds = parsedMemberData.map((member: any) => member.id).filter((id: number) => id);
            } catch (error) {
              console.error("Error parsing member data:", error);
            }
          }
          
          // Get selected group ID from localStorage
          const selectedGroupId = localStorage.getItem(`selectedGroupId_State${stateNumber}`);
          groupId = selectedGroupId ? parseInt(selectedGroupId) : null;
        }
        
        return {
          stateName: state.stateName,
          orderNumber: parseInt(state.orderNumber) || 0,
          branches: state.branch?.map((branch: any) => ({
            branchName: branch.branchName
          })).filter((branch: any) => branch.branchName) || [],
          activities: state.activity?.map((activity: any) => ({
            activityName: activity.activityName
          })).filter((activity: any) => activity.activityName) || [],
          child: state.child?.map((child: any) => ({
            childName: child.childName
          })).filter((child: any) => child.childName) || [],
          groupId: groupId, // Group ID from member selection
          memberIds: memberIds // User IDs from member selection
        };
      });
      
      if (isEditMode) {
     
        let stateId: any;
        if (workflowData && workflowData.states && workflowData.states[0] && workflowData.states[0].id) {
          stateId = workflowData.states[0].id;
        } else if (data.state && data.state[0] && (data.state[0] as any).id) {
          stateId = (data.state[0] as any).id;
        } else {
          throw new Error("State ID not found for update.");
        }

        const response = await putData<any>(
          `/globalWorkflows/${workflowData.id}/states/update/${stateId}`,
          transformedData,
          setAlertHandler
        );
        
        if (response.data.success === true) {
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Workflow State updated successfully!",
            alertType: "success",
            alertTitle: "Success",
          });
          
          routers.push("/workflow/dms-workflow");
        }
      } else {
       
        const response = await postData<any>(
          `/globalWorkflows/${workflowData.id}/states/create`,
          transformedData,
          setAlertHandler
        );
        

        console.log(transformedData,"transformedData")

        if (response.data.success === true) {
          // Clear localStorage when workflow is created successfully
          additionalFields.forEach((_, stateIndex) => {
            const stateNumber = stateIndex + 1;
            localStorage.removeItem(`stateName_State${stateNumber}`);
            localStorage.removeItem(`orderNumber_State${stateNumber}`);
            localStorage.removeItem(`selectedMemberNames_State${stateNumber}`);
            localStorage.removeItem(`selectedMemberCount_State${stateNumber}`);
            localStorage.removeItem(`selectedMemberData_State${stateNumber}`);
            localStorage.removeItem(`selectedGroupId_State${stateNumber}`);
          });
          localStorage.removeItem("currentWorkflowState");
     
          
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Workflow State created successfully!",
            alertType: "success",
            alertTitle: "Success",
          });
          
          routers.push("/workflow/dms-workflow");
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };



  const [additionalFields, setAdditionalFields] = useState([
    { id: 0 , branch: [{ id: 0 }], activity: [{ id: 0 }],child: [{ id: 0 }] },
  ]);

  // Save form data to localStorage
  const saveFormDataToLocalStorage = (formData: any) => {
    if (formData && formData.state) {
      formData.state.forEach((state: any, stateIndex: number) => {
        const stateNumber = stateIndex + 1;
        
        // Save state name
        if (state.stateName) {
          localStorage.setItem(`stateName_State${stateNumber}`, state.stateName);
        }
        
        // Save order number
        if (state.orderNumber) {
          localStorage.setItem(`orderNumber_State${stateNumber}`, state.orderNumber);
        }
        
        // Save member name
        if (state.memberName) {
          localStorage.setItem(`selectedMemberNames_State${stateNumber}`, state.memberName);
        }
      });
    }
  };

  // Load form data from localStorage
  const loadFormDataFromLocalStorage = () => {
    const currentValues = control._formValues;
    const updatedValues = { ...currentValues };
    let hasChanges = false;
    
    additionalFields.forEach((_, stateIndex) => {
      const stateNumber = stateIndex + 1;
      
      // Load state name
      const savedStateName = localStorage.getItem(`stateName_State${stateNumber}`);
      if (savedStateName && updatedValues.state && updatedValues.state[stateIndex]) {
        updatedValues.state[stateIndex].stateName = savedStateName;
        hasChanges = true;
      }
      
      // Load order number
      const savedOrderNumber = localStorage.getItem(`orderNumber_State${stateNumber}`);
      if (savedOrderNumber && updatedValues.state && updatedValues.state[stateIndex]) {
        updatedValues.state[stateIndex].orderNumber = savedOrderNumber;
        hasChanges = true;
      }
      
      // Load member name
      const selectedMemberNames = localStorage.getItem(`selectedMemberNames_State${stateNumber}`);
      if (selectedMemberNames && updatedValues.state && updatedValues.state[stateIndex]) {
        updatedValues.state[stateIndex].memberName = selectedMemberNames;
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      reset(updatedValues);
    }
  };

  // Load form data when component mounts or additionalFields change
  useEffect(() => {
    loadFormDataFromLocalStorage();
  }, [additionalFields]);

  // Save form data when form values change
  useEffect(() => {
    const subscription = watch((value) => {
      saveFormDataToLocalStorage(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleAddMore = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: additionalFields.length, branch: [{ id: 0 }], activity: [{ id: 0 }], child: [{ id: 0 }] },
    ]);
  };

  const handleRemoveMore = (deptIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.filter((_, index) => index !== deptIndex)
    );
  };
  
  const handleAddBranch = (deptIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.map((dept, index) =>
        index === deptIndex
          ? {
              ...dept,
              branch: [...dept.branch, { id: dept.branch.length }],
            }
          : dept
      )
    );
  };

  const handleRemoveBranch = (deptIndex: number, sectionIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.map((dept, index) =>
        index === deptIndex
          ? {
              ...dept,
              branch: dept.branch.filter((_, secIndex) => secIndex !== sectionIndex),
            }
          : dept
      )
    );
  };


    
  const handleAddActivity = (deptIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.map((dept, index) =>
        index === deptIndex
          ? {
              ...dept,
              activity: [...dept.activity, { id: dept.activity.length }],
            }
          : dept
      )
    );
  };

  const handleRemoveActivity = (deptIndex: number, sectionIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.map((dept, index) =>
        index === deptIndex
          ? {
              ...dept,
              activity: dept.activity.filter((_, secIndex) => secIndex !== sectionIndex),
            }
          : dept
      )
    );
  };

  const handleAddChild = (deptIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.map((dept, index) =>
        index === deptIndex
          ? {
              ...dept,
              child: [...dept.child, { id: dept.child.length }],
            }
          : dept
      )
    );
  };

  const handleRemoveChild = (deptIndex: number, sectionIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.map((dept, index) =>
        index === deptIndex
          ? {
              ...dept,
              child: dept.child.filter((_, secIndex) => secIndex !== sectionIndex),
            }
          : dept
      )
    );
  };

const handleCancel=()=>
{
  // Remove selected member data from localStorage when canceling
  localStorage.removeItem("currentWorkflowState");
 
        additionalFields.forEach((_, stateIndex) => {
             const stateNumber = stateIndex + 1;
             localStorage.removeItem(`stateName_State${stateNumber}`);
             localStorage.removeItem(`orderNumber_State${stateNumber}`);
             localStorage.removeItem(`selectedMemberNames_State${stateNumber}`);
             localStorage.removeItem(`selectedMemberCount_State${stateNumber}`);
             localStorage.removeItem(`selectedMemberData_State${stateNumber}`);
             localStorage.removeItem(`selectedGroupId_State${stateNumber}`);
           });
    
    routers.push("/workflow/dms-workflow")
}

  useEffect(() => {
    const iconButton = document.getElementById("my-icon-button");
    if (iconButton) {
      iconButton.style.backgroundColor = "#0B4A6F";
    }
  }, []);

const handleMemberPicker = (stateIndex: number) => {
  // Set current workflow state in localStorage
  localStorage.setItem("currentWorkflowState", (stateIndex + 1).toString());
  
  // Navigate to member picker
  routers.push("/workflow/dms-workflow/workflowMember");
}

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
               Workflow State
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
              form="workflow-form"
              sx={{
                height: "45px",
                fontWeight: 700,
              }}
              style={{backgroundColor:"rgba(11, 74, 111, 1)", paddingInline:"30px"}}
            >
              {workflowData && workflowData.states && workflowData.states.length > 0 ? "Update" : "Create"}
            </Button>
            </Box>

          </div>   
          <PageContainer title="Dashboard" description="this is Dashboard" >
          <CardContainer>
            <>  
      <form
        id="workflow-form"
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
               <div className="page_title">{workflowData?.workflowName || "SOP Creation"}</div>
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
          <Box style={{display:"flex", gridColumnGap:"10px", paddingBottom:"18px", alignItems:"center"}}>
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
            </Box>



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
       
      <Grid item xs={12} sm={isSmScreen?12:6} md={6} >
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
      </Grid>
      
      <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
      <IconUsersGroup 
        height={18} 
        width={18} 
        className="primary_color"
        style={{cursor:"pointer"}}  
        onClick={() => handleMemberPicker(stateIndex)}
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
))}
</Box>
      
      </>

      </CardContainer>
      </PageContainer>
    </div>
  )}
  </>
  );
}

