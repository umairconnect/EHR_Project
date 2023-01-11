import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dialogPaper: {
    maxWidth: "1100px",
    // maxHeight: "100%"
  },
  DialogContent: {
    // minHeight: "660px",
    minWidth: "950px",
    display: "flex",
    // overflow: "auto"
  },

  smallDialogPaper: {
    // minHeight: "660px",
    minWidth: "970px",
    // maxWidth: "832px"
  },

  DialogContentLeftSide: {
    flex: "1",
    backgroundColor: "#F4F4F4",
    padding: "12px 10px 5px 10px",
    maxWidth: "320px",
    flexBasis: "320px",
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
  leftSideHeader: {
    backgroundColor: "rgb(255, 255, 255)",
    fontWeight: "bold",
    fontSize: "14px",
    // color: "#11284B",
    //borderRadius: "10px 10px 0 0",z
    height: "40px",
    //  padding: "10px 15px",
  },
  // content: {
  //   flex: "1 1 auto",
  //   maxHeight: "685px",
  //   minHeight: "200px",
  //   overflow: "auto",
  // },
  footer: {
    flex: "0 1 40px",

  },
  footerRight: {
    float: "right",
    marginRight: "-8px",
    // [theme.breakpoints.down("lg")]: {
    //     marginRight:"150px",
    // },
    // [theme.breakpoints.down("xl")]: {
    //     marginRight:"150px",
    // },
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
  leftInnerBox: {
    height: "100%",
    background: "#FFFFFF",
    border: "1px solid #DBDADA",
    borderRadius: "0px 0px 4px 4px"
  },
  leftSideHeader: {
    // backgroundColor:"#00B2E3",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#11284B",
    // borderRadius:"10px 10px 0 0",
    height: "115px",
    padding: "10px 15px",
  },
  listHeader: {
    margin: "10px 0px 0px -12px",
    borderBottom: "1px solid #DBDADA"
  },
  quickPickHeader: {
    overflow: "auto",
    maxHeight: "550px",
    paddingLeft: "0px"
  },
  lableInput: {
    cursor: "pointer",
    textDecoration: "underline",
    paddingRight: 19,
    fontFamily: "Lato",
    fontWeight: 700,
    color: "##25282B",
    fontSize: 12,
    paddingTop: "10px",
    minHeight: "40px",
    textAlign: "center",
    display: "block"
  },
  addNewIcon: {
    float: "right",
    marginLeft: "7px",
    cursor: "pointer",
    paddingTop: 10,
  },
  deleteIcon: {
    float: "right",
    cursor: "pointer",
    paddingTop: 10,
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
        outline: 0,
      },
    },

    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
    "& svg": {
      color: "#00B2E3"
    }

  },
  listItemRoot: {
    padding: "2px 0px 2px 0px"
  },
  Icon: {
    width: "18px",
    height: "18px",
    cursor: "pointer"
  },
  righInnerContent: {
    "& .MuiFormLabel-root": {
      marginBottom: "7px"
    },
    "& ..MuiFormLabel-root": {
      paddingTop: "7%",
    }
  },
  listTitle: {
    fontWeight: "600",
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    textAlign: "left",
    display: "block"
  },
  listitem: {
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    textAlign: "left",
    display: "block"
  },
  formTitle: {
    position: 'relative',
    width: "100%",
    color: "#25282B",
    fontSize: 15,
    fontWeight: "600",
    margin: "5px 0px 15px 0px",
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
  lableInput: {
    lineHeight: "20px",
    paddingRight: 15,
    fontWeight: "700",
    fontFamily: "Lato",
    color: "#11284B",
    fontSize: 14,
    alignItems: "left",
  },
  blueLableInput: {
    cursor: "pointer",
    textDecoration: "underline",
    lineHeight: "20px",
    fontWeight: "400",
    // paddingRight: 15,
    fontFamily: "Lato",
    color: "#00B4E5",
    fontSize: 14,
  },
  infoIcon: {
    top: "50%",
    right: "15px",
    position: "absolute",
    transform: "translateY(-50%)",
    width: "14px",
    display: "inline-flex",
    cursor: "pointer",
    "& img": {
      width: "14px",
    }
  },
  editInfoIcon: {
    top: "9%",
    position: "absolute",
    transform: "translateY(-50%)",
    width: "14px",
    display: "inline-flex",
    cursor: "pointer",
    "& img": {
      width: "14px",
    }
  },
  templatesList: {
    margin: "0px 0px 5px 0px",
    padding: "0",
    listStyle: "none",
    maxHeight: "450px",

    "& li": {
      position: "relative",
      fontSize: "12px",
      color: "#000",
      display: "flex",
      width: "100%",
      // height:30,
      lineHeight: "18px",
      margin: " 5px 0",
      outline: 0,
      padding: "3px 5px 2px 5px",
      listStyle: "none",
      color: "#000",
      fontSize: 12,
      cursor: "pointer",

      '&:hover': {
        backgroundColor: "#F3F3F3"
      }

    }
  },
  listItemName: {
    display: "flex",
    flex: "1 1 1",
    // minWidth:0,
  },
  templatesCode: {
    color: "#52575C",
    minWidth: 70,
    // maxWidth:70,
    fontSize: 12,
    float: "left",
    padding: "0px 0px 0px 5px",
    // float:"left",
    // padding:"0px 10px 0px 5px"
  },
  templatesDescription: {
    width: "100%",
    color: "#52575C",
    fontSize: 12,
    float: "left",
    padding: "0px 10px 0px 0px",
    // padding:"0px 5px 0px 0px"
  },
  templatesNameTitle: {
    padding: "0px 5px 0px 10px",
    color: "#52575C",
    fontSize: 12,
  },
  deleteItemIcon: {
    marginTop: "15px",
    float: "right",
    transform: "translateY(-50%)",
    width: "14px",
    display: "inline-flex",
    cursor: "pointer",
    "& img": {
      width: "14px",
    }
  },
  noRecordFound: {
    display: "block",
    textAlign: "center",
    color: "rgba(0,0,0,.25)",
    padding: "5% 0",
    '& span': {
      display: "block",
    },
    '& svg': {
      color: "rgba(0,0,0,.25)",
      fontSize: 70
    }
  },
  linkAlignment: {
    marginBottom: "10px"
  },
  loader: {
    width: "100px",
    margin: "90px"
  },
  linkItem: {
    cursor: "pointer",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    textDecoration: "underline",
    color: "#00B4E5",
    margin: "5px 0px"
  },
}));
