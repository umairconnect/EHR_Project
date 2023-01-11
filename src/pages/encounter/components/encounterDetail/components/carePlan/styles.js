import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    listTitle:{
        color:"#25282B",
        color:"rgba(0, 0, 0, 0.26)",
        fontSize:"16px",
        fontFamily:"Lato",
        lineHeight:"16px",
        fontWeight:"bold",
        padding:"0px 0px 20px 0px",
        "& span":{
            float:"left",
        }
    },
    addNew:{
        marginLeft:15,
        cursor:"pointer"
    },
    treeView:{
        margin: 0,
        padding: 0,
        listStyle: "none",
        paddingLeft: "7px",
        marginBottom: "20px",
        "& li":{
            margin: 0,
            outline: 0,
            padding: 0,
            listStyle: "none",
            marginTop: 7,
            //cursor:"pointer",
        },
    },
    treeContent:{
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    treeIcon:{
        width: 15,
        display: "flex",
        flexShrink: 0,
        marginRight: 4,
        justifyContent: 'center',
        "& SVG":{
            fill: "#00B4E5",
            fontSize: "22",
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
        "& SVG":{
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
        cursor: "pointer",
    },
    DistreeLabel: {
        color: "#52575C",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
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
}));
