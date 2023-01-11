import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  loader: {
    width: "42px",
  },
  logotype: {
    color: "#565656",
    marginLeft: 20,
    marginRight: 42,
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  noNotice: {
    margin: 0,
    textAlign: 'center',
    padding: '15px 10px 10px 0px',
    fontSize: '15px',
    color: '#565676',
  },
  appBar: {
    width: "100vw",
    backgroundColor: "white",
    border: "1px solid #EDE9E9",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: "60px",
  },
  logotypeImage: {
    width: 130,
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
    paddingLeft: 50,
  },
  search: {
    position: "relative",
    borderRadius: 5,
    height: 56,
    paddingLeft: theme.spacing(3.5),
    width: 36,
    backgroundColor: "white",
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "white",
    },
  },
  searchFocused: {
    backgroundColor: "white",
    border: "1px solid #DDDDDD",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 296,
    },
  },
  searchIcon: {
    width: 36,
    left: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("right"),
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchIconOpened: {
    left: 7,
  },
  inputRoot: {
    color: "#5D8AB5",
    width: "100%",
  },
  inputInput: {
    height: 53,
    padding: 0,
    paddingLeft: 19,
    width: "100%",
  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenu: {
    // width:"250px",
    marginTop: theme.spacing(7),
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenuItem: {
    paddingLeft: "8px",
    marginLeft: "5px",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
      // color: "white",
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  centerLine: {
    textAlign: "right",
  },
  messageLength: {
    backgroundColor: "#5d8ab5",
    width: 22,
    height: 22,
    borderRadius: "50%",
    color: "white",
    fontSize: 12,
    display: "inline-block",
    lineHeight: "22px",
    marginLeft: 10,
    textAlign: "center",
  },
  locationMenuButton: {
    borderRadius: 5,
    display: "inline-block",
    backgroundColor: "#F3F3F3",
    height: "36px",
    padding: "2px 5px",
    width: 250,
    marginTop: 7,
    cursor: "default",
  },
  MenulocationIcon: {
    float: "left",
    marginTop: "5px",
  },
  locationIcon: {
    float: "left",
    marginTop: "3px",
  },
  locationText: {
    float: "left",
    width: 170,
    margin: "4px 8px",
    textAlign: "left",
    color: "#565656",
    fontSize: 12,
  },
  downArrowIcon: {
    marginTop: "3px",
    float: "left",
  },
  headerIcon: {
    fontSize: 28,
    // color: "rgba(255, 255, 255, 0.35)",
    color: "#11284B",
  },
  headerIconCollapse: {
    color: "#11284B",
  },
  profileMenu: {
    minWidth: 265,
  },
  userBox: {
    display: "flex",
    marginTop: 4,
    float: "right",
    height: "44px",
  },
  userProfile: {
    flexGrow: 1,
  },
  user: {
    paddingLeft: 10,
    display: "flex",
    flexDirection: "column",
    maxWidth: "200px",
  },
  userName: {
    color: "#565656",
    fontWeight: "normal",
    letterSpacing: 0.44,
    fontSize: 16,
    lineHeight: "24px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  userDetails: {
    letterSpacing: 0.44,
    color: "#9C9C9C",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: "16px",
  },
  userDp: {
    width: 44,
    borderRadius: "50%",
    border: "1px solid #11284b",
  },
  locationButton: {
    color: "#565656",
    fontSize: "12px",
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  headerMenuList: {
    paddingTop: 0,
  },
  taskMenu: {
    display: "flex",
    flexDirection: "column",
  },
  taskListTitle: {
    backgroundColor: "#11284B",
    color: "white",
    fontSize: "13px !important",
    padding: "19px 15px",
    fontFamily: "Lato, sans-serif",
  },
  textColor: {
    color: "#303E67",
  },
  iconBg: {
    borderRadius: "50%",
    backgroundColor: "#F0F0F0",
    width: "39px",
    height: "39px",
    textAlign: "center",
    paddingTop: "5px",
  },
  tIconBg: {
    borderRadius: "50%",
    backgroundColor: "#F0F0F0",
    width: "39px",
    height: "39px",
    textAlign: "center",
    paddingTop: "7px",
  },
  profileMenuItem: {
    color: "#565656",
    textDecoration: "none",
    width: "100%",
    "&:hover": {
      color: "#11284B",
    },
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    float: "left",
    // color: theme.palette.text.hint,
    // '&:hover': {
    //   color: "#11284B",
    // }
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0,
    width: "100%",
  },
  sendMessageButton: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: "none",
  },
  sendButtonIcon: {
    marginLeft: theme.spacing(2),
  },
  purchaseBtn: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    marginRight: theme.spacing(3),
  },
  notIcon: {},
  TaskIcon: {
    width: 18,
  },
  LogoutIcon: {},
  locationMenuOptions: {
    width: "250px",
    padding: "0px 3px",
  },
  noticeViewAll: {
    width: '100%',
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '14px',
    color: '#00b4e9',
    borderTop: '1px solid #ececec',
    paddingTop: '6px',
    margin: 0,
    cursor: 'pointer',
    "& hover": {
      backgroundColor: '#F3F5FF',
    }
  }
}));
