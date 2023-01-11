import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogContent: {
        minWidth: "450px",
        maxWidth: "450px",
        padding: "10px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #E1E1E1"
    },
    content: {
        flex: "1 1 auto",
        minHeight: "140px",
        overflow: "auto",
        padding: "0px 20px",
        marginBottom: "10px",
    },
    footer: {
        flex: "0 1 40px",
        "& a": {
            color: "white",
            textDecoration: "none",
            '&:hover': {
                color: "white",
                textDecoration: "none",
                // backgroundColor: "#596270",
            },
        },
    },
    footerRight: {
        float: "right",
        marginRight: "8px"
    },
    crossButton: {
        position: "relative",
        // top: "-12px",
        right: "20px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    title: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#52575C",
        minWidth: "100%",
        paddingLeft: 15,
    },
    inputArea: {
        padding: "10px 0px 20px",
        minWidth: "100%",
        borderBottom: "1px solid #E1E1E1"
    },
    informationArea: {
        padding: "10px 0px 0px",
        minWidth: "100%",
        "& span": {
            display: "flex"
        },
        "& .MuiFormLabel-root": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            textAlign: "left",
            color: "#25282B",
            lineHeight: "32px",
            minWidth: "80px",
            marginRight: "10px"
        },
        "& .MuiTypography-body1": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            color: "#25282B",
            lineHeight: "32px",
            paddingLeft: "15px"
        }
    }
}))