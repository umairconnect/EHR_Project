import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
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
    // width: "150vh",
    // height: "70vh",
    // minHeight: '70vh',
    minWidth: "1100px",
    // maxHeight: "80vh",
    // maxWidth: "150vh",
  },
  dialogcontent: {
    padding: "16px 24px 0px 24px"
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
  card: {
    overflow: "auto",
    width: "100%",
    height: "300px",
    marginBottom: "10px",
    border: '1px solid #EEEEEE',
    '&::-webkit-scrollbar': {
      width: "5px",
    },
    '&::-webkit-scrollbar-track': {
      background: "#f1f1f1",
      // boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      // webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      background: "#888",
      // backgroundColor: 'rgba(0,0,0,.1)',
      // outline: '1px solid slategrey'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: "#555",
      // backgroundColor: 'rgba(0,0,0,.1)',
      // outline: '1px solid slategrey'
    }
  },
  heading: {
    border: "1px solid #C4C4C4",
    backgroundColor: "#EEEEEE",
    height: "35px",
    padding: "5px 10px",
    fontWeight: 700,
    fontFamily: "Lato",
    fontSize: "15px",
    color: "#11284B"
  },
  list: {
    padding: "0px",
    margin: "0px 0px",
    "& + .MuiFormControlLabel-root": {
      margin: "0px 0px 0px -5px"
    }
  },
  selectedItem: {
    backgroundColor: "#808080"
  },
  // checkBoxBtn: {
  //   marginLeft: "0px",
  //   paddingRight: "2px",
  //   "& + .MuiFormControlLabel-label": {
  //     color: "#52575C",
  //     fontWeight: 400,
  //     fontFamily: "Lato",
  //     fontSize: "15px",
  //     color: "#11284B"
  //   },
  // },
  itemList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    overflow: 'auto',
    "& li": {
      padding: 5,
      "& .MuiCheckbox-root": {
        padding: "3px 5px 3px 20px",
      },
    }
  },
  sigBuilderCheckBoxBtn: {
    marginLeft: "0px",
    // paddingRight: "5px",
    "& .MuiCheckbox-root": {
      padding: "3px 5px 3px 20px",
    },
    "& + .MuiFormControlLabel-label": {
      color: "#52575C",
      fontSize: "13px"
    },
  },
  box: {
    display: "flex",
    flexFlow: "column",
    // height: "100%",
    backgroundColor: "#FFFFFF"
  },
  header: {
    flex: "0 1 auto",
    cursor: "move"
  },
  content: {
    flex: "1 1 auto",
    // maxHeight: "450px",
    minHeight: "200px",
    overflow: "auto",
    marginBottom: "10px",
    // overflow: "initial !important",
    // height: "initial !important",
  },
  crossButton: {
    position: "absolute",
    top: "8px",
    right: "10px",
    cursor: "pointer",
    padding: "3px",
    zIndex: "2",
    display: "block",
    "& :hover": {
      backgroundColor: "#F4F4F4",
    }
  },
}));