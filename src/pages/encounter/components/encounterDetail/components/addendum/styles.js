import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    listTitle: {
        color: "#25282B",
        fontSize: "16px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        padding: "0px 0px 20px 0px",
        "& span": {
            float: "left",
        }
    },
    addNew: {
        marginLeft: 15,
        cursor: "pointer"
    },
    treeView: {
        margin: 0,
        padding: 0,
        listStyle: "none",
        // paddingLeft: "7px",
        // marginTop: 7,
        marginBottom: "20px",
        "& li": {
            cursor: "pointer",
            marginTop: "7px",
            margin: 0,
            outline: 0,
            padding: 0,
            listStyle: "none",
            padding: "7px",
            border: "1px solid #E1E1E1",
            "&:hover": {
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            },
            "& a": {
                margin: 0,
                paddingLeft: "4px"
            }
        },
    },
    treeContent: {
        width: "100%",
        display: "block",
        alignItems: "center",
    },
    treeIcon: {
        width: 15,
        display: "flex",
        flexShrink: 0,
        marginRight: 4,
        justifyContent: 'center',
        "& SVG": {
            fill: "#00B4E5",
            fontSize: "22",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
        },
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
        },
    },
    treeLabel: {
        color: "#5D8AB5",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
    },
    DistreeLabel: {
        color: "#52575C",
        fontSize: 14,
        fontFamily: "Lato",
        width: "88%",
        position: "relative",
        paddingLeft: 4,
        lineHeight: "24px",
        wordWrap: "break-word",
        maxWidth: "410px"
    },
    DistreeLabelDate: {
        color: "#52575C",
        fontSize: 14,
        fontFamily: "Lato",
        width: "70%",
        position: "relative",
        paddingLeft: 4,
        lineHeight: "24px"
    },
    noRecord: {
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop: "10px",
        paddingLeft: "20px",
        marginBottom: "20px",

    },
    DisnoRecord: {
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop: "10px",
        paddingLeft: "20px",
        marginBottom: "20px",
    },
    boldHeading: {
        fontFamily: "Lato",
        color: "#000000",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "24px",
        minWidth: "95px"
    },
    editBtn: {
        marginLeft: 15,
        cursor: "pointer",
        "& img": {
            width: "16px",
            height: "16px"
        },
    },

}))