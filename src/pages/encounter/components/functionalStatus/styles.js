import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "600px",
        height: "670",
        minHeight: "370px"
    },
    DialogContent: {
        minWidth: "600px",
        //display: "flex",
        padding: "20px 10px 10px 10px",
        overflow: "initial !important",
        height: "initial !important",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "450px",
        paddingRight: "15px",
        minHeight: "200px",
        overflow: "initial !important",
        height: "initial !important",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "20px",
        paddingBottom: "10px"
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
    leftBox: {
        padding: "0px 0px 0px 15px"
    },
    rightBox: {
        padding: "0px 15px 0px 0px"
    },
    Innerheader: {
        flex: "0 1 auto",
        backgroundColor: "#C4C4C4",
        minHeight: "28px",
    },
    leftContent: {
        flex: "1 1 auto",
        //maxHeight: "450px",
        //minHeight: "200px",
        MinHeight: "80px",
        marginBottom: "10px",
        // overflow: "auto",  
        listStyle: "none",
        borderRight: "1px solid #DDDDDD",
        "& li": {
            fontFamily: "Lato",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            textAlign: "left",
            color: "#25282B",
            marginLeft: "10px"
        }
    },
    rightContent: {
        flex: "1 1 auto",
        //maxHeight: "450px",
        //minHeight: "200px",
        height: "80px",
        marginBottom: "10px",
        overflow: "auto",
        listStyle: "none",
        borderLeft: "1px solid #DDDDDD",
        "& li": {
            fontFamily: "Lato",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            textAlign: "left",
            color: "#25282B",
            marginLeft: "5px"
        }
    },
    ActionDivider: {
        width: "100%",
        backgroundColor: "#e7e7e7",
        marginBottom: "9px",
    },
    heading: {
        fontFamily: "Lato",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "700",
        textAlign: "left",
        color: "#25282B",
        margin: "3px 0px 0px 15px"
    },

    activityLabel: {
        paddingRight: 20,
        lineHeight: "30px",
        fontFamily: "Lato",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 700,
        textAlign: "left",
        color: "#000",
        minWidth: "80px"
    },
    activityValue: {
        paddingRight: 20,
        lineHeight: "30px",
        fontFamily: "Lato",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "black",
        minWidth: "220px"
    },
    abilityLabel: {
        paddingRight: 20,
        lineHeight: "30px",
        fontFamily: "Lato",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 700,
        textAlign: "left",
        color: "#000",
        minWidth: "80px"
    },
    abilityValue: {
        paddingRight: 20,
        lineHeight: "30px",
        fontFamily: "Lato",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "black",
        minWidth: "100px"
    },
    activityList: {
        margin: "0px 0px 10px 20px",
        display: "flex",
        borderBottom: "1px solid #eaeaea",
    },
    editdeleteIcon: {
        margin: 0,
        cursor: "pointer",
        "& img": {
            margin: "5px 0px 0px 10px",
            width: 16,
            height: 15,
        }
    },

}));