import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    DialogContentLeftSide: {
        flex: "1",
        maxWidth: "310px",
        flexBasis: "310px",
        background: "#FFFFFF",
        margin: 10,
        padding: 10,
        border: "1px solid #DBDADA",
        borderRadius: "0px 0px 4px 4px",
        // minHeight:"521px",
    },
    DialogContentRightSide: {
        flex: "1",
        padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        // padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    leftHeader: {
        flex: "0 1 auto",
        display: "flex",
    },
    header: {
        flex: "0 1 auto",
        display: "flex"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "580px",
        minHeight: "200px",
        // overflow: "auto",
        marginBottom: "10px"
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    crossButton: {
        position: "relative",
        top: "-12px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    medicineSearchNote: {
        padding: "10px 0px",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "16px",
        color: "#888888",

    },

    medicineList: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        "& li": {
            color: "#000000",
            padding: "8px 5px 8px 3%",
            margin: "0px 0px 10px 0px",
            fontSize: "14px",
            fontStyle: "normal",
            fontFamily: "Lato",
            fontWeight: "normal",
            background: "#f6f6f6",
            lineHeight: "17px",
            borderRadius: 3,
            "& img": {
                positon: "relative",
                float: "right",
                cursor: "pointer"
            }
        }
    },
    medicineListItemName: {
        padding: "5px 0px 5px 0px",
        fontFamily: "Lato",
        fontStyle: "italic",
        fontWeight: "normal",
        fontSize: "13px",
        lineHeight: "17px",
        textDecoration: "underline",
        color: "#00B4E5",
    },

    //action dialog
    dialogTitle: {
        textAlign: 'center',
        background: '#FFF',
        borderRadius: '8px 8px 0px 0px',
        padding: "7px 24px 0px 24px",
    },
    UpdateIcon: {
        color: "#BF710F",
        width: "80px",
        height: "80px",
    },
    dialogContent: {
        textAlign: "center"
    },
    dialogMessage: {
        color: "#000000",
        fontFamily: "Lato",
        textAlign: "center",
    },

    dialogactions: {
        justifyContent: "flex-end",
    },
    actionButton: {
        width: '127px',
        height: '40px',
        background: '#00B4E5',
        color: '#000000',
        borderRadius: '5px',
        '&:hover': {
            color: '#ffffff',
            background: '#00B4E5',
        }
    },
    selectedPharmacy: {
        color: "#000000",
        padding: "8px",
        margin: "5px",
        fontSize: "14px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        background: "#f7f7f7",
        lineHeight: "17px",
        textAlign: "left"
    },
    selectedPharmacyName: {
        fontFamily: "Lato",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: "12px",
        lineHeight: "17px",
        color: "#000000"
    },
    pharmacyAddress: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "11px",
        lineHeight: "13px",
        color: "#565656",
    },
    pharmacyInfo: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "11px",
        lineHeight: "13px",
        color: "#565656",
    },
    changePharmacyButton: {
        background: "#00B2E3",
        borderRadius: "25px",
        float: "right",
        position: "relative",
        textTransform: "none",
        height: "22px",
        margin: "-20px 0px 0px 0px",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "10px",
        color: "#FFFFFF",
    },
    alertRoot: {
        padding: 4,
        height: 25,
        margin: "5px 0px",
        fontSize: "12px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        lineHeight: "14px",
        textAlign: "left",
        color: "#52575C",
        background: "transparent",
        "& .MuiAlert-message": {
            padding: "10px 0px 0px"
        },
        "& MuiAlert-standardError": {
            color: "#52575C",
            background: "#F0F0F0",
        },
        "& MuiAlert-standardWarning": {
            color: "#52575C",
            background: "#F0F0F0",
        }
    },
    orderTestContent: {
        backgroundColor: "#FFFFFF"
    },
    orderList: {
        margin: "5px 1px 10px 1px",
        //padding:"0 15px 0 7px",
        padding: "0px",
        listStyle: "none",
        // maxHeight: "128px",
        // height: "85px",
        // overflow: "auto",

        "& li": {
            position: "relative",
            height: "40px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "7400",
            lineHeight: "40px",
            margin: "5px 0px",
            outline: 0,
            padding: "0 12px 0 12px",
            listStyle: "none",
            marginTop: 2,
            borderRadius: "0px",
            background: "#f6f6f6"
            // boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
        },
    },
    deleteIcon: {
        //float: "right",
        cursor: "pointer",
        right: "15px",
        paddingTop: "5px",
        position: "absolute",
        cursor: "pointer",
        color: "red",
        paddingTop: 5,
        "& svg": {
            transform: "rotate(45deg)",
        },
    },
    listCrossButton: {
        color: "red",
        cursor: "pointer",
        position: "relative",
        float: "right",
        marginTop: "-20px",
        cursor: "pointer",
        padding: "2px 3px 3px",
        zIndex: "2",
        display: "block",
        marginTop: "-20px",
        "& svg": {
            transform: "rotate(45deg)",
        },
        // "& :hover": {
        //     backgroundColor: "#F4F4F4",
        // }
    },

}))