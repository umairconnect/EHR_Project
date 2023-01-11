import { MicNone } from "@material-ui/icons";
import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  searchPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    // marginLeft:"10px",
    position: "relative"
  },
  closeIcon: {
    cursor: "pointer",
  },
  searchPanelBox: {
    display: "flex",
    position: "relative",
    borderRadius: 5,
    height: 40,
    // paddingLeft: theme.spacing(3.5),
    marginBottom: 10,
    width: "100%",
    backgroundColor: "white",
    // border: "1px solid #DDDDDD",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "white",
    },
  },
  searchIcn: {
    width: 36,
    left: 0,
    marginLeft: "88%",
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    border: "none",
    color: "#000000",
    width: "100%",
  },
  inputInput: {
    padding: "0px",
    padding: 0,
    paddingLeft: 10,
    width: "100%",
    // fontSize: "12px"
  },
  SearchInput: {
    height: 39,
    fontSize: "12px"
  },

  SearchInputRoot: {
    color: "#000000",
    width: "100%",

  },
  margin: {
    margin: "16px 9px 0 9px",
    width: 220,
  },
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      fontSize: 12
    },
  },

  PopoverRoot: {
    // pointerEvents: "none !important",
  },
  Popoverpaper: {
    backgroundColor: "white",
    width: 240,
    marginTop: 42,
    marginLeft: 0,
  },
  searchSelect: {

  },
  input: {
    color: "black",
    fontSize: 12,
    border: "1px solid #DDDDDD",
    backgroundColor: "white",
    borderRadius: "4px",
    height: "42px",
    '&:hover': {
      backgroundColor: 'white',
    },
    '&$focused': {
      backgroundColor: "white",
    }

  },
  textLabel: {
    color: "#52575C",
    fontSize: 12,
    '& label.Mui-focused': {
      color: 'green',
    },
  },
  SearchMenuList: {
    position: " absolute",
    // maxWidth: "calc(100% - 32px)",
    borderRadius: "10px",
    border: "1px solid #DDDDDD",
    // border:"1px solid #000000",
    minWidth: '16px',
    height: "300px",
    // maxHeight: 'calc(100% - 32px)',
    minHeight: "160px",
    overflowX: "hidden",
    overflowY: "scroll",
    boxShadow: "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
    width: " 300px",
    marginLeft: "0",
    top: 42,
    backgroundColor: "white",
    // borderRadius: 4,
    zIndex: 9999,
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "33.3%"
    },
    [theme.breakpoints.down("md")]: {
      width: "33.3%"
    },
    [theme.breakpoints.down("lg")]: {
      width: "100%"
    },
  },
  Menu: {
    position: " absolute",
    // maxWidth: "calc(100% - 32px)",
    borderRadius: "10px",
    border: "1px solid #DDDDDD",
    // border:"1px solid #000000",
    minWidth: '16px',
    height: "300px",
    // maxHeight: 'calc(100% - 32px)',
    minHeight: "160px",
    overflowX: "hidden",
    overflowY: "scroll",
    margin: "250px 0px 0px 350px",
    backgroundColor: "white",
    // borderRadius: 4,
    zIndex: 9999,

    // position:" absolute",
    // // maxWidth: "calc(100% - 32px)",
    // minWidth: '16px',
    // maxHeight: 'calc(100% - 32px)',
    // minHeight: "160px",
    // overflowX: "hidden",
    // overflowY: "auto",
    // width:" 300px",
    // marginLeft: "0",
    // top:380,
    // left:280,
    // backgroundColor: "white",
    // borderRadius: 4,
  },
  searchList: {
    width: '100%',
    maxWidth: 300,
    overflow: 'auto',

    // margin:"-10px 0px 0px 2px",
    // border:"1px solid EEE3E0",
    // paddingTop:"0px 0px 0px 0px",
    // "&:hover": {
    //   cursor: "pointer",
    //   backgroundColor: "#ECE7E6",
    // },
  },
  MenuItem: {
    margin: "0px 0px -5px 2px",
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
  list: {
    overflowY: "scroll"
  },
  baseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "9.5px 12px",
      fontSize: "14px",
      color: "#4A4A4A",
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
  },
  InputBaseAutocomplete: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    '&:focus': {
      border: "1px solid #00b2e3",
      borderRadius: "4px",
      outline: 0,
    },
    "& .MuiInputBase-root": {
      padding: "3px 4px 3px 12px",
      // padding: "9.5px 12px",
      borderRadius: "5px",
      fontSize: "14px",
      color: "#4A4A4A",
      '&:focus': {
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      },
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
  },
  baseInputAutocomplete: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      padding: "9.5px 12px",
      border: "1px solid #00b2e3",
      borderRadius: "4px",
      outline: 0,
    }
  },
  autoCompleteBox: {
    width: "100%",
    borderBottom: "1px solid #DDDDDD"
  },
  autoCompleteGrid: {
    marginBottom: "5px",
  },
  NameTypography: {
    fontSize: "12px",
    color: "#2A2D30",
    fontFamily: "Lato",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center"
    },
  },
  AgeTypography: {
    color: "#2A2D30",
    fontSize: "12px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      alignItems: "center"
    },
  },
  icon: {
    marginLeft: "0px",
    width: 30,
    height: 30,
  },
  NumberTypography: {
    fontFamily: "Lato",
    fontSize: "12px",
  },
  autoCompletePaper: {
    width: "100%",
    border: "1px solid #DDDDDD",
  },
}));
