"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { AlertHandler, CommonDialog } from "qssence-common";
import Typography from "@mui/material/Typography";
import AllUserDataList from "@/components/accounts_Privileges/users/allUserDataList";
import AddUser from "@/components/accounts_Privileges/users/addUser";
import { AlertColor, Button,Popover } from "@mui/material";
import Users from "../page";
import { useSelector} from "react-redux";
import { RootState } from "@/components/Redux/store";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { get} from "@/utils/ApiConfig";


export default function AllUsers() {
  const { setActiveTab } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [tabData, setTabData] = useState(null);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const routers = useRouter();

  const viewUser = useSelector((state: RootState) => state.viewUser);

  const [emailConfig, setEmailConfig] = useState(false)

  const handleTabData = (row) => {
    setTabData(row);
  };

   const [loading, setloading]=useState(true)
  
  
    useEffect(()=>
      {
         
          const fetchData = async () => {
            try {
              const data = await get<any>(
                `/mail/getAll`,
                {},
                "instance1",
                setAlertHandler
              );
  
              if(data.data.data.length===0)
              {
                   setEmailConfig(false)
               
              } 
              else 
              {         
                  setEmailConfig(true)
                   
              }
         
            setloading(false)
            } catch (error) {
              console.log("Error fetching data:", error);
                  setloading(false)
            }
          };
  
       if(loading)
          {
             fetchData(); 
         }
  
      },[loading])

  useEffect(() => {
    setActiveTab("");
  }, [setActiveTab]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "email-setup-popover" : undefined;

  const handleClickOpen =()=>
  {
    setAnchorEl(event.currentTarget);
  }

  const handleEmail=()=>
  {
    routers.push("/system-configuration/email-config")
  }

  return (
    <>
    {loading ? <div>Loading</div> :
    <div>
      {viewUser && tabData ? (
        <Users userData={tabData} />
      ) : (
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
              All Users
            </h1>
            {/* <Users/> */}
           {emailConfig? <CommonDialog
              buttonText="Add User"
              dialogTitle="Add User"
              dialogContent={
                <AddUser setClose={setOpen} setAlertHandler={setAlertHandler} />
              }
              onSave={() => {
                console.log("save");
              }}
              open={open}
              setOpen={setOpen}
            />:<>
            <Button
            variant="text"
            onClick={handleClickOpen}
            style={{ color: "white", backgroundColor: "#23608E",textTransform:"capitalize" }}
            >
            <IconPlus height={18} width={18} /> &nbsp;
              Add User
          </Button>
          <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      
      >
        <Typography sx={{ padding: 1.5, color:"#FF4D4F" }}>
          First, set up your email.{" "}
          <Button
            variant="text"
            style={{ color: "#23608E", padding:"0px", textTransform:"capitalize" }}
            onClick={handleEmail}
          >
            Click here
          </Button>
        </Typography>
      </Popover>
        </>
            }
          </div>
          <div
            style={{
              background: "#fff",
              minHeight: "90vh",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >
            <AllUserDataList
              setTabData={(e) => handleTabData(e)}
              open={open}
              setAlertHandler={setAlertHandler}
            />
          </div>
        </>
      )}
    </div>
}
    </>
  );
}
