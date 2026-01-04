'use client'
import React, { Dispatch, SetStateAction, useEffect, useState, Suspense } from 'react';
import {
  GridColDef,
  GridValidRowModel,
  GridRowModel,
  GridRowId,
} from '@mui/x-data-grid';
import { CommonDataGrid, CommonDataGridAddGroup } from 'qssence-common';
import Box from "@mui/material/Box";
import { useRouter } from 'next/navigation';
import { Typography, useTheme, Button, AlertColor } from '@mui/material';
import { getQueryParamAsString } from '@/utils/utilsFunction';
import { del, get, post, put } from '@/utils/ApiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { Showusergroup} from '@/components/Redux/action';
import { RootState } from '@/components/Redux/store';

interface UserGroupData {
  id: string,
  groupId: string,
  name: string,
  status: string,
  description: string
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface addGroupProps {
  open: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AddGroupInUser({ open, setClose, setAlertHandler }: addGroupProps) {
  const routers = useRouter();
  const theme = useTheme()
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<GridValidRowModel[]>([]);
  const [userGroupData, setUserGroupData] = useState<UserGroupData[]>([]);

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowId[]>([]);

  const dispatch = useDispatch()
  
  const [loading, setLoading] =useState(true)

  const [memberId, setMemberId] = useState(null);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setMemberId(JSON.parse(storedUserId)); 
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>('/groups/getAll', {}, 'instance1', setAlertHandler);
        const formattedData = data.data.data.map((data: any, key: number) => {
          return {
            id: key +1,
            groupId: data.groupsId,
            name: data.name,
            description: data.description,
            userIds:data.userIds
          };
        });
        setUserGroupData(formattedData);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
  if(loading)
  {
    fetchData();
  }
    
  }, [loading]);


  const columnData: GridColDef[] = [
    {
      field: 'id',
      headerName: 'SI. No',
      type: 'number',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'groupId',
      headerName: 'Group Id',
      type: 'number',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'name', headerName: 'Group Name', width: 250, flex: 1, editable: false
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'text',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    // {
    //   field: 'status',
    //   headerName: 'status',
    //   flex: 1,
    //   width: 200,
    //   align: 'left',
    //   headerAlign: 'left',
    //   editable: true,
    //   renderCell: (params) => (
    //     <Box
    //       style={{
    //         color:
    //           params.value === "Active"
    //             ? "#389E0D" // Color for Active status
    //             : params.value === "Inactive"
    //               ? "#FF4D4F" // Color for Inactive status
    //               : params.value === "Pending"
    //                 ? "#FAAD14"
    //                 : "", // Default color
    //         backgroundColor:
    //           params.value === "Active"
    //             ? "#C6EFCE" // Background color for Active status
    //             : params.value === "Inactive"
    //               ? "#F8D7DA" // Background color for Inactive status
    //               : params.value === "Pending"
    //                 ? "#FFF3CD"
    //                 : "", // Default background color
    //         padding: "2px 10px",
    //         borderRadius: "5px",
    //       }}
    //     >
    //       {params.value}
    //     </Box>
    //   ),
    // }
  ];

  const handleAdd = async () => {
    try {
      const groupIds = selectedRowArray.map(item => item.groupId);
      let userdata = {
        "userId": memberId.userId, 
        "groupIds": groupIds
      };
      const response = await post<any>(`/UserGroup/assign`, userdata, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "User added in group successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
      setRowSelectionModel([]);
      setSelectedRows([]);
      setSelectedRowArray([]);
      dispatch(Showusergroup(true))
      setClose(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const putApi = async (newData: GridRowModel) => {
    try {
      let payload = {
        groupsId: newData?.groupId,
        name: newData?.name,
        description: newData?.description
      }
      const response = await put(`/group/updateGroupById/${newData?.groupId}`, payload, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error)
    }
  }

  const deleteApi = async (id: number) => {
    try {
      const response = await del(`/group/deleteGroupById/${userGroupData[id - 1]?.groupId}`, {}, null, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group details deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
    });
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }

  return (
    <Suspense fallback={<div>loading</div>}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <Typography variant="h4" color="primary">All Group</Typography>
          <div>
            <Button
              variant="contained"
              size="small"
              sx={{
                height: "35px",
                fontWeight: 700,
              }}
              onClick={handleAdd}
            >
              Add
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="outlined"
              size="small"
              sx={{
                height: "35px",
                fontWeight: 700,
              }}
              onClick={() => setClose(!open)}
            >
              Close
            </Button>
          </div>
        </div>
        <CommonDataGridAddGroup
        rowData={userGroupData}
        columnData={columnData} 
        setSelectedRowArray={setSelectedRowArray}
        selectedRows={selectedRows}
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        setSelectedRows={setSelectedRows} 
         putApi={putApi} deleteApi={deleteApi} 
         getById={function (getData: GridRowId): void {
          throw new Error('Function not implemented.');
        } } />
      </div>
    </Suspense>
  )
}
export default AddGroupInUser