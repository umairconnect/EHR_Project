import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    newAddBtn2: {
        width: "112px",
        width: "112px",
        height: "36px",
        borderRadius: "5px",
        border: "1px solid #11284B",
        margin: "0px 10px 0px 0px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        // position: "absolute",
        // top: "2px",
        '&:hover': {
            // backgroundColor: "#596270",
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            // color:"#11284B"
            color: "white",
        }
    },
    selectBox: {
        flexGrow: 0,
        maxWidth: "15%",
    },
    searchBox: {
        flexGrow: 0,
        maxWidth: "15%"
    },
    tabPan: {
        overflow: "initial !important",
        height: "initial !important",
        "& .ant-empty": {
            minHeight: "100%",
        },
        "& .ant-empty-description": {
            height: '430px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    },

    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            width: "95px",
            maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            // backgroundColor: "#00B2E3",
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
            minWidth: "95px"
        }
    },
    tabRoot: {
        maxWidth: "100%",
        borderBottom: "1px solid #DDDDDD",
        marginBottom: 15,
        '& .MuiTab-wrapper': {
            position: "relative",
            alignItems: "self-start",
        },
        '& .MuiTab-labelIcon': {
            minHeight: "auto",
        },
        '& .MuiBadge-root': {
            position: "absolute",
            right: "9px",
            top: "11px",
            '& .MuiBadge-badge': {
                background: "#00B4E5",
                color: "#fff"
            }
        }

    },
    searchInput: {
        border: "1px solid #E1E1E1",
        height: '38px',
        borderRadius: '5px',
        marginLeft: '10px',
        padding: '0 10px',
        // minWidth: '240px',
        color: '#25282B',
        paddingLeft: '10px',
        marginBottom: '10px',
        width: '100%',
    },
    resetButton: {
        width: "50px",
        minWidth: "50px",
        height: "36.65px",
        borderRadius: "5px",
        border: "1px solid #11284B",
        margin: 0,
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        marginLeft: 19,
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            color: "white",
        },
        "& .MuiButton-startIcon": {
            marginRight: 0,
            "& .MuiSvgIcon-root": {
                width: 22,
                height: 22
            }
        }
    },
    activeMessage: {
        height: "100%",
        display: 'block',
        position: "absolute",
        borderLeft: "4px solid #60b53e",
        width: 4,
        top: 0,
        left: 0,

    },
    deletedMessage: {
        height: "100%",
        display: 'block',
        position: "absolute",
        borderLeft: "4px solid #ff2b2b",
        width: 4,
        top: 0,
        left: 0,
    },
    linkName: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#5D8AB5",
        textDecoration: "underline",
        "&:hover": {
            color: "#00B4E5",
        }
    },
    PatientFwdText: {
        lineHeight: "16px",
        marginBottom: "-3px"
    },
    fwdText: {
        display: "block",
        color: "#52575C",
        lineHeight: "18px",
    },
    messageSection: {
        position: "relative",
        background: '#FFFFFF',
        border: '1px solid #E1E1E1',
        boxSizing: 'border-box',
        boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.05)',
        borderRadius: '8px',
        // padding: '15px'
        minHeight: '490px',
        // display: 'flex',
        alignItems: 'center',
        //  justifyContent: 'center',
    },
    noMessageText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '20px',
        color: '#52575C',
        display: 'flex',
        justifyContent: 'center',
    },
    messageHeader: {
        background: '#f0f0f0',
        borderRadius: '8px 8px 0px 0px',
        height: 53,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 15px',
        borderBottom: " 1px solid #E1E1E1",
        "& span": {
            display: 'flex',
            alignItems: 'center',
        }
    },
    messageFrom: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        color: '#11284B',
        paddingLeft: 0,
    },
    replyIcon: {
        width: '18px',
        height: '17px',
        margin: '0px 15px',
        cursor: 'pointer',
    },
    forwardIcon: {
        width: '24px',
        height: '14px',
        margin: '0px 15px',
        cursor: 'pointer',
    },
    importIcon: {
        width: '18px',
        height: '19px',
        margin: '0px 15px',
        cursor: 'pointer',
    },
    printIcon: {
        width: '18px',
        height: '19px',
        margin: '0px 15px',
        cursor: 'pointer',
    },
    messageBody: {
        padding: '5px 15px',
        "& section": {
            display: "flex",
            flexFlow: 'row',
            justifyContent: 'space-between'
        },
        '& .MuiTypography-gutterBottom': {
            marginBottom: 0
        }
    },
    messageFooter: {
        position: "absolute",
        bottom: "14px",
        left: "10px",
        "& section": {
            display: "flex",
            flexFlow: 'row',
            justifyContent: 'space-between'
        },
        '& .MuiTypography-gutterBottom': {
            marginBottom: 0
        }
    },
    fwdMessageTitle: {
        //fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '28px',
        letterSpacing: '0.01em',
        color: '#52575C',
    },
    fwdMessagePatientName: {
        //fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '25px',
        letterSpacing: '0.01em',
        color: '#25282B',
        '& span': {
            color: '#5D8AB5;'
        }
    },
    fwdMessagePatientContact: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '22px',
        letterSpacing: '0.01em',
        color: '#25282B',
    },
    fwdMessageTo: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '22px',
        letterSpacing: '0.01em',
        color: '#52575C',
    },
    fwdMessageDate: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '32px',
        textAlign: 'right',
        letterSpacing: '0.01em',
        color: '#52575C',
    },
    fwdMessageText: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        letterSpacing: '0.01em',
        color: '#52575C',
        paddingLeft: '10px'

    },
    forwardMessageSections: {
        background: "#F2F2F2",
        margin: "0px 0px 15px 0px",
        padding: "10px 15px 20px",
        borderRadius: "5px",
        "& section": {
            display: "flex",
            flexFlow: 'row',
            justifyContent: 'space-between'
        },
    },
    forwardMessageText: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '11px',
        lineHeight: '19px',
        letterSpacing: '0.01em',
        color: '#52575C',
    },
    forwardMessageTextBold: {
        // fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '11px',
        lineHeight: '28px',
        letterSpacing: '0.01em',
        color: '#52575C',
    },
    gridButtonsArea: {
        padding: "0px 10px",
        textAlign: "left",
        // position: "absolute",
        bottom: '20px'
    },
    gridButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: "normal",
        fontSize: "10px",
        lineHeight: "14px",
        color: "#00B2E3",
        padding: "6px 0px",
        minWidth: "60px"
    },
    activeLine: {
        backgroundColor: "#60b53e",
        display: "table",
        width: "5px",
        minHeight: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        //left: 0,
        left: "-44px",
    },
    deletedLine: {
        backgroundColor: "#5D8AB5",
        display: "table",
        width: "5px",
        minHeight: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        //left: 0,
        left: "-44px",
    },
    inPracticeColor: {
        color: "#5D8AB5",
        marginLeft: 10,
        "& span": {
            backgroundColor: "#5D8AB5",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 12,
        }
    },
    patientColor: {
        color: "#60b53e",
        marginLeft: 22,
        "& span": {
            backgroundColor: "#60b53e",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 12,
        }
    },
    infoIcon: {
        color: "#F2994A",
        marginTop: 9
    },
    attachIcon: {
        color: " #52575C",
        fontSize: 20,
        marginBottom: "-2px"
    },
    inOutEmail: {
        marginRight: 3,
        marginTop: "-8px"
    },

    dialogPaper: {
        maxWidth: '80%',
    },
    dialogcontent: {
        padding: "16px 24px 10px 24px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move",
    },
    content: {
        flex: "1 1 auto",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px"
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
    timeDisplay: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        textAlign: "left",
        textTransform: "uppercase"
    },
}));