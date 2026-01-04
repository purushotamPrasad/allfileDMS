'use client'
import { useState } from "react"
import Menuitems from "./MenuItems";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Typography from "@mui/material/Typography"
import { IconPlus } from "@tabler/icons-react";
interface SidebarItemsProps {
  toggleMobileSidebar?: any; // Consider using a more specific type instead of 'any' if possible
  collapseSidebar: boolean;
}
const SidebarItems = ({ toggleMobileSidebar, collapseSidebar }: SidebarItemsProps) => {
  const [activeItem, setActiveItem] = useState(Menuitems && Menuitems[0]?.id);
  const [activePopper, setActivePopper] = useState(null);
  const pathname = usePathname();
  const pathDirect = pathname;

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId === activeItem ? "" : itemId);
  };


  return (
    <Box >
      <Box sx={{ px: 3 }} style={{ minHeight: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #CCD6DE" }}>
        <Typography variant="h4" color="primary" sx={{
          display: `${collapseSidebar?'none':'block'}`
        }}>Web Admin</Typography>
        <IconPlus height={18} width={18} />
      </Box>
      <Box style={{paddingInline:"10px"}}>
      <List sx={{ pt: 0}}  component="div">
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
    </Box>
  );
};
export default SidebarItems;
