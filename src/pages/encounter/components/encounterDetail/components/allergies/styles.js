import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    listTitle:{
        color:"#25282B",
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
        // marginTop: 7,
        marginBottom: "10px",
        "& li":{
            margin: 0,
            outline: 0,
            padding: 0,
            listStyle: "none",
            cursor:"pointer",
            // "& :hover":{
            //     color:"#00B4E5",
            // },
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
    treeLabel:{
        color: "#5D8AB5",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
    },
    DistreeLabel:{
        color: "#52575C",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,             
    },
    noRecord:{
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        // marginTop:"10px",
        marginTop:"5px",
        paddingLeft: "20px",
        // marginBottom: "10px",
        marginBottom: "20px",

    },
    DisnoRecord:{
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        // marginTop:"10px",
        marginTop:"5px",
        paddingLeft: "20px",
        marginBottom: "20px",  
    },
    listSubChild:{
        padding:"0px 0px 0px 20px"
    },
    listSubChildOpen:{
        padding:"0px 0px 20px 20px"
    },
    listSubTitle:{
        color:"#25282B",
        //color:"rgba(0, 0, 0, 0.26)",
        fontSize:"14px",
        fontFamily:"Lato",
        lineHeight:"16px",
        fontWeight:"bold",
        // margin:"2px 0px 0px 5px",
        padding:"0px 0px 20px 5px",
        // margin:"18px 0 8px 0"
    },
    // activeTitleArea:{
    //     display:"flex",
    //     marginTop:"10px",
    //     color:"#25282B",
    //     //color:"rgba(0, 0, 0, 0.26)",
    //     fontSize:"14px",
    //     fontFamily:"Lato",
    //     lineHeight:"16px",
    //     fontWeight:"bold",
    //     // margin:"2px 0px 0px 5px",
    //     // padding:"0px 0px 20px 5px",
    // },
    activeTitleArea:{
        marginTop:"7px",
        color:"#25282B",
        padding:"0px 0px 2px 0px",
        fontSize:"14px",
        fontFamily:"Lato",
        fontWeight:"bold",
    },
    // inActiveTitleArea:{
    //     display:"flex",
    //     // margin:"10px 0px",
    //     marginTop:"5px",
    //     color:"#25282B",
    //     //color:"rgba(0, 0, 0, 0.26)",
    //     fontSize:"14px",
    //     fontFamily:"Lato",
    //     lineHeight:"16px",
    //     fontWeight:"bold",
    //     // margin:"2px 0px 0px 5px",
    //     // padding:"0px 0px 20px 5px",
    // },
    inActiveTitleArea:{
        marginTop:"5px",
        color:"#25282B",
        padding:0,
        fontSize:"14px",
        fontFamily:"Lato",
        fontWeight:"bold",
    },
    // collapseIconSpan:{
    //     cursor:"pointer",
    //     margin:"-5px 0px 0px -10px"
    //     // margin:"-3px -8px 0px -10px"
    // }
    collapseIconSpan:{
        cursor:"pointer",
        margin:"-2px 0px 0px -5px",
        float:"left"
        // margin:"-3px -8px 0px -10px"
    },
    tickArrow: {
        color: 'green',
    }
}));
