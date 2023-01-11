import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    // width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#F2F2F2"
  },
  logotypeContainer: {
    backgroundColor: "white",
    // width: "60%",
    // height: "100%",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logotypeImage: {
    width: 165,
    float: "left",
  },
  appImage: {
    width: "100%"
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    // width: "40%",
    // height: "100%",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "55%",
    },
  },
  CardContainer: {
    width: 1170,
    boxShadow: "none",
    borderRadius: "0",
    padding: "30px 0 0 50px",
    marginTop: 30,
  },
  form: {
    // width: 320,
  },
  loginTitle: {
    fontFamily: "Lato",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#000000",
    clear: "both",
    textAlign: "left",
    marginBottom: 40,

  },
  inBox: {
    padding: "35px 0 0 22px"
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(6),
    boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },

  textField: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    padding: " 7px 12px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 30,
    border: "1px solid #C4C4C4",
    borderRadius: 5,
  },
  formButtons: {
    width: "100%",
    marginTop: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    color: "#11284B",
  },
  loginLoader: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginBtn: {
    backgroundColor: "#11284B",
    width: "100%",
    color: "white",
    textTransform: "capitalize",

    fontSize: 18,
    "&:hover": {
      backgroundColor: "#596270"
    },
    "&:disabled": {
      backgroundColor: "#e0e0e0",
      color: "rgba(0, 0, 0, 0.54)"
    }
  },
  footerContent: {
    fontFamily: "Lato",
    fontSize: 14,
    color: "#7A7A7A",
    textAlign: "center",
    width: 982,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "17px",
    marginBottom: 25,
  },
  copyright: {
    marginTop: 10,
    color: "#000000",
    whiteSpace: "nowrap",
    display: "inline-block"
  },
  subTitle01: {
    fontFamily: "Lato",
    color: "#000000",
    fontSize: 16,
    marginBottom: 30,
  },
  subTitle02: {
    fontFamily: "Lato",
    color: "#A9A9A9",
    fontSize: 14,
    marginBottom: 30,
  },
  messageImage: {
    margin: "18px 0px 0px 20px",
  },
  strengthPassword: {
    minWidth: "40px",
    height: "20px",
    borderRadius: "10px",
    margin: "0px 2px 10px 0px ",
    backgroundColor: "#EBEBEB",
    "&:hover": {
      backgroundColor: "#EBEBEB"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "30px",
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "30px",
    },
  },
  weakPassword: {
    backgroundColor: "#FD5F5F",
    "&:hover": {
      backgroundColor: "#FD5F5F"
    },
  },
  moderatePassword: {
    backgroundColor: "#FFAD4F",
    "&:hover": {
      backgroundColor: "#FFAD4F"
    },
  },
  mediumPassword: {
    backgroundColor: "#FFD84F",
    "&:hover": {
      backgroundColor: "#FFD84F"
    },
  },
  StrongPassword: {
    backgroundColor: "#13BD38",
    "&:hover": {
      backgroundColor: "#13BD38"
    },
  },
  strengthMessage: {
    marginLeft: "5px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "15px",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "15px",
    },
  },
  successMessage: {
    textAlign: "center",
    color: "#2AB930",
  },
  pRelative: {
    position: "relative"
  },
  pAbsolute: {
    position: "absolute"
  },
  text: {
    marginTop: "14px",
  }
}));
