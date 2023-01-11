import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "650px"
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
        cursor: "move",
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
    },
    thumbIcon: {
        //float: "left",
        marginLeft: "90px",
        cursor: "pointer",
        //margin:"4px ​0px 0px 90px",
        color: "#27AE60",
        "& img": {
            color: "#27AE60",
            width: "18px",
            height: "18px",
        }
    },
    historyLabel: {
        float: "right",
        fontFamily: "Lato",
        fontStyle: "italic",
        fontWeight: "normal",
        fontSize: '14px',
        marginTop: "5px",
        cursor: "pointer",
        textDecoration: "underline",
        color: "#56CCF2",
    },
    submitLabel: {
        margin: "8px 0px 0px 0px",
        position: "absolute",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: '16px',
        color: "#27AE60",
    },
    labelInput: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
    },
    orderList: {
        margin: "5px 10px 10px 40px",
        padding: "10px",
        // backgroundColor: "#E8E8E8",
        listStyle: "none",
        "& li": {
            position: "relative",
            // height: "40px",
            fontSize: "14px",
            color: "#000",
            fontWeight: 700,
            lineHeight: "40px",
            margin: 0,
            outline: 0,
            listStyle: "none",
            marginTop: 2,
            borderRadius: "0px",
            backgroundColor: "#E8E8E8",
            marginBottom: "8px",
            padding: "5px 10px",
            "& div": {
                paddingLeft: "20px",
                fontWeight: 400,
                fontSize: '12px',
            }
        },
    },
    formLabel: {
        margin: "8px 0px 0px 0px",
        fontFamily: "Lato",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "17px",
        textAlign: "left",
        color: "#25282B",
        marginLeft: "45px"

    },
    formLabelBold: {
        margin: "8px 0px 0px 0px",
        fontFamily: "Lato",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "bold",
        lineHeight: "17px",
        textAlign: "left",
        color: "#25282B",
        marginLeft: "45px"

    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        cursor: "move",
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "575px",
        minHeight: "575px",
        overflow: "initial !important",
        marginBottom: "10px"
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        // marginRight:"-8px"
    },
    testOrder: {
        minWidth: "90%"
    }
}));