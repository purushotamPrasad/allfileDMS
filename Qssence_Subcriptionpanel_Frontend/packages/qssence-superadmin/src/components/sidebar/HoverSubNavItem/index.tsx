// mui imports
import {
    ListItemIcon,
    ListItem,
    List,
    styled,
    ListItemText,
    useTheme,
    ListItemButton,
  } from "@mui/material";
  import Link from "next/link";
  
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
    pathDirect: string;
    collapseSidebar:boolean
  }
  
  const HoverSubNavItem = ({ item, level, pathDirect, onClick ,collapseSidebar}: ItemType) => {
    const Icon = item.icon;
    const theme = useTheme();
    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  
    const ListItemStyled = styled(ListItem)(() => ({
      padding: 0,
      ".MuiButtonBase-root": {
        whiteSpace: "nowrap",
        marginBottom: "1px",
        padding: "8px 10px",
        borderRadius: "8px",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        color: theme.palette.text.secondary,
        paddingLeft: "10px",
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.main,
        },
        "&.Mui-selected": {
          color: theme.palette.primary.main,
          backgroundColor: "rgba(35, 96, 142, 0.04)",
          "&:hover": {
            backgroundColor: "rgba(35, 96, 142, 0.04)",
            color: theme.palette.primary.main,
          },
        },
      },
    }));
  
    return (
      <List component="div" disablePadding key={item.id}>
        <ListItemStyled>
          <ListItemButton
            component={Link}
            href={item.href}
            disabled={item.disabled}
            selected={pathDirect === item.href}
            target={item.external ? "_blank" : ""}
            onClick={onClick}
          >
            <ListItemIcon
              sx={{
                minWidth: `${collapseSidebar!==true?"36px":"auto"}`,
                justifyContent:`${collapseSidebar!==true?"left":"center"}`,
                // pl:`${collapseSidebar!==true?"32px":"auto"}`,
                // pr:`${collapseSidebar!==true?"10px":"auto"}`,
                color: "inherit",
              }}
            >
              {itemIcon}
            </ListItemIcon>
            {collapseSidebar!==true&&<ListItemText >
              <div style={{display:'flex', justifyContent:'space-between', gridColumnGap:"14px"}}>
              <div>{item.title}</div>
              </div>
            
            </ListItemText>}
          </ListItemButton>
        </ListItemStyled>
      </List>
    );
  };
  
  export default HoverSubNavItem;
  