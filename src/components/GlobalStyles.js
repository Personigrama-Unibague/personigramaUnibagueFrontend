import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        fontFamily: "Roboto-Regular, sans-serif !important",
        src: "url(../utils/fonts/Roboto-Regular.ttf) !important",
      },
      "@font-face": {
        fontFamily: "Roboto-Regular",
        src: "url(../utils/fonts/Roboto-Regular.ttf) format('truetype')",
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      body: {
        backgroundColor: "#f4f6f8",
        height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
      ".MuiGrid-container": {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        boxSizing: "border-box",
        margin: "0 !important",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
