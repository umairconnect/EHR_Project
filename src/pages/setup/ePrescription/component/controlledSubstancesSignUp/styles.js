import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    noteText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#25282B",
        marginBottom: 15,
    },
    stepHeading: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#52575C",
    },
    headingArea: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        boxSizing: "border-box",
        borderRadius: "4px",
        padding: "15px",
        width: "51%",
        margin: "5px 0px 10px"
    },
    clockIcon: {
        position: "relative",
        color: "#fff",
        background: "#C4C4C4",
        fontSize: "21px",
        cursor: "pointer",
        borderRadius: "25px",
        float: "right"
    },
    clockIconChecked: {
        position: "relative",
        color: "#fff",
        background: "#6AED85",
        fontSize: "21px",
        cursor: "pointer",
        borderRadius: "25px",
        float: "right"
    },
    confirmArea: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        boxSizing: "border-box",
        borderRadius: "4px",
        padding: "15px",
        width: "51%",
        margin: "5px 0px 10px"
    },
    confirmTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "22px",
        color: "#52575C",
        margin: "5px 0px 10px"
    },
    confirmText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "22px",
        color: "#52575C",
        padding: "5px 0px 20px"
    },
    DialogContent: {
        // minWidth: "700px",
        //display: "flex",
        padding: "20px 10px 20px 10px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "450px",
        // minHeight: "170px",
        overflow: "auto",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerCenter: {
        float: "center",
        textAlign: "center"
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    inputArea: {
        width: "100%",
        margin: '2% 10% 5%'
    }
}));