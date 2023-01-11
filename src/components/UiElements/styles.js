import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  LinkItemBox: {
    maxWidth: 250,
    minWidth: 250,
    display: "inline-block"
  },
  itemList: {

    "&:hover": {
      backgroundColor: "#F3F5FF"

    },

  },
  itemLinkBox: {
    width: '100%',
    display: 'flex',
    textDecoration: "none"
  },
  itemContentBox: {
    flex: "1 1 auto",
    minWidth: "0",
    marginTop: 8,
  },
  itemTextTitle: {
    display: "block",
    fontFamily: "Lato",
    color: "#2A2D30",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 'normal',
    marginBottom: "5px"

  },
  itemTextContent: {
    display: "block",
    fontFamily: "Lato",
    color: "#52575C",
    fontSize: "12px",
    lineHeight: "20px",
    fontWeight: 'normal',
    margin: 0,
  },
  hyperlink: {
    color: "#00b2e3 !important",
    margin: "0 10px",
    fontSize: "14px",
    fontFamily: "Lato",
    cursor: "pointer",
    '&:hover': {
      color: '#11284b',
      cursor: "pointer",
    }
  },
  shadowBox: {
    padding: "20px 15px 60px 15px",
    border: "1px solid #E8E8E8",
    borderRadius: "10px",
    minHeight: "calc(100vh - 60px)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: "-23px"

  },
  shadowBoxMin: {
    padding: "20px 15px",
    border: "1px solid #E8E8E8",
    borderRadius: "10px",
  },
  footerBtn: {
    padding: " 0px 0 7px",
    position: "fixed",
    bottom: "0px",
    // backgroundColor: "#f3f3f3",
    width: "82%",
    // justifyContent: "center",
    // alignItems:" center",
    paddingLeft: "13.8%",
    display: "flex",
    zIndex: 3

  },
  formTitle: {
    position: 'relative',
    width: "100%",
    color: "#25282B",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  baseLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 14,
    height: 1,
    borderBottom: "1px solid #DDDDDD",
    zIndex: 1
  },
  baseTitle: {
    display: "inline-block",
    position: "relative",
    padding: "0 12px 0 0",
    backgroundColor: "white",
    zIndex: 2,

  },

  baseTitleGreyBg: {
    display: "inline-block",
    position: "relative",
    padding: "0 12px 0 0",
    backgroundColor: "#fafbfc",
    zIndex: 2,

  },
  resetBtn: {
    textTransform: 'none',
    backgroundColor: '#DDDDDD',
    borderColor: '#F3F3F3',
    color: '#11284b',
    marginRight: 8,
    minWidth: 90,
    padding: "6px 16px",
    fontFamily: "Lato",
    "& img":{
      width:"16px",
      height:"16px"
    },
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#DDDDDD',
      borderColor: '#F3F3F3',
      color: '#11284b',
    }
  },
  lightBlueBtn: {
    textTransform: 'none',
    backgroundColor: '#00B4E5',
    borderColor: '#00B4E5',
    color: '#ffffff',
    marginRight: 8,
    minWidth: 90,
    padding: "6px 16px",
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#DDDDDD',
      borderColor: '#F3F3F3',
      color: '#11284b',
    }
  },
  updateBtn: {
    textTransform: 'none',
    backgroundColor: '#11284b',
    borderColor: '#11284b',
    color: 'white',
    marginRight: 8,
    minWidth: 90,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#11284b',
      borderColor: '#11284b',
      color: 'white',
    }
  },
  saveBtn: {
    backgroundColor: '#11284b',
    textTransform: 'none',
    borderColor: '#11284b',
    color: 'white',
    marginRight: 8,
    minWidth: 90,
    padding: "6px 16px",
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    // '& .MuiButton-startIcon svg': {
    //   marginLeft: "-10px",
    // }

  },
  deleteBtn: {
    textTransform: 'none',
    backgroundColor: '#dd3232',
    borderColor: '#dd3232',
    color: 'white',
    marginRight: 8,
    minWidth: 90,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    '& .MuiButton-startIcon img': {
      width: 20,
      marginBottom: "-2px",
      marginLeft: "8px",
    }

  },

  printBtn: {
    textTransform: 'none',
    backgroundColor: '#11284B',
    borderColor: '#11284B',
    color: 'white',
    marginRight: 8,
    minWidth: 90,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284B',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    '& .MuiButton-startIcon img': {
      width: 18,
      marginBottom: "-2px",
      marginLeft: "8px",
      filter: "brightness(9)",
    }

  },
  erxBtn: {
    textTransform: 'none',
    backgroundColor: '#00B2E3',
    borderColor: '#00B2E3',
    color: 'white',
    marginRight: 8,
    minWidth: 90,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#00B2E3',
      borderColor: '#00B2E3',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    '& .MuiButton-startIcon img': {
      width: 20,
      marginBottom: "-2px",
      marginLeft: "8px",
    }

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
    marginBottom: 17,
    paddingTop: "0",
    minHeight: "35px",
    textAlign: "right",
    alignItems: "center",
    justifyItems: "flex-end",
    display: "flex",
  },
  textAreaInput: {
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginBottom: 13,
    paddingTop: "6%",
    minHeight: "40px",
    textAlign: "right",
    "& disabled": {
      color: "#8a8a8a !important"
    }
  },
  customLableInput: {
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginBottom: 13,
    paddingTop: "15px",
    minHeight: "40px",
    textAlign: "right",
    "& disabled": {
      color: "#8a8a8a !important",
      // backgroundColor: 'transparent !important'
    }
  },

  mandatorColor: {
    display: "contents",
    color: "#ff0000",
    fontSize: 16,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: "10px"
  },
  circularProgressBar: {
    marginLeft: 0,
    marginRight: theme.spacing(),
    color: "#FFFFFF"
  },
  customDivider: {
    background: "#E8E8E8",
    margin: "15px",
    height: 1,
  },
  errorMessageTextArea: {
    color: "red",
    margin: "-8px 0px 0px 5px",
    position: "relative",
    minHeight: "15px",
    "& span": {
      position: "absolute",
      top: "-5px",
      whiteSpace: "nowrap"
    }
  }
  ,
  errorMessage: {
    color: "red",
    margin: "-1.5px 0px 0px 5px",
    position: "relative",
    minHeight: "15px",
    "& span": {
      position: "absolute",
      top: "-5px",
      whiteSpace: "nowrap"
    }
  },
}));
