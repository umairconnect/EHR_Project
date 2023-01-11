import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    loader: {
        display: "block",
        margin: "0 auto",
        padding: "10% 0",
        width: "50px"
    },
    footerBtn: {
        padding: " 0px 0 7px",
        // position: "fixed",
        bottom: "0px",
        width: "82%",
        display: "flex",
        zIndex: 3,
        paddingLeft: "16.6%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            paddingLeft: "16.6%",
        }
    },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    label: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 17,
        marginBottom: 13,
        paddingTop: "10px",
        minHeight: "20px",
        display: "inline-block",
        fontWeight: "500"

    },
    labelSub: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 6,
        paddingTop: "6px",
        minHeight: "20px",
        display: "inline-block",
        fontWeight: "500"
    },
    contentP: {
        color: "#25282B",
        fontSize: 14,
        paddingTop: "0px",
        marginTop: 0,
        minHeight: "20px",
        display: "block",
        fontWeight: "400",
        "& span": {
            display: "inline-block",
            paddingLeft: 10
        }
    },
    titleP: {
        color: "#25282B",
        fontSize: 14,
        paddingTop: "0px",
        paddingLeft: "30px",
        marginTop: 0,
        minHeight: "20px",
        display: "block",
        fontWeight: "600"
    },
    contentP1: {
        color: "#25282B",
        fontSize: 14,
        paddingTop: "0px",
        marginTop: 0,
        paddingLeft: "60px",
        minHeight: "20px",
        display: "block",
        fontWeight: "400"
    },
    contentP2: {
        color: "#25282B",
        fontSize: 14,
        paddingTop: "0px",
        marginTop: 0,
        paddingLeft: "90px",
        minHeight: "20px",
        display: "block",
        fontWeight: "400"
    },
    active: {
        color: "#439A55"
    },
    formAlignment: {
        marginBottom: "-15px"
    },
    bg: {
        backgroundColor: "#FAFAFA",
        "& label": {
            paddingTop: "0 !important",
            marginBottom: "0 !important",
            minHeight: "22px !important",
            lineHeight: "20px !important"
        }
    },
    p10: {
        paddingTop: "13px",
        marginTop: "-15px"
    },
    pRelative: {
        position: "relative",
        width: "100%"
    },
    coverageLinkList: {
        lineHeight: "36px",
    },
    coverageLink: {
        display: "inline-block",
        color: "#00B4E5",
        fontSize: 12,
        lineHeight: "30px",
        cursor: "pointer",
        "&:hover": {
            color: "#11284b"
        }
    },
    breakLine: {
        display: "inline-block",
        padding: "0 12px"
    },
    // hideShow: {
    //     position: "absolute",
    //     right: 0,
    //     top: -3,
    //     fontWeight: "600",
    //     color: "#00B4E5",
    //     cursor: "pointer",
    //     padding: "5px 10px",
    //     backgroundColor: "#fff",
    //     zIndex: "999",
    //     minWidth: 55
    // },
    labelText: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "0",
        minHeight: "40px",
        textAlign: "right"
    },
    colBorder: {
        border: "1px solid #E1E1E1",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "15px"
    },
    collapseHeader: {
        borderRadius: "8px 8px 0 0",
        backgroundColor: "#fafafa",
        lineHeight: "41px",
        width: "100%",
        color: " #25282B",
        fontSize: "14px",
        padding: "0 15px",
        display: "block",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#E8E8E8",
        }

    },
    collapseArea: {
        width: "100%"
    },
    accordion: {
        width: "100%",
        "& .MuiButtonBase-root": {
            backgroundColor: "#fafafa",
            color: " #25282B",
            fontSize: "14px",
            "&:hover": {
                backgroundColor: "#E8E8E8",
            }
        },
        "& .MuiAccordionDetails-root": {
            display: "block",
            padding: "0"
        }
    }
}));
