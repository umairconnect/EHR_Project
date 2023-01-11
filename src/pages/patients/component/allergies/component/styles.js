import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "650px"
    },
    dialogTitle: {
        cursor: "move"
    },
    lableInput: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
    },
    customLableInput: {
        lineHeight: "20px",
        paddingRight: 5,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "20px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "20px",
            paddingRight: 5,
        },
    },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    header: {
        flex: "0 1 auto",
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "23px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    }
}));