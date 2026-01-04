'use client'

import Image from "next/image";
// import DarkLogo from "../../../../public/DoQssence.png";
import DarkLogo from "../../../asserts/images/ved.png";
import CollapseLogo from "../../../../public/x.png";
import { Box } from "@mui/material";

interface LogoProps {
  collapseSidebar?: Boolean;
}
const Doqssence = ({collapseSidebar}:LogoProps) => {
  return (
    <>
    {collapseSidebar ===true?
     <div style={{display:"flex", justifyContent:"center", alignItems:"center",height:"60px", cursor:'pointer'}}>
      <Image src={CollapseLogo} alt="logo"  priority />
    </div>:
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"60px"}}>
      {/* <Image src={DarkLogo} alt="logo"  priority width={120} /> */}
      <div style={{fontSize:"40px", fontWeight:"900"}}>VED</div>
      <Image src={CollapseLogo} alt="logo" style={{cursor:'pointer'}}  priority />
    </div>}
    </>
   
  );
};

export default Doqssence;