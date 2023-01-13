import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
           cursor: "move",
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "575px",
        minHeight: "575px",
        overflow: "initial !important",
        marginBottom: "10px"
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        display: "flex",
        float: "right",
        marginRight: "-8px"
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
    lableInput: {
        paddingRight: 19,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        paddingTop: "10px",
        minHeight: "40px",
        textAlign: "right",
        display: "block"
    },
    deleteIcon: {
        float: "right",
        cursor: "pointer",
        paddingTop: 10,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    lableInput: {
        cursor: "pointer",
        margin: "10px 0px 10px 15px",
        fontFamily: "Lato",
        fontWeight: "bold",
        color: "#11284B",
        fontSize: 14,
        display: "block"
    },
    orderTest: {
        minWidth: "100%",
        width: "100%",
    },
    orderTestHeader: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#E0E0E0",
        width: "100%",
        height: "30px"
    },
    orderTestContent: {
        backgroundColor: "#FFFFFF"
    },
    specimenTestContent: {
        backgroundColor: "#FFFFFF",
        marginTop: "5px"
    },
    specimenTable: {
        minWidth: "97%",
        maxWidth: "100%",
        marginLeft: "12px",
        borderRadius: "5px",
        border: "1px solid #E0E0E0"
        // padding: "5px 10px"
    },
    specimenTableHead: {
        backgroundColor: "#E0E0E0",
        textAlign: "left",

        "& th": {
            paddingLeft: 12,
            fontWeight: "bold",
        }
    },
    specimenTableLabel: {
        fontFamily: "Lato",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        paddingLeft: "12px",
        color: "#000",
    },
    speicemanTableAction: {
        textAlign: "left",
        paddingLeft: "30px",
    },
    specimenTableDeleteIcon: {
        // float: "right",
        cursor: "pointer",
        // paddingTop: 10,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    orderList: {
        margin: "5px 1px 10px 1px",
        //padding:"0 15px 0 7px",
        padding: "0px",
        listStyle: "none",
        // maxHeight: "128px",
        // height: "85px",   
        // overflow:"auto",

        "& li": {
            position: "relative",
            height: "40px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "400",
            lineHeight: "40px",
            margin: 0,
            outline: 0,
            padding: "0 12px 0 12px",
            listStyle: "none",
            marginTop: 2,
            borderRadius: "0px",
            boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
        },
    },
    editIcon: {
        top: "50%",
        right: "50px",
        position: "absolute",
        transform: "translateY(-50%)",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
    },
    deleteIcon: {
        //float: "right",
        cursor: "pointer",
        right: "15px",
        paddingTop: "5px",
        position: "absolute",
        cursor: "pointer",
        paddingTop: 5,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    formTitle: {
        position: 'relative',
        width: "100%",
        color: "#25282B",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 12,
        paddingBottom: "5px"
    },
    baseLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1,
        backgroundColor: "#DDDDDD",
        zIndex: 1
    },
    orderTestCheckBox: {
        top: "32%",
        right: "50px",
        position: "absolute",
        transform: "translateY(-50%)",
        //width:"14px",
        display: "inline-flex",
        cursor: "pointer",
    },
    lableInputOrderTest: {
        margin: "7px 6px 0px 0px",
        cursor: "pointer",
        fontFamily: "Lato",
        fontWeight: "bold",
        color: "#11284B",
        fontSize: 14,
        display: "block"
    },
    orderDisgnosisCheckBox: {
        top: "32%",
        right: "79px",
        position: "absolute",
        transform: "translateY(-50%)",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
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
    testName: {
        fontFamily: "Lato",
        fontWeight: "400",
        fontSize: "12px",
        fontweight:700
        // color: "#00B4E5"
    },
    addIconSpan: {
        fontSize: "14px",
        margin: "0px 5px 10px 5px",
        color: "#00B4E5",
        fontFamily: "Lato",
        fontWeight: "400",
        cursor: "pointer"
    },
    addIcon: {
        marginLeft: "25px",
        cursor: "pointer"
    },
    signBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        minWidth: 90,
        padding: "3px",
        fontFamily: "Lato",
        padding: "6px 16px",
        borderLeft: "1px solid #FFFFFF",
        marginRight: "8px",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    tempDialogPaper: {
        width: "30%",
        maxWidth: '30%',
        padding: "22px 20px"
    },
    Templatecontent: {
        flex: "1 1 auto",
        marginBottom: 0,
        padding: "10px",
        overflow: "initial !important",
    },
}))