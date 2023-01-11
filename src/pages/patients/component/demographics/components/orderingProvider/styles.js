import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  loader: {
    display: "block",
    margin: "0 auto",
    padding: "10% 0",
    width: "50px"
  },
  printBtnIcon: {
    border: "1px solid #E7E7E7",
    boxSizing: "border-box",
    borderRadius: "5px",
    position: "absolute",
    right: "36px",
    textTransform: "capitalize",
    padding: "6px 15px",
  },
  footerBtn: {
    padding: " 0px 0 7px",
    position: "fixed",
    bottom: "0px",
    // width: "82%",
    display: "flex",
    zIndex: 3,
    // paddingLeft: "13.1%",
    // [theme.breakpoints.down("sm")]: {
    //   paddingLeft: "7%",
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
