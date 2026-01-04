'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { logout, removeToken } from "@/utils/hooks/Auth/authService";

interface ProfileProps {
  userName: string;
  userEmail: string;
}

// const Profile = ({ userName, userEmail }: ProfileProps) => {
  const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [activeUser, setActiveUser] = useState("---");
  const [activeUserEmail, setActiveUserEmail] = useState("---");

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  function stringAvatar(name: string) {
    if (name !== null && name !== undefined){
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    } else {
      return {
      };
    }
  }

  // useEffect(() => {
  //   setActiveUser(userName);
  //   setActiveUserEmail(userEmail);
  // }, [userName, userEmail]);

  const handleLogout=()=>{
    removeToken();
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}>
            R
          </Avatar>
           {/* {...stringAvatar(userName)}
         /> */}
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "260px",
          },
        }}
      >
        <Box
          py={1}
          px={2}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"flex-start"}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Avatar
            alt="image"
            sx={{
              width: 35,
              height: 35,
            }}
            >R</Avatar>
             {/* {...stringAvatar(userName)} */}
          {/* /> */}
          <Box py={1} px={1} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ fontWeight: 600 }}
            >
              {activeUser}
            </Typography>
            <Typography 
              variant="h6"
              color={"gray"}
            >
              {activeUserEmail}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            href="/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
            // onClick={() => {
            //   signOut({ redirect:false});
            // }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
