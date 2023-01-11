import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        maxWidth: "1100px",
        maxHeight: "100%"
    },
    DialogContent: {
        // minWidth: "1000px",
        // minHeight: "780px",
        minHeight: "650px",
        display: "flex",
        overflow: "auto"
    },
    DialogContentLeftSide: {
        flex: "1",
        backgroundColor: "#F4F4F4",
        padding: "12px 10px 5px 10px",
        maxWidth: "250px",
        flexBasis: "250px",
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
        backgroundColor: "#FFFFFF"
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px",
        overflow: "initial !important",
        height: "initial !important",
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
    leftSideHeader: {
        backgroundColor: "rgb(255, 255, 255)",
        fontWeight: "bold",
        fontSize: "14px",
        // color: "#11284B",
        //borderRadius: "10px 10px 0 0",z
        height: "40px",
        //  padding: "10px 15px",
    },
    addRosBox: {
        zIndex: "99999",
        fontFamily: "Lato",
    },
    paper: {
        padding: "5px 10px",
        minWidth: "494px",
        maxWidth: "494px",
        minHeight: "275px",
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    addRosTitle: {
        flex: "0 1 auto",
        padding: "2px",
        borderBottom: "1px solid #DDDDDD",
        color: "#11284B",
        fontSize: "16px",
        fontWeight: "bold",
    },
    addRosContent: {
        flex: "1 1 auto",
        overflow: "auto",
        padding: "10px 15px 10px 2px",
        "& label": {
            paddingRight: "9px",
        },
        "& .MuiInputBase-root": {
            marginBottom: "8px",
        }
    },
    addRosFooter: {
        flex: "0 1 40px",
        padding: "8px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
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
    mandatorColor: {
        color: "#ff0000",
        fontSize: 16,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        lineHeight: "10px"
    },
    addNewIcon: {
        float: "right",

        cursor: "pointer",
        paddingTop: 10,
    },
    deleteIcon: {
        float: "right",
        cursor: "pointer",
        marginLeft: "7px",
        paddingTop: 10,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 4,
        "& .MuiInputBase-input": {
            padding: "9.5px 12px",
            fontSize: "14px",
            color: "#4A4A4A",
            '&:focus': {
                border: "1px solid #00b2e3",
                borderRadius: "4px",
                outline: 0,
            },
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },

    },
    inputContainer: {
        maxHeight: "200px",
        overflow: "auto"
    },
    quickPickHeader: {
        display: "flex",
        //border: "1px solid #DBDADA",
        borderRadius: "0px 0px 4px 4px",
    },
    settingButton: {
        border: "1px solid #C4C4C4",
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        width: "36px",
        height: "36px",
        // marginTop:"5px",
        position: "absolute",
        cursor: "pointer",
        zIndex: "2",
    },
    templatesList: {
        margin: "11px 0px 11px 0px",
        padding: "0",
        listStyle: "none",

        "& li": {
            position: "relative",
            fontSize: "12px",
            color: "#000",
            height: 30,
            lineHeight: "30px",
            margin: 0,
            outline: 0,
            padding: "0 12px 0 12px",
            listStyle: "none",
            color: "#000",
            fontSize: 12,
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "#F3F3F3"
            }

        },
    },
    templatesCode: {
        top: "13px",
        right: "15px",
        position: "absolute",
        width: "14px",
        display: "inline-flex",
        zIndex: 1,
        justifyContent: "flex-end",
        fontSize: "12px",
    },
    deleteItemIcon: {
        // transform: "translateY(-50%)",
        // top:"50%"
        top: "13px",
        right: "15px",
        position: "absolute",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
        zIndex: 1,
        "& img": {
            width: "14px",
        }
    },
    editIcon: {
        // transform: "translateY(-50%)",
        // top:"50%"
        top: "13px",
        right: "40px",
        position: "absolute",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
        zIndex: 1,
        "& img": {
            width: "14px",
        }
    },
    favoritIcon: {
        top: "13px",
        right: "65px",
        position: "absolute",
        display: "inline-flex",
        cursor: "pointer",
        color: "#FF5C93",
        color: "#11284B",
        zIndex: 1,
        "& svg": {
            fontSize: "18px",
        }
    },
    //accordinBox: {
    //    position: "relative",
    //    padding: "0 5px",
    //    "& .MuiAccordion-root": {
    //        boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
    //        marginBottom: 5,
    //        marginTop: 0,
    //        borderRadius: 5,
    //    },
    //    "& .MuiAccordion-root:last-child": {
    //        marginTop: 5,
    //    },
    //    "& .MuiAccordion-root.Mui-expanded": {
    //        backgroundColor: "#f0f0f0",
    //    },
    //    "& .MuiAccordion-root.Mui-expanded:last-child": {
    //        marginBottom: 5,
    //    },
    //    "& .MuiAccordion-root:before": {
    //        display: "none",
    //    },
    //    "& .MuiAccordionSummary-root": {
    //        paddingLeft: 30,
    //        minHeight: "40px",
    //    },
    //    "& .MuiIconButton-edgeEnd": {
    //        //position: "absolute",
    //        //left: "-6px",
    //        "& svg": {
    //            fontSize: 18,
    //        },

    //    },
    //    "& .Mui-expanded.MuiIconButton-edgeEnd": {
    //        "& .MuiIconButton-label": {
    //            backgroundColor: "#e8e8e8",
    //            borderRadius: "50px",
    //        }
    //    },
    //    "& .MuiAccordionSummary-root.Mui-expanded": {
    //        minHeight: "40px",
    //    },
    //    "& .MuiAccordionSummary-content.Mui-expanded": {
    //        margin: "0px",
    //    },
    //    "& .MuiAccordionDetails-root": {
    //        display: "block",
    //        padding: "0px 0px 10px 30px"
    //    },
    //    "& .MuiAccordionSummary-content": {
    //        color: "#000",
    //        fontSize: "12px",
    //        fontWeight: "700",
    //    }
    //  },
    accordinBox: {
        position: "relative",
        padding: "0 5px",
        "& .MuiAccordion-root": {
            boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
            marginBottom: 5,
            marginTop: 0,
            borderRadius: 5,
        },
        "& .MuiAccordion-root:last-child": {
            marginTop: 5,
        },
        "& .MuiAccordion-root.Mui-expanded": {
            backgroundColor: "#f0f0f0",
        },
        "& .MuiAccordion-root.Mui-expanded:last-child": {
            marginBottom: 5,
        },
        "& .MuiAccordion-root:before": {
            display: "none",
        },
        "& .MuiAccordionSummary-root": {
            paddingLeft: 30,
            minHeight: "40px",
        },
        "& .MuiIconButton-edgeEnd": {
            //position: "absolute",
            //left: "-6px",
            "& svg": {
                fontSize: 18,
            },

        },
        "& .Mui-expanded.MuiIconButton-edgeEnd": {
            "& .MuiIconButton-label": {
                backgroundColor: "#e8e8e8",
                borderRadius: "50px",
            }
        },
        "& .MuiAccordionSummary-root.Mui-expanded": {
            minHeight: "40px",
        },
        "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: "0px",
        },
        "& .MuiAccordionDetails-root": {
            display: "block",
            padding: "0px 0px 10px 30px",
        },
        "& .MuiAccordionSummary-content": {
            color: "#000",
            fontSize: "12px",
            fontWeight: "700",
        },
        "&.MuiAccordionSummary-expandIcon.Mui-expanded": {
            transform: "rotate(0deg)"
        },
        "&.MuiAccordionSummary-expandIcon": {
            transform: "rotate(0deg)",
            transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }
    },
    accordionDetails: {
        width: "100%",
        display: "block",
        marginBottom: 5,
        color: "#000",
        fontSize: 11,
        position: "relative",
        minHeight: "17px",

    },
    circle: {
        position: "absolute",
        left: "-18px",
        top: "6px",
        width: 5,
        height: 5,
        borderRadius: "100px",
        backgroundColor: "rgba(0, 0, 0, 0.54)",

    },
    listHeading: {
        padding: "10px",
        position: "absolute",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        color: "#11284B",
    },
    boxItem: {
        position: "relative",
        padding: "0 5px",
        boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 5,
        cursor: "pointer",
        //backgroundColor:"#f0f0f0",
        color: "#000",
        fontSize: "12px",
        fontWeight: "700",
        minHeight: "40px",
    },
    boxTitle: {
        padding: "13px 0px 0px 5px",
        position: "absolute",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#25282B",
    },
    checkIcon: {
        // transform: "translateY(-50%)",
        // top:"50%"
        top: "13px",
        right: "15px",
        position: "absolute",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
        zIndex: 1,
        "& img": {
            width: "18px",
        }
    },
    btnIconRoot: {
        overflow: "visible"
    },
    BtnIcon: {
        width: "18px",
        height: "18px",
        left: "180px",
        top: "3px",
    },
    Historytabs: {
        boxShadow: "none",
        alignItems: "flex-end",
        overflow: "initial",
        backgroundColor: "#596270",
        top: "-10px",
        // margin:"0px 5px",
        position: "relative",
        borderLeft: "1px solid white",
        width: "250px",
        height: "440px",
        // margin: "0px",
        backgroundColor: "#FFFFFF",
        borderRadius: "0px",
        overflow: "auto",
        "& .MuiTabs-flexContainer": {
            minWidth: "220px",
            margin: "10px 5px 0px 0px"
        },
        "& button": {
            position: "relative",
            margin: "0 5px",
            boxShadow: "0 0 5px 0 rgb(0 0 0 / 15%)",
            marginBottom: 5,
            marginTop: 5,
            borderRadius: 5,
            cursor: "pointer",
            color: "#000",
            fontSize: "12px",
            fontWeight: "700",
            minHeight: "40px",
            textTransform: "capitalize",
            fontFamily: "Lato",
            fontSize: "14px",
        },
        "& button:hover": {
            backgroundColor: "#00B4E5",
            color: "white",
        },
        "& .MuiTabs-indicator": {
            display: "none",
        },
    },
    tabWrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        fontWeight: 700,
        fontFamily: "Lato",
        fontSize: "12px",
        fontStyle: "normal",

    },
    clockIcon: {

        top: "50%",
        right: "16px",
        position: "absolute",
        transform: "translateY(-50%)",
        color: "#e0e0e0",
        fontSize: "18px",
        cursor: "pointer",
    },
    clockIconChecked: {
        top: "50%",
        right: "16px",
        position: "absolute",
        transform: "translateY(-50%)",
        color: "#00B4E5",
        fontSize: "18px",
        cursor: "pointer",
    },
}))