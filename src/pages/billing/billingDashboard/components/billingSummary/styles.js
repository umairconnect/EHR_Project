import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  heading: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "16px",
    letterSpacing: "0.4px",
    color: "#565656",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerBox: {
    display: "flex",
    alignItems: "center",
    columnGap: "9px",
    height: "39px !important",
    overflow: "hidden",
    "& select": {
      minHeight: "33px !important",
    }
  },
}));
