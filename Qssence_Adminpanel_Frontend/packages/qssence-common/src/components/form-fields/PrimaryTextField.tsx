import React, { forwardRef } from 'react';
import { TextField, InputAdornment, Avatar } from '@mui/material';

interface BasicTextFieldsProps {
  id: string;
  label: React.ReactNode; // Updated to allow JSX
  multiline?: boolean;
  haserror?: boolean;
  errortext?: string;
  SIcon?: JSX.Element; // Optional start icon
  endAdornment?: string | JSX.Element; // Optional end adornment
  size?: "small" | "medium"; // Updated for proper MUI size types
  variant?: "filled" | "outlined" | "standard"; // Correct MUI variants
  color?: string; // Background color for the input
}

const PrimaryTextField = forwardRef<
  HTMLDivElement,
  BasicTextFieldsProps & Omit<React.ComponentProps<typeof TextField>, keyof BasicTextFieldsProps>
>((props, ref) => {
  const {
    id,
    label,
    multiline,
    haserror,
    errortext,
    SIcon,
    endAdornment,
    size = "medium",
    variant = "outlined",
    color = "#F3F6FB",
    ...otherTextFieldProps
  } = props;

  return (
    <TextField
      id={id}
      label={label}
      size={size}
      variant={variant}
      fullWidth
      multiline={multiline}
      error={haserror}
      helperText={errortext}
      ref={ref}
      sx={{
        ".MuiInputBase-root.MuiOutlinedInput-root": {
          backgroundColor: color,
        },
        "& .MuiInputBase-input": {
          backgroundColor: color,
        },
        "& fieldset.MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(11, 74, 111, 0.15)",
        },
        "&:hover fieldset.MuiOutlinedInput-notchedOutline": {
          borderColor: haserror ? "red" : "rgba(11, 74, 111, 0.5)",
        },
        "&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
          borderColor: "primary.main",
        },
      }}
      InputLabelProps={{
        sx: {
          color: "gray",
          fontSize: "12px",
        },
      }}
      inputProps={{
        style: {
          fontSize: "12px",
        },
      }}
      FormHelperTextProps={{
        style: {
          fontSize: 10,
          color: "red",
          marginLeft: 4,
        },
      }}
      InputProps={{
        startAdornment: SIcon ? (
          <InputAdornment position="start">{SIcon}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
      }}
      {...otherTextFieldProps} // Spread remaining props to TextField
    />
  );
});

export default PrimaryTextField;
