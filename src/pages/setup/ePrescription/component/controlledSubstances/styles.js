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
    signUpArea: {
        background: "#FFFFFF",
        border: "1px solid #17C13B",
        boxSizing: "border-box",
        borderRadius: "4px",
        padding: "15px",
        width: "51%",
        margin: "5px 0px 10px",
        display: "flex"
    },
    signUpTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        lineHeight: "22px",
        color: "#6AED85",
        margin: "5px 20px 0px 10px"
    },
    signUpText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#52575C",
        margin: "8px 0px 0px 10px"
    },
    signUpNoteText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#52575C",
        margin: "15px 0px 0px 15px"
    }
}));