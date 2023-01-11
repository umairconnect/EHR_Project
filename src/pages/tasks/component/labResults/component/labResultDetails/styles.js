import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        maxWidth: '80%',
        width: '80%',
        height: '85%',
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
        height: "100%",
        overflow: "hidden"
    },
    // labResultDetailsCard: {
    //     margin: "5px 10px",
    //     background: "#FFFFFF",
    //     border: "1px solid #E1E1E1",
    //     boxSizing: "border-box",
    //     boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    //     borderRadius: "8px",
    // },
    labResultDetailsInnerCard: {
        margin: "10px 40px",
    },
    valueText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
        paddingBottom: "3px"
    },
    gridHeight: {
        height: "35px",
    },
    gridHeightMargin: {
        height: "35px",
        marginBottom: "15px"
    },
    divider: {
        margin: "15px 0px 10px",
        height: 1,
    },
    linkTextHeading: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#00B4E5",
        marginTop: "3px"
    },
    linkHemoglobinHeading: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        color: "#5D8AB5",
        paddingRight: "30px"
    },
    formTitle: {
        position: 'relative',
        width: "100%",
        color: "#25282B",
        fontSize: 15,
        fontWeight: "600",
        // marginBottom: 12,
        padding: "10px 0px",
    },
    baseTitle: {
        display: "inline-block",
        position: "relative",
        padding: "0 12px 0 0",
        backgroundColor: "white",
        zIndex: 2,
    },
    baseLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 14,
        height: 1,
        backgroundColor: "#DDDDDD",
        zIndex: 1
    },
    labResultTable: {
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
    labResultCheckboxRoot: {
        width: 47,
        height: 22,
        padding: 0,
        zIndex: 1000,
        // left:85,
        // marginTop: 14,
        // margin: "14px 10px 0px 0px"
    },
    labResultCheckboxcustomRoot: {
        width: 48,
        height: 23,
        padding: 0,
        zIndex: 1000,
        // left:85,
        // marginTop: 14,
        margin: "12px 0px 0px 15%"
    },
    root: {
        width: 48,
        height: 23,
        padding: 0,
        zIndex: 1000,
        // left:85,
        // marginTop: 14,
        margin: "1px"
    },
    switchBase: {
        padding: 1,
        zIndex: 1000,
        transform: 'translateX(-8px)',
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#00B2E3',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 18,
        height: 20,
    },
    track: {
        borderRadius: 13,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: "#C4C4C4",
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    labResultBoxBtn: {
        // marginLeft: "0px",
        padding: "0px 5px 0px 0px",
        "& + .MuiFormControlLabel-label": {
            fontSize: "14px"
        },
    },
    formControlLabelRoot: {
        // margin: "0px 0px 0px -28px"
    },
    formControlLabel: {
        "& span": {
            fontWeight: 700,
            paddingLeft: "8px",
            boxSizing: "border-box",
            fontStyle: "normal",
            fontFamily: "Lato",
            color: "#52575C",
        }
    },
    labResultBoxValueBtn: {
        // marginLeft: "0px",
        padding: "0px 5px 0px 0px",
        marginLeft: "14px",
        "& + .MuiFormControlLabel-label": {
            fontSize: "14px"
        },
    },
    generalHeading: {
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: 700,
        fontSize: "16px",
        color: "#25282B",
        paddingRight: "15px",
    },
    medicationGeneralHeading: {
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: 700,
        fontSize: "16px",
        color: "#25282B",
        paddingRight: "15px",
        marginRight: "100px"
    },
    labResultAddIconSpan: {
        fontSize: "14px",
        margin: "4px 5px 0px 15px",
        color: "#00B4E5",
        fontFamily: "Lato",
        fontWeight: "400",
        cursor: "pointer",
    },
    labResultAddIcon: {
        marginTop: "3px",
        cursor: "pointer",
        color: "#00B4E5", 
        cursor: "pointer",
        fontSize: "14px",
        fontFamily: "Lato",
        fontWeight: 400,
    },
    diagnosesList: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
        paddingLeft: "22%",
        margin: "4px 0px 0px 0px",
    },
    boldHeading: {
        paddingRight: 15,
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#25282B",
    },
    labResultLableInput: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        // marginBottom: 13,
        // paddingTop: "6%",
        minHeight: "20px",
        textAlign: "right"
    },
    observationNameText: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#00B4E5",
    },
    resultNameText: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
    },
    referenceNameText: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#00B4E5",
    },
    dateNameText: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
    },
    tableArea: {
        width: "100%",
        background: "#FFFFFF",
        border: "1px solid #E0E0E0",
        boxSizing: "border-box",
        marginBottom: "20px"
    },
    tableLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#25282B",
        marginLeft: "10px"
    },
    tableHead: {
        width: "100%",
        backgroundColor: "#E0E0E0",
        display: "flex",
        height: "30px",
        padding: "5px 15px 5px 0px",
        justifyContent: "space-evenly"
    },
    tableBody: {
        width: "100%",
        display: "flex",
        padding: "5px 15px 5px 8px",
        height: 35,
        minHeight: 35,
        borderBottom: "1px solid #E0E0E0",
        justifyContent: "space-evenly"
    },
}))