import { NoEncryption } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({

    tablelayout: {
        width: "100%",
        textAlign: "left",
        marginBottom: "10px",
        border: "1px solid #e4e4e4",

        "& th": {
            padding: "5px",
        },
        "& td": {
            padding: "5px",
        },
        "& thead": {
            background: "#F0F0F0",
        }
    },
    dialogPaperMsg: {
        minWidth: "640px",
        maxWidth: '640px',
        padding: "25px 20px",
    },
    dialogPaperCds: {
        minWidth: "500px",
        maxWidth: '500px',
        padding: "25px 20px",
    },

    dialogPaper: {
        minWidth: "840px",
        maxWidth: '840px',
        padding: "25px 20px",
    },
    dialogContent: {
        minWidth: "900px",
        maxWidth: '900px',
        padding: "20px 10px 10px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        //maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
    },
    msgcontent: {
        flex: "1 1 auto",
        maxHeight: "450px",
        overflow: "auto",
        "& h4": {
            paddingRight: "20px",
            textAlign: "right",
            lineHeight: "2",
            fontWeight: "600",
        }
    },

    advContent: {
        marginBottom: "0px",
        "& p": {
            fontSize: "15px",
            color: "#5D8AB5",
            lineHeight: "1.6",
        },
        "& span": {
            fontSize: "14px",
        }
    },

    impleadvContent: {
        marginBottom: "0px",
        "& p": {
            fontSize: "14px !important",
            color: "#5D8AB5",
            lineHeight: "1.6",
        },
        "& span": {
            fontSize: "13px !important",
            color: "#5D8AB5",
            fontWeight: "normal",
            fontFamily: "Lato",
        },
        "& .MuiSvgIcon-root": {
            width: "1.2rem",
            height: "1.1rem",
        },
        "& img": {
            width: "1.2rem",
            height: "1.1rem",
        }
    },



    crossButton: {
        position: "absolute",
        top: "8px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
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
    encounterTitle: {
        color: "#25282B",
        fontSize: "16px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        padding: "0px 0px 0px 0px",
        "& span": {
            float: "left",
            fontSize: "15px",
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
        paddingLeft: "7px",
        // marginTop: 7,
        marginBottom: "10px",
        "& li": {
            margin: 0,
            outline: 0,
            padding: 0,
            listStyle: "none",
            cursor: "pointer",
            margin: "10px 0",
            "& :hover": {
                color: "#00B4E5",
            },
        },
    },
    treeContentHover: {
        width: "100%",
        display: "flex",
        cursor: "pointer",

    },
    treeContent: {
        width: "100%",
        display: "flex",

    },
    marginTopBottom10: {
        margin: "10px 0px",
    },
    treeViewLi: {
        margin: "10px 0",
    },
    CustomLabel: {
        fontSize: "13px",
        color: "#5D8AB5",
    },

    marginBottom15: {
        marginBottom: "15px",
    },
    fontWeight400: {
        fontWeight: "400",
    },
    newSubHeading: {
        color: "#25282b",
        fontSize: "14px",
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
    messageDetails: {
        color: "#11284b !important",
        width: "100%",
        fontSize: "12px !important",
        marginTop: "5px",
        fontFamily: "Lato",
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
        width: "100%",
        position: "relative",
        paddingLeft: 4,
    },
    noRecord: {
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        // marginTop:"10px",
        marginTop: "5px",
        paddingLeft: "20px",
        // marginBottom: "10px",
        marginBottom: "20px",
        fontWeight: "500",

    },
    LockIcon: {
        "& span": {
            width: "24px",
            height: "25px",
            position: "relative",
            top: "-4px",
            left: "5px",
        },
        "& path": {
            fill: '#11284b',
        }
    },
    ListStyle: {
        listStyle: "none",
        padding: "0",
        marginTop: "8px",
    },
    DisnoRecord: {
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        // marginTop:"10px",
        marginTop: "5px",
        paddingLeft: "20px",
        marginBottom: "20px",
    },
    listSubChild: {
        padding: "0px 0px 0px 20px"
    },
    listSubChildOpen: {
        padding: "0px 0px 20px 20px"
    },
    listSubTitle: {
        color: "#25282B",
        //color:"rgba(0, 0, 0, 0.26)",
        fontSize: "14px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        // margin:"2px 0px 0px 5px",
        padding: "0px 0px 20px 5px",
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
    activeTitleArea: {
        marginTop: "7px",
        color: "#25282B",
        padding: "0px 0px 2px 0px",
        fontSize: "14px",
        fontFamily: "Lato",
        fontWeight: "bold",
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
    inActiveTitleArea: {
        marginTop: "5px",
        color: "#25282B",
        padding: 0,
        fontSize: "14px",
        fontFamily: "Lato",
        fontWeight: "bold",
    },
    // collapseIconSpan:{
    //     cursor:"pointer",
    //     margin:"-5px 0px 0px -10px"
    //     // margin:"-3px -8px 0px -10px"
    // }
    collapseIconSpan: {
        cursor: "pointer",
        margin: "-2px 0px 0px -5px",
        float: "left"
        // margin:"-3px -8px 0px -10px"
    },
    vitalList: {
        marginBottom: "7px",
    }
}));
