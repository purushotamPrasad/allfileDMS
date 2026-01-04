import {
  AppBar,
  Toolbar,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({children}: { children: React.ReactNode } ) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    backgroundColor:"#FFFFFF",
    borderBottom: "1px solid #CCD6DE",
    // background: theme.palette.secondary.light,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    minHeight:"64px!important",
    maxHeight:"64px!important",
    [theme.breakpoints.up("lg")]: {
      minHeight: "64px!important",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="fixed" color="default">
      <ToolbarStyled className="flex w-full" >
        {children}
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
