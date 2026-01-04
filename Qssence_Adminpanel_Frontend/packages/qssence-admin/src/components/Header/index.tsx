"use client";
import { Box, Stack, IconButton, Badge } from "@mui/material";
import Logo from "../shared/logo/Logo";

// import Logo from "../../asserts/images/ved.png";

// components
import Profile from "./Profile";
import { IconBellRinging } from "@tabler/icons-react";
import Search from "./search";
import { Header, ResizablePopup } from "qssence-common";
import { useState } from "react";
import AuditTrailDialog from "../audit_trail_dialog";

interface ItemType {
  collapseSidebar: Boolean;
}
const HeaderComponent = ({ collapseSidebar }: ItemType) => {
  const [open, setOpen] = useState(false);
  return (
    <Header>
      <Box sx={{ width: { lg: "300px", xs: "auto", left: 0 } }}>
        <Logo collapseSidebar={collapseSidebar} />
      </Box>
      <Box flexGrow={1} />
      <Search />
      <Box flexGrow={1} />
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="right"
        sx={{ width: { lg: "300px", sm: "auto" } }}
        style={{display:"flex", gridColumnGap:"10px"}}
      >
        <ResizablePopup
          open={open}
          setOpen={setOpen}
          dialogContent={<AuditTrailDialog />}
          buttonText="audit"
          dialogTitle="Audit Trail"
          title="Monitor any changes made your projects, schema and content with audit logs"
          
        />
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          style={{padding:"0px"}}
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Profile />
      </Stack>
    </Header>
  );
};
export default HeaderComponent;
