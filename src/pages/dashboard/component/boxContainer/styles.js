import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  paper: {
    background: "#FFFFFF",
    border: "1px solid #E1E1E1",
    boxShadow: " 0px 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
    padding: "25px 25px 10px 25px",
    height: "100%",
    position: "relative",
  },

  paperSm: {
    background: "#FFFFFF",
    border: "1px solid #E1E1E1",
    boxShadow: " 0px 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
    padding: "9px 25px 10px 9px",
    height: "100%",
    position: "relative",
  },

  containerBox: {
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
  },
  fontStyle: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "500",
  },
  smallContainerBox: {
    display: "flex",
    flexWrap: "wrap",
    padding: "5px 15px",
    borderBottom: "1px solid #ededed",
  },
  iconCircleBox: {
    display: "flex",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    flexShrink: "0",
    lineHeight: "1",
    userSelect: "none",
    borderRadius: "50%",
    justifyContent: "center",
   
  },
  largBox: {
    width: "90px",
    height: "90px",
  },
  smallBox: {
    width: "70px",
    height: "70px",
  },
  iconTitle: {
    display: "flex",
    color: "#565656",
    fontSize: "17px",
    fontWeight: "700",
    margin: "10px 0 10px 0",
  },
  largIconTitle: {
    maxWidth: "100%",
    flexBasis: "100%",
    justifyContent: "center"
  },
  smallIconTitle: {
    paddingLeft: 20,
    alignItems: "center",
  },
  footerArea: {
    borderTop: "solid 1px #EDE5E5",
    padding: "10px 0% 0px 0px",
    marginTop: 10,
    maxWidth: "100%",
    flexBasis: "100%",
    justifyContent: "right",
    display: "flex",
    alignItems: "center",
   
   
  },
  viewAllDisabled: {
    cursor: "not-allowed",
    opacity: "0.4",
    pointerEvents: "none",
    "& button": {
      color:"#686868",
    }
   },
  footerBtn: {
    padding: "0px 8px",
    margin: "0",
    textTransform: "capitalize",
    color: "#00B4E5",
    fontSize: "14px",
    "& .MuiButton-iconSizeMedium": {
       "& img": {
        width: "21px",
       }
    }
  }
}));
