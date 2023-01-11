import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  flexBox: {
    display: "flex",
  },
  flexHeight100: {
    display: "flex",
    minHeight: '92%',
  },
  leftSideMenulist: {
    listStyle: "none",
    margin: "0px",
    padding: "0px",
    position: "relative",
    backgroundColor: "#596270",
    width: "204px",
    "& li": {
      width: "100%",
      display: "flex",
      position: "relative",
      boxSizing: "border-box",
      textAlign: "left",
      alignItems: "center",
      padding: "6px 6px 6px 15px",
      justifyContent: "flex-start",
      cursor: "pointer",
      flex: "1",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#00B2E3"
      }
    }
  },
  hidden: {
    display: 'none',
  },
  contentArea: {
    flex: "1",
    paddingLeft: "12px",
    paddingRight: "12px",
    minWidth: "65%"
  },
  tabs: {
    boxShadow: "none",
    alignItems: "flex-end",
    overflow: "initial",
    backgroundColor: "#596270",
    top: "-10px",
    position: "relative",
    borderLeft: "1px solid white",
    minWidth: "204px",
    "& .MuiTabs-flexContainer": {
      minWidth: "204px",
    },
    "& button": {
      textTransform: "capitalize",
      color: "#25282B",
      fontFamily: "Lato",
      fontSize: "14px",
      opacity: "1",
      padding: "0px 10px",
      minHeight: "initial",
      color: "white",
      "& .MuiTab-wrapper": {
        alignItems: "flex-start",
        borderBottom: "1px solid #FFFFFF",
        padding: "8px 10px",

      },

    },
    "& button:hover": {
      backgroundColor: "#00B4E5",
      color: "white",
    },
    "& button.Mui-selected": {
      fontWeight: "bold",
      backgroundColor: "#00B4E5",
      color: "white",

    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#00B4E5",
      height: "3px",
    }
  },
  shadowBoxWidth: {
    flexGrow: 1,

  },
}));
