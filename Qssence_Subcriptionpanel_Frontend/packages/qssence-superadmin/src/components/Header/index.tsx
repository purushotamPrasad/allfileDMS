"use client"
import {
    Box,
    Stack,
    IconButton,
    Badge,
  } from "@mui/material";
import Logo from "../shared/logo/Logo";
// components
import Profile from "./Profile";
import { IconBellRinging } from "@tabler/icons-react";
import Search from "./search";
import { Header } from "qssence-common";

  interface ItemType {
    collapseSidebar:Boolean
  }
const HeaderComponent=({collapseSidebar}: ItemType)=>{

    return(
     <Header>
        <Box sx={{width:{lg:"300px",xs:"auto"}}}>
        <Logo collapseSidebar={collapseSidebar} />
        </Box>
        <Box flexGrow={1} />
        <Search />
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="right" sx={{width:{lg:"300px",sm:"auto"}}}>
          <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
          >
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>
          </IconButton>
          <Profile />
        </Stack>
     </Header>
    )
}
export default HeaderComponent;