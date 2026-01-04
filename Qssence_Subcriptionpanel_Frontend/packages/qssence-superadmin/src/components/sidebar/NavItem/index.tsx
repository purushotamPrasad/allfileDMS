"use client";
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
import Link from "next/link";
// Import other needed components and hooks
type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  active: boolean;
  data: Array<Object>;
  toggleMobileSidebar: any;
  collapseSidebar: boolean;
  activePopper: string | null;
  setActivePopper: Function;
}
const NavItem = ({
  item,
  level,
  active,
  data,
  onClick,
  toggleMobileSidebar,
  collapseSidebar,
  activePopper,
  setActivePopper,
}: ItemType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const Icon = item.icon;
  const theme = useTheme();
  const pathname = usePathname();
  const pathDirect = pathname.split('/')[1];
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "6px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  }));

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setActivePopper(item.id);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setActivePopper(null);
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
          sx={{ mt:1 }}
          onClick={onClick}
        >
          <ListItemStyled>
            <ListItemButton
              component={Link}
              target={item.external ? "_blank" : ""}
              onClick={onClick}
              href={item.href}
              disabled={item.disabled}
              selected={pathDirect===item.href.split('/')[1]}
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon
                sx={{
                  minWidth: `${collapseSidebar !== true ? "36px" : "auto"}`,
                  justifyContent: `${
                    collapseSidebar !== true ? "left" : "center"
                  }`,
                  p: "3px 0",
                  color: "inherit",
                }}
              >
                {itemIcon}
              </ListItemIcon>
              {collapseSidebar !== true && (
                <ListItemText>{item.title}</ListItemText>
              )}
              {(collapseSidebar !== true && item.subMenu)&& (
                <ListItemIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "end",
                    color: "inherit",
                  }}
                >
                  {active ? (
                    <IconChevronUp width={20} height={20} />
                  ) : (
                    <IconChevronDown width={20} height={20} />
                  )}
                </ListItemIcon>
              )}
            </ListItemButton>
          </ListItemStyled>
        </List>

        {/* Popup container for SubNavItems */}
        {(activePopper === item.id && collapseSidebar === true) && (
          <Popper
            sx={{ paddingLeft: "17px" }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="right-start"
            transition
            style={{ zIndex: "1300" }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  sx={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    minWidth: "200px",
                  }}
                >
                  <Typography
                    style={{
                      marginBottom: "4px",
                      marginLeft: "2px",
                      marginRight: "2px",
                    }}
                    fontWeight={600}
                  >
                    {item.title}
                  </Typography>
                  {data&&data.map((subdata, index) => (
                    <HoverSubNavItem
                      item={subdata}
                      key={index}
                      onClick={toggleMobileSidebar}
                      collapseSidebar={false} pathDirect={""}                    />
                  ))}
                </Paper>
              </Fade>
            )}
          </Popper>
        )}
      </div>

      {/* Your existing Collapse logic for clicked state */}
      <Collapse in={active} timeout="auto" unmountOnExit>
        <List disablePadding>
          {/* (active===true)? */}
          {data?.map((subdata: Object, index: React.Key | null | undefined) => (
            <SubNavItem
              item={subdata}
              key={index}
              onClick={toggleMobileSidebar}
              collapseSidebar={collapseSidebar} pathDirect={""}            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NavItem;
