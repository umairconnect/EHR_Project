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
  }
}));
