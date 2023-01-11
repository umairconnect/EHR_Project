import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  contentPositive: {
    flex: "1",
    color: "#25282B",
    fontSize: "12px",
    minWidth: "33%",
    padding: "2px 15px"
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
  footerBtn: {
    padding: " 0px 0 7px",
    // marginTop:"15px",
    bottom: "0px",
    // width: "55%",
    paddingLeft: "60%",
    display: "flex",
    zIndex: 3
  },
  paperBox: {
    padding: "10px 15px 20px 20px",
    border: "1px solid #E8E8E8",
    borderRadius: "10px",
    width: "100%",
    marginBottom: "15px",
    display: "flex",
    flexWrap: "wrap"
  },
  diagnosisListArea: {
    margin: "0px 0px 5px 50px"
  },
  diagnosisList: {
    display: "flex"
  },
  diagnosisCode: {
    lineHeight: "30px",
    fontFamily: "Lato",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    textAlign: "left",
    // color:"#5D8AB5",
    color: "#52575C",
    width: 80,
    minWidth: 80,
    maxWidth: 80,
    marginLeft: 5,
  },
  diagnosisDesc: {
    lineHeight: "30px",
    fontFamily: "Lato",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    textAlign: "left",
    // color:"#5D8AB5",
    color: "#52575C",
    maxWidth: "80%",
    textAlign: "justify",
    paddingRight: "15px"
  },
  deleteItemIcon: {
    marginTop: "6px",
    right: "70px",
    position: "absolute",
    width: "14px",
    cursor: "pointer",
    zIndex: 1,
    "& img": {
      width: "14px",
    }
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
}));