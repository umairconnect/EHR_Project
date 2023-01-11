import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  cardButton: {
    color: "#11284B",
    height: "30px",
    minWidth: "30px",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    borderRight: "1px solid #C4C4C4",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 14px",
    position: "relative",
    '& .MuiButton-startIcon': {
      margin: "0px"
    },
    newAddBtnLink: {
      color: "white",
    },
  },
  dialogPaper: {
    height: "95vh",
    minHeight: '95vh',
    maxWidth: '850px',

    // paddingBottom:"10px"
  },
  dialogcontent: {
    // padding: "0px 0px 50px 30px"
    padding: "0px 0px 50px 70px"
  },
  lableInput: {
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    alignItems: "center",
    // margin: "10px 0px 10px 0px",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "10px",
      paddingRight: 5,
    },
    [theme.breakpoints.down("md")]: {
      lineHeight: "20px",
      paddingRight: 5,
    },
  },
  statusLableInput: {
    lineHeight: "20px",
    paddingRight: 15,
    marginTop: "5px",
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 15,
    alignItems: "center",
    // margin: "10px 0px 10px 0px",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "10px",
      paddingRight: 5,
    },
    [theme.breakpoints.down("md")]: {
      lineHeight: "20px",
      paddingRight: 5,
    },
  },
  labeladdfavorite: {
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#00B4E5",
    textDecoration: "underline",
    fontSize: 15,
    // margin: "10px 0px 10px 0px",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "10px",
      paddingRight: 5,
    },
    [theme.breakpoints.down("md")]: {
      lineHeight: "20px",
      paddingRight: 5,
    },
  },
  labelAlignBtn: {
    justifyContent: "flex-end",
    margin: "25px 0px 18px 0px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
    },
  },
  lableInputBold: {
    lineHeight: "35px",
    fontWeight: "bold",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      lineHeight: "35px",
      paddingRight: 5,
    },
    [theme.breakpoints.down("md")]: {
      lineHeight: "35px",
      paddingRight: 5,
    },
  },
  labelAlign: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    margin: "8px 0px 18px 0px",
    // alignItems:"center",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
  },
  toggleButtonGroup: {
    borderRadius: "10px",
    backgroundColor: "#F8F8F8"
  },
  secondaryCard: {
    // width:"100%",
    borderRadius: "8px",
    border: "1px solid #C4C4C4",
    backgroundColor: "#F8F8F8"
  },
  baseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "9.5px 12px",
      fontSize: "14px",
      color: "#4A4A4A",
      // '&:focus': {
      //   border: "1px solid #00b2e3",
      //   borderRadius: "4px",
      //   outline: 0,
      // },
    },

    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
  },
  divider: {
    marginBottom: "10px"
  },
  toggleButton: {
    padding: "0px"
  },
  header: {
    flex: "0 1 auto",
  },
  crossButton: {
    position: "absolute",
    top: "8px",
    right: "50px",
    cursor: "pointer",
    padding: "3px",
    zIndex: "2",
    display: "block",
    "& :hover": {
      backgroundColor: "#F4F4F4",
    }
  },
  formTitle: {
    position: 'relative',
    width: "100%",
    color: "#25282B",
    fontSize: 15,
    fontWeight: "600",
    margin: "5px 40px 15px 40px",
  },
  baseLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    // top: 5,
    height: 1,
    backgroundColor: "#DDDDDD",
    zIndex: 1
  },
  mandatorColor: {
    paddingLeft: "10px",
    color: "#ff0000",
    fontSize: 12,
    lineHeight: "14px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: "10px"
  },
  labelDivider: {
    // padding: "15px",
    padding: "7px 3px 0px 3px",
    fontSize: "25px",
    fontFamily: "Lato"
  },
  smallLabel: {
    margin: "0px 0px 15px 2px",
    fontFamily: "Lato",
    fontWeight: 400,
    fontSize: 14,
    textAlign: "left",
    alignItems: "right",
    color: "#25282B"
  },
  editBtn: {
    margin: "10px 0px 0px 15px",
    cursor: "pointer",
    "& img": {
      width: "18px",
      height: "18px"
    },
  },
  footerBtn: {
    // bottom: "0px",
    // display: "flex",
    // padding: "0px 0 25px",
    // ZIndex: 3,
    // position: "fixed",
    // paddingLeft: "12.4%"
    // //
    padding: " 0px 0 7px",
    position: "fixed",
    bottom: "0px",
    // width: "92%",
    // justifyContent: "center",
    // alignItems:" center",
    // paddingLeft: "13.1%",
    display: "flex",
    zIndex: 3,
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "6%"
    }
  },
  noPainText: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: "left",
    color: "green",
    margin: "0px 0px 15px 5px",
  },
  mildPainText: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: "left",
    color: "#adff2f",
    margin: "0px 0px 15px 5px",
  },
  moderatePainText: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: "left",
    color: "#FFAE42",
    margin: "0px 0px 15px 5px",
  },
  severePainText: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: "left",
    color: "#FF0000",
    margin: "0px 0px 15px 5px",
  },
  pRelative: {
    position: "relative",
  },
  temperatureSymbol: {
    position: "absolute",
    right: 7,
    top: 9
  },
  seperatorGrid: {
    maxWidth: "35px"
  },
  smallMiddleLabel: {
    margin: "12px 0px 0px 10px",
    fontFamily: "Lato",
    fontWeight: 400,
    fontSize: 14,
    color: "#25282B"
  }
}));