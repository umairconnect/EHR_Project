import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({

  pageTitleContent: {
    textAlign: "center",
    marginTop: "10%"
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
  container: {
    padding: "5px 12px",
  },
  opacityContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    zIndex: 0,
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0.7",
    backgroundColor: "#dbdee4",
    "& span": {
      color: "#11284a",
      fontWeight: "bold",
      fontSize: "45px",
    }
  }
}));
