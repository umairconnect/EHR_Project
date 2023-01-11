import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "710px",
        height: "670",
        minHeight: "370px"
    },
    DialogContent: {
        minWidth: "650px",
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
        color: "#5D8AB5",
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
        color: "#5D8AB5",
        minWidth: "100px"
    },
    activityList: {
        margin: "0px 0px 10px 20px",
        display: "flex"
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
    patientList: {
        margin: "5px 1px 10px 1px",
        padding: "0px",
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        "& li": {
            color: '#5D8AB5',
            minHeight: "30px",
            outline: 0,
            padding: "5px 30px 5px 12px",
            position: "relative",
            fontSize: "12px",
            background: "#f6f6f6",
            fontWeight: "600",
            border: "1px solid #E1E1E1",
            boxSizing: "border-box",
            boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
            borderRadius: "25px",
            minWidth: "115px",
            margin: "4px 4px 4px 0px"
        },
    },
    deleteIcon: {
        cursor: "pointer",
        color: "#FD5F5F",
        right: "-7px",
        position: "absolute",
        paddingTop: 0,
        top: "50%",
        transform: "translate(-50%,-45%)",
        "& svg": {
            transform: "rotate(45deg)",
        },
    },
    btnSpan: {
        display: "flex",
        width: "100%"
    },
    attachmentBtn: {
        position: "absolute",
        padding: "8px",
        right: "60px",
    },
    messageInfoSection: {
        display: "flex",
        justifyContent: "space-between",
    },
    messageInfoText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#25282B',
        paddingBottom: '10px'
    },
    messageInfoTagsText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#5D8AB5',
        paddingBottom: '10px',
        cursor: 'pointer'
    },
    messageInfoCheckboxSection: {
        display: 'flex',
        flexDirection: 'column',
    }
}));