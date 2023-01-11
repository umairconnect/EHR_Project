import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogContent: {
        minWidth: "650px",
        maxWidth: "650px",
        padding: "20px 10px 10px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex"
    },
    content: {
        flex: "1 1 auto",
        // minHeight: "140px",
        // overflow: "auto",
        marginBottom: "10px"
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
    saveBtn: {
        backgroundColor: '#5D8AB5',
        textTransform: 'none',
        borderColor: '#11284b',
        color: '#FFFFFF',
        marginRight: 8,
        minWidth: 90,
        padding: "6px 16px",
        fontFamily: "Lato",
        '&:hover': {
            backgroundColor: '#5D8AB5',
            borderColor: '#11284b',
            color: '#FFFFFF',
        },
        "&:disabled": {
            backgroundColor: '#5D8AB5',
            borderColor: '#11284b',
            color: '#FFFFFF',
        }
    },
    warningTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        padding: "0px 0px 10px 10px",
        color: "#25282B",
    },
    warningText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        padding: "10px 0px 10px 10px",
        color: "#25282B",
    }
}))