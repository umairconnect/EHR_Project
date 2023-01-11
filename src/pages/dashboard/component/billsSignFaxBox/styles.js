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
  billBox: {
    background: "#F1F1F1",
    border: "1px solid #E1E1E1",
    borderRadius: "10px",
    padding: "12px 0px",
    textAlign: "center",
    boxShadow: "none",
    margin: "12px 0 0 0",
  },
  signBox: {
    padding: "0px 0px 0px 10px",
    margin: "12px 0 0 0",
    maxWidth: "100%",
    flexBasis: "100%",
    display: "flex",
  },
  name: {
    color: "#000000",
    fontSize: "14px",
    lineHeight: "20px",
  },
  genderAge: {
    color: "#444444",
    fontSize: "12px",
    lineHeight: "16px",
  },
  pendingSupergenderAge: {
    color: "#444444",
    fontSize: "12px",
    lineHeight: "16px",
    width: "50%",
    margin: "auto",
  },
  viewAllLink: {
    height: "3vw",
    alignItems: "flex-end",
    display: "flex",
  },
  faxReferalContain: {
    containerBox: {
      marginTop: "50px",
      marginBottom: "50px",
    }
  },
  noReportFound: {
    textAlign: "center",
    width: "100%",
    fontSize: "19px",
    color: "#b6b6b6",
    padding: "13px",
    marginTop: "48px",
    marginBottom: "48px",
    fontFamily: "Lato",
  },
  date: {
    marginTop: "6px",
  },
  noteLinkBtn: {
    padding: "0px 8px",
    margin: "0px 0 2px 0",
    textTransform: "capitalize",
    color: "#00B4E5",
    fontSize: "14px",
  },
  documentSignContan: {
    "& .makeStyles-smallContainerBox-116": {
      borderBottom: "0 !important",
    }
  },
  colorLight: {
    color: "#555555",
  }
}));
