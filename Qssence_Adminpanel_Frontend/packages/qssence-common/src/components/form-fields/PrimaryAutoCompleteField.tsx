import React, { forwardRef } from 'react';
import { Autocomplete, TextField, FormControl, FormHelperText } from '@mui/material';

interface PrimaryAutoCompleteFieldProps {
  id: string;
  label: string;
  hasError?: boolean;
  errorText?: string;
  options: { value: string | number; label: string }[];
  getOptionLabel: (option: any) => any;
  onChange: (event: React.SyntheticEvent<Element, Event>, newValue: { value: string | number; label: string }[] | null) => void;
  value: { value: string | number; label: string }[] | null;
  color?:string;
}

const PrimaryAutoCompleteField = forwardRef<HTMLDivElement, PrimaryAutoCompleteFieldProps>(
  (props, ref) => {
    const { id, label, hasError,color, errorText, options, getOptionLabel, onChange, value } = props;

    return (
      <FormControl fullWidth variant='filled' error={hasError} sx={{
        fontSize: "12px",
        '& .MuiAutocomplete-inputRoot': {
          backgroundColor: color||"#F3F6FB",
          fontSize: "12px",
          '&:hover': {
            backgroundColor:color|| "#F3F6FB", // Your desired background color on hover
          },
          '&.Mui-focused': {
            backgroundColor:color|| "#F3F6FB", // Background color when focused
          },
        },
        '& .MuiAutocomplete-input': {
          backgroundColor:color|| '#F3F6FB', // Your desired background color for the input
        },
        '& .MuiAutocomplete-inputFocused': {
          backgroundColor: color||'#F3F6FB', // Your desired background color for the input when focused
        },
        '& .MuiAutocomplete-popupIndicator': {
          color: '#000', // Your desired color for the dropdown arrow
        },
        '& .MuiAutocomplete-clearIndicator': {
          color: '#000', // Your desired color for the clear indicator
        },
        '& .MuiAutocomplete-option': {
          fontSize: '12px', // Your desired font size for the options
        },
        '& .MuiAutocomplete-listbox .MuiAutocomplete-option': {
          '&:hover': {
            backgroundColor: color||'#F3F6FB', // Your desired background color for option on hover
          },
        },
        '& .MuiAutocomplete-option[data-focus="true"]': {
          backgroundColor: color||'#F3F6FB', // Your desired background color for the focused option
        },
      }}>
        <Autocomplete
          id={id}
          multiple
          options={options}
          getOptionLabel={getOptionLabel}
          onChange={onChange}
          defaultValue={ []} // Default value should be empty array if value is null
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="filled"
              size='small'
              error={hasError}
              helperText={errorText}
            />
          )}
          ref={ref} // Passing ref directly
        />
        {hasError && <FormHelperText sx={{ fontSize: 10, color: "red", marginLeft: "4px" }}>{errorText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default PrimaryAutoCompleteField;
