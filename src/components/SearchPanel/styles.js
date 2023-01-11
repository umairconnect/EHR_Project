import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  searchPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  searchPanelBox: {
    position: "relative",
    borderRadius: 5,
    height: 40,
    paddingLeft: theme.spacing(3.5),
    marginBottom: 10,
    width: 360,
    // backgroundColor: "#E8E8E8",
    border: "1px solid #DDDDDD",
    "&:hover": {
      cursor: "pointer",
      // backgroundColor: "#E8E8E8",
    },
  },
  searchIcn: {
    width: 36,
    left: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:"#000000",
    backgroundColor:"rgba(0,0,0,0.03)",
  },
  inputRoot: {
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    // marginBottom: 4,
    "& .MuiInputBase-input":{
      padding: "0px 12px",
      height:"37.63px",
      fontSize:"14px",
      color:"#4A4A4A",
    },
    "& .Mui-disabled": {
      backgroundColor:"#f3f3f3",
      color:"#4A4A4A"
    },
    border:"none",
    color: "#000000",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  inputInput: {
    // height: 39,
    padding: 0,
    paddingLeft: 10,
    width: "100%"
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
    margin: "5px 9px 0 9px",
    width: 300,
  },
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      fontSize: 12
    },
  },
  footerButton: {
    paddingTop: 16,
    margin: "16px 9px 16px 9px",
    width: 300,
    alignItems:'center',
    textAlign: 'center',
  },
  sClose: {
    color: "#000000",
    backgroundColor:"#A9A9A9",
    border: "1px solid #DDDDDD",
    width: 63,
    height: 30,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: "#808080",
      color: "white"
    },
  },
  sApply: {
    // backgroundColor: "#00b4e5",
    backgroundColor:"#1E90FF",
    color: "#000000",
    width: 63,
    height: 30,
    fontSize: 12,
    fontFamily: "Lato",
    '&:hover': {
      // color:"#484848",
      // backgroundColor: "#4682B4",
      color: "white",
      backgroundColor: "#11284B",
    },
  },
  PopoverRoot: {
    // boxShadow:"1px 1px 1px 1px" ,
    // pointerEvents: "none !important",
  },
  Popoverpaper: {
    border: "1px solid #DDDDDD",
    backgroundColor: "white",
    width: 320,
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
  chippaper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: "9px 4px 0 4px",
  },
  lableInput:{
    margin:"0px 0px 5px 3px"
  },
  lableSelectField:{
    margin:"0px 0px -15px 3px",
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginLeft:3,
  },
  InputField:{
    width:'270px'
  },
  lableInput: {
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginLeft:3,
},
InputDateTime:{
  margin: "5px 5px 0 8px",
  width: 145,
  border: "1px solid #DDDDDD",
  background: "#FFFFFF",
  borderRadius:"3px"
},
baseDateInput: {
  border: "1px solid #DDDDDD",
  padding: "5px 5px",
  borderRadius: "4px",
  width: "100%",
  fontFamily: "Lato",
  backgroundColor: "white",
  marginBottom: 4,
  "& .MuiInputBase-input":{
    padding: "5px 5px",
    fontSize:"14px",
    color:"#4A4A4A",
    '&:focus': {
      border: "1px solid #00b2e3",
      borderRadius: "4px",
      outline: 0,
    },
  },
  
  "& .Mui-disabled": {
    backgroundColor:"#f3f3f3",
    color:"#4A4A4A"
  },
},
newAddBtn: {
  // backgroundColor: "#11284B",
  width:"112px",
  height:"32px",
  borderRadius:"8px",
  border:"1px solid #11284B",
  color: "#11284B",
  backgroundColor:"#F9F9F9",
  boxSizing:"border-box",
  margin: "10px 0px 0px 5px",
  fontSize: 15,
  fontFamily: "Lato",
  textTransform: "none",
  padding: "0 12px",
  '&:hover': {
    // backgroundColor: "#596270",
    backgroundColor:"#11284b",
    color: "white",
  },
  newAddBtnLink: {
    // color:"#11284B"
    color: "white",
  }
},
newAddBtn2: {
  width:"112px",
  height:"32px",
  borderRadius:"8px",
  border:"1px solid #11284B",
  margin: "0px 0px -65px 5px",
  color: "#11284B",
  backgroundColor:"#F9F9F9",
  boxSizing:"border-box",
  fontSize: 15,
  fontFamily: "Lato",
  textTransform: "none",
  padding: "0 12px",
  '&:hover': {
    // backgroundColor: "#596270",
    backgroundColor:"#11284b",
    color: "white",
  },
  newAddBtnLink: {
    // color:"#11284B"
    color: "white",
  }
},
}));
