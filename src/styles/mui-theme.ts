"use client";
import { grey, indigo, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: indigo[700],
    },
    secondary: {
      main: teal[500],
    },
    background: {
      default: grey[50],
    },
  },
  typography: {
    fontFamily: "var(--font-inter), Helvetica, Arial, sans-serif",
    fontWeightLight: 200,
    fontWeightMedium: 600,
    h1: {
      fontSize: "2.75rem",
      fontWeight: 200,
      lineHeight: 1.2,
      letterSpacing: "0.05rem",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 200,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 700,
      fontSize: "0.875rem",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 2,
  },
});

export default theme;
