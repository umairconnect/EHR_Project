
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "600px",
        maxWidth: "600px",
    },
    dialogTitle: {
        textAlign: 'center',
        background: '#FFF',
        borderRadius: '8px 8px 0px 0px',
        padding: "7px 24px 0px 24px",
    },
    UpdateIcon: {
        color: "#BF710F",
        width: "80px",
        height: "80px",
    },
    dialogContent: {
        textAlign: "center"
    },
    dialogMessage: {
        color: "#000000",
        fontFamily: "Lato",
        textAlign: "center",
        fontSize: "18px",
        marginBottom: "15px"
    },

    dialogactions: {
        justifyContent: "center",
    },
    formLabelTitle: {
        lineHeight: "21px",
        paddingRight: 15,
        textAlign: "right",
        fontWeight: "bold",
        fontFamily: "Lato",
        color: "#3E3E3E",
        fontSize: 14,
        marginBottom: 5,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
    },
    lableInput: {
        lineHeight: "18px",
        paddingRight: 15,
        fontFamily: "Lato",
        fontWeight: 400,
        color: "#25282B",
        fontSize: 14,
        marginBottom: 5,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
    },
    message: {
        fontSize: 12,
        fontWeight: 400,
        color: "#000000",
        fontStyle: "italic",
        paddingRight: 15,
        fontFamily: "Lato",
        fontWeight: 400,
        lineHeight: "14px",
        textAlign: 'left !important'
    },
    warningMessage: {
        marginTop: "15px",
        fontSize: 11,
        lineHeight: "13px",
        fontWeight: "normal",
        color: "#565656",
        fontStyle: "normal",
        paddingRight: 15,
        fontFamily: "Lato",
        fontWeight: 400,
    },
    customGrid: {
        marginBottom: "20px"
    }
}))