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
    height: "18px",
    marginLeft: "10px",
  },
  addNew: {
    margin: 8,
    cursor: "pointer"
  },
  daysLabel: {
    margin: "10px",
    fontFamily: "Lato",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    textAlign: "left",
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
    padding: "12px 12px 12px 0px",
    width: "100%",
    height: "55px",
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
}));