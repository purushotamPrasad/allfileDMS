import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar} from '@mui/material';
import { usePathname } from 'next/navigation';
import { IconChevronDown, IconChevronsDown, IconChevronsRight,
   IconChevronUp, IconLayoutGrid, IconPlus, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


type SubHeaderProps = {
  collapseSidebar: boolean;
};

type InputValueType = {
  documenttype: string;
  documentsubtype: string;
  classification: string;
};

const SubHeader: React.FC<SubHeaderProps> = ({ collapseSidebar }) => {

 
 
  return (
    <AppBar position="static" sx={{ background: "#fff", borderBottom: "1px solid #CCD6DE" }} elevation={0}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: 'relative',
          gap: '4px',
          paddingLeft: '0px',
          alignItems: 'center',
        }}
      >
      
       
      </Toolbar>
     
          
     
    </AppBar>
    
  );
};

export default SubHeader;

/*  <Menu
            anchorEl={dropdownOpen ? document.body : null}
            open={dropdownOpen}
            onClose={handleDropdownClick} 
           style={{position:'absolute'}}
          >
            <MenuItem onClick={handleDropdownClick}>+ User task</MenuItem>
            <MenuItem onClick={handleDropdownClick}>+ Document</MenuItem>
          </Menu>
          */
