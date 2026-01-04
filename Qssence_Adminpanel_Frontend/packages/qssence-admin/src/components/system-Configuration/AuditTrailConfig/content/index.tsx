import { Button, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";

const Content: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const checkboxArray: string[] = ["User Name", "User Id"];

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, data: string) => {
        const isChecked: boolean = event.target.checked;
        if (data === "Select all") {
            if (isChecked) {
                setCheckedItems(new Set(checkboxArray));
            } else {
                setCheckedItems(new Set<string>());
            }
        } else {
            const updatedItems: Set<string> = new Set(checkedItems);
            if (isChecked) {
                updatedItems.add(data);
            } else {
                updatedItems.delete(data);
            }
            setCheckedItems(updatedItems);
        }
    };

    return (
        <div>
            <Typography variant="h6" sx={{ fontSize: "16px", mb: 1 }}>Allowed all types</Typography>
            {checkboxArray.map((item: string, index: number) => (
                <div style={{ display: "flex", alignItems: "center" }} key={index}>
                    <Checkbox
                        size="small"
                        checked={checkedItems.has(item)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, item)}
                        sx={{ padding: "5px!important" }}
                    />
                    <Typography variant="h6">{item}</Typography>
                </div>
            ))}
            <Typography variant="h6" sx={{
                mt: 1
            }}>The types of content whose events are recorded</Typography>
            <Button
                variant="contained"
                size="small"
                type="submit"
                sx={{
                    mt: 1,
                    fontWeight: 700,
                }}
            >
                Save
            </Button>
        </div>
    );
};

export default Content;
