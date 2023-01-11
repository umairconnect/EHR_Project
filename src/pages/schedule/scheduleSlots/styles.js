import { FormatAlignCenter } from "@material-ui/icons";
import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContent: {
    textAlign: "center",
    marginTop: "10%"
  },
  OpenStatus: {
    '&:before': {
      content: "''",
      width: "4px",
      top: "5px",
      left: "0px",
      height: "80%",
      backgroundColor: "#8aff8a",
      position: "absolute",
    }
  },
  BookedStatus: {
    '&:before': {
      content: "''",
      width: "4px",
      top: "5px",
      left: "0px",
      height: "80%",
      backgroundColor: "#89CED2",
      position: "absolute",
    }
  },
  BlockedStatus: {
    '&:before': {
      content: "''",
      width: "4px",
      top: "5px",
      left: "0px",
      height: "80%",
      backgroundColor: "#FD5F5F",
      position: "absolute",
    }
    },
    BreakStatus: {
        '&:before': {
            content: "''",
            width: "4px",
            top: "5px",
            left: "0px",
            height: "80%",
            backgroundColor: "red",
            position: "absolute",
        }
    },
  newAddBtn: {
    backgroundColor: "#11284B",
    color: "white",
    margin: "4.5px 16px 0",
    height: 30,
    fontSize: 12,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    '&:hover': {
      backgroundColor: "#596270",
    },
    newAddBtnLink: {
      color: "white",
    },
    '& .MuiSvgIcon-root': {
      fontSize: 13,
    },
    '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
      margin: "0px 5px -2px 0"
    }
  },
  poper: {
    marginLeft: '150px',
    zIndex: 5
  },
  menu: {
    background: '#FFFFFF',
    borderRadius: '5px',
    border: '1px solid #d3d4d5',
  },
  menuitem: {
    // color: theme.palette.text.hint,
    color: "#565051",
    '&:hover': {
      color: "#000000"
      // color: "#11284B",
    },
    // borderBottom: '1px solid #d3d4d5',
    marginLeft: '2px',
  },
  menuBtn: {
    position: "absolute",
    left: "151px",
  },
  Selectlabel: {
    marginRight: '70px',
    marginTop: '10px'
  },
  dialogHeader: {
    cursor: "move",
    textAlign: 'center',
    background: '#F2F2F2',
    borderRadius: '8px 8px 0px 0px',
  },
  actionButton: {
    width: '127px',
    height: '40px',
    /* primary-ocean-blue */
    background: '#00B4E5',
    color: '#000000',
    borderRadius: '5px',
    '&:hover': {
      color: '#ffffff',
      background: '#00B4E5',
      // backgroundColor: '#ffffff',
    },
  },
  resetBtn: {
    width: '127px',
    height: '40px',
    /* primary-ocean-blue */
    backgroundColor: '#dd3232',
    borderColor: '#dd3232',
    color: 'white',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
  },
  dialogactions: {
    marginRight: '8px',
  },
  positionRelative: {
    position: "relative",
    // "& table > tbody > tr": {
    "& .dataTable tbody>tr": {
      cursor: "default",
      "&:hover": {
        cursor: "default",
      }
    }
  },
  newAddBtn2: {
    width: "112px",
    height: "32px",
    borderRadius: "8px",
    border: "1px solid #11284B",
    margin: "0px 0px 0px 5px",
    color: "#11284B",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    position: "absolute",
    top: "2px",
    '&:hover': {
      // backgroundColor: "#596270",
      backgroundColor: "#11284b",
      color: "white",
    },
    newAddBtnLink: {
      // color:"#11284B"
      color: "white",
    }
  },
  ///--//
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
    width: 320,
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
    color: "#000000",
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  inputRoot: {
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    // marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "10.5px 12px",
      fontSize: "14px",
      color: "#4A4A4A",
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
    border: "none",
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
    alignItems: 'center',
    textAlign: 'center',
  },
  sClose: {
    color: "#000000",
    backgroundColor: "#A9A9A9",
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
    backgroundColor: "#1E90FF",
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
  lableInput: {
    margin: "0px 0px 5px 3px"
  },
  lableSelectField: {
    margin: "0px 0px -15px 3px",
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginLeft: 3,
  },
  InputField: {
    width: '270px'
  },
  lableInput: {
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginLeft: 3,
  },
  InputDateTime: {
    margin: "5px 5px 0 8px",
    width: 145,
    border: "1px solid #DDDDDD",
    background: "#FFFFFF",
    borderRadius: "3px"
  },
  dialogPaper: {
    // minWidth: "680px",
    maxWidth: '680px',
  },
  dialogContent: {
    minWidth: "500px",
    maxWidth: "500px",
    padding: "20px 10px 10px",
  },
  box: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
  },
  header: {
    flex: "0 1 auto",
    display: "flex",
    cursor: "move"
  },
  content: {
    flex: "1 1 auto",
    // minHeight: "140px",
    // overflow: "auto",
    margin: "0 10px"
  },
  footer: {
    flex: "0 1 40px",
  },
  footerRight: {
    float: "right",
    marginRight: "8px"
  },
  crossButton: {
    position: "relative",
    top: "-12px",
    right: "10px",
    cursor: "pointer",
    padding: "3px",
    zIndex: "2",
    display: "block",
    "& :hover": {
      backgroundColor: "#F4F4F4",
    }
  },
}));
