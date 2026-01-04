
import React from 'react';
import { AppBar,styled, Toolbar, Typography, Button, Menu, MenuItem, useTheme } from '@mui/material';
// import Link from 'next/link';
// import { menuItems } from './menuItems'; // Ensure this path matches your file structure
import { usePathname } from 'next/navigation';
// import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import DynamicBreadcrumb from '../breadcrumbs';
import { useGlobalContext } from '@/app/Context/store';
import { SplitButton } from 'qssence-common';
const SubHeader: React.FC = () => {
  const pathname = usePathname();
  const {activeTab,setActiveTab,setActiveTabId}=useGlobalContext();
  const options = ['Option 1', 'Option 2', 'Option 3'];
   {/* Do Not Delete */}
  // const [anchorEl, setAnchorEl] = useState<{ [key: string]: null | HTMLElement }>({});
  // const theme = useTheme();

  // const handleMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
  //   setAnchorEl((prev) => ({
  //     ...prev,
  //     [id]: event.currentTarget,
  //   }));
  // };

  // const handleClose = (id: string) => {
  //   setAnchorEl((prev) => ({
  //     ...prev,
  //     [id]: null,
  //   }));
  // };

  return (
    <AppBar position="static" sx={{ background: "#fff", borderBottom: "1px solid #CCD6DE", minHeight: "54px !important" ,maxHeight:"54px!important"}} elevation={0}>
      <Toolbar sx={{ minHeight: "52px !important" ,gap:"16px",justifyContent:"space-between"}}>
      <DynamicBreadcrumb url={pathname} activeTab={activeTab}/>
      {/* <SplitButton text="Add User" options={options}/> */}
        {/* Do Not Delete */}
        {/* {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            {item.type === 'single' ? (
              <Link href={item.link || '#'} passHref>
                <Button
                  sx={{
                    my: 2,
                    color: pathname === item.link ? theme.palette.primary.main : theme.palette.text.secondary,
                    fontWeight: pathname === item.link ? "700" : "400",
                    display: 'block',
                  }}
                >
                  {item.title}
                </Button>
              </Link>
            ) : (
              <div key={item.id}>
                <Button
                  aria-controls={item.id}
                  aria-haspopup="true"
                  onClick={(e) => handleMenu(e, item.id)}
                  sx={{
                    color: pathname.includes(item.link || "#") ? theme.palette.primary.main : theme.palette.text.secondary,
                  }}
                  endIcon={Boolean(anchorEl[item.id]) ? <IconChevronUp width={18} height={18} /> : <IconChevronDown width={18} height={18} />} // Dropdown arrow
                >
                  {item.title}
                </Button>
                <Menu
                  id={item.id}
                  anchorEl={anchorEl[item.id]}
                  keepMounted
                  open={Boolean(anchorEl[item.id])}
                  onClose={() => handleClose(item.id)}
                >
                  {item.data?.map((subItem) => (
                    <Link key={subItem.id} href={subItem.link || '#'} passHref>
                      <MenuItem onClick={() => handleClose(item.id)}>{subItem.title}</MenuItem>
                    </Link>
                  ))}
                </Menu>
              </div>
            )}
          </React.Fragment>
        ))} */}
      </Toolbar>
    </AppBar>
  );
};

export default SubHeader;
