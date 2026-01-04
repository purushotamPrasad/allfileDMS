
import React from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Chip,
  Box,
} from '@mui/material';

interface PrimaryMultiSelectFieldProps {
  id: string;
  label: React.ReactNode;
  hasError?: boolean;
  errorText?: string;
  menuItems: { value: string; label: string }[];
  selectedItems: string[]; // Selected values for multi-select
  onSelect: (item: string) => void; // Handler for adding items
  onRemove: (item: string) => void; // Handler for removing items
  size?: string;
  variant?: string;
  color?: string;
}

const PrimaryMultiSelectField: React.FC<PrimaryMultiSelectFieldProps> = ({
  id,
  label,
  hasError,
  errorText,
  menuItems,
  selectedItems = [],
  onSelect,
  onRemove,
  size,
  variant,
  color,
}) => {
  // Local state to manage open/close dropdown


  // Filter menuItems to exclude those already selected
  const availableMenuItems = menuItems.filter(
    (item) => !selectedItems.includes(item.value)
  );



  const handleChange = (event: any) => {
    const value = event.target.value;
    const numericValues = value.map((item: string) => Number(item));

    const lastSelectedItem = numericValues[numericValues.length - 1];
     
    if (!selectedItems.includes(lastSelectedItem)) {
      onSelect(lastSelectedItem); 
    }
   
  };




  return (
    <FormControl
      fullWidth
      variant={variant ? 'filled' : 'outlined'}
      error={hasError}
      sx={{
        fontSize: '12px',
        '.MuiInputBase-root.MuiOutlinedInput-root': {
          backgroundColor: color || '#F3F6FB',
          fontSize: '12px',
        },
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(11, 74, 111, 0.15)',
        },
        '&:hover fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: hasError ? 'red' : 'rgba(11, 74, 111, 0.5)',
        },
        '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
        },
      }}
    >
      <InputLabel
        id={`${id}-label`}
        sx={{
          color: 'gray',
          fontSize: '12px',
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        multiple
        value={selectedItems}
        onChange={handleChange}
        size={size ? 'small' : 'medium'}
        variant={variant ? 'filled' : 'outlined'}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(selected as string[]).map((value) => (
              <Chip
                key={value}
                label={menuItems.find((item) => item.value === value)?.label || value}
                onMouseDown={(event) => {
                  event.stopPropagation(); 
                }}
                onDelete={(event) => {
                  event.stopPropagation(); 
                  onRemove(value); 
                }}
                sx={{
                  fontSize: '12px',
                  backgroundColor: color || 'rgba(11, 74, 111, 1)',
                  color: '#fff',
                }}
              />
            ))}
          </Box>
        )}
        sx={{
          '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
            paddingTop: '15.5px',
            paddingBottom: '15.5px',
            fontSize: '12px',
          },
          '&:focus': {
            backgroundColor: color || '#fff',
          },
        }}
      >
        {availableMenuItems.map((item) => (
          <MenuItem key={item.value} value={item.value} sx={{ fontSize: '12px' }}>
            {item.label}
          </MenuItem>
        ))}
      </Select>


      {hasError && (
        <FormHelperText
          sx={{
            fontSize: 10,
            color: 'red',
            marginLeft: '4px',
          }}
        >
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PrimaryMultiSelectField;
