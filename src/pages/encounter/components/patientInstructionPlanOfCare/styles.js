import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    tabPan: {
        overflow: "initial !important",
        //height:"initial !important",
    },
    loader: {
        width: "42px",
    },
    loaderDiv: {
        width: "100%",
        textAlign: "center",
        marginTop: "8%",
    },
    title2: {
        fontFamily: "Lato",
        fontSize: "15px",
        color: "#11284B"
    },
    settingsBtn: {
        textTransform: 'none',
        backgroundColor: '#DDDDDD',
        borderColor: '#F3F3F3',
        color: '#11284b',
        minWidth: 35,
        maxWidth: 35,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            width: "165px",
            maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            backgroundColor: "#00B2E3",
            borderRadius: " 0px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B2E3",
            color: "#11284B",
            // borderRadius:"10px 10px 0px 0px",
            // height: "100%",
        },
        "& .MuiTab-root": {
            minWidth: "165px"
        }
    },
    tabRoot: {
        maxWidth: "330px",
    },
    tabList: {
        marginTop: "-20px"
    },
    // grid:{
    //   margin:"0px 10px"
    // },
    comlplaintrichTextEdit: {
        width: "100%",
        minHeight: "365px",
        margin: "10px 0px 0px 0px",
        "& .RichTextEditor__paragraph___3NTf9": {
            margin: "0",
        },
        "& .RichTextEditor__editor___1QqIU .public-DraftEditor-content": {
            minHeight: "305px",
        }
    },
    comlplaintrichTextEdit2: {
        width: "100%",
        minHeight: "150px",
        margin: "10px 0px",
        "& .RichTextEditor__paragraph___3NTf9": {
            margin: "0",
        },
        "& .RichTextEditor__editor___1QqIU .public-DraftEditor-content": {
            minHeight: "105px",
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
    divider: {
        marginBottom: "10px"
    },
    //New Styles.
    DialogContent: {
        minWidth: "950px",
        display: "flex",
    },
    DialogContentLeftSide: {
        flex: "1",
        backgroundColor: "#F4F4F4",
        padding: "12px 10px 5px 10px",
        maxWidth: "350px",
        flexBasis: "350px",
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
        display: "flex",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "450px",
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
    popupCrossButton: {
        position: "absolute",
        // top: "-12px",
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
        //  backgroundColor:"#00B2E3",
        fontWeight: "bold",
        fontSize: "14px",
        // color: "#11284B",
        borderRadius: "10px 10px 0 0",
        height: "47px",
        //  padding: "10px 15px",
    },
    addRosBox: {
        zIndex: "99999",
        fontFamily: "Lato",
        boxShadow: "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
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
        border: "1px solid #DBDADA",
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
    muiPaper: {
        borderRadius: "10px 10px 0px 0px"
    },
    templatesList: {
        margin: "11px 0px 11px 0px",
        padding: "0",
        listStyle: "none",
        backgroundColor: "#fff",

        "& li": {
            position: "relative",
            fontSize: "12px",
            color: "#000",
            minHeight: 30,
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
        top: "0px",
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
        top: "5px",
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
    templatesItem: {
        display: "block",
        width: "80%",
        lineHeight: "16px",
        paddingTop: "6px"

    },
    editIcon: {
        // transform: "translateY(-50%)",
        // top:"50%"
        top: "5px",
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
        top: "5px",
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
            position: "absolute",
            left: "-6px",
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
            padding: "0px 0px 10px 30px"
        },
        "& .MuiAccordionSummary-content": {
            color: "#000",
            fontSize: "12px",
            fontWeight: "700",
        }
    },
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
            position: "absolute",
            left: "-6px",
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
            padding: "0px 0px 10px 30px"
        },
        "& .MuiAccordionSummary-content": {
            color: "#000",
            fontSize: "12px",
            fontWeight: "700",
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
        cursor: "pointer",
        "& :hover": {
            color: "#00B4E5",
        }

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
    dataLoader: {
        width: "50px",
        margin: "139px"
    },
}))