"use client";

import WorkflowMember from "@/components/workflow/dms-workflow/workflowMember";
import { useState } from "react";

export default function AllMember() {

  const [alertHandler, setAlertHandler] = useState(null);

  return (
    <div>
      <WorkflowMember
        setAlertHandler={setAlertHandler}
      />
    </div>
  );
}