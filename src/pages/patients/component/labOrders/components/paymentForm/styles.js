import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        width: "80%",
        height: "95vh",
        minHeight: '95vh',
        maxWidth: '80%',
    },
    //New Styles.
    DialogContent: {
        minWidth: "950px",
        display: "flex",
        overflow: "hidden"
    },
    DialogContentLeftSide: {
        flex: "1",
        backgroundColor: "#F4F4F4",
        padding: "12px 10px 5px 10px",
        maxWidth: "400px",
        flexBasis: "400px",
        // minHeight:"521px",
    },
    DialogContentRightSide: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
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
        marginBottom: "10px",
        marginRight: "10px"
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
    deleteDiagnosisIcon: {
        float: "right",
        cursor: "pointer",
        paddingTop: 10,
        "& img": {
            width: "18px",
            height: "18px",
            marginRight: "12px"
        }
    },
    lableInput: {
        width: "31%",
        cursor: "pointer",
        margin: "5px 0px 10px 15px",
        fontFamily: "Lato",
        fontWeight: "bold",
        color: "#11284B",
        fontSize: 14,
        display: "inline-grid"
    },
    orderTest: {
        maxWidth: "100%",
        width: "100%",
    },
    diagnosisTest: {
        maxWidth: "100%",
        width: "100%",
        marginBottom: "30px"
    },
    orderTestHeader: {
        backgroundColor: "#E0E0E0",
        width: "100%",
        height: "30px"
    },
    customTestHeader: {
        backgroundColor: "#E0E0E0",
        width: "100%",
        height: "30px",
        marginBottom: "25px"
    },
    orderTestContent: {
        backgroundColor: "#FFFFFF"
    },
    dianosisTestHeader: {
        //backgroundColor:"#F2F2F2",
        width: "100%",
        height: "50px"
    },
    dagnosisItem: {
        width: "31%",
        margin: "5px 0px 10px 15px",
        fontFamily: "Lato",
        fontWeight: "normal",
        color: "#11284B",
        fontSize: 12,
        display: "inline-grid"
    },
    diagnosisList: {
        margin: "0px 1px 10px 1px",
        padding: "0px",
        listStyle: "none",
        height: "50px",
        overflow: "auto",

        "& li": {
            position: "relative",
            height: "40px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "700",
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
    orderList: {
        margin: "5px 1px 10px 1px",
        //padding:"0 15px 0 7px",
        padding: "0px",
        listStyle: "none",
        height: "200px",
        overflow: "initial !important",
        height: "initial !important",
        overflow: "auto",

        "& li": {
            position: "relative",
            height: "40px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "700",
            lineHeight: "40px",
            margin: 0,
            outline: 0,
            padding: "0 12px 0 12px",
            listStyle: "none",
            marginTop: 2,
            borderRadius: "0px",
            fontWeight:700,
            // color: "#00B4E5",
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
    listIcon: {
        minWidth: "56px",
        flexShrink: '0',
    },
    img: {
        width: "18px",
        height: "18px",
        margin: "8px 0px 0px 5px",
    },
    guarantorName: {
        width: "31%",
        cursor: "pointer",
        fontWeight: 400,
        fontFamily: "Lato",
        fontWeight: "normal",
        color: "#11284B",
        fontSize: 12,
        marginBottom: "17px"
    },
    labOrderTable: {
        width: "100%",
        border: "1px solid #E0E0E0",
        boxSizing: "border-box",
    },
    labOrderTableHead: {
        border: "1px solid #E0E0E0",
        background: "#F2F2F2",
        boxSizing: "border-box",
    },
    labOrderTableHeadLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "13px",
        color: "#25282B",
    },
    labOrderTableLabel: {
        position: "relative",
        fontFamily: "Lato",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "12px",
        color: "#25282B",
        marginLeft: "5px"
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
    dialogPaper: {
        // width: "95%",
        // minHeight: '95vh',
        // maxHeight: 800,
        // maxHeight: "90vh",
        maxWidth: '80%',
        // overflow: "auto"
    },
    dialogtitle: {
        padding: "10px 24px 0px 24px"
    },
    dialogcontent: {
        padding: "16px 24px 10px 24px"
    },
    dialogactions: {
        padding: "2px 8px 8px 8px"
    },
    box2: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header2: {
        flex: "0 1 auto",
    },
    content2: {
        flex: "1 1 auto",
        // maxHeight: "450px",
        paddingRight: "15px",
        minHeight: "200px",
        overflow: "initial !important",
        height: "initial !important",
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "23px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
}))