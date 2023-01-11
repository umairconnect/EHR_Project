import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    eraStatusPopover: {
        fontFamily: "Lato",
        "& .ant-popover-inner": {
            backgroundColor: "transparent",
            boxShadow: "none",
        },
        "& .ant-popover-arrow": {
            display: "none"
        }
    },
    eraStatusPaper: {
        zIndex: "999",
        fontFamily: "Lato",
        boxShadow: "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
        padding: "10px 10px 0px",
        minWidth: "500px",
        maxWidth: "500px",
        // minHeight: "350px",
        display: "flex",
        flexFlow: "column",
        // height: "100%",
        borderRadius: "15px"
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
        // maxHeight: "495px",
        // minHeight: "200px",
        minHeight: "110px",
        overflow: "auto",
        // marginBottom: "10px"
    },
    footer: {
        flex: "0 1 40px",
        borderTop: "1px solid #E1E1E1"
    },
    footerRight: {
        float: "right",
        margin: "8px"
        // marginRight: "-8px"
    },
    crossButton: {
        position: "relative",
        // top: "-12px",
        // right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    headerTypeIcon: {

    },
    statusTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#000000",
        minWidth: "90%",
    },
    stepperBtn: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#1054AE",
        cursor: "pointer"
    },
    textTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "32px",
        color: "#000000",
        paddingRight: 15,
    },
    textValue: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "32px",
        color: "#000000",
        paddingLeft: 5,

    },
    fullAppliedIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "green",
        cursor: "pointer"
    },
    warningIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "#FB9600",
        cursor: "pointer",
    },
    notificationsIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "#11284B",
        cursor: "pointer"
    },
    infoIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "#1054AE",
        cursor: "pointer"
    },
    errorIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "#FD5F5F",
        cursor: "pointer"
    },
    warningNote: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "18px",
        color: "#000000",
        margin: 0,
        paddingBottom: "10px"
    },
    applyBtn: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "20px",
        color: "#00B4E5",
        textDecoration: "underline",
        cursor: "pointer"
    },
    removeBtn: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "20px",
        color: "#FD5F5F",
        textDecoration: "underline",
        cursor: "pointer"
    }
}))