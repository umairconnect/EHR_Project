import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  heading: {
    letterSpacing: "0.4px",
    fontSize: "20px",
    fontWeight: "500",
    color: "#565656",
    fontFamily: "Lato",
    fontStyle: "normal",
    marginBottom: "0px !important",
    "& span": {
      fontSize: "16px",
    },
  },
}));
