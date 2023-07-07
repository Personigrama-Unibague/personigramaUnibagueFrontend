import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        fontFamily: "'PaloSeco', sans-serif" + " !important",
        fontFamily: "PaloSeco" + "!important",
        src: "url(../utils/fonts/paloseco.ttf)" + "!important",
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
