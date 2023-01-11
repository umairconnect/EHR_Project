
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    paper: {
        padding: "12px 50px",
        borderRadius: "10px",
    },
    dialogTitle: {
        textAlign: 'center',
        background: '#FFF',
        borderRadius: '8px 8px 0px 0px',
        padding: "7px 24px 0px 24px",
    },
    ConfirmIcon: {
        color: "#BDBDBD",
        width: "65px",
        height: "65px",
    },
    UpdateIcon: {
        // color:"#BF710F",
        // color: '#11284B',
        color: "#f9a843",
        width: "65px",
        height: "65px",
    },
    SuccessIcon: {
        color: "#6FCF97",
        width: "65px",
        height: "65px",
    },
    WarningIcon: {
        color: "#EB5757",
        width: "65px",
        height: "65px",
    },
    dialogContent: {
        textAlign: "center",
        padding: "8px 0px"
    },
    dialogMessage: {
        color: "#000000",
        fontFamily: "Lato",
        textAlign: "center",
    },

    dialogactions: {
        justifyContent: "center",
    },
    actionButton: {
        width: '127px',
        height: '40px',
        background: '#00B4E5',
        color: '#000000',
        borderRadius: '5px',
        '&:hover': {
            color: '#ffffff',
            background: '#00B4E5',
        }
    },
}))