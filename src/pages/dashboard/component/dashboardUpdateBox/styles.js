import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  fontStyle: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: "0.4px",
  },
  subtitle2: {
    maxWidth: "50%",
    flexBasis: "50%",
    justifyContent: "center",
    display: "flex",
    color: "#565656",
    lineHeight: "14px",
  },
  subTitleContainer: {
    justifyContent: "center",
    "& p": {
      color: "#00B4E5",
      fontSize: "12px",
      textDecoration: " underline",
      lineHeight: "19px",
    },
    "& h4": {
      color: "#262626",
      fontSize: "18px",
      lineHeight: "26px",
    },
    "& h6": {
      color: "#717171",
      fontSize: "16px",
      lineHeight: "26px",
    },
    "& a": {
      color: "#00B4E5",
      margin: 0,
      padding: "0px 8px",
      fontSize: '14px',
      textTransform: 'capitalize',
      "& hover": {
        color: "#00B4E5",
      }
    }
    
  },

}));
