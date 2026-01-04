import React, { forwardRef, ReactNode } from 'react';
import { Select, MenuItem, InputLabel, FormControl, FormHelperText, SelectChangeEvent } from '@mui/material';

interface BasicSelectFieldProps {
  id: string;
  label: React.ReactNode; 
  hasError?: boolean;
  errorText?: string;
  menuItems: { value: string | number; label: string }[];
  onChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void
  // Other props as needed
  size?: string;
  variant?: string;
  color?:string;
}


const PrimarySelectField = forwardRef<HTMLDivElement, BasicSelectFieldProps>(
  (props, ref) => {
    const { id, label, hasError,color, errorText, menuItems, size, variant, onChange, ...otherProps } = props;

    return (
      <FormControl fullWidth variant={variant? "filled" : "outlined"} error={hasError} ref={ref} sx={{
        fontSize: "12px",
        '.MuiInputBase-root.MuiOutlinedInput-root': {
          backgroundColor: color||"#F3F6FB",
          fontSize: "12px"
        },
        '& .MuiInputBase-input': {
          backgroundColor: color||'#F3F6FB', // Your desired background color for the input
        },
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(11, 74, 111, 0.15)',
        },
        '&:hover fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: hasError ? "red" : 'rgba(11, 74, 111, 0.5)',
        },
        '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
        },
      }}>
        <InputLabel id={`${id}-label`} sx={{
          color: "gray",
          fontSize: "12px",
        }}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          label={label}
          size={size ? "small" : "medium"}
          onChange={onChange}
          variant={variant ? "filled" : "outlined"}
          {...otherProps}
          inputProps={{
            style: {
              fontSize: "12px",
              backgroundColor: color||"#F3F6FB",
            },
          }}
          sx={{
            '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
              paddingTop: '15.5px',
              paddingBottom: '15.5px',
              fontSize: "12px"
            },
            '&:focus': {
              backgroundColor: color||'#F3F6FB',
            },
          }}
        >
          {menuItems.map(item => (
            <MenuItem key={item.value} value={item.value} sx={{fontSize:"12px"}}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {hasError && <FormHelperText sx={{
          fontSize: 10,
          color: "red",
          marginLeft: "4px",
        }}>{errorText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default PrimarySelectField;
