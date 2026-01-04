'use client'
import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import QssenceLogoBlack from '../../../asserts/images/ved.png';
import CollapseLogo from "../../../asserts/images/collapseLogo.svg";
const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "140px",
  overflow: "hidden",
  display: "flex",
  justifyContent:"center",
  alignItems:"center",
}));

const CollapseLogoStyled = styled(Link)(() =>
({
  height: "70px",
  width: "40px",
  overflow: "hidden",
  display: "flex",
  justifyContent:"center",
  alignItems:"center",
}))
interface LogoProps {
  collapseSidebar?: Boolean;
}
const Logo = ({collapseSidebar}:LogoProps) => {
  return (
    <>
    {collapseSidebar ===true?
     <CollapseLogoStyled href="/">
      <Image src={CollapseLogo} alt="logo" height={54} width={40} priority />
    </CollapseLogoStyled>:
    <LinkStyled href="/">
      <Image src={QssenceLogoBlack} alt="logo" height={54} width={100} priority />
    </LinkStyled>}
    </>
   
  );
};

export default Logo;
