import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  taskFlexBox: {
    display: "flex",
  },
  taskLeftSideMenulist: {
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
  taskContentArea: {
    flex: "1",
    // paddingLeft: "12px",
    // paddingRight: "12px",
    minWidth: "65%"
  },
  taskTabs: {
    height: "100vh",
    // marginTop: "10px",
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
      padding: "4px 10px",
      minHeight: "initial",
      color: "white",
      "& .MuiTab-wrapper": {
        alignItems: "flex-start",
        borderBottom: "1px solid #FFFFFF",
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
  taskShadowBoxWidth: {
    flexGrow: 1,

  },
  //Settings
  allTasksCard: {
    margin: "5px 10px",
    background: "#FFFFFF",
    border: "1px solid #E1E1E1",
    boxSizing: "border-box",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  allTasksInnerCard: {
    margin: "10px 40px",
  },
  newAddBtn2: {
    width: "112px",
    height: "32px",
    borderRadius: "8px",
    border: "1px solid #11284B",
    margin: "0px -30px 0px 5px",
    color: "#11284B",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    position: "relative",
    float: "right",
    // top:"2px",
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
  settingHeading: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#25282B",
  },
  settingContainer: {
    width: "100%",
    background: "#FFFFFF",
    border: "1px solid #E1E1E1",
    boxSizing: "border-box",
    margin: "25px 0px",
  },
  settingInfo: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "20px",
    color: "#25282B",
  },
  settingHeadingBox: {
    minHeight: "45px",
    display: "flex",
    // border: "1px solid #E1E1E1",
    backgroundColor: "#FFFFFF",
  },
  settingHeadingTitle: {
    // margin: "12px 0px 0px 5%",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#25282B",
    maxWidth: "180px",
    minWidth: "180px",
    display: "block",
    margin: "15px 0px 0px 55px"
  },
  settingHeadingSwitchTitle: {
    margin: "12px 0px 0px 13%",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#25282B",
  },
  selectFields: {
    color: "#11284A",
    padding: "0px 15px",
    margin: "0px 0px 0px 7%",
    fontWeight: "400",
    "& svg": {
      margin: "0px 24px !important",
      cursor: "move !important",
      color: "#11284A !important",
    },
    "& .MuiInputBase-input": {
      background: "#ebebeb",
      width: "170px",
      padding: "8px 15px",
      borderRadius: "5px",
      margin: "0px",
      fontSize: "15px",
      color: "#606060",

    }
  },
  settingBox: {
    maxHeight: "55px",
    display: "flex",
    borderTop: "1px solid #E1E1E1",
    backgroundColor: "#FFFFFF",
    "& svg": {
      margin: "10px",
      cursor: "move",
    },
    "& .MuiFormLabel-root": {
      maxWidth: "180px",
      minWidth: "180px",
      display: "block",
      margin: "15px 0px 0px 15px",
      cursor: "move",
    }
  },
  settingBox: {
    maxHeight: "55px",
    display: "flex",
    borderTop: "1px solid #E1E1E1",
    backgroundColor: "#FFFFFF",
    "& svg": {
      margin: "10px",
      cursor: "move",
    },
    "& .MuiFormLabel-root": {
      maxWidth: "180px",
      minWidth: "180px",
      display: "block",
      margin: "15px 0px 0px 15px",
      cursor: "move",
    }
  },
  root: {
    width: 47,
    height: 22,
    padding: 0,
    zIndex: 1000,
    // left:85,
    // marginTop: 14,
    // margin: "14px 10px 0px 0px"
    margin: "14px 0px 0px 15%"
  },
  customroot: {
    width: 47,
    height: 22,
    padding: 0,
    zIndex: 1000,
    // left:85,
    // marginTop: 14,
    margin: "3px 10px 0px 0px"
  },
  switchBase: {
    padding: 1,
    zIndex: 1000,
    transform: 'translateX(-8px)',
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#00B2E3',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 19,
    height: 19,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: "#C4C4C4",
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
  //
}));
