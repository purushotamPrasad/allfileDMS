import { AlertColor, Button, Grid } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryTextField } from 'qssence-common';
import { post } from '@/utils/ApiConfig';
import { useMediaQuery } from "@mui/material";
import { RoleData } from '@/components/Redux/action';
import { useDispatch } from 'react-redux';

interface AddRoleFormInputs {
    roleName: string;
    description: string;
}

interface AlertHandlerState {
    hasAlert: boolean;
    alertType: AlertColor;
    alertMessage: string;
    alertTitle?: string;
}

interface addRoleProps {
    setClose: Dispatch<SetStateAction<boolean>>;
    setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}
function AddRole({ setClose, setAlertHandler }: addRoleProps) {

    {/* ********* Add User Validation Schema Using Yup ******** */ }
    const AddRoleSchema = yup.object().shape({
        roleName: yup.string().matches(/^[a-zA-Z\s]+$/, 'Role name should contain only alphabets').required("Role name is required"),
        description: yup.string().matches(/^[a-zA-Z\s]+$/, 'Description should contain only alphabets').required("Description is required")
    });

    {/* ********* Define React Hook Form  ******** */ }

    const isSmScreen = useMediaQuery('(max-width:768px)');

    const dispatch = useDispatch()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(AddRoleSchema),
        criteriaMode: "all",
        mode: "onChange",
        reValidateMode: "onChange",
        delayError: 100,
        defaultValues: {
            roleName: "",
            description: "",
        },
    });

    const onSubmit = async (data: AddRoleFormInputs) => {
        try {
            let roleData = {
                "userRoleName": data.roleName,
                "description": data.description,
            };
            const response = await post<any>('/role/create', roleData, setAlertHandler);

            if (response.status === 201) {
                setAlertHandler({
                    hasAlert: true,
                    alertMessage: "Role created successfully!",
                    alertType: "success",
                    alertTitle: "Success",
                });
                dispatch(RoleData(true))
                setClose(false);
            } else {
                setClose(true);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                style={{ marginTop: "1rem" }}
                className="flex flex-col gap-6 mx-2"
            >
                <Grid container spacing={3}>
    
                    <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                
                    <Controller
                        name="roleName"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <PrimaryTextField
                            id="name"
                            label={
                                <>
                                Enter Role Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                                </>
                                }
                            haserror={Boolean(error)}
                            errortext={error?.message}
                            {...field}
                            />
                        )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <PrimaryTextField
                            id="description"
                            multiline
                            label={
                                <>
                                    Enter Description<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
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
                <Grid container spacing={3} className='mt-0'>
                    <Grid item xs={12} md={8}>
                    </Grid>
                    <Grid item xs={12} md={4} className='flex flex-col md:flex-row md:space-x-6'>
                        <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            type="reset"
                            onClick={() => reset()}
                            sx={{
                                // mt: {xs:0,md:2},
                                mb: { xs: 0, md: 3 },
                                height: "45px",
                                fontWeight: 700,
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            type="submit"
                            sx={{
                                // mt: 2,
                                mb: { xs: 3, md: 3 },
                                height: "45px",
                                fontWeight: 700,
                            }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default AddRole;