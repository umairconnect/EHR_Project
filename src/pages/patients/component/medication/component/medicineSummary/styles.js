import { makeStyles } from "@material-ui/styles"

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
        display: "flex"
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
    pharmacyName: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "13px",
        lineHeight: "14px",
        color: "#000000",
    },
    pharmacyAddress: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "11px",
        lineHeight: "15px",
        color: "#000000",
        wordBreak: "break-all"
    },
    pharmacyInfo: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "9px",
        lineHeight: "12px",
        color: "#919191",
    },
    medicineList: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        width: "100%",
        "& li": {
            color: "#000000",
            padding: "0px 5px 10px 2%",
            margin: "0px 0px 10px 5%",
            fontSize: "14px",
            fontStyle: "normal",
            fontFamily: "Lato",
            fontWeight: "normal",
            background: "#F0F0F0",
            lineHeight: "17px",
        }
    },
    chipRoot: {
        height: "20px",
        fontSize: 12,
        backgroundColor: "#F0F0F0",
        fontFamily: "Lato",
        padding: "5px",
        "& .svg": {
            background: "#828282",
        },
        "&:hover": {
            backgroundColor: "tranparent",
        }
    },
    listItemName: {
        fontSize: "14px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        background: "#F0F0F0",
        lineHeight: "17px",
        padding: "14px 10px 0px",
        color: "#11284B",
    },
    listItemheading: {
        fontSize: "13px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        background: "#F0F0F0",
        lineHeight: "1px",
        padding: "5px 10px",
        color: "#25282B",
    },
    listItemDescription: {
        fontSize: "12px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        background: "#F0F0F0",
        lineHeight: "1px",
        padding: "5px 10px",
        color: "#25282B",
    },
    listItemDescription2: {
        fontSize: "12px",
        background: "#F0F0F0",
        fontStyle: "normal",
        padding: "5px 0px",
    },
    valueText: {
        marginTop: 12,
        fontSize: "14px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        lineHeight: "5px",
        textAlign: "left",
        color: "#52575C",
        width: "100%"
    },
    alertRoot: {
        width: "100%",
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
        backgroundColor: "transparent",
        "& MuiAlert-standardError": {
            color: "#52575C",
            backgroundColor: "#fff"
        },
        "& MuiAlert-standardWarning": {
            color: "#52575C",
            backgroundColor: "#fff"
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
    },
    selectedPharmacyName: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "13px",
        lineHeight: "21px",
        color: "#00B2E3",
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
    patientDob: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "10px",
        lineHeight: "12px",
        color: "#000000",
    },
    WeightBold: {
        fontWeight:"bold",
    },
    menuBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 35,
        padding: "5px",
        fontFamily: "Lato",
        borderLeft: "1px solid #FFFFFF",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
        '& .MuiButton-endIcon': {
            margin: '0px'
        }
    },
    sendRexBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        minWidth: 90,
        padding: "5px 16px",
        fontFamily: "Lato",
        borderLeft: "1px solid #FFFFFF",
        marginRight: "8px",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    smartAddPhBtn: {
        color: "#00B2E3",
        fontSize: "14px",
        cursor: "pointer",
        fontWeight: "normal",
        // float: "left",
        margin: "15px 0px",
        display: "flex",
        alignItems: "center",
        "& img": {
            margin: "0 5px 0 0"
        },
        "&:hover": {
            color: "#11284B",
        }
    },
    listCrossButton: {
        color: "red",
        position: "relative",
        float: "right",
        // marginTop: "5px",
        cursor: "pointer",
        padding: "2px 3px 3px",
        zIndex: "2",
        display: "block",
        "& svg": {
            transform: "rotate(45deg)",
        },
        // "& :hover": {
        //     backgroundColor: "#F4F4F4",
        // }
    },

}))