import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    paddingLeft: 0,
    paddingRight: 0,
    borderBottom: "1px solid white",
    color: "white",
    "&:hover, &:focus": {
      backgroundColor: "#596270",
    },
  },
  activeLink: {
    color: "#7e7ef6",
    paddingLeft: "0",
    display: "block",
    textDecoration: "auto",
    fontSize: "14px",
    lineHeight: 2,
    width: "100%",
    whiteSpace: "break-spaces",
    cursor: "pointer",
    borderBottom: "1px solid #ffffff47",
    width: "73%",
    marginLeft: "auto",
  },
  subChildLink: {
    color: "white",
    paddingLeft: "0",
    display: "block",
    textDecoration: "auto",
    fontSize: "14px",
    lineHeight: 2,
    width: "100%",
    whiteSpace: "break-spaces",
    cursor: "pointer",
    borderBottom: "1px solid #ffffff47",
    width: "73%",
    marginLeft: "auto",
    "& hover": {
      color: "white !important",
    }
  },
  linkBadge: {
    marginRight: 5,
    "& span": {
      backgroundColor: "#FF5C93",
    }
  },
  linkActive: {
    backgroundColor: "#596270",
  },
  linkNested: {
    fontSize: "14px",
    border: "none",
    padding: "3px 3px 3px 0px",
    whiteSpace: "initial",
    alignItems: "flex-start",
    borderBottom: "1px solid #53647d",
    marginLeft: "auto",
    width: "90%",

    "&:hover, &:focus": {
      backgroundColor: "#596270",
    },
    '& $linkText': {
      fontSize: 14,
    },
    '& $linkIcon': {
      minWidth: 33,
      paddingTop: "8px",
    }
  },
  linkIcon: {
    color: "white",
    //color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    height: 24,
    display: "flex",
    justifyContent: "center",
    minWidth: 48,
  },
  linkIconActive: {
    // color: "#00B4E5",
    color: "white",
  },
  linkText: {
    fontFamily: "Lato",
    padding: 0,
    color: "white",
    // color: theme.palette.text.secondary + "CC",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
  },
  linkTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    borderBottom: "1px solid white",
    padding: "0px",
    marginTop: "0px",
    backgroundColor: "#11284B",
    position: "relative",
    top: "-1px",
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
  eIcon: {
    color: "#fff",
    marginRight: 7
  },
  subMenu: {
    "& .MuiMenu-paper": {
      backgroundColor: "#11284B",
      boxShadow: "none",
      "& $linkNested": {
        padding: "3px 12px 3px 12px",
      },
      "& $linkTextHidden": {
        opacity: "1"
      }
    }
  },

    list: {
    '& .rc-scrollbars-track': {
      width: '6px !important',
    },
    '& .rc-scrollbars-thumb': {
      backgroundColor: 'rgba(176, 176, 176, 0.48) !important',
    }
  }
}));
