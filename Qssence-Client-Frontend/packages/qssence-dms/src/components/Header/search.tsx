"use client";
import { useState } from "react";
import { Box, MenuItem, InputAdornment } from "@mui/material";
import Select from "@mui/material/Select";
import { CustomTextField } from "qssence-common";
import { red } from "@mui/material/colors";
import {  IconSearch } from "@tabler/icons-react";

const Search = () => {
    const [month, setMonth] = useState('1');

    const handleChange = (event:any) => {
        setMonth(event.target.value);
    };

    const handleSearch=()=>
    {

    }

    return (
        <Box className=" w-auto md:w-[40%] flex gap-1" sx={{width:{xs:"50%",lg:"40%"},display:"flex",gap:"4px"}}>
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
                style={{minWidth:"30%"}}
                variant="outlined" // Add outlined variant
                sx={{ width:"30%",boxShadow: 'none',background:"#E4EDF6", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
            >
                <MenuItem value={1} disabled>Record ID</MenuItem>
                <MenuItem value={2}>Record by id</MenuItem>
                <MenuItem value={3}>Record by name</MenuItem>
                <MenuItem value={4}>Record by status</MenuItem>
                <MenuItem value={5}>Record by assigned to</MenuItem>
                <MenuItem value={6}>Record by due date</MenuItem>
            </Select>
           
            <CustomTextField size="small" placeholder="Enter search value" id="search" variant="outlined"  fullWidth  sx={{ boxShadow: 'none', position:"relative", background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}   InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconSearch height={20} width={20} onClick={handleSearch} style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                ),
                }}>

            </CustomTextField>
        </Box>
    );
};

export default Search;
