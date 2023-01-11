import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    listTitle: {
        color: "#25282B",
        // color:"rgba(0, 0, 0, 0.26)",
        fontSize: "16px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        padding: "0px 0px 20px 0px",
        "& span": {
            float: "left",
        }
    },
    editBtn: {
        marginLeft: 15,
        cursor: "pointer",
        "& img": {
            width: "16px",
            height: "16px"
        },
    },
    listSubChild: {
        paddingLeft: 20
    },
    listSubTitle: {
        color: "#25282B",
        // color:"rgba(0, 0, 0, 0.26)",
        fontSize: "14px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        margin: "18px 0 8px 0"
    },
    listP: {
        color: "#5D8AB5",
        // color:"rgba(0, 0, 0, 0.26)",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        margin: "0 0 20px 15px",
        lineHeight: "25px",
    },
    dislistSubTitle: {
        olor: "#52575C",
        fontSize: "14px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        margin: "18px 0 8px 0"
    },
    dislistP: {
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        margin: "0 0 20px 0",
        lineHeight: "25px",
    },
    noRecord: {
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop: "10px",
        // paddingLeft: "20px",
        marginBottom: "20px",

    },
    DisnoRecord: {
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop: "10px",
        // paddingLeft: "20px",
        marginBottom: "20px",
    },

}));
