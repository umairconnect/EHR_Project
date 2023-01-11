import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContent: {
    textAlign: "center",
    marginTop: "10%"
  },
  newAddBtn: {
    backgroundColor: "#11284B",
    color: "white",
    margin: "4.5px 16px 0",
    height: 30,
    fontSize: 12,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    '&:hover': {
      backgroundColor: "#596270",
    },
    newAddBtnLink: {
      color: "white",
    },
    '& .MuiSvgIcon-root': {
      fontSize: 13,
    },
    '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
      margin: "0px 5px -2px 0"
    }
  },
  positionRelative: {
    position: "relative",
  },
  newAddBtn2: {
    width: "112px",
    height: "32px",
    borderRadius: "8px",
    border: "1px solid #11284B",
    margin: "0px 0px 0px 5px",
    color: "#11284B",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    position: "absolute",
    top: "2px",
    '&:hover': {
      // backgroundColor: "#596270",
      backgroundColor: "#11284b",
      color: "white",
    },
    newAddBtnLink: {
      // color:"#11284B"
      color: "white",
    }
  },
}));
