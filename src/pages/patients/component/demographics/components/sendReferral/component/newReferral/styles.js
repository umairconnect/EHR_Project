import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    tabPan: {
        overflow: "initial !important",
        height: "initial !important",
       // border: "1px solid #DBDADA",
    },
    loader: {
        width: "42px",
    },
    loaderDiv: {
        width: "100%",
        textAlign: "center",
        marginTop: "8%",
    },
    refProviderName: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        maxWidth: "90%",
        display: "flow-root",
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
            width: "112px",
            maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            backgroundColor: "#00B2E3",
            borderRadius: " 0px 0px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& button.Mui-selected:last-child": {
            borderRadius: "0px 10px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B2E3",
            color: "#11284B",
            // borderRadius:"10px 10px 0px 0px",
            // height: "100%",
        },
        "& .MuiTab-root": {
            minWidth: "112px"
        }
    },
    tabRoot: {
        maxWidth: "330px",
    },
    tabList: {
        marginTop: "-20px"
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
        maxHeight: "495px",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px",
        backgroundColor: 'white',
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
    paper: {
        padding: "5px 10px",
        minWidth: "494px",
        maxWidth: "494px",
        minHeight: "275px",
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    mandatorColor: {
        color: "#ff0000",
        fontSize: 16,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        lineHeight: "10px"
    },
    muiPaper: {
        borderRadius: "10px 10px 0px 0px"
    },
    templatesList: {
        margin: "0px 0px 11px 0px",
        padding: "0",
        listStyle: "none",
        "& li": {
            position: "relative",
            fontSize: "12px",
            color: "#000",
            margin: 0,
            outline: 0,
            padding: "6px 12px 6px 17px",
            listStyle: "none",
            color: "#000",
            fontSize: 12,
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "#F3F3F3"
            }
        },
    },
    providerName: {
        color: "#25282B",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "14px",
        marginBottom: "8px",
        display: "block",
        width: "60%"
    },
    providerSpeciality: {
        top: "13px",
        right: "15px",
        position: "absolute",
        display: "inline-flex",
        zIndex: 1,
        justifyContent: "flex-end",
        fontSize: "12px",
        width: "40%",
        lineHeight: "15px",
    },
    attachmentReferral: {
        color: "#52575C;",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "14px",
        marginBottom: "8px",
        display: "block",
        maxWidth: '90%',
    },
    editIcon: {
        top: "28px",
        right: "16px",
        position: "absolute",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
        zIndex: 1,
        "& img": {
            width: "14px",
        }
    },
    attachmentIcon: {
        top: "28px",
        right: "16px",
        position: "absolute",
        width: "18px",
        display: "inline-flex",
        cursor: "pointer",
        zIndex: 1,
        "& svg": {
            fontSize: "18px",
        }
    },
    signIcon: {
        top: "5px",
        left: "12px",
        position: "absolute",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
        zIndex: 1,
        "& img": {
            width: "11px",
        }
    },
    attachmentLi: {
        paddingLeft: "35px !important ",
        borderBottom: "1px solid #DDDDDD"
    },
    providerType: {
        color: "#5D8AB5",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "14px",
        display: "block"
    },
    note: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "17px",
        color: "#52575C",
    },
    textAreaLabel: {
        marginBottom: 9
    },
    positionR: {
        position: "relative"
    },
    patientAddBtn: {
        position: "absolute",
        top: "-5px",
        right: "-55px"
    },
    caption: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "14px",
        color: "#52575C",
    },

    btnSpan: {
        display: "flex",
        width: "100%",
        position: "relative"
    },
    attachmentBtn: {
        position: "absolute",
        padding: "8px",
        right: "3px",
        background: "#f2f2f2",
        padding: "5px",
        margin: "1px",
        "&:hover": {
            background: "#f2f2f2",
        }
    },

    
    attachmentList: {
        width: "100%",
        listStyle: "none",
        padding: "0px",
        // borderCollapse:"separate",
        // borderSpacing:"0px 5px",
        // margin: "0px 20px",
        "& li": {
            height: "40px",
            padding: "10px",
            display: "flex",
            borderRadius: "5px",
            margin: "5px 0px 5px",
            backgroundColor: "#E0E0E0;",
        }
    },
    fileNameText: {
        color: " #25282B ",
        fontFamily: " Lato ",
        fontStyle: " normal ",
        fontWeight: " 600 ",
        fontSize: " 14px ",
        minWidth: "95%",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    attachmentDeleteBtn: {
        cursor: "pointer",
        color: "#d11a2a",
        transform: "rotate(45deg)",
    },
    includLink: {
        position: "relative",
        bottom: -10,
        textDecoration: 'underline',
        color: "#00b4e5",
        cursor: "pointer",
    },
    recentSearch: {
        padding: "3px 7px",
        marginTop: 5,
        "& .Mui-focused": {
            border: "1px solid #00b2e3",
            borderRadius: "4px",
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

                outline: 0,
            },
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },
        "& svg": {
            color: "#00B2E3"
        }
    },
    templateHeader: {
        background: " #EDEDED",
        color: "#25282B",
        fontWeight: "600",
        fontSize: "12px",
        paddingLeft: "23px",
        minHeight: "37px !important",
        height: "37px",
    },
    templateDetail: {
        display: "block",
        padding: '1px 0px',
        position: "relative",
        
    },

    referralDetail: {
        display: 'inline-block',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    templateList: {
        color: "#25282B",
        fontWeight: "400",
        fontSize: "12px",
        padding: "5px 24px",
        display: "block",
       cursor: "pointer",
       borderTop: '1px solid #f0f0f0',
        "&:hover": {
           backgroundColor: "#F3F3F3",
        }

    },
    attachmentDate: {
        color: "#52575C",
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
        alignItems: "flex-end",
        justifyContent: "flex-end",
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
        marginRight: 11,
    },
    deleteIcon: {
        float: "right",
        cursor: "pointer",
        paddingTop: 7,
        marginRight: 11,
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
       // border: "1px solid #DBDADA",
        borderRadius: "0px 0px 4px 4px",
        "& .MuiAccordion-rounded": {
            boxShadow: 'none',
        }
    },
    NoAttachment: {
        textAlign: 'center',
        padding: '10px',
        border: '1px solid #ebebeb',
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

        "& li": {
            position: "relative",
            fontSize: "12px",
            color: "#000",
            minHeight: 40,
            borderTop: '1px solid #f0f0f0',
            lineHeight: "30px",
            margin: 0,
            outline: 0,
            padding: "5px 12px 5px 12px",
            listStyle: "none",
            color: "#000",
            fontSize: 12,
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "#F3F3F3"
            }

        },
    },

    attachmentTemplateList: {
        margin: "11px 0px 11px 0px",
        padding: "0",
        listStyle: "none",
        width: '100%',

        "& li": {
            position: "relative",
            fontSize: "12px",
            color: "#000",
            minHeight: 40,
            borderTop: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0',
            lineHeight: "30px",
            cursor: 'auto',
            margin: 0,
            outline: 0,
            padding: "5px 12px 5px 13px",
            listStyle: "none",
            color: "#000",
            fontSize: 12,
            display: 'flex',
            alignItems: 'end',
            cursor: "pointer",
            // '&:hover': {
            //     backgroundColor: "#F3F3F3"
            // }

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
    addRosFooter: {
        flex: "0 1 40px",
        padding: "8px",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        display: "flex",
    },
}));