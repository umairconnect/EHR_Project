import { Height } from "@material-ui/icons";
import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    allTasksCard: {
        margin: "5px 10px",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
    },
    allTasksInnerCard: {
        margin: "10px 40px",
    },
    vendorPatientRecordText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#00B4E5",
        margin: "10px"
    },
    patientTable: {
        width: "100%",
        margin: "0px 0px 20px",
        borderCollapse: "collapse",
        "& thead": {
            background: "#E0E0E0",
            "& td": {
                fontWeight: 700,
                paddingLeft: "8px",
                boxSizing: "border-box",
                fontStyle: "normal",
                fontSize: "14px",
                fontFamily: "Lato",
                color: "#52575C",
            },
        },
        "& tbody": {
            "& td": {
                fontWeight: 400,
                paddingLeft: "8px",
                boxSizing: "border-box",
                fontStyle: "normal",
                fontSize: "14px",
                fontFamily: "Lato",
                color: "#52575C",
            },
        },
        "& tr": {
            background: "#FFFFFF",
            border: "1px solid #E0E0E0",
            boxSizing: "border-box",
            height: "50px"
        },
    },
    prescribedArea: {
        width: "100%",
        display: "flex"
    },
    medicineInfoArea: {
        width: "38%",
        margin: "0px 10px 0px 0px",
    },
    dispensedInfoArea: {
        padding: "15px 20px",
        margin: "0px 0px 0px 10px",
        width: "55%",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
    },
    treeView: {
        margin: "10px 0 20px 0",
        padding: 0,
        listStyle: "none",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        "& li": {
            margin: 0,
            outline: 0,
            // padding: "5px 7px 5px 10px",
            listStyle: "none",
            borderBottom: "1px solid #E1E1E1",
            cursor: "pointer",

        },
        "& li:last-child": {
            borderBottom: "none",
        },
    },
    treeContent: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    medicineNameArea: {
        width: "50%",
        cursor: "pointer",
        borderRight: "1px solid #E1E1E1",
        padding: "5px 7px 5px 10px"

    },
    medicineValueArea: {
        width: "50%",
        cursor: "pointer",
        borderLeft: "1px solid #E1E1E1",
        padding: "5px 7px 5px 10px"
    },
    boldTextHeading: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#25282B",
        padding: "7px 0px 0px"
    },
    patientAgeText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#52575C",
    },
    footerArea: {
        width: "100%",
    },
    footerAreaLeft: {
        position: "relative",
        float: "left",
        display: "flex"
    },
    footerAreaRight: {
        position: "relative",
        float: "right"
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
    btnGroup: {
        height: "40px",
        padding: "0px 10px 0px 10px",
        color: "#F6F6F6",
        background: "#F7F7F7",
        border: "1px solid #E1E1E1",
        "& .MuiButtonGroup-grouped": {
            minWidth: "25px"
        }
    },
    actionBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        minWidth: 90,
        padding: "3px",
        fontFamily: "Lato",
        padding: "6px 16px",
        borderLeft: "1px solid #FFFFFF",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    dialogPaper: {
        maxWidth: '80%',
        // height: "80vh",
        [theme.breakpoints.down("xs")]: {
            maxWidth: '90%',
        },
        "& .MuiDialogTitle-root": {
            padding: "12px 12px 0px"
        }
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "50px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    dialogcontent: {
        padding: "0px 12px 12px",
        height: "100%"
    },
    //
    demographicDialogPaper: {
        // width: "95%",
        minHeight: '95vh',
        maxWidth: '80%',
        // overflow: "auto"
    },
    demographicDialogcontent: {
        padding: "16px 24px 10px 24px"
    },
    demographicDialogactions: {
        padding: "2px 8px 8px 8px"
    },

}));