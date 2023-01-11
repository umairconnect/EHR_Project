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
    maxWidth: '70%',
    [theme.breakpoints.down("xs")]: {
      maxWidth: '90%',
    },
  },
  smallDialogPaper: {
    maxWidth: '70%',
    minWidth: "70%",
    [theme.breakpoints.down("sm")]: {
      // maxWidth:'80%',
      // minWidth:"80%",
      "& .MuiGrid-grid-lg-2": {
        maxWidth: "25%",
        flexBasis: "25%",
      },
      "& .MuiGrid-grid-lg-3": {
        maxWidth: "60%",
        flexBasis: "60%",
      },
      "& .MuiGrid-grid-lg-5": {
        maxWidth: "75%",
        flexBasis: "75%",
      },
      "& .MuiGrid-grid-lg-8": {
        maxWidth: "75%",
        flexBasis: "75%",
      }
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: '45%',
      minWidth: "45%",
      "& .MuiGrid-grid-lg-2": {
        maxWidth: "25%",
        flexBasis: "25%",
      },
      "& .MuiGrid-grid-lg-3": {
        maxWidth: "60%",
        flexBasis: "60%",
      },
      "& .MuiGrid-grid-lg-5": {
        maxWidth: "75%",
        flexBasis: "75%",
      },
      "& .MuiGrid-grid-lg-8": {
        maxWidth: "60%",
        flexBasis: "60%",
      }
    },
    // [theme.breakpoints.up("lg") && theme.breakpoints.down("xl")]: {
    //   maxWidth:'40%',
    //   minWidth:"40%",
    //   "& .MuiGrid-grid-lg-2":{
    //     maxWidth: "25%",
    //     flexBasis: "25%",
    //   },
    //   "& .MuiGrid-grid-lg-3":{
    //     maxWidth: "60%",
    //     flexBasis: "60%",
    //   },
    //   "& .MuiGrid-grid-lg-5":{
    //     maxWidth: "75%",
    //     flexBasis: "75%",
    //   },
    //   "& .MuiGrid-grid-lg-8":{
    //     maxWidth: "60%",
    //     flexBasis: "60%",
    //   }
    // },
  },
  dialogcontent: {
    padding: "0px",
    height: "100%"
  },
  mainContent: {
    padding: "0px 25px 40px 25px"
  },
  lableInput: {
    lineHeight: "20px",
    paddingRight: 15,
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
  mandatorColor: {
    color: "#ff0000"
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
  footerBtn: {
    padding: " 0px 0 7px",
    bottom: "0px",
    position: "absolute",
    display: "flex",
    zIndex: 3
  },
}));