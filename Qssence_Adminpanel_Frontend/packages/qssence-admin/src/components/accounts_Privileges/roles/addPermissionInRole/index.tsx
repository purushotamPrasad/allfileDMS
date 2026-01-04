'use client'
import React, { useEffect, useState } from 'react';
import {
    GridColDef,
    GridValidRowModel,
    GridRowModel,
    GridRowId,
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import { useRouter } from 'next/navigation';
import { AlertColor, Box, Button, Typography, useTheme } from '@mui/material'
import { del, get, post, put } from '@/utils/ApiConfig';
import { getQueryParamAsString } from '@/utils/utilsFunction';

interface PermissionData {
    id: string,
    permissionId: string,
    permission: string,
    type: string,
    accessLevel: string
}

interface AlertHandlerState {
    hasAlert: boolean;
    alertType: AlertColor;
    alertMessage: string;
    alertTitle?: string;
}

interface AddPermission {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AddPermissionInRole({ open, setOpen, setAlertHandler }: AddPermission) {
    const routers = useRouter();
    const theme = useTheme()
    const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
    const [permissionData, setPermissionData] = useState<PermissionData[]>([]);
    const rid = getQueryParamAsString('rid');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get<any>('/permission/getAllPermissions', {}, 'instance1', setAlertHandler);
                const formattedData = data.data.data.map((data: any, key: number) => {
                    return {
                        id: key + 1,
                        permissionId: data?.permissionId,
                        permission: data?.permissionName,
                        type: data?.permissionType,
                        accessLevel: data?.permissionAccessLevel
                    };
                });
                setPermissionData(formattedData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [open]);


    const columnData: GridColDef[] = [
        { field: 'id', headerName: 'Permission Id', width: 200, editable: false },
        {
            field: 'permission',
            headerName: 'Permission',
            type: 'text',
            width: 200,
            // flex: 1,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            renderCell: (params) => (
                <Box
                    style={{
                        cursor: 'pointer', // Change color to blue on hover
                    }}
                    sx={{ "&:hover": { color: theme.palette.primary.main } }}
                    onClick={() => { routers.push(`/accounts_privileges/permission?pid=${params.row.permissionId}`) }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'type',
            headerName: 'Type',
            type: 'singleSelect',
            width: 200,
            flex: 1,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            valueOptions: ['USER', 'ROLE', 'GROUP'],
        },
        {
            field: 'accessLevel',
            headerName: 'Access Level',
            type: 'singleSelect',
            width: 200,
            flex: 1,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            valueOptions: ["CAN_MODIFY", "CAN_DELETE", "CAN_CREATE", "CAN_VIEW"],

        },
    ];

    const handleAdd = async () => {
        try {
            let permission = selectedRowArray[0];
            let userdata = {
                "roleId": rid,
                "permissionId": permission.permissionId,
            };
            const response = await post<any>(`/permission/setPermissionForRole`, userdata, setAlertHandler);
            setAlertHandler({
                hasAlert: true,
                alertMessage: "Permission added successfully.",
                alertType: "success",
                alertTitle: "Success",
              });
            setOpen(false);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    const putApi = async (newData: GridRowModel) => {
        try {
            let payload = {
                permissionName: newData?.permission,
                permissionType: newData?.type,
                permissionAccessLevel: newData?.accessLevel
            }
            const response = await put(`/permission/updatePermissionById/${newData?.permissionId}`, payload, setAlertHandler);
            setAlertHandler({
                hasAlert: true,
                alertMessage: "Permission details updated successfully.",
                alertType: "success",
                alertTitle: "Success",
              });
        } catch (error) {
            console.log(error)
        }
    }

    const deleteApi = async (id: number) => {
        try {
            const response = await del(`/permission/deletePermissionById/${permissionData[id - 1]?.permissionId}`, {}, null, setAlertHandler);
            setAlertHandler({
                hasAlert: true,
                alertMessage: "Permission details deleted successfully.",
                alertType: "success",
                alertTitle: "Success",
              });
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <Typography variant="h4" color="primary">All Permission</Typography>
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
                        onClick={() => setOpen(!open)}
                    >
                        Close
                    </Button>
                </div>
            </div>
            <CommonDataGrid rowData={permissionData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} getById={function (getData: GridRowId): void {
                throw new Error('Function not implemented.');
            } } />
        </div>
    )
}
export default AddPermissionInRole