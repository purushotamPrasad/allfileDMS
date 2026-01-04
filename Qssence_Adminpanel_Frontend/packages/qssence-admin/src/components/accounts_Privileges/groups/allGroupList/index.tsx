"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { CommonDataGridAllGroupList } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import {
  AlertColor,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { GridRowModel } from "@mui/x-data-grid";
import { del, get, put, post } from "@/utils/ApiConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/Redux/store";
import { GroupData } from "@/components/Redux/action";

interface GroupData {
  id: string;
  name: string;
  description: string;
  groupsId: string;
  userIds: number[];
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface AddGroupFormInputs {
  name: string;
  description: string;
}

const AddGroupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Group name should contain only alphabets"
    )
    .required("Group name is required"),
  description: yup
    .string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Description should contain only alphabets"
    )
    .required("Description is required"),
});
interface listProps {
  open: boolean;
  setTabData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AllGroupList({ setTabData, open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [groupData, setGroupData] = useState<GroupData[]>([]);

  const dispatch=useDispatch()

  const [showGroup, setShowGroup] = useState(true)

  const currentGroup = useSelector((state: RootState) => state.currentGroup);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddGroupSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      name: "",
      description: "",
    }, // Apply Yup validation schema
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>(
          "/groups/getAll",
          {},
          "instance1",
          setAlertHandler
        );
      
        const formattedData = data.data.data.map((data: any, key: any) => {
          return {
            id: key + 1,
            groupsId: data.groupsId,
            name: data.name,
            description: data.description,
            users: data.userIds.length,
          };
        });
        console.log("formattedData", formattedData);
        dispatch(GroupData(false))
        setShowGroup(false)
        setGroupData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
     if(showGroup || currentGroup)
     {
      fetchData();
     }
   
  }, [open, showGroup, currentGroup]);

  const columnData: GridColDef[] = [
    {
      field: "id",
      headerName: "SL No.",
      type:"number",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "name",
      headerName: "Group Name",
      type: "text",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "users",
      headerName: "Number of Users",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      type: "text",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];

  const putApi = async (newData: GridRowModel) => {
    try {
      let payload = {
        groupsId: newData.groupsId,
        name: newData.name,
        description: newData.description,
      };
      const response = await put(
        `/groups/update/${newData.groupsId}`,
        payload,
        setAlertHandler
      );
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApi = async (id: number) => {
    try {
      const response = await del(
        `groups/deleteGroup/${groupData[id - 1]?.groupsId}`,
        {},
        null,
        setAlertHandler
      );
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group details deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
      setShowGroup(true)
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const getGroupApi = async (row: any) => {
    try {
      const data = await get<any>(
        `/groups/getById/${row.groupsId}`,
        {},
        "instance1",
        setAlertHandler
      );
      setTabData({ groupsId: row.groupsId, data });
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Get Group successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addGroupApi: SubmitHandler<AddGroupFormInputs> = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
      };
      const response = await post(`/groups/create`, payload, setAlertHandler);
      if (response.status === 201) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Group created successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
      }
      setShowGroup(true)
      reset(); // Reset the form fields
    } catch (error) {
      console.log("Error adding group:", error);
    }
  };

  return (
    <>
      <Grid container spacing={3} mb={3} pl={5} style={{marginTop:"0px", paddingInline:"0px"}}>
        {/* <Grid item xs={12} md={3}>
          <Typography variant="h4">Filter Group</Typography>
          <Typography mt={3} variant="h6">
            Name Contains
          </Typography>
          <TextField
            label="Name Contains"
            variant="outlined"
            sx={{ marginTop: "5px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <button
              style={{
                backgroundColor: "#E4EDF6",
                color: "#000",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Filter
            </button>
            <button
              style={{
                color: "#23608E",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Reset Filter
            </button>
          </Box>
        </Grid> 

        <Grid item xs={12} md={3}>
          <Typography mt={6} variant="h6">
            Group Per Page
          </Typography>
          <FormControl
            variant="outlined"
            style={{ minWidth: 150, marginRight: "20px", marginTop: "5px" }}
          >
            <Select>
              <MenuItem value="None">None</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
*/}
        <Grid item xs={12} md={3} style={{paddingTop:"0px"}}>
          <Typography variant="h4">Add Group</Typography>
          <form onSubmit={handleSubmit(addGroupApi)}>
            <Grid container spacing={2} sx={{ marginTop: 1, width: "200%" }}>
              <Grid item xs={6}>
                <Typography variant="h6">Group Name</Typography>
                <TextField
                  label="Admin"
                  variant="outlined"
                  sx={{ marginTop: "5px" }}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Group Description</Typography>
                <TextField
                  label="Group Description"
                  variant="outlined"
                  sx={{ marginTop: "5px" }}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "10px",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#E4EDF6",
                  color: "#000",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Add Group
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>

      <CommonDataGridAllGroupList
        rowData={groupData}
        columnData={columnData}
        setSelectedRowArray={setSelectedRowArray}
        putApi={putApi}
        deleteApi={deleteApi}
        getById={getGroupApi}
      />
    </>
  );
}
export default AllGroupList;
