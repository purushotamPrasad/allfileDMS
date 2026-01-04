'use client'
import {useEffect, useState} from "react"
import Menuitems from "./MenuItems";
import { Box, Button, List, Menu, MenuItem } from "@mui/material";
import NavItem from "./NavItem";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { usePathname } from 'next/navigation';



interface SidebarItemsProps {
  toggleMobileSidebar?: any; // Consider using a more specific type instead of 'any' if possible
  collapseSidebar: boolean;
}
const SidebarItems = ({ toggleMobileSidebar,collapseSidebar}:SidebarItemsProps) => {

  const [activeItem, setActiveItem] = useState(Menuitems&&Menuitems[0]?.id);
  const [activePopper, setActivePopper] = useState(null);


  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId === activeItem ? "" : itemId);
  };


  return (
    <>
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
            return (
             
              <NavItem
                item={item}
                key={item?.id}
                active={activeItem === item.id}
                onClick={() => {
                  handleItemClick(item.id);
                  // toggleMobileSidebar();
                }}
                toggleMobileSidebar={toggleMobileSidebar}
                data={item?.subMenu}
                collapseSidebar={collapseSidebar}
                activePopper={activePopper}
                setActivePopper={setActivePopper}
              />
            )
        })}
      </List>
      </Box>

      
      </>
  );
};
export default SidebarItems;

/* 

 <div
                  id={items.id}
                  anchorEl={anchorEl[items.id]}
                  open={Boolean(anchorEl[items.id])}
                  onClose={() => handleClose(items.id)}
                  style={{position:'absolute'}}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right', 
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left', 
                  }}
                  MenuListProps={{
                    'aria-labelledby': items.id,
                  }}
                >
                  {items.data?.map((subItem) => (
                    <MenuItem key={subItem.id} onClick={() => handleClose(items.id)}>
                      {subItem.title}
                    </MenuItem>
                  ))}
                </div>

 <IconChevronUp width={18} height={18}     onClick={(e) => handleMenu(e,items.id)} /> : <IconChevronDown width={18} height={18}   onClick={(e) => handleMenu(e,items.id)} />}

<NavItem
             item={items}
             key={items?.id}
             active={activeItem === items.id}
             onClick={() => {
               handleItemClick(items.id);
               // toggleMobileSidebar();
             }}
             toggleMobileSidebar={toggleMobileSidebar}
             data={items?.subMenu}
             collapseSidebar={collapseSidebar}
             activePopper={activePopper}
             setActivePopper={setActivePopper}
           />*/
