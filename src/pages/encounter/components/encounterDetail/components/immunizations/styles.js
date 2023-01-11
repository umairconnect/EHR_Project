import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    listTitle:{
        color:"#25282B",
        //color:"rgba(0, 0, 0, 0.26)",
        fontSize:"16px",
        fontFamily:"Lato",
        lineHeight:"16px",
        fontWeight:"bold",
        padding:"0px 0px 20px 0px",
        "& span":{
            float:"left",
        }
    },
    addNew: {
        marginLeft: 15,
        cursor: "pointer"
    },
    editBtn:{
        marginLeft:15,
        cursor:"pointer",
        "& img":{
            width:"16px",
            height:"16px"
        },
    },
    listSubChild:{
        paddingLeft:20
    },
    listSubTitle:{
        color:"#25282B",
        //color:"rgba(0, 0, 0, 0.26)",
        fontSize:"14px",
        fontFamily:"Lato",
        lineHeight:"16px",
        fontWeight:"bold",
        //margin:"2px 0px 0px 5px",
        margin:"2px 0px 0px 0px"
        // margin:"18px 0 8px 0"
    },
    treeView:{
        margin: 0,
        padding: 0,
        listStyle: "none",
        paddingLeft: "7px",
        // marginBottom: "5px",
        marginBottom: "20px",
        "& li":{
            margin: 0,
            outline: 0,
            padding: 0,
            listStyle: "none",
            // marginTop: 4,
            cursor:"pointer",
            "& :hover":{
                color:"#00B4E5",
            },
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
            fill: "#5D8AB5",
            fill:"rgba(0, 0, 0, 0.26)",
            fontSize: "20px",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
        },
    },
    treeLabel:{
        color: "#5D8AB5",
        //color:"rgba(0, 0, 0, 0.26)",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
        cursor:"pointer",
    },
    DistreeLabel:{
        color: "#52575C",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
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
    noRecord:{
        color: "#5D8AB5",
        // color:"rgba(0, 0, 0, 0.26)",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop:"5px",
        paddingLeft: "20px",
        marginBottom: "20px",

    },
    DisnoRecord:{
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop:"5px",
        paddingLeft: "20px",
        marginBottom: "20px",
    },
    subTitleArea:{
        display:"flex",
        marginTop:"10px"
    },
    refusedSubTitleArea:{
        display:"flex",
        marginTop:"10px 0px"
    },
    collapseIconSpan:{
        cursor:"pointer",
        margin:"-3px -8px 0px -10px"
    },
    administratedTitleArea:{
        marginTop:"7px",
        color:"#25282B",
        padding:"0px 0px 2px 0px",
        fontSize:"14px",
        fontFamily:"Lato",
        fontWeight:"bold",
    },
    titleArea:{
        marginTop:"5px",
        color:"#25282B",
        padding:0,
        fontSize:"14px",
        fontFamily:"Lato",
        fontWeight:"bold",
    },
    collapseIconSpan:{
        cursor:"pointer",
        margin:"-2px 0px 0px -5px",
        float:"left"
        // margin:"-3px -8px 0px -10px"
    }
}));
