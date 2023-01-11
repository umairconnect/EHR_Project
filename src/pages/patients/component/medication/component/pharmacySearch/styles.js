import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    DialogContentLeftSide: {
        flex: "1",
        maxWidth: "280px",
        flexBasis: "280px",
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
        height: "25px",
        alignItems: "flex-end",
        borderBottom: "1px solid #DBDADA"
    },
    header: {
        flex: "0 1 auto",
        display: "flex"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "615px",
        minHeight: "200px",
        overflow: "auto",
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
    pharmaciesList: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        "& li": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "25px",
            color: "#52575C",
            display: "block",
            padding: "10px 5px 10px 0px",
            borderBottom: "1px solid #DBDADA"
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
    },
    pharmacyInfo: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "9px",
        lineHeight: "12px",
        color: "#919191",
    },
    selectedPharmacy: {
        color: "#000000",
        padding: "8px 8px 8px 8%",
        margin: "5px",
        fontSize: "14px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        background: "#f7f7f7",
        lineHeight: "17px",
    },
    searchedPharmacy: {
        listStyle: "none",
        padding: 0,
        "& li": {
            color: "#000000",
            padding: "8px 8px 8px 0px",
            margin: "5px",
            fontSize: "14px",
            fontStyle: "normal",
            fontFamily: "Lato",
            fontWeight: "normal",
            background: "#f7f7f7",
            lineHeight: "17px",
        }
    },
    selectedPharmacyName: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "13px",
        lineHeight: "21px",
        color: "#00B2E3",
    },
    patientTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        textAlign: "right",
        color: "#25282B",
        margin: "0px 0px 0px 10px"
    },
    selectedPharmacyTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "17px",
        textAlign: "right",
        color: "#25282B",
        margin: "15px 0px 15px 10px",
    },
    radioRoot: {
        position: "relative",
        float: "left",
        paddingRight: "20px",
        color: "#00B4E5",
        // "& .MuiSvgIcon-root": {
        //     fontSize: "28px"
        // }

    }
}));