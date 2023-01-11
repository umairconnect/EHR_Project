import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  heading: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "16px",
    letterSpacing: "0.4px",
    color: "#565656",
  },
  subHeading: {
    color: "#25282B",
    fontWeight: "700",
    lineHeight: "14px",
    fontSize: "12px",
    textTransform: "uppercase",
  },
  value: {
    fontWeight: "400",
    fontFamily: "Lato",
    fontSize: "25px",
    lineHeight: "43px",
    marginTop: "4px",
  },
  boxStyle: {
    marginTop: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
