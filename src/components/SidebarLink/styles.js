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
  linkActive: {
    backgroundColor: "#596270",
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#11284B",
    },
  },
  linkIcon: {
    color: "white",
    //color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
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
    paddingLeft: theme.spacing(2) + 30,
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
}));
