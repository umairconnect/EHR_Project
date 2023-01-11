import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  addIconSpan: {
    fontSize: "14px",
    margin: "5px 5px 10px 5px",
    color: "#00B4E5",
    fontFamily: "Lato",
    fontWeight: "400",
    cursor: "pointer"
  },
  addIcon: {
    margin: "7px 0px",
    cursor: "pointer"
  },
  Icon: {
    cursor: "pointer",
    width: "18px",
    marginLeft: "10px",
    height: "18px",
  },
  addNew: {
    margin: 8,
    cursor: "pointer"
  },
  footerBtn: {
    padding: " 7px 0px",
    //marginTop:"15px",
    bottom: "0px",
    //width: "55%",
    // paddingLeft:"58%",
    position: "absolute",
    right: 0,
    display: "flex",
    zIndex: 3
  },
  historyDataTable: {
    width: "100%"
  },
  Icon: {
    width: "18px",
    height: "18px",
    cursor: "pointer"
  },
  diagnosisList: {
    marginLeft: "103px",
    display: "flex",
    height: "35px"
    // miaxWidth: "600px"
  },
  diagnosisLabel: {
    // paddingRight:50,
    lineHeight: "30px",
    fontFamily: "Lato",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 700,
    textAlign: "left",
    //color:"#5D8AB5",
    color: "#000",
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    margin: "0px 0px 0px 20px",
  },
  diagnosisValueLabel: {
    lineHeight: "30px",
    fontFamily: "Lato",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    textAlign: "left",
    color: "#5D8AB5",
    width: 265,
    minWidth: 265,
    maxWidth: 265,
    margin: "0px 0px 0px 20px",
  },
  ageAtOnsetLabel: {
    lineHeight: "30px",
    fontFamily: "Lato",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 700,
    textAlign: "left",
    //color:"#5D8AB5",
    color: "#000",
    width: 65,
    minWidth: 65,
    maxWidth: 65,
    margin: "0px 0px 0px 20px",
  },
  ageAtOnsetValueLabel: {
    lineHeight: "30px",
    fontFamily: "Lato",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    textAlign: "left",
    color: "#5D8AB5",
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    margin: "0px 0px 0px 20px",
  },
  editdeleteIcon: {
    margin: 0,
    cursor: "pointer",
    "& img": {
      margin: "5px 0px 0px 10px",
      width: 16,
      height: 15,
    }
  },
  btnContainer: {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    zIndex: 1000,
    display: "inline-block",
    transform: "translateX(-50%)",
    left: "13%",
    position: "relative",
  },
  addNewBtn: {
    padding: "12px 12px 12px 10%",
    width: "100%",
    height: "63px",
    border: "1px solid #E8E8E8",
    position: "relative",
    marginTop: "-10px",
    boxSizing: "border-box",
    borderRadius: "7px",
  },
  addNewButton: {
    background: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    textTransform: "none",
    boxShadow: "none",
    color: "#00B4E5",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "normal",
    "&:hover": {
      background: "#FFFFFF",
      backgroundColor: "#FFFFFF",
      boxShadow: "none",
      color: "#00B4E5",
    },
    "& .MuiButton-startIcon": {
      marginRight: "2px"
    }
  },
  formBtnTitle: {
    width: "100%",
    color: "#25282B",
    fontSize: 15,
    fontWeight: "600",
  },
  familyHistoryBaseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "0px 12px",
      minHeight: "35.63px",
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
    "& input::-webkit-outer-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input::-webkit-inner-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input[type=number]": {
      appearance: "textfield"
    },
  },
}));