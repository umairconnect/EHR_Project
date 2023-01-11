import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#D9DFDF",
    height: 40,
  },
  typo: {
    color: "black",
    marginLeft: 15,
    fontFamily: "Lato",
    fontWeight: "bold",
    lineHeight: "40px",
    fontSize: "20px !important",
  },
  button: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
  headerMenuButtonSandwich: {
    marginLeft: 5,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    },
    padding: theme.spacing(0.5),
  },
  headerMenuButtonCollapse: {
    marginRight: 5,
    marginTop: "-3.5px",
  },
  headerIcon: {
    fontSize: 18,
    color: "black",
  },
  headerIconCollapse: {
    color: "#11284B",
  },
}));
