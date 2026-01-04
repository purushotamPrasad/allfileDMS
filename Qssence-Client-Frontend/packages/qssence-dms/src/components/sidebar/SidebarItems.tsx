'use client'
import {useEffect, useState} from "react"
import Menuitems, { DeviationTimeline, DeviatoinsMenuitems, filter, FulllibraryMenuitems, NewdeviationTimeline } from "./MenuItems";
import { Box, Button, List, Menu, MenuItem } from "@mui/material";
import NavItem from "./NavItem";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { usePathname } from 'next/navigation';
import TimelineItem from "./TimelineItem";
import {useDispatch, useSelector } from 'react-redux';
import { TimelineData } from "@/components/Redux/action";
import { RootState } from "@/components/Redux/store";


interface SidebarItemsProps {
  toggleMobileSidebar?: any; 
  collapseSidebar: boolean;

}

const SidebarItems = ({ toggleMobileSidebar,collapseSidebar}:SidebarItemsProps) => {

  const dispatch= useDispatch()

  const currentTimeline = useSelector((state: RootState) => state.currentTimeline);

  const pathname = usePathname();
  const [menuitmes, setmenuitems]=useState([]) 
  const segments = pathname.split('/').filter(Boolean);

  const [activePopper, setActivePopper] = useState(null);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: null | HTMLElement }>({});
  const [arrow, setArrow]=useState(false) 

  const newdeviation=JSON.parse(localStorage.getItem('newdeviation'))



 useEffect(()=>
  {
      
    if(pathname==="/" || pathname==="/notifications")
    {
          setmenuitems(Menuitems)
    }
    else if(pathname.startsWith("/library"))
    {
      setmenuitems(FulllibraryMenuitems)
    }

    if(segments[0]=== "quality-management")
    {
      if(segments[1]==="deviations" && segments[2]!=="create")
        {
          setmenuitems(DeviatoinsMenuitems)
        }

        else if(segments[2]==="create")
          {
            if(newdeviation)
            {
               setmenuitems(NewdeviationTimeline)
            }
            else{
              dispatch(TimelineData(DeviationTimeline[0].id))
              setmenuitems(DeviationTimeline)
            }
   
          }
    }
      
  },[pathname])

 

  const [activeItem, setActiveItem] = useState(currentTimeline);


  useEffect(()=>
    {
      if(currentTimeline)
      {
        setActiveItem(currentTimeline)
      }
    
    },[currentTimeline])

  const handleItemClick = (itemId: string) => {
    
    dispatch(TimelineData(itemId))
    setActiveItem(itemId);

  };






  return (
    <>
    {segments[2]==="create" ?
    
    <Box sx={{ px: 0 }}>
    <List sx={{ pt: 0 }} className="sidebarNav" component="div">
      {menuitmes.map((item) => {
        // {/********SubHeader**********/}
          return (
           
            <TimelineItem
              item={item}
              key={item?.id}
              active={activeItem === item.id}
              onClick={() => {
                handleItemClick(item.id);
                // toggleMobileSidebar();
              }}
             
              toggleMobileSidebar={toggleMobileSidebar}
              collapseSidebar={collapseSidebar}
              activePopper={activePopper}
              setActivePopper={setActivePopper}
            />
          )
      })}
    </List>
    </Box>
    
    : 
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {menuitmes.map((item) => {
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
}
      
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
