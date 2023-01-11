import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  DialogContent: {
    minWidth: "832px",
    display: "flex",
  },
  DialogContentLeftSide: {
    flex: "1",
    backgroundColor: "#F4F4F4",
    padding: "12px 10px 5px 10px",
    maxWidth: "303px",
    flexBasis: "303px",
    // minHeight:"521px",
  },
  DialogContentRightSide: {
    flex: "1",
    backgroundColor: "#fff",
    padding: "20px 10px 5px 10px",
    // minHeight:"521px",
  },
  box: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
  },
  header: {
    flex: "0 1 auto",
    display: "flex",
    cursor: "move"
  },
  content: {
    flex: "1 1 auto",
    // maxHeight:"400px",
    minHeight: "200px",
    // overflow:"auto",
    marginBottom: "10px"
  },
  footer: {
    flex: "0 1 40px",

  },
  footerRight: {
    float: "right",
    marginRight: "-8px"
  },
  crossButton: {
    position: "relative",
    top: "-12px",
    right: "10px",
    cursor: "pointer",
    padding: "3px",
    zIndex: "2",
    display: "block",
    "& :hover": {
      backgroundColor: "#F4F4F4",
    }
  },
  popupCrossButton: {
    position: "absolute",
    // top: "-12px",
    right: "10px",
    cursor: "pointer",
    padding: "3px",
    zIndex: "2",
    display: "block",
    "& :hover": {
      backgroundColor: "#F4F4F4",
    }
  },
  leftSideHeader: {
    backgroundColor: "#00B2E3",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#11284B",
    borderRadius: "10px 10px 0 0",
    height: "40px",
    padding: "10px 15px",
  },
  richTextEdit: {
    width: "100%",
    minHeight: "410px",
    "& .RichTextEditor__paragraph___3NTf9": {
      margin: "0",
    },
    "& .RichTextEditor__editor___1QqIU .public-DraftEditor-content": {
      minHeight: "350px",
    }
  },
  addRosBox: {
    zIndex: "99999",
    fontFamily: "Lato",
    boxShadow: "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
  },
  paper: {
    padding: "5px 10px",
    minWidth: "500px",
    maxWidth: "500px",
    minHeight: "275px",
    display: "flex",
    flexFlow: "column",
    height: "100%",
  },
  ROSactionAlignment: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    padding: "0px 9px",
  },
  addRosTitle: {
    flex: "0 1 auto",
    padding: "5px 0px 10px 0px",
    borderBottom: "1px solid #DDDDDD",
    color: "#11284B",
    fontSize: "16px",
    fontWeight: "bold",
  },
  addRosContent: {
    flex: "1 1 auto",
    overflow: "auto",
    padding: "10px 0px 10px 10px",
  },
  addRosFooter: {
    flex: "0 1 40px",
    padding: "8px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  lableInput: {
    paddingRight: 19,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    paddingTop: "10px",
    minHeight: "40px",
    textAlign: "right",
    display: "block"
  },
  addNewIcon: {
    float: "right",
    marginRight: 11,
    cursor: "pointer",
    paddingTop: 10,
  },
  deleteIcon: {
    float: "right",
    cursor: "pointer",
    paddingTop: 7,
    marginRight: 11,
    "& img": {
      width: "18px",
      height: "18px",
    }
  },
  baseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    marginRight: 0,
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
  inputContainer: {
    maxHeight: "200px",
    overflow: "auto"
  },
  accordinBox: {
    position: "relative",
    padding: "0 5px",
    "& .MuiAccordion-root": {
      boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
      marginBottom: 5,
      marginTop: 0,
      borderRadius: 5,
    },
    "& .MuiAccordion-root.Mui-expanded": {
      backgroundColor: "#f0f0f0",
    },
    "& .MuiAccordion-root.Mui-expanded:last-child": {
      marginBottom: 5,
    },
    "& .MuiAccordion-root:before": {
      display: "none",
    },
    "& .MuiAccordionSummary-root": {
      paddingLeft: 30,
      minHeight: "40px",
    },
    "& .MuiIconButton-edgeEnd": {
      position: "absolute",
      left: "-6px",
      "& svg": {
        fontSize: 18,
      },

    },
    "& .Mui-expanded.MuiIconButton-edgeEnd": {
      "& .MuiIconButton-label": {
        backgroundColor: "#e8e8e8",
        borderRadius: "50px",
      }
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "40px",
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "0px",
    },
    "& .MuiAccordionDetails-root": {
      display: "block",
      padding: "0px 0px 10px 30px"
    },
    "& .MuiAccordionSummary-content": {
      color: "#000",
      fontSize: "12px",
      fontWeight: "700",
    }
  },
  accordionDetails: {
    width: "100%",
    display: "block",
    marginBottom: 5,
    color: "#000",
    fontSize: 11,
    position: "relative",
    minHeight: "17px",
    cursor: "pointer",
    "& :hover": {
      color: "#00B4E5",
    }
  },
  quickPickHeader: {
    position: "relative",
    padding: "0 5px",
    minHeight: 42,
  },
  whiteBg: {
    backgroundColor: "#fff"
  },
  switchBox: {
    top: "12px",
    right: "15px",
    width: 82,
    position: "absolute",
    display: "inline-flex",
    cursor: "pointer",
    zIndex: 1,
    color: "#000",
    fontSize: "12px",
  },
  antSwitchBox: {
    top: "16px",
    right: "15px",
    width: 100,
    position: "absolute",
    display: "inline-flex",
    cursor: "pointer",
    zIndex: 1,
    color: "#000",
    fontSize: "12px",
  },
  deleteItemIcon: {
    // transform: "translateY(-50%)",
    // top:"50%"
    top: "13px",
    right: "15px",
    position: "absolute",
    width: "14px",
    display: "inline-flex",
    cursor: "pointer",
    zIndex: 1,
    "& img": {
      width: "14px",
    }
  },
  editIcon: {
    // transform: "translateY(-50%)",
    // top:"50%"
    top: "13px",
    right: "40px",
    position: "absolute",
    width: "14px",
    display: "inline-flex",
    cursor: "pointer",
    zIndex: 1,
    "& img": {
      width: "14px",
    }
  },

  switchList: {
    top: "-2px",
    right: "15px",
    width: 82,
    position: "absolute",
    display: "inline-flex",
    cursor: "pointer",
    zIndex: 1,
    color: "#000",
    fontSize: "12px",
    "& svg": {
      fontSize: 16
    }
  },
  nonSelect: {
    color: "rgba(0, 0, 0, 0.26)",
  },
  nev: {
    color: "#27AE60",
  },
  pos: {

    color: "#EB5757",
  },
  dataLoader: {
    width: "50px",
    margin: "116px"
  },

}));
