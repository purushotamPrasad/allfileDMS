'use client'
import {useState, useEffect} from "react"
import Menuitems, { filter, fulllibraryfilter, deviationfilter } from "./MenuItems";
import { Box, Button, List, Menu, MenuItem, Popover } from "@mui/material";
import NavItem from "./NavItem";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import zIndex from "@mui/material/styles/zIndex";
import { usePathname } from 'next/navigation';

interface SidebarItemsProps {
  toggleMobileSidebar?: any; // Consider using a more specific type instead of 'any' if possible
  collapseSidebar: boolean;
}
const FilterItems = ({ toggleMobileSidebar,collapseSidebar}:SidebarItemsProps) => {
  const [activeItem, setActiveItem] = useState(Menuitems&&Menuitems[0]?.id);
  const [activePopper, setActivePopper] = useState(null);

  const [arrow, setArrow]=useState(false) 
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: null | HTMLElement }>({});
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId === activeItem ? "" : itemId);
  };

  const pathname = usePathname();

  const [menuitmes, setmenuitems]=useState([]) 

  const segments = pathname.split('/').filter(Boolean);


  useEffect(()=>
   {
    
     if(pathname==="/" || pathname==="/notifications")
     {
           setmenuitems(filter)
     }

     else if(pathname.startsWith("/library"))
     {
       setmenuitems(fulllibraryfilter)
     }

     if(segments[0]=== "quality-management")
      {
       
        if(segments[1]==="deviations")
          {
            setmenuitems(deviationfilter)
          }
      }
       
   },[pathname])

  const handleClose = (id: string) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: null,
    }));
  };

  const handleMenu = (e, id) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: !prev[id], 
    }));
    setArrow(!arrow); 
  };

 
        
  

  return (
    <>
    {segments[2]==="create" ? <> 
      
      <Box sx={{px:2}} display={collapseSidebar?'none':'grid'}>
 
      <Box sx={{py:1,color:"#8c8c8c"}}>Sharing Settings</Box>
       
      </Box>
    
    </>:
  <Box sx={{px:2}} display={collapseSidebar?'none':'grid'}>

  <Box sx={{py:1,color:"#8c8c8c"}}>Filters</Box>
  <List sx={{ pt: 0 }}  style={{display:'grid',gridRowGap:'10px',paddingLeft:'6px',position:'relative'}}>
  {menuitmes.map((items) => (
    
          <div key={items.id}>
        
        <Box style={{display:"flex", justifyContent:"space-between", position:'relative'}}>
        <Box sx={{ fontSize: "14px" }}>
          {items.title}
        </Box>
        <Box >
          {anchorEl[items.id] ? (
            <IconChevronUp
              width={18}
              height={18}
              onClick={(e) => handleMenu(e, items.id)}
              style={{color:"#8c8c8c",cursor:'pointer'}}
            />
          ) : (
            <IconChevronDown
              width={18}
              height={18}
              onClick={(e) => handleMenu(e, items.id)}
              style={{color:"#8c8c8c",cursor:'pointer'}}
            />
          )}
        </Box>
        <Menu
            id={items.id}
            anchorEl={anchorEl[items.id]}
            open={Boolean(anchorEl[items.id])}
            onClose={() => handleClose(items.id)}
            keepMounted
           style={{display:'flex',justifyContent:'flex-end'}}
          >
            {items.data?.map((subItem) => (
             
              <MenuItem  key={subItem.id} onClick={() => handleClose(items.id)}>
                {subItem.title}
              </MenuItem>
           
            ))}
          </Menu>

</Box>

         
        </div>
   
  ))} 
</List>
</Box>
}
      </>
  );
};
export default FilterItems;