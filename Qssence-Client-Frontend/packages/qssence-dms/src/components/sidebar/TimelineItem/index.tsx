import React, { useState } from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  Collapse,
  ListItemButton,
  Typography,
  Popper,
  Fade,
  Paper,
} from "@mui/material";
// import Link from "next/link";
import { usePathname } from "next/navigation";
import SubNavItem from "../SubNavItem";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import HoverSubNavItem from "../HoverSubNavItem";
// Import other needed components and hooks
type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  active: boolean;
  toggleMobileSidebar: any;
  collapseSidebar:boolean;
  activePopper:string|null;
  setActivePopper:Function;
}
const TimelineItem = ({
  item,
  level,
  active,
  onClick,
  collapseSidebar,
  setActivePopper
}: ItemType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const theme = useTheme();
  const pathname = usePathname();
  const pathDirect = pathname;


  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "2px 10px",
      borderRadius: "0px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "15px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        borderLeft:"5px solid rgba(35, 96, 142, 1)",
        paddingLeft: "10px",
        color: "rgba(35, 96, 142, 1)",
        backgroundColor: "rgba(35, 96, 142, 0.1)",
      },
    },
  }));

const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
  setActivePopper(item.id)
};

const handleMouseLeave = () => {
  setAnchorEl(null);
  setActivePopper(null)
};


  return (
    <>
       <div
        id={item.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <List
          component="div"
          disablePadding
          key={item.id}
          sx={{mt:0.5}}
          onClick={onClick}
        >
           
          <ListItemStyled>
            <ListItemButton disabled={item.disabled} selected={active} sx={{justifyContent:"center"}}>
              {collapseSidebar!==true&&
              <ListItemText style={{fontSize:"14px"}}>{item.title}</ListItemText>}
              {collapseSidebar!==true&&<ListItemIcon style={{ width: "20px", height: "20px", display: "flex", justifyContent: "end", color: "inherit", padding:"0px" }}>
              </ListItemIcon>}
            </ListItemButton>
          </ListItemStyled>
        </List>

       
      </div>

    </>
  );
};

export default TimelineItem;