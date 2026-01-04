"use client"
import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";
import { buttonClasses } from '@mui/material/Button';

export const plus = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap"
});

const ColorPalette = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#23608E",
      light: "#FFFFFF",
      dark: "#4570EA",
    },
    secondary: {
      main: "#388BC8",
      light: "#388BC8",
      dark: "#23afdb",
    },
    success: {
      main: "#73D13D",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#388BC8",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FF4D4F",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FAAD14",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: plus.style.fontFamily,
      color:"#000000"
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 400,
      fontSize: "0.9rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          [`&.${buttonClasses.containedPrimary}`]: {
            backgroundColor:'#23608E',
            color:'#ffffff'
          },
          '&:hover': {
              color:'#23608E',
              backgroundColor: '#C1E2FB', // Change background color on hover
          },
        }
      }
    }
  },
});

export default ColorPalette ;