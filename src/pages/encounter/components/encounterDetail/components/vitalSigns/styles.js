import { makeStyles } from "@material-ui/styles";

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
    editBtn: {
        marginLeft: 15,
        cursor: "pointer",
        "& img": {
            width: "16px",
            height: "16px"
        },
    },
    addNew:{
        marginLeft:15,
        cursor:"pointer"
    },
    listSubChild: {
        paddingLeft: 20
    },
    listSubTitle: {
        color: "#25282B",
        fontSize: "14px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        margin: "18px 0 8px 0"
    },
    treeView: {
        margin:"10px 0 20px 0",
        padding: 0,
        listStyle: "none",
        border:"1px solid #E1E1E1",
        borderRadius:"4px",
        maxWidth:"360px",
        "& li": {
            margin: 0,
            outline: 0,
            padding: "5px 7px 5px 10px",
            listStyle: "none",
            borderBottom: "1px solid #E1E1E1",
            cursor:"pointer",
            
        },
        "& li:last-child":{
            borderBottom:"none",
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
            fontSize: "20px",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
        },
    },
    DistreeIcon:{
        width: 15,
        display: "flex",
        flexShrink: 0,
        marginRight: 4,
        justifyContent: 'center',
        "& SVG": {
            fill: "#52575C",
            fontSize: "20px",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
        },
    },
    treeLabel: {
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
        paddingRight:10,
        fontWeight:"bold",
        "& span":{
            float:"right",
            fontWeight:"normal",
        },
    },
    DistreeLabel:{
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
        paddingRight:10,
        fontWeight:"bold",
        "& span":{
            float:"right",
            fontWeight:"normal",
        },
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
    DisnoRecord:{
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop:"10px",
        paddingLeft: "20px",
        marginBottom: "20px",
    },

}));
