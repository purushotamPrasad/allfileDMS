"use client"

import { PageContainer, CardContainer, AlertHandler, CommonDialog } from "qssence-common";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Box,
  Grid,
  Button,
  InputAdornment,
} from '@mui/material';
import { IconCheckbox, IconEdit, IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import CreatePlan from "./create";
import { del, get} from '@/utils/ApiConfig';
import { PlanData } from "@/components/Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/Redux/store";
import EditPlanData from "@/components/companyplan/editPlan/page";


export default function Plans() {

  const isSmScreen = useMediaQuery('(max-width:768px)');

  const router =useRouter()

  const [open, setOpen] = useState(false);

  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const [userData, setUserData] = useState([]);
  const [params, setparams] = useState({});

  const dispatch = useDispatch()

  const currentPlan= useSelector((state: RootState) => state.currentPlan);

  const [openPlan, setOpenPlan] = useState(true)

  const [openEditPlan, setOpenEditPlan] = useState(false)

  const [viewData, setViewData]=useState("")


  const handleSearch=async ()=>
  {
    try {
     
   
    
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  const handleFeatures=(name,id)=>
  {
     
         router.push(`/plans/${name}`)
         localStorage.setItem("planId",id)
  }

  useEffect(()=>
    {
        const fetchData = async () => {
            try {
              const data = await get<any>(
                `/plans/getAll`,
                {},
                "instance1",
                setAlertHandler
              );
             
      
              const formattedData = data.data.data.map((sub: any, index:any) => {
      
                return {
                  index: index+1,
                  id:sub.planId,
                  name:sub.name,
                  description:sub.description,
                  features: sub.features.map((feature: any) => ({
                    featuresId: feature.featuresId,
                    name: feature.name,
                  })),
                };
              });


              setUserData(formattedData)
              dispatch(PlanData(false))
              setOpenPlan(false)
            
            } catch (error) {
              console.log("Error fetching data:", error);
            }
          };

          if(openPlan||currentPlan)
          {
            fetchData(); 
          }
    

    },[openPlan, currentPlan])

    const handleEdit=(value:any)=>
    {
       setOpenEditPlan(true)
       setViewData(value)
    }

    const handleDelete=async (id:any)=>
    {
       
        try {
          const response = await del(
            `/plans/delete/${id}`,
            {},
            null,
            setAlertHandler
          );
          setOpenPlan(true)
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Plan deleted successfully.",
            alertType: "success",
            alertTitle: "Success",
          });
        } catch (error) {
          console.log("Error deleting plants:", error);
        }
      
  }

  return (
    <>
      
      <AlertHandler alertHandler={alertHandler} />

      <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "auto",
                paddingInline:"20px"
						}}>

        <div className="description">

        <h1 className="header_title primary_color">Plans</h1>

        <CommonDialog

            buttonText="Create Plan"
            dialogTitle="Create Plan"
            dialogContent={<CreatePlan
              setClose={setOpen}
              setAlertHandler={setAlertHandler}
            />}
            onSave={() => {
              console.log("save");
          }}
            open={open}
            setOpen={setOpen}
            />

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
        <Box style={{padding:"20px"}}>
          
          {/* <Box style={{paddingBottom:"30px"}}>
        <CustomTextField size="small" placeholder="XYZ Private Ltd" id="search" variant="outlined"    sx={{ boxShadow: 'none', width:"300px", position:"relative", background:"#E4EDF6",borderRadius:"8px", '.MuiOutlinedInput-notchedOutline': { border:"1px solid rgba(67, 67, 67, 1)" } }}   InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconSearch height={20} width={20} onClick={handleSearch} style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                ),
                }}>

            </CustomTextField>
            </Box> */}

          <Grid container spacing={4}>

          {userData.map((cur)=>{
              return (
                <>
              <Grid item xs={12} sm={isSmScreen?6:4} md={4}>

                  <Box className="lineBorder">
                    <Box className="borderBottom" style={{padding:"10px 20px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Box>
                      <div className="title primary_color">{cur.name}</div>
                      <div>{cur.description}</div>
                    </Box>
                       <Box style={{display:"flex", gridColumnGap:"4px"}}>
                         <div><IconEdit height={18} width={18} style={{cursor:"pointer"}} className="primary_color" onClick={()=>handleEdit(cur)}/></div>
                       </Box>
                    </Box>

                    <Box className="borderBottom" style={{padding:"10px 20px"}}>
                    <div className="section_title" style={{textTransform:"uppercase"}}>Features</div>
                    <div>Everything in our plan plus...</div>
                      
                    <ul style={{ listStyleType: "disc", padding: "6px 0px 0px 12px" }}>
                    {cur.features.slice(0, 4).map((feature, index) => (
                      <li key={index}>{feature.name}</li>
                    ))}
                  </ul>
                    </Box>
                      
                      <Box style={{padding:"10px 20px"}}>
                    <Button variant="contained" style={{width:"100%"}} color="primary" onClick={()=>handleFeatures(cur.name, cur.id)}>All Features</Button>
                    </Box>

                  </Box> 
                  </Grid>
                </>
              )
          })}
    
         </Grid>

        </Box>

        </CardContainer>
      </PageContainer>
          
          {openEditPlan &&
              <CommonDialog
              buttonText={null}
              dialogTitle="Edit Plan"
              dialogContent={<EditPlanData
                setClose={setOpenEditPlan}
                setAlertHandler={setAlertHandler}
                viewData={viewData}
              />}
              onSave={() => {
                console.log("save");
              }}
              open={openEditPlan}
              setOpen={setOpenEditPlan}
        />
            }

      </div>
      </>
  );
}

/* viewData={viewData}

/*<IconTrash height={18} width={18} style={{cursor:"pointer"}} className="primary_color" onClick={()=>handleDelete(cur.id)}/>*/