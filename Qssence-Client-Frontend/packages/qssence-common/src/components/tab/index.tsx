"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { IconAdjustments, IconFileExport } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
// import Link from 'next/link';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  filterUI: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, filterUI, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        background: filterUI === true ? "transparent" : "#fff",
        minHeight: "67vh",
        height: "100%",
        borderBottomLeftRadius: "6px",
        borderBottomRightRadius: "6px",
      }}
    >
      {value === index && (
        <Box
          sx={{ px: filterUI !== true ? 3 : 0, pt: filterUI !== true ? 2 : 0 }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabInfo {
  label: string;
  link: string;
  content: React.ReactNode;
}

interface Props {
  tabs: TabInfo[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setActiveTabId: Dispatch<SetStateAction<number>>;
  activeTabId: number;
  showExport?: boolean;
  showFilter?: boolean;
  filterUI?: boolean;
  setFilterUI?: Dispatch<SetStateAction<boolean>>;
}

export default function TabComponent({
  tabs,
  activeTab,
  setActiveTab,
  activeTabId,
  setActiveTabId,
  showExport,
  showFilter,
  filterUI,
  setFilterUI,
}: Props) {
  const [value, setValue] = React.useState(activeTabId);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setActiveTabId(newValue);
    setActiveTab(tabs[newValue]?.label);
  };

  React.useEffect(() => {
    setActiveTab(tabs[value]?.label);
  }, [value]);

  React.useEffect(() => {
    setValue(activeTabId);
  }, [activeTabId]);

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            minHeight: "38px",
            height: "38px",
            background: "#fff",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            "& .MuiTab-root": {
              minHeight: "38px",
              height: "38px",
              "&.Mui-selected": {
                backgroundColor: "#fff",
                minHeight: "38px",
                height: "38px",
              },
              "&.Mui-selected.MuiTab-textColorPrimary": {
                color: "primary", // Active tab text color
                minHeight: "38px",
                height: "38px",
                // border:"1px solid #D0D5DD"
              },
              "&:not(.Mui-selected)": {
                backgroundColor: "#F6F9FB",
                // borderLeft: '1px solid #D0D5DD',
                // borderRight: '1px solid #D0D5D',
                minHeight: "38px",
                height: "38px",
              },
            },
          }}
        >
          {tabs?.map((tab, index) => (
            // <Link href={tab?.link}>
            <Tab key={index} label={tab?.label} {...a11yProps(index)} />
            //  </Link>
          ))}
        </Tabs>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "end",
            alignItems: "center",
            paddingRight: "2.5rem",
            marginBottom: "0.5rem",
          }}
        >
          {showExport === true && (
            <Button
              size="small"
              type="submit"
              style={{
                fontWeight: 700,
                backgroundColor: "#1E5279",
                color: "#fff",
              }}
            >
              <IconFileExport height={16} width={16} />
              &nbsp; Export
            </Button>
          )}
          &nbsp;&nbsp;
          {showFilter && setFilterUI && (
            <IconAdjustments
              width="20"
              height="20"
              onClick={() => setFilterUI?.(!filterUI)}
              cursor={"pointer"}
            />
          )}
        </div>
      </Box>
      {tabs?.map((tab, index) => (
        <CustomTabPanel
          key={index}
          value={value}
          index={index}
          filterUI={filterUI || false}
        >
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
