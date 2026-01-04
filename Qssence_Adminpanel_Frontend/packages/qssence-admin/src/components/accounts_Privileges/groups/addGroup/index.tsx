import { AlertColor, Button, Grid } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryTextField } from 'qssence-common';
import { post } from '@/utils/ApiConfig';

interface AddGroupFormInputs {
    name: string;
    description: string;
}

interface AlertHandlerState {
    hasAlert: boolean;
    alertType: AlertColor;
    alertMessage: string;
    alertTitle?: string;
}

interface addGroupProps {
    setClose: Dispatch<SetStateAction<boolean>>;
    setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}
function AddGroup({ setClose, setAlertHandler }: addGroupProps) {

    {/* ********* Add User Validation Schema Using Yup ******** */ }
    const AddGroupSchema = yup.object().shape({
        name: yup.string().matches(/^[a-zA-Z\s]+$/, 'Group name should contain only alphabets').required("Group name is required"),
        description: yup.string().matches(/^[a-zA-Z\s]+$/, 'Description should contain only alphabets').required("Description is required")
    });

    {/* ********* Define React Hook Form  ******** */ }

    const {
        control,
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
        },
    });

    const onSubmit = async (data: AddGroupFormInputs) => {
        try {
            let roleData = {
                "name": data.name,
                "description": data.description,
            };
            const response = await post<any>('/groups/create', roleData, setAlertHandler)
            setClose(false);
            if (response.status === 201) {
                setAlertHandler({
                    hasAlert: true,
                    alertMessage: "Group created successfully!",
                    alertType: "success",
                    alertTitle: "Success",
                });
              
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
                    <Grid item xs={12}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <PrimaryTextField
                                    id="name"
                                    label="Group Name"
                                    haserror={Boolean(error)}
                                    errortext={error?.message}
                                    {...field} // Spread field props (input props like onChange, onBlur, value)
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <PrimaryTextField
                                    id="description"
                                    label="Description"
                                    haserror={Boolean(error)}
                                    errortext={error?.message}
                                    {...field} // Spread field props (input props like onChange, onBlur, value)
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
                                // mb:{xs:3,md:3},
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

export default AddGroup;