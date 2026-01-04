import React, { forwardRef } from 'react';
import { TextField, InputAdornment, Avatar } from '@mui/material';

interface BasicTextFieldsProps {
  id: string;
  label: string;
  multiline?: boolean;
  haserror?: boolean;
  errortext?: string;
  SIcon?: JSX.Element; // Assuming this is an optional prop for flexibility
  endAdornment?: string | JSX.Element;
  size?: string;
  variant?:string;
  color?:string;
}

const PrimaryTextField = forwardRef<HTMLDivElement, BasicTextFieldsProps & Omit<React.ComponentProps<typeof TextField>, keyof BasicTextFieldsProps>>(
  (props, ref) => {
    const { id, label, multiline, haserror, errortext, SIcon, endAdornment,size,variant,color, ...otherTextFieldProps } = props;

    return (
      <TextField
        id={id}
        label={label}
        size={size ? "small" : "medium"}
        variant={variant?"filled":"outlined"}
        fullWidth
        multiline={multiline}
        error={haserror}
        helperText={errortext}
        ref={ref} 
        sx={{
          '.MuiInputBase-root.MuiOutlinedInput-root': {
            backgroundColor:color||"#F3F6FB"
          },
          '& .MuiInputBase-input': {
            backgroundColor: color||'#F3F6FB', // Your desired background color for the input
          },
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(11, 74, 111, 0.15)',
          },
          '&:hover fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: haserror?"red":'rgba(11, 74, 111, 0.5)',
          },
          '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
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
            backgroundColor: color||"#F3F6FB",
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
          endAdornment: endAdornment,
        }}
        {...otherTextFieldProps} // Spread remaining props to TextField
      />
    );
  }
);

export default PrimaryTextField;
