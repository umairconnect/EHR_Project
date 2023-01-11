import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dialog: {
    "& .MuiDialog-paperWidthMd": {
      maxWidth: 990,
    }
  },
  DialogContent: {
    minWidth: "972px",
    display: "flex",
    minHeight: "500px"
  },
  DialogContentLeftSide: {
    flex: "1",
    backgroundColor: "#F4F4F4",
    padding: "12px 10px 5px 10px",
    maxWidth: "355px",
    flexBasis: "355px",
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
    cursor: "move"
  },
  content: {
    flex: "1 1 auto",
    maxHeight: "220px",
    minHeight: "100px",
    overflow: "auto",
    marginBottom: "10px"
  },
  footer: {
    flex: "0 1 40px",

  },
  footerRight: {
    float: "right",
    marginRight: "-8px"
  },
  whiteBg: {
    backgroundColor: "#fff",
    minHeight: 500,
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
    backgroundColor: "#fff",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#11284B",
    borderRadius: "10px 10px 0 0",
    height: "35px",
    padding: "10px 15px",
  },

  addRosBox: {
    zIndex: "99999",
    fontFamily: "Lato",
    boxShadow: "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
  },
  paper: {
    padding: "5px 10px",
    minWidth: "650px",
    maxWidth: "650px",
    minHeight: "275px",
    display: "flex",
    flexFlow: "column",
    height: "100%",
  },
  paperLeft: {
    float: "left",
    width: "49%",
  },
  paperRight: {
    float: "right",
    width: "49%",
  },
  addRosTitle: {
    flex: "0 1 auto",
    padding: "7px 3px 12px",
    borderBottom: "1px solid #DDDDDD",
    color: "#11284B",
    fontSize: "16px",
    fontWeight: "bold",
  },
  addRosContent: {
    flex: "1 1 auto",
    overflow: "auto",
    padding: "10px 15px 10px 2px",
  },
  addRosFooter: {
    flex: "0 1 40px",
    padding: "8px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  lableInput: {
    paddingRight: 5,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    paddingTop: "10px",
    minHeight: "40px",
    textAlign: "right",
    display: "block"
  },
  addNewIcon: {
    float: "left",
    cursor: "pointer",
    paddingTop: 7,
    marginRight: 7,
  },
  deleteIcon: {
    float: "right",
    cursor: "pointer",
    paddingTop: 7,
    marginRight: 5,
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
  quickPickHeader: {
    padding: "0 15px",
    fontSize: "12px",
    color: "#000",
  },
  templateList: {
    margin: "11px 0px 20px 0px",
    padding: "0 15px 0 7px",
    listStyle: "none",

    "& li": {
      position: "relative",
      height: "40px",
      fontSize: "12px",
      color: "#000",
      fontWeight: "700",
      lineHeight: "40px",
      margin: 0,
      outline: 0,
      padding: "0 45px 0 12px",
      listStyle: "none",
      marginTop: 5,
      borderRadius: "5px",
      boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
      cursor: "pointer",
    },
  },
  clockIcon: {
    top: "50%",
    right: "16px",
    position: "absolute",
    transform: "translateY(-50%)",
    color: "#e0e0e0",
    fontSize: "18px",

  },
  clockIconChecked: {
    top: "50%",
    right: "16px",
    position: "absolute",
    transform: "translateY(-50%)",
    color: "#00B4E5",
    fontSize: "18px",
    cursor: "pointer",
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

  subContent: {
    "& $contentBox:nth-child(even)": {
      float: "right",
    }
  },
  contentBox: {
    width: "95%",
    //minHeight: "330px",
    float: "left",
    background: "#F9F9F9",
    border: "1px solid #F1F1F1",
    padding: "7px 5px",
    marginBottom: "2%"

  },
  contentBoxHeader: {
    flex: "0 1 auto",
  },
  contentBoxArea: {
    flex: "1 1 auto",
    display: "flex",
  },
  contentPositive: {
    flex: "1",
    color: "#25282B",
    fontSize: "12px",
    paddingLeft: 6,
  },
  contentNegative: {
    flex: "1",
    color: "#25282B",
    fontSize: "12px",
    paddingLeft: 6,
  },
  contentBoxFooter: {
    flex: "0 1 30px",
    marginTop: 10,
    "& .MuiInputBase-root": {
      flex: 1,
      width: "70%",
      margin: 0,
      "& .MuiInputBase-input": {
        minHeight: 25,
        padding: "0 10px",
      }
    }
  },
  footerLabel: {
    flex: 1,
    color: "#25282B",
    fontSize: "12px",
    paddingRight: "5px",
  },
  pBox: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 7,
  },
  pTitle: {
    display: "inline-flex",
    flexShrink: "0",
    paddingRight: 10,
    color: "#11284B",
    fontSize: 13.5,
    fontWeight: "bold",
  },
  pLine: {
    flex: " 1 1 auto",
    minWidth: 0,
    borderBottom: "1px solid #E8E8E8"
  },
  pCheckBox: {
    display: "inline-flex",
    flexShrink: "0",
    '& label': {
      margin: 0,
      height: "20px",
      '& span.MuiFormControlLabel-label': {
        color: "#11284B",
        fontSize: "12px"
      },
      '& span.MuiIconButton-root': {
        color: "#DBDADA",
        padding: 0,
        paddingRight: 4,
        marginLeft: 8,
      },
      '& span.MuiCheckbox-colorPrimary.Mui-checked': {
        color: "#00B4E5"
      }
    }
  },
  pCheckBox2: {
    display: "block",
    flexShrink: "0",
    marginTop: 4,
    '& label': {
      margin: 0,
      height: "20px",
      display: "inline",
      '& span.MuiFormControlLabel-label': {
        color: "#11284B",
        fontSize: "12px",
        lineHeight: "12px",
      },
      '& span.MuiIconButton-root': {
        color: "#DBDADA",
        padding: 0,
        paddingRight: 4,
        marginLeft: -3,
        float: "left"
      },
      '& span.MuiCheckbox-colorPrimary.Mui-checked': {
        color: "#00B4E5"
      },
      "& span.MuiIconButton-label .MuiSvgIcon-root": {
        fontSize: 20,
      }
    }
  },
  subTitle: {
    display: 'flex'
  },
  headerInput: {
    flex: "0 1 30px",
    marginBottom: 10,
    marginTop: -10,
    "& .MuiInputBase-root": {
      flex: 1,
      width: "50%",
      margin: 0,
    }
  },
  footerLabel: {
    flex: 1,
    display: "inline-block",
    color: "#25282B",
    fontSize: "12px",
    padding: "0px 5px 0px 5px",
    width: "28%",
    lineHeight: "15px",
    marginTop: "4px",
    float: "left",
    maxWidth: 171,
  },
  richTextEdit: {
    width: "100%",
    minHeight: "200px",
    "& .RichTextEditor__paragraph___3NTf9": {
      margin: "0",
    },
    "& .RichTextEditor__editor___1QqIU .public-DraftEditor-content": {
      minHeight: "142px",
    }
  },
  dataLoader: {
    width: "50px",
    margin: "142px"
  },

}));
