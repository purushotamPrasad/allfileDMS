import { PrimaryTextField, PrimarySelectField, PrimaryAutoCompleteField } from "qssence-common";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Grid, Typography, Switch, FormControlLabel, Divider } from "@mui/material";

interface FormField {
    id: string;
    label: string;
    type: string;
    validationMessage: string;
    fieldType: 'text' | 'select' | 'switch' | 'autocomplete'; // Add 'switch' as a field type
    selectOptions?: { value: string; label: string }[];
    autocompleteOptions?: { value: string; label: string }[];
    required: boolean;
    additionalValidations?: { [key: string]: any };
}

const generateValidationSchema = (fields: FormField[]) => {
    let schema: any = {};
    fields.forEach((field) => {
        let fieldValidation = yup.string();
        if (field.required) {
            fieldValidation = fieldValidation.required(field.validationMessage);
        }
        if (field.additionalValidations) {
            Object.entries(field.additionalValidations).forEach(([key, validation]) => {
                const validationMessage = validation.message || field.validationMessage;
                switch (key) {
                    case 'min':
                        fieldValidation = fieldValidation.min(validation.value, validationMessage);
                        break;
                    case 'max':
                        fieldValidation = fieldValidation.max(validation.value, validationMessage);
                        break;
                    case 'minLength':
                        fieldValidation = fieldValidation.min(validation.value, validationMessage);
                        break;
                    case 'maxLength':
                        fieldValidation = fieldValidation.max(validation.value, validationMessage);
                        break;
                    case 'pattern':
                        fieldValidation = fieldValidation.matches(validation.value, validationMessage);
                        break;
                    default:
                        console.error(`Validation method '${key}' is not supported by Yup.`);
                }
            });
        }
        schema[field.id] = fieldValidation;
    });
    return yup.object().shape(schema);
};

interface FormComponentProps {
    formFields: { [key: string]: FormField[] };
    Submit: (data: any) => void;
}

const ConfigForm = ({ formFields, Submit }: FormComponentProps) => {
    const AddGroupSchema: { [key: string]: yup.AnySchema } = {};
    Object.keys(formFields).forEach(key => {
        AddGroupSchema[key] = generateValidationSchema(formFields[key]);
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        resolver: yupResolver(yup.object().shape(AddGroupSchema)),
        criteriaMode: "all",
        mode: "onChange",
        reValidateMode: "onChange",
        delayError: 100,
        defaultValues: Object.keys(formFields).reduce((acc: any, key) => {
            formFields[key].forEach(field => {
                acc[`${key}.${field.id}`] = field.type === "switch" ? false : "";
                if (field.fieldType === "autocomplete") {
                    acc[`${key}.${field.id}`] = [];
                }
            });
            return acc;
        }, {}),
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        Submit(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ pr: { xs: 2, md: 10 }, pl: 2 }}>
                    {Object.keys(formFields).map((key, index) => (
                        <div key={index}>
                            {key !== "" &&
                                <><Divider sx={{ my: 3 }} />
                                    <Typography variant="h4" color="primary">{key}</Typography></>}
                            {formFields[key].map((data, fieldIndex) => (
                                <Grid key={fieldIndex} container spacing={3} sx={{ mt: 1, alignItems: "center" }}>
                                    <Grid item xs={12} md={3} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "start", md: "end" } }}>
                                        <Typography variant="h6">{data.label}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        {data.fieldType === 'text' ? (
                                            <Controller
                                                name={`${key}.${data.id}`}
                                                control={control}
                                                render={({ field, fieldState: { error } }) => (
                                                    <PrimaryTextField
                                                        id={data.id}
                                                        size="small"
                                                        variant="filled"
                                                        label={data.label}
                                                        type={data.type}
                                                        haserror={Boolean(error)}
                                                        errortext={error?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        ) : data.fieldType === 'select' ? (
                                            <Controller
                                                name={`${key}.${data.id}`}
                                                control={control}
                                                render={({ field, fieldState: { error } }) => (
                                                    <PrimarySelectField
                                                        {...field}
                                                        label={data.label}
                                                        id={data.id}
                                                        size="small"
                                                        variant="filled"
                                                        hasError={Boolean(error)}
                                                        errorText={error?.message}
                                                        menuItems={data.selectOptions}
                                                    />
                                                )}
                                            />
                                        ) : data.fieldType === 'autocomplete' ? (
                                            <Controller
                                                name={`${key}.${data.id}`}
                                                control={control}
                                                render={({ field, fieldState: { error } }) => (
                                                    <PrimaryAutoCompleteField
                                                        id={data.id}
                                                        label={data.label}
                                                        hasError={Boolean(error)}
                                                        errorText={error?.message}
                                                        options={data.autocompleteOptions}
                                                        getOptionLabel={(option) => option.label}
                                                        onChange={(event, newValue) => {
                                                            const selectedValues = newValue ? newValue.map((item) => ({ value: item.value, label: item.label })) : [];
                                                            field.onChange(selectedValues);
                                                        }}
                                                        value={field.value || []}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        ) : (
                                            <Controller
                                                name={`${key}.${data.id}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControlLabel
                                                        control={<Switch
                                                            {...field}
                                                            checked={field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                        />}
                                                        label={field.value ? "On" : "Off"}
                                                    />
                                                )}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            ))}
                        </div>
                    ))}
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={8}></Grid>
                        <Grid item xs={12} md={4} className='flex flex-col md:flex-row md:space-x-6'>
                            <Button
                                variant="outlined"
                                size="small"
                                fullWidth
                                type="reset"
                                onClick={() => reset()}
                                sx={{
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
                                    mb: { xs: 3, md: 3 },
                                    height: "45px",
                                    fontWeight: 700,
                                }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </div>
    );
};

export default ConfigForm;
