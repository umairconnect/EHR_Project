import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
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

}));