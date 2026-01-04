import {
  Box,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";
import { IconArrowBarRight } from "@tabler/icons-react";
import { IconArrowBarLeft } from "@tabler/icons-react";
import { ReactNode } from "react";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
  children: ReactNode;
  collapseSidebar: Boolean;
  setCollapseSidebar: Function;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  collapseSidebar,
  setCollapseSidebar,
  children,
}: ItemType) => {
  const sidebarWidth = "240px";
  const CollapseWidth = "80px";

  return (
    <Box
      sx={{
        width: `${collapseSidebar === true ? CollapseWidth : sidebarWidth}`,
        height: "100%!important",
      }}
    >
      <Drawer
        anchor="left"
        open={isMobileSidebarOpen}
        onClose={onSidebarClose}
        variant="permanent"
        PaperProps={{
          sx: {
            width: `${collapseSidebar === true ? CollapseWidth : sidebarWidth}`,
            boxShadow: "none",
            zIndex: 1,
          },
        }}
      >

       {/******** SIDEBAR MENU DATA**********/}

        {children}

        {/******** DRAWER OPEN CLOSE ICON**********/}
        
        <Box
          sx={{
            borderTop: "1px solid #CCD6DE",
            display: "flex",
            width: "100%",
            justifyContent: collapseSidebar===true?"center":"end",
            alignItems: "end",
            position: "absolute",
            paddingTop:"8px",
            bottom: "10px",
            paddingRight: collapseSidebar===true?"10px":"18px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => setCollapseSidebar(!collapseSidebar)}
          >
            {collapseSidebar === true ? (
              <IconArrowBarRight width="20" height="20" />
            ) : (
              <IconArrowBarLeft width="20" height="20" />
            )}
          </IconButton>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
