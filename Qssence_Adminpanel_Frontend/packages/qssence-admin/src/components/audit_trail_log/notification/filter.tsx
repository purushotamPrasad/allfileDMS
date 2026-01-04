import { AlertColor, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DateRangePickerField, PrimarySelectField, PrimaryTextField } from 'qssence-common';

interface FilterFormInputs {
    selectEvent: string;
    dateRange: Date;
    date:Date;
    userName: string;
    roles: number;
}

function Filter() {
    const FilterSchema = yup.object().shape({
        selectEvent: yup.string().required('Event is required'),
        dateRange: yup.date().required('Date Range is required'), // Use yup.date() for date fields
        date: yup.date().required('Date is required'), // Use yup.date() for date fields
        userName: yup.string().required('User name is required'),
        roles: yup.number().required("Roles is required")
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(FilterSchema),
        criteriaMode: 'all',
        mode: 'onChange',
        reValidateMode: 'onChange',
        delayError: 100,
        defaultValues: {
            selectEvent: '',
            // dateRange: new Date(), // Use new Date() for default value
        },
    });
    const [value, setValue] = React.useState('Specific Date');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    const onSubmit: SubmitHandler<FilterFormInputs> = async (data) => {
        console.log(data);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                style={{ marginTop: '1rem' }}
                className="flex flex-col gap-4 "
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            name="selectEvent"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <PrimarySelectField
                                    {...field}
                                    label="Select Event"
                                    id="selectEvent"
                                    size="small"
                                    variant="filled"
                                    hasError={Boolean(error)}
                                    errorText={error?.message}
                                    menuItems={[
                                        { label: 'one', value: 'one' },
                                        { label: 'two', value: 'two' },
                                    ]}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Controller
                            name="userName"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <PrimaryTextField
                                    id="userName"
                                    label="User Name"
                                    size="small"
                                    variant="filled"
                                    haserror={Boolean(error)}
                                    errortext={error?.message}
                                    {...field} // Spread field props (input props like onChange, onBlur, value)
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            name="roles"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <PrimarySelectField
                                    {...field}
                                    label="Roles"
                                    id="roles"
                                    size="small"
                                    variant="filled"
                                    hasError={Boolean(error)}
                                    errorText={error?.message}
                                    menuItems={[
                                        { label: "1", value: 1 },
                                        { label: "2", value: 2 },
                                    ]}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <FormControl sx={{ fontSize: 12 }}>
                    <Typography id="demo-row-radio-buttons-group-label" variant='h6' sx={{ fontSize: "12px" }}> Date </Typography>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        sx={{ fontSize: 12 }}
                    >
                        <FormControlLabel
                            value="Specific Date"
                            control={<Radio size="small" sx={{ fontSize: 12 }} />}
                            label={
                                <Typography id="demo-row-radio-buttons-group-label" variant='h6' sx={{ fontSize: "12px" }}> Specific Date </Typography>
                            }
                            sx={{ fontSize: 12 }}
                        />
                        <FormControlLabel
                            value="Specific Range"
                            control={<Radio size="small" sx={{ fontSize: 12 }} />}
                            label={
                                <Typography id="demo-row-radio-buttons-group-label" variant='h6' sx={{ fontSize: "12px" }}> Specific Range </Typography>
                            }
                            sx={{ fontSize: 12 }}
                        />
                    </RadioGroup>
                </FormControl>
                {value==="Specific Range"?
                <Grid container spacing={3} style={{ marginTop: "-2.5rem" }}>
                    <Grid item xs={12}>
                        <Controller
                            name="dateRange"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <DateRangePickerField
                                    size="small"
                                    variant="filled"
                                    label="Select Date Range"
                                    haserror={Boolean(error)}
                                    errortext={error?.message}
                                    defaultValue={new Date()} // Use defaultValue to set default value
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                </Grid>:
                <Grid container spacing={3} style={{ marginTop: "-2.5rem" }}>
                    <Grid item xs={12}>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <DateRangePickerField
                                id="date"
                                    size="small"
                                    variant="filled"
                                    label="Select Date "
                                    haserror={Boolean(error)}
                                    errortext={error?.message}
                                    defaultValue={new Date()} // Use defaultValue to set default value
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                </Grid>}
                <Grid container spacing={3} className="mt-0">
                    <Grid item xs={12} md={8}></Grid>
                    <Grid item xs={12} md={4} className="flex flex-col md:flex-row md:space-x-6">
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            type="submit"
                            sx={{
                                height: '45px',
                                fontWeight: 700,
                            }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Filter;
