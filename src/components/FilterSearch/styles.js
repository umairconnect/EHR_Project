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
    width: 240,
    backgroundColor: "white",
    border: "1px solid #DDDDDD",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "white",
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
  },
  inputRoot: {
    color: "#000000",
    width: "100%",
  },
  inputInput: {
    height: 39,
    padding: 0,
    paddingLeft: 10,
    width: "100%",
    fontSize: "12px"
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
  footerButton: {
    borderTop: "1px solid #DDDDDD",
    paddingTop: 16,
    margin: "16px 9px 16px 9px",
    width: 220,
    textAlign: 'center',
  },
  sClose: {
    color: "#484848",
    border: "1px solid #DDDDDD",
    width: 63,
    height: 30,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: "#fd5f5f",
      color: "white"
    },
  },
  sApply: {
    backgroundColor: "#00b4e5",
    color: "white",
    width: 63,
    height: 30,
    fontSize: 12,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: "#596270",
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
}));
