import { makeStyles } from "@material-ui/styles";
import ResetImage from "../../images/login-image.png";
export default makeStyles(theme => ({
  container: {
    height: "100vh",
    // width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // top: 0,
    // left: 0,
    // backgroundColor:"#F2F2F2"
  },
  loginContainer: {
    backgroundImage: `url(${ResetImage})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    // backgroundSize:"contain",
    backgroundRepeat: 'no-repeat',
    boxShadow: "none",
    width: '100%',
    height: '100vh',
    display: "flex",
    alignItems: "center",
    overflow: "auto",
  },
  logotypeContainer: {
    backgroundColor: "white",
    // width: "60%",
    // height: "100%",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",

    // [theme.breakpoints.down("md")]: {
    //   width: "50%",
    // },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logotypeImage: {
    margin: "15px 0px 0px 25px",
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

    // justifyContent: "center",
    maxHeight: "650px",
    overflow: "auto",
    paddingBottom: "20px",
    justifyContent: "center",
    background: "#FFFFFF",
    border: "1px solid #C2C2C2",
    borderRadius: "15px",
    [theme.breakpoints.down("xs")]: {

    },
    [theme.breakpoints.down("sm")]: {
      // marginLeft:"100px"
    },

    // [theme.breakpoints.down("md")]: {
    //   width: "50%",
    // },
  },
  CardContainer: {
    position: "absolute",
    width: "522px",
    height: "650px",
    left: "13%",
    top: "10%",
    [theme.breakpoints.down("sm")]: {

    },
    [theme.breakpoints.down("md")]: {

    },
    // width:1170,
    // boxShadow:"none",
    // borderRadius:"0",
    // padding:"30px 0 0 50px",
    // marginTop:30,
  },
  CardRoot: {
    borderRadius: 0,
    background: "transparent",
    boxShadow: "none",
    backgroundColor: "transparent"
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
    padding: "35px 45px 0 45px"
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
  successMessage: {
    textAlign: "center",
    color: "#2AB930",
  },

  textField: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    padding: " 7px 12px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 17,
    border: "1px solid #C4C4C4",
    borderRadius: 5,
  },
  formButtons: {
    width: "100%",
    marginTop: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    color: "#11284B",
    "&:hover": {
      color: "#11284B",
    },
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
    fontSize: 12,
    color: "#7A7A7A",
    textAlign: "start",
    width: 982,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "16px",
    padding: "15px 45px 0 45px"
  },
  copyright: {
    marginTop: 20,
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
}));
