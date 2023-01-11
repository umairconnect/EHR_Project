import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  footerBtn: {
    padding: " 0px 0 7px",
    position: "fixed",
    bottom: "0px",
    // width: "82%",
    display: "flex",
    zIndex: 3,
    // paddingLeft: "13.1%",
    // [theme.breakpoints.down("sm")]:{
    //   paddingLeft:"6%",
    // }
  },
  labelAlign: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
    },
  },
  lableInput: {
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginBottom: 13,
    paddingTop: "6%",
    minHeight: "20px",
    textAlign: "right"
  },
  formAlignment: {
    marginBottom: "-30px"
  },
}));
