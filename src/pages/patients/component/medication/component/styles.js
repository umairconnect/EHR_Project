import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  dialogPaper: {
    width: "80%",
    minWidth: "80%",
    maxHeight: "95vh",
    maxWidth: '80%',
  },
  viewMedicationPaper: {
    width: "50%",
    minWidth: "50%",
    maxWidth: '50%',
  },
  mainContent: {
    // padding: "0px 25px 40px 25px",
    minHeight: "690px",
    height: "690px",
    backgroundColor: '#F4F4F4',
    display: "flex"
  },
  mandatorColor: {
    color: "#ff0000"
  },
  Htabs: {
    "& button": {
      textTransform: "capitalize",
      color: "#25282B",
      fontFamily: "Lato",
      width: "125px",
      maxWidth: "50px",
      fontSize: "14px",
      opacity: "1",
    },
    "& button.Mui-selected": {
      fontWeight: 700,
      color: "#11284B",
      backgroundColor: "#00B2E3",
      borderRadius: " 0px 10px 0px 0px",
    },
    "& button.Mui-selected:first-child": {
      borderRadius: "10px 0px 0px 0px",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#00B2E3",
      color: "#11284B",
      width: "130px"
      // borderRadius:"10px 10px 0px 0px",
      // height: "100%",
    },
    "& .MuiTab-root": {
      minWidth: "138px"
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
    "& img": {
      cursor: "pointer",
      marginRight: "10px"
    }
  },
  rXList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    "& li": {
        cursor: "pointer",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "25px",
        color: "#52575C",
        // height: 35,
        padding: "10px 5px 0px 0px",
        borderBottom: "1px solid #DBDADA",
        "&:hover": {
            backgroundColor: "#f6f6f6",
            background: "#f6f6f6"
        }
    }
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
  DialogContentLeftSide: {
    flex: "1",
      maxWidth: "290px",
    flexBasis: "280px",
    background: "#FFFFFF",
    margin: 10,
      padding: 10,
    overflow: "auto",
    border: "1px solid #DBDADA",
    borderRadius: "0px 0px 4px 4px",
    // minHeight:"521px",
  },
  DialogContentRightSide: {
    flex: "1",
    padding: "20px 10px 10px",
    backgroundColor: "#FFFFFF",
    // padding: "20px 10px 5px 10px",
    // minHeight:"521px",
  },
  box: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    padding: "18px 10px 10px 20px",
  },
  leftHeader: {
    flex: "0 1 auto",
    display: "flex",
    height: "25px",
    alignItems: "flex-end",
    borderBottom: "1px solid #DBDADA"
  },
  header: {
    flex: "0 1 auto",
    display: "flex"
  },
  content: {
    flex: "1 1 auto",
    maxHeight: "580px",
    minHeight: "200px",
    // overflow: "auto",
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
  leftHeaderTitle: {
    fonFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "25px",
    color: "#25282B",
  },
  favoriteMedicationsList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    "& li": {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "25px",
      color: "#52575C",
      height: 35,
      padding: "10px 5px 10px 0px",

      lineHeight: "21px",
      borderBottom: "1px solid #ededed",
      display: "table",
      width: "100%",
    }
  },
  medicineList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    "& li": {
      color: "#000000",
      padding: "0px 5px 10px 3%",
      margin: "0px 0px 10px 0px",
      fontSize: "14px",
      fontStyle: "normal",
      fontFamily: "Lato",
      fontWeight: "normal",
      background: "#f6f6f6",
      lineHeight: "17px",
      borderRadius: 3,
      "& img": {
        positon: "relative",
        float: "right",
        cursor: "pointer"
      }
    }
  },
  listItemName: {
    fontSize: "14px",
    fontStyle: "normal",
    fontFamily: "Lato",
    fontWeight: "bold",
    // background: "#F0F0F0",
    lineHeight: "17px",
    padding: "10px 0px 0px"
  },
  alertRoot: {
    padding: 4,
    height: 25,
    margin: "5px 0px",
    fontSize: "12px",
    fontStyle: "normal",
    fontFamily: "Lato",
    fontWeight: "normal",
    lineHeight: "14px",
    textAlign: "left",
    color: "#52575C",
    background: "transparent",
    "& .MuiAlert-message": {
      padding: "10px 0px 0px"
    },
    "& MuiAlert-standardError": {
      color: "#52575C",
      background: "#F0F0F0",
    },
    "& MuiAlert-standardWarning": {
      color: "#52575C",
      background: "#F0F0F0",
    }
  },
  orderTestContent: {
    backgroundColor: "#FFFFFF"
  },
  orderList: {
    margin: "5px 1px 10px 1px",
    //padding:"0 15px 0 7px",
    padding: "0px",
    listStyle: "none",
    // maxHeight: "128px",
    // height: "85px",
    // overflow: "auto",

    "& li": {
      position: "relative",
      height: "40px",
      fontSize: "12px",
      color: "#000",
      fontWeight: "7400",
      lineHeight: "40px",
      margin: "5px 0px 5px",
      outline: 0,
      padding: "0 12px 0 12px",
      listStyle: "none",
      marginTop: 2,
      borderRadius: "0px",
      background: "#f6f6f6",
      // boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
    },
  },
  deleteIcon: {
    //float: "right",
    cursor: "pointer",
    right: "15px",
    paddingTop: "5px",
    position: "absolute",
    color: "red",
    cursor: "pointer",
    paddingTop: 5,
    "& svg": {
      transform: "rotate(45deg)",
    },
  },
  listCrossButton: {
    color: "red",
    position: "relative",
    float: "right",
    // marginTop: "5px",
    cursor: "pointer",
    padding: "2px 3px 3px",
    zIndex: "2",
    display: "block",
    marginTop: "-20px",
    "& svg": {
      transform: "rotate(45deg)",
    },
    // "& :hover": {
    //     backgroundColor: "#F4F4F4",
    // }
  },
  labeladdfavorite: {
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#00B4E5",
    textDecoration: "underline",
    fontSize: 15,
    cursor: "pointer",
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

  tablelayout: {
    width: "100%",
    textAlign: "left",
    marginBottom: "10px",
    "& tr": {
      borderBottom: "1px solid #e4e4e4",
    },

    "& th": {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "14px",
      letterSpacing: "0.01em",
      color: "#000000d9",
      padding: "13px",
      fontWeight: "bold",

    },
    "& td": {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "14px",
      letterSpacing: "0.01em",
      color: "#000000d9",
      padding: "13px",
      fontWeight: "normal",
      background: "#fafafa",
      borderBottom: "1px solid #f2f2f2",
    },
    "& thead": {
      background: "#F0F0F0",
    }
  },
  themBlue: {
    color: "#5D8AB5",
    margin: "0",
  },
  themBlack: {
    color: "#242424",
    margin: "0",
  },
  colHeading: {
    textAlign: "right",
    fontWeight: "500",
    paddingRight: "15px",
  },
  statusPoints: {
    "& p": {
      margin: "11px 0",
    }
  },
  sectionMargin: {
    margin: "20px 0px",
  },
  greyBox: {
    background: "rgb(240, 240, 240)",
    padding: "7px 11px",
    lineHeight: "1.6",
    "& p": {
      margin: "0",
    }
  },
  tableHeading: {
    fontWeight: "600",
    fontFamily: "Lato",
    margin: "0px 0px 12px 0px",
    fontSize: "15px",
  },
  actionButton: {
    padding: "0px 0px 15px 0px",
    justifyContent: "right",
  },


}));