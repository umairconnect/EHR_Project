import {
  makeStyles
} from "@material-ui/styles";

const drawerWidth = 193;

export default makeStyles(theme => ({
  dialogPaper: {
    minWidth: "520px",
    maxWidth: '520px',
  },
  allowAccessPaper: {
    minWidth: "60%",
    maxWidth: '60%',
  },
  allowAccessContent: {
    padding: "20px 20px 10px",
  },
  dialogContent: {
    minWidth: "520px",
    maxWidth: '520px',
    padding: "20px 20px 10px",
  },
  box: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
  },
  header: {
    flex: "0 1 auto",
    display: "flex",
    cursor: "pointer"
  },
  content: {
    flex: "1 1 auto",
    maxHeight: "580px",

    // overflow: "auto",
    marginBottom: "10px"
  },
  footer: {
    flex: "0 1 40px",
  },
  footerRight: {
    float: "right",
    marginRight: "-8px"
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
  infoIcon: {
    width: "80px",
    margin: "15px auto",
  },
  paragraf: {
    fontSize: "16px",
    marginBottom: "23px !important",
    margin: "auto",
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    zIndex: 1,
    width: drawerWidth,
    backgroundColor: "#11284B",
    position: "unset",
    overflow: "unset",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  drawerClose: {
    zIndex: "1",
    position: "unset",
    overflow: "unset",
    backgroundColor: "#11284B",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),


    overflowX: "hidden",
    // width: theme.spacing(7) + 40,
    width: 50,
    // [theme.breakpoints.down("sm")]: {
    //   width: drawerWidth,
    // },
    '& .MuiBadge-badge': {
      fontSize: "8px",
      height: "14px",
      padding: "0 2px",
      marginRight: "-10px"
    },
  },
  toolbar: {

    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("lg")]: {

      minHeight: "55px",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  /* sidebarList: {
    marginTop: theme.spacing(6),
  }, */
  mobileBackButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: 18,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(0.625),
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  list: {
    width: "193px",
    position: "fixed",
    height: "-webkit-fill-available",
    top: "55px",
    '& .rc-scrollbars-track': {
      width: '6px !important',
    },
    '& .rc-scrollbars-thumb': {
      backgroundColor: 'rgba(176, 176, 176, 0.48) !important',
    }
  },

  CloseMenuList: {
    width: "inherit",
    position: "fixed",
    height: "-webkit-fill-available",
    top: "55px",
    '& .rc-scrollbars-track': {
      width: '0px !important',
    },
  },
  
  help: {
   
    "& a": {
      width: '100%',
      display: 'flex',
      position: 'relative',
      boxSizing: 'border-box',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textDecoration: 'none',
      color: 'white', 
      fontSize: '16px',
      paddingTop: '7px',
      paddingBottom: '7px',
      borderBottom: "1px solid white",
      "&:hover": {
        color: 'white',
        background: '#596270 !important',
      }
    },
    "& hover": {
      backgroundColor: '#596270',
    
    },
    "& img": {
      padding: '6px 13px',
    }
  },

}));
