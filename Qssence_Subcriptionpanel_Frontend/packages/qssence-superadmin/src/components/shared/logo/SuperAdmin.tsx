'use client'

import Image from "next/image";
import CollapseLogo from "../../../../public/x.png";
import { Box } from "@mui/material";

interface LogoProps {
  collapseSidebar?: Boolean;
}
const SuperAdmin = ({collapseSidebar}:LogoProps) => {
  return (
    <>
    {collapseSidebar ===true?
     <div style={{display:"flex", justifyContent:"center", alignItems:"center",height:"60px", cursor:'pointer'}}>
      <Image src={CollapseLogo} alt="logo"  priority />
    </div>:
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"60px"}}>
      <div className="hero_title primary_color">Super Admin</div>
      <Image src={CollapseLogo} alt="logo" style={{cursor:'pointer'}}  priority />
    </div>}
    </>
   
  );
};

export default SuperAdmin;