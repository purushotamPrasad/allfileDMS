import { AlertColor, Button, Grid } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField } from "qssence-common";
import { post } from "@/utils/ApiConfig";

interface AddPermissionFormInputs {
  permissionName: string;
  type: string;
  accessLevel: string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface addPermissionProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}
function AddPermission({ setClose, setAlertHandler }: addPermissionProps) {
  {
    /* ********* Add User Validation Schema Using Yup ******** */
  }
  const AddPermissionSchema = yup.object().shape({
    permissionName: yup
      .string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Permission name should contain only alphabets"
      )
      .required("Permission name is required"),
    type: yup.string().required("Permission Type is required"),
    accessLevel: yup.string().required("Access Level is required"),
  });

  {
    /* ********* Define React Hook Form  ******** */
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddPermissionSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      permissionName: "",
      type: "",
      accessLevel: "",
    },
  });

  const onSubmit = async (data: AddPermissionFormInputs) => {
    try {
      let permissionData = {
        permissionName: data.permissionName,
        permissionType: data.type,
        permissionAccessLevel: data.accessLevel,
      };
      const response = await post<any>(
        "/permission/createPermission",
        permissionData,
        setAlertHandler
      );
      if (response.status === 201) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Permission created successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
        setClose(false);
      } else {
        setClose(true);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
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
              name="permissionName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="permissionName"
                  label="Permission Name"
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
              name="type"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  label="Permission Type"
                  id="type"
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={[
                    { value: "USER", label: "USER" },
                    { value: "ROLE", label: "ROLE" },
                    { value: "GROUP", label: "GROUP" },
                  ]}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="accessLevel"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  label="Access Level"
                  id="accessLevel"
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={[
                    { value: "CAN_MODIFY", label: "CAN_MODIFY" },
                    { value: "CAN_DELETE", label: "CAN_DELETE" },
                    { value: "CAN_CREATE", label: "CAN_CREATE" },
                    { value: "CAN_VIEW", label: "CAN_VIEW" },
                  ]}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-0">
          <Grid item xs={12} md={8}></Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="flex flex-col md:flex-row md:space-x-6"
          >
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
  );
}

export default AddPermission;
