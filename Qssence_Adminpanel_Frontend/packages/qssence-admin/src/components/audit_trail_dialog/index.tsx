import { Button, Typography } from "@mui/material";
import Filter from "./filter";
import { IconFileExport } from "@tabler/icons-react";
import AuditLog from "./audit_log";

const AuditTrailDialog = () => {
    return (
        <div style={{ display: "flex", height: "100%" }} >
            <div style={{ width: "70%", padding: "0.5rem 24px",overflowY:"auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <Typography>Showing the audit information  for all</Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        type="submit"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        <IconFileExport height={16} width={16} />&nbsp;
                        Export
                    </Button>
                </div>
                <AuditLog/>
            </div>
            <div style={{ width: "30%", background: "#f2f5f8", padding: "0.5rem 24px" }}>
                <Typography>Filter</Typography>
                <Filter />
            </div>
        </div>
    )
}
export default AuditTrailDialog;