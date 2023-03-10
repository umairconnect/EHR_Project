import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    listTitle: {
        color: "#25282B",
        color: "rgba(0, 0, 0, 0.26)",
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
        // margin: 0,        
        padding: 0,
        listStyle: "none",
        // paddingLeft: "7px",
        // marginBottom: "20px",
        margin: "10px 0px 20px 0px",
        border: "1px solid #E1E1E1",
        borderRadius: "4px",
        maxWidth: "360px",
        "& li": {
            // margin: 0,
            // outline: 0,
            // padding: 0,
            // listStyle: "none",
            // marginTop: 7,
            //cursor:"pointer",
            margin: 0,
            outline: 0,
            padding: "5px 7px 5px 10px",
            listStyle: "none",
            borderBottom: "1px solid #E1E1E1",
            cursor: "pointer",
        },
        "& li:last-child": {
            borderBottom: "none",
        },
    },
    treeContent: {
        width: "100%",
        display: "flex",
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
        color: "rgba(0, 0, 0, 0.26)",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
    },
    DistreeLabel: {
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        display: "flex",
        // paddingLeft: 4,
        //
        // paddingRight:10,
        // fontWeight:"bold",
        "& div": {
            width: "50%"
        },
        "& span": {
            float: "right",
            textAlign: "left",
            width: "50%",
            fontWeight: "normal",
        },
    },
    noRecord: {
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop: "0px",
        display: 'inline-block',
        paddingLeft: "20px",
        marginBottom: "20px",

    },
    DisnoRecord: {
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop: "0px",
        display: 'inline-block',
        paddingLeft: "20px",
        marginBottom: "20px",
    },
    listHeadingLabel: {
        // color: "#52575C",
        color: "#000",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        padding: "5px 7px 5px 10px",
        fontWeight: 800,
        borderBottom: "1px solid #E1E1E1",
        display: "flex",
        backgroundColor: "#fafafa",
        "& div": {
            width: "50%"
        },
        "& span": {
            float: "right",
            fontWeight: "normal",
            // color: "#52575C",
            color: "#000",
            fontSize: 12,
            fontFamily: "Lato",
            paddingLeft: 4,
            paddingRight: 20,
            fontWeight: 800,
        },
    },
}));
