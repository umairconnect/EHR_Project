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
    wanringText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#52575C",
        margin: "15px 0px 5px",
    },
    lableInput: {
        paddingRight: 14,
        fontFamily: "Lato",
        color: "#52575C;",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "2%",
        textAlign: "left"
    },
    mandatorColor: {
        color: "#ff0000",
        fontSize: 16,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        lineHeight: "10px"
    },
}))