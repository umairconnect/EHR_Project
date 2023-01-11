import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  pageTitleContent: {
    textAlign: "center",
    marginTop: "10%"
  },
  Icon: {
    width: "18px",
    height: "18px",
    cursor: "pointer"
  },
  svgIcon: {
    cursor: "pointer",
    margin: "0px 0px -5px 0px",
    '& svg': {
      width: "18px",
      height: "18px",
    }
  },
  IconNoHeight: {
    width: "20px",
    height: "auto",
    cursor: "pointer"
  },
  paymentIcon: {
    width: "16px",
    height: "16px",
    cursor: "pointer"
  },
  statementIcon: {
    width: "22px",
    height: "16px",
    cursor: "pointer"
  },
  printIcon: {
    cursor: "pointer",
  },
  newAddBtn2: {
    width: "112px",
    height: "32px",
    borderRadius: "8px",
    border: "1px solid #11284B",
    margin: "10px 0px 10px 5px",
    color: "#11284B",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    position: "relative",
    '&:hover': {
      // backgroundColor: "#596270",
      backgroundColor: "#11284b",
      color: "white",
    },
    newAddBtnLink: {
      // color:"#11284B"
      color: "white",
    }
  },
  dataTable: {
    width: "100%",
    marginTop: "10px"
  },
  title: {
    margin: "10px 0px 10px 0px",
    fontFamily: "Lato",
    fontSize: 14,
    color: "#25282B",
    fontWeight: "bold",
  },
  btnIconRoot: {
    overflow: "visible"
  },
  BtnIcon: {
    width: "18px",
    height: "18px"
  },
  widthAttchment: {
    width: "15%",
  },
  faxButton: {
    color: "#11284B",
    height: "30px",
    minWidth: "30px",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    border: "1px solid #11284B",
    borderRadius: "8px",
    marginTop: "12px",
    // borderRight:"1px solid #C4C4C4",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    position: "relative",
    '& .MuiButton-startIcon': {
      margin: "0px"
    },
    newAddBtnLink: {
      color: "white",
    },
  },
  cardButton: {
    color: "#11284B",
    height: "30px",
    minWidth: "30px",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    // border:"1px solid #11284B",
    borderRight: "1px solid #C4C4C4",
    // borderRadius:"8px",
    // marginTop:"12px",
    // borderRight:"1px solid #C4C4C4",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    position: "relative",
    '& .MuiButton-startIcon': {
      margin: "0px"
    },
    newAddBtnLink: {
      color: "white",
    },
  },
  dialogPaper: {
    width: "130vh",
    height: "95vh",
    minHeight: '95vh',
    maxWidth: '150vh',
  },
  dialogcontent: {
    padding: "16px 24px 0px 24px"
  },
  //Dialog Items
  // baseInput: {
  //   border: "1px solid #DDDDDD",
  //   borderRadius: "4px",
  //   padding: " 3px 12px",
  //   width: "100%",
  //   fontFamily: "Lato",
  //   backgroundColor: "white",
  //   marginBottom: 4,
  //   '&:focus': {
  //     border: "1px solid #00b2e3",
  //     borderRadius: "4px",
  //     outline: 0,
  //   },
  // },
  longLableInput: {
    lineHeight: "40px",
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    // marginBottom: 13,
    [theme.breakpoints.down("sm")]: {
      lineHeight: "25px",
      paddingRight: 5,
    },
    [theme.breakpoints.down("md")]: {
      lineHeight: "25px",
      paddingRight: 5,
    },
  },
  lableInput: {
    lineHeight: "40px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    // marginBottom: 13,
    [theme.breakpoints.down("sm")]: {
      lineHeight: "25px",
      paddingRight: 5,
    },
    [theme.breakpoints.down("md")]: {
      lineHeight: "25px",
      paddingRight: 5,
    },
  },
  lableInputBold: {
    lineHeight: "40px",
    fontWeight: 700,
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    // marginBottom: 13,
    [theme.breakpoints.down("sm")]: {
      lineHeight: "25px",
      paddingRight: 5,
    },
    [theme.breakpoints.down("md")]: {
      lineHeight: "25px",
      paddingRight: 5,
    },
  },
  labelAlign: {
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
    },
  },
  secondaryCardRoot: {
    borderRadius: "10px",
    border: "1px solid #C4C4C4",
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
      '&:focus': {
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      },
    },

    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
  },
  eraIcon: {
    width: "20px",
    "& svg": {
      width: "18px",
      height: "18px"
    }
  }
}));