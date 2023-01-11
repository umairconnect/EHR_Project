import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({

    ePrescriptionMainForm: {
        margin: 10,
    },
    noteTextArea: {
        padding: "10px 0px 15px 20px"
    },
    noteText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "21px",
        color: "#52575C",
        "& a": {

        }
    },
    subTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "21px",
        color: "#25282B",
    },
    innerArea: {
        paddingLeft: "20px",
        display: "block"
    },
    divAlignemnt: {
        padding: "15px 0px"
    },
    treeContent: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    DistreeIcon: {
        width: 15,
        display: "flex",
        flexShrink: 0,
        marginRight: 4,
        justifyContent: 'center',
        "& SVG": {
            fill: "#52575C",
            fontSize: "22",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
            color: "#EB5757",
        },
    },
    DistreeLabel: {
        color: "#52575C",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
        lineHeight: "28px",
    },
    infoArea: {
        padding: "8px 0px"
    },
    infotreeIcon: {
        width: 15,
        display: "flex",
        flexShrink: 0,
        marginRight: 4,
        justifyContent: 'center',
        "& SVG": {
            fontSize: "22",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
            color: "#BF710F",
        },
    },
    // WarningIcon:{
    //     color:"#EB5757",
    //     width:"80px",
    //     height:"80px",
    // },
}));