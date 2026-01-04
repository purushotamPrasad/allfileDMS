'use client'
import React, { useEffect, useState } from 'react';
import {
    GridColDef,
    GridRowId,
    GridValidRowModel,
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import { useRouter } from 'next/navigation';
import { AlertColor, Box, useTheme } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';
import { del, get } from '@/utils/ApiConfig';
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

interface listProps {
    open: boolean;
    roleData:any,
    setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function RolePermission({roleData, open ,setAlertHandler}: listProps) {
    const routers = useRouter();
    const theme = useTheme();
    const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
    const [permissionData, setPermissionData] = useState<PermissionData[]>([]);
    const rid = getQueryParamAsString('rid');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get<any>(`/permission/getAllPermissionByRoleId/${rid}`, {}, 'instance1',setAlertHandler);
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

        if (rid !== undefined && rid != "") {
            fetchData();
        }
        fetchData();
    }, [rid, open]);

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
            editable: false,
            renderCell: (params) => (
                <Box
                    style={{
                        cursor: 'pointer', // Change color to blue on hover
                    }}
                    sx={{ "&:hover": { color: theme.palette.primary.main } }}
                    // Set isHovered to false on mouse leave
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
            editable: false,
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
            editable: false,
            valueOptions: ["CAN_MODIFY", "CAN_DELETE", "CAN_CREATE", "CAN_VIEW"],

        },
    ];

    const putApi = (newData: GridRowModel) => {
        console.log(newData, "update")
    }

    const deleteApi = async (id: number) => {
        try {
            const response = await del(`/permission/deletePermissionByRoleIdAndPermissionId/${rid}`, {}, {
                permissionId: permissionData[id - 1]?.permissionId
            },setAlertHandler);
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
        <CommonDataGrid rowData={permissionData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} enableEdit={false} getById={function (getData: GridRowId): void {
            throw new Error('Function not implemented.');
        } } />
    )
}
export default RolePermission