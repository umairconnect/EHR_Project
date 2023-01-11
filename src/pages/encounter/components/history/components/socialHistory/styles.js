import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({

    addNew: {
        margin: "0px 0px 0px 8px",
        cursor: "pointer",
    },
    footerBtn: {
        padding: " 7px 0px",
        //marginTop:"15px",
        bottom: "0px",
        //width: "55%",
        // paddingLeft:"58%",
        position: "absolute",
        right: 0,
        display: "flex",
        zIndex: 3
    },
    tobacooStatusList: {
        marginLeft: "80px",
        display: "flex",
        alignItems: "baseline",
    },
    statusLabel: {
        paddingRight: 60,
        fontFamily: "Lato",
        fontSize: "11px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "#5D8AB5",
        width: 150,
        minWidth: 150,
        maxWidth: 150
    },
    fromLabel: {
        paddingRight: 60,
        fontSize: "11px",
        fontFamily: "Lato",
        fontSize: "10px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "#000",
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        margin: '0px 20px'
    },
    fromDateLabel: {
        paddingRight: 60,
        fontFamily: "Lato",
        fontSize: "10px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "#5D8AB5",
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        margin: '0px 20px',
        fontSize: "11px",
    },
    toLabel: {
        paddingRight: 60,
        lineHeight: "30px",
        fontFamily: "Lato",
        fontSize: "10px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "#000",
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        margin: '0px 20px'
    },
    toDateLabel: {
        paddingRight: 50,
        lineHeight: "30px",
        fontFamily: "Lato",
        fontSize: "10px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "#5D8AB5",
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        margin: '0px 20px'
    },
    tobaccoActionBtns: {
        display: "flex",
        justifyContent:"center",
        width: "100%"
    },
    editdeleteIcon: {
        margin: "0px 5px",
        cursor: "pointer",
        "& img": {
            // margin: "5px 0px 0px 10px",
            width: 16,
            height: 15,
        }
    },
    SocialHisLabel: {
        // paddingRight:50,
        lineHeight: "30px",
        fontFamily: "Lato",
        fontSize: "10px",
        fontStyle: "normal",
        fontWeight: 700,
        textAlign: "left",
        //color:"#5D8AB5",
        color: "#000",
        width: 80,
        minWidth: 80,
        maxWidth: 80
    },
    SocialHisValueLabel: {
        // paddingRight:50,
        lineHeight: "30px",
        fontFamily: "Lato",
        fontSize: "10px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "#5D8AB5",
        width: 265,
        minWidth: 265,
        maxWidth: 265
    },
    addNewButton: {
        background: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        textTransform: "none",
        boxShadow: "none",
        color: "#00B4E5",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: "normal",
        "&:hover": {
            background: "#FFFFFF",
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
            color: "#00B4E5",
        },
        "& .MuiButton-startIcon": {
            marginRight: "2px"
        }
    },
    // pBottom30: {
    //     paddingBottom: "30px"
    // }
    tablelayout: {
        width: "100%",
        textAlign: "left",
        margin: "0px 15px 10px 25px",
        border: "1px solid #e4e4e4",

        "& tr": {
            borderBottom: "1px solid #e4e4e4",
        },

        "& th": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "0.01em",
            color: "#000000d9",
            padding: "5px",
            fontWeight: "600",
        },
        "& td": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "0.01em",
            color: "#000000d9",
            padding: "5px",
            padding: "5px",
            fontWeight: "normal",
        },
        "& thead": {
            background: "#F0F0F0",
        }
    },
}));