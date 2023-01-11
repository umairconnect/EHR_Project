import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  fontStyle: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: "0.4px",
  },
  dateSwitch: {
    maxWidth: "100%",
    flexBasis: "100%",
    display: "flex",
    "& button": {
      maxWidth: "33.333%",
      flexBasis: "33.333%",
      color: "#808080",
      border: "none",
      textTransform: "capitalize",
      borderRadius: "8px",
      height: 32,
    },
    "& .Mui-selected": {
      background: "#95E3F9",
      borderRadius: "8px",
      color: "#11284B"
    }
  },
  viewAllLink: {
    height: "7vw",
    alignItems: "flex-end",
    display: "flex",
  },
  progressBox: {
    position: "relative",
    justifyContent: "center",
    marginTop: "12px",
    "& .ant-progress-text": {
      display: "none"
    }
  },
  progressDetailsBox: {
    position: "absolute",
    textAlign: "center",
  },
  smallTitle: {
    color: "#97a1b0",
    fontSize: "12px",
  },
  number: {
    fontSize: "20px",
    lineHeight: "24px",
    marginBottom: "6px"
  },
  totalNumber: {
    color: "#2F4362",
  },
  physicalNumber: {
    color: "#5BD1D8",
  },
  telehealthNumber: {
    color: "#6161EA",
  }
}));
