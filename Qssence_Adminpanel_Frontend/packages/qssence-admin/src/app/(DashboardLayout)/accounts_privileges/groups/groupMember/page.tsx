"use client";

import GroupMember from "@/components/accounts_Privileges/groups/groupMember";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AllGroups() {
  const [open, setOpen] = useState(false);
  const [tabData, setTabData] = useState(null);
  const [alertHandler, setAlertHandler] = useState(null);

  const handleTabData = (row) => {
    setTabData(row);
  };

  return (
    <div>
      <GroupMember
        setTabData={(e) => handleTabData(e)}
        open={open}
        setAlertHandler={setAlertHandler}
      />
    </div>
  );
}
