"use client"
import React, { forwardRef, Ref, ForwardRefRenderFunction } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import { FormHelperText } from '@mui/material';
interface DateRangePickerFieldProps {
  id: string;
  label: string;
  size?: "small" | "medium";
  haserror?: boolean;
  errortext?: string;
  variant?: "filled" | "outlined";
  color?:string;
  [key: string]: any; // To allow any additional props to be passed
}

const DateRangePickerField: ForwardRefRenderFunction<HTMLInputElement, DateRangePickerFieldProps> = (
  { id, label, haserror,color, errortext, size = "medium", variant = "outlined", defaultValue = null, ...other },
  ref: Ref<HTMLInputElement>
) => {
  console.log(errortext,haserror)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label={label}
          slotProps={{
            textField: {
              id: id, variant: variant, size: size, sx: {
                width: "100%", '.MuiInputBase-root.MuiOutlinedInput-root': {
                  backgroundColor: color||"#F3F6FB"
                },
                '& .MuiInputBase-input': {
                  backgroundColor: color||'#F3F6FB', // Your desired background color for the input
                },
                '& fieldset.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(11, 74, 111, 0.15)',
                },
                '&:hover fieldset.MuiOutlinedInput-notchedOutline': {
                  borderColor: haserror ? "red" : 'rgba(11, 74, 111, 0.5)',
                },
                '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },"&.MuiButtonBase-root.MuiIconButton-root":{
                  background: color||"#F3F6FB",
                  height: "2.75rem"
                }}
            }
          }}
          ref={ref}
          defaultValue={dayjs(defaultValue)}
          {...other}
          sx={{background:color||"#F3F6FB"}}
        />
      </DemoContainer>
      {haserror && <FormHelperText sx={{
          fontSize: 10,
          color: "red",
          marginLeft: "4px",
        }}>{errortext}</FormHelperText>}
    </LocalizationProvider>
  );
};

export default forwardRef(DateRangePickerField);
