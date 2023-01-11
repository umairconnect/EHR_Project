import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({

  dialogPaper: {
    // width: "150vh",
    // height: "70vh",
    // minHeight: '70vh',
    maxWidth: "900px",
    // maxHeight: "80vh",
    // maxWidth: "150vh",
  },
  dialogcontent: {
    padding: "16px 6px 0px 24px"
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
  loader: {
    width: "80px",
    padding: "5px",
    margin: "auto",
    display: "flex",
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
  
    minHeight: "200px",
    overflow: "auto",
    marginBottom: "10px",
    minWidth: "820px",
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
  summaryHeight: {
    minHeight: "350px",
  },
  summaryContain: {
    paddingRight: "15px",
    width: "100%",
  },
  footerBtn: {
    color: "#00B4E5",
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "14px",
    "& svg": {
      fontSize: "19px",
      marginRight: "12px !important",
    },
    "& .MuiCircularProgress-root": {
      width: "31px !important",
      height: "auto !important",
      color: "#00B4E5",
      animation: "unset !important",
      margin: "0px",
    }
  }
}));