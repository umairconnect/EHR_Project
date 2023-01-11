import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    recentBox: {
        backgroundColor: "#F2F2F2",
        minHeight: "100vh",
        // maxWidth: "25%",
        maxWidth: "305px",
        width: "305px",
        marginTop: "-10px",
        transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"

    },
    shrinkedRecentBox: {
        backgroundColor: "#F2F2F2",
        minHeight: "100vh",
        width: "50px",
        marginTop: "-10px",
        transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
    },
    shrinkIcon: {
        marginTop: 10,
        cursor: "pointer"
    },
    smartShrinkIcon: {
        // margin: "10px 0px",
        cursor: "pointer"
    },
    dialogTitle: {
        cursor: "move"
    },
    recentHeader: {
        // display: "block",
        display: "flex",
        color: "#25282B",
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: "35px",
        padding: "0px 15px 0px 25px",
        marginTop: "-35px",
        flexWrap: "wrap",
    },
    smartRecentHeader: {
        // display:"block",
        display: "flex",
        alignItems: "center",
        color: "#25282B",
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: "35px",
        padding: "0px",
        // marginTop:"-35px"
    },
    addEnBtn: {
        color: "#00B2E3",
        fontSize: "14px",
        cursor: "pointer",
        fontWeight: "normal",
        display: "flex",
        alignItems: "center",
        // float: "right",
        // margin: "0px",
        "& img": {
            margin: "0 3px 0 3px"
            // margin: "0 0px -4px 0"
        },
        "&:hover": {
            color: "#11284B",
        }
    },
    smartAddEnBtn: {
        color: "#00B2E3",
        fontSize: "14px",
        cursor: "pointer",
        fontWeight: "normal",
        // float: "right",
        // paddingTop: 5,
        // margin:"0px",
        "& img": {
            // margin: "0 0px -4px 0"
        },
        "&:hover": {
            color: "#11284B",
        }
    },
    recentList: {
        margin: "0",
        padding: "0",
        position: "relative",
        listStyle: "none",
        borderTop: "solid #d5d5d5 1px",
        "& li": {
            width: "100%",
            display: "flex",
            position: "relative",
            boxSizing: "border-box",
            textAlign: "left",
            alignItems: "center",
            paddingTop: "8px",
            paddingBottom: "8px",
            justifyContent: "flex-start",
            textDecoration: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderBottom: "solid #d5d5d5 1px",
            "&:hover": {
                backgroundColor: "#e0e6f1",
                //opacity: "0.3"
            }
        }
    },
    listIcon: {
        minWidth: "56px",
        flexShrink: '0',
    },
    shrinkedListIcon: {
        minWidth: "30px",
        flexShrink: '0',
    },
    listContent: {
        flex: "1 1 auto",
        minWidth: "0",
        marginTop: "6px",
        marginBottom: "6px",
        color: "#52575C"
    },
    listContentTitle: {
        display: "block",
        marginBottom: "8px",
        fontWeight: "700",
        fontSize: "14px"

    },
    listContentCC: {
        display: "block",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    listOfficeVisit: {
        marginLeft: "30px",
        fontWeight: "400"
    },
    lableInput: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
    },
    recentSearch: {
        padding: "3px 15px",
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
    noRecordFound: {
        display: "block",
        textAlign: "center",
        color: "rgba(0,0,0,.25)",
        padding: "5% 0",
        '& span': {
            display: "block",
        },
        '& svg': {
            color: "rgba(0,0,0,.25)",
            fontSize: 70
        }
    },
    footerBtn: {
        // padding:" 0px 0 7px",
        // marginTop:13,
        bottom: "0px",
        //width: "55%",
        paddingLeft: "86%",
        display: "flex",
        zIndex: 3
    },
    selectedEncounter: {
        backgroundColor: "#e0e6f1",
        //  borderRadius:"5px",
        width: "100%",
        //  boxShadow:"0 0 5px 0 rgb(0 0 0 / 15%)",
    },
    addendumIcon: {
        width: 18,
        height: 24,
        margin: "0px 0px 0px 2px"
    },
    unSignedEncounterIcon: {
        width: "18px",
        height: "24px",
        cursor: "pointer",
        "& img": {
            width: "18px",
            height: "22px",
            margin: "0px 0px 0px 5px"
        }
    },
    //new makeStyles
    dialogPaper: {
        minWidth: "700px",
        maxWidth: '700px',
    },
    dialogContent: {
        // minWidth: "700px",
        maxWidth: '700px',
        padding: "10px 20px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        justifyContent: 'space-between',
        cursor: "pointer",
        borderBottom: '1px solid #DDDDDD',
        marginBottom: 10,
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
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    crossButton: {
        position: "relative",
        top: 0,
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    tabPan: {
        overflow: "initial !important",
        height: "initial !important",
    },
    muiPaper: {
        // width: "100%",
        // borderRadius: "10px 10px 0px 0px"
        "&.MuiPaper-elevation1": {
            boxShadow: "none"
        }
    },
    Htabs: {
        minHeight: "36px",
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            width: "150px",
            maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
            minHeight: '36px'
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            // backgroundColor: "#00B2E3",
            // borderRadius: " 0px 10px 0px 0px",
        },
        // "& button.Mui-selected:first-child": {
        // borderRadius: "10px 0px 0px 0px",
        // },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B2E3",
            color: "#11284B",
            // borderRadius:"10px 10px 0px 0px",
            // height: "100%",
        },
        "& .MuiTab-root": {
            minWidth: "150px"
        }
    },
    tabRoot: {
        maxWidth: "330px",
    },
    tabList: {
        marginTop: "-20px"
    },
    consentFormDataTable: {
        width: "100%",
        minWidth: "100%",
        marginBottom: "15px"
    },
    btnSpan: {
        display: "flex",
        width: "100%"
    },
    attachmentBtn: {
        position: "absolute",
        padding: "8px",
        right: "25px",
    },
    customTableGrid: {
        border: '1px solid #E1E1E1',
        borderRadius: "12px",
        marginBottom: 10,
    },
    inputGrid: {
        padding: "0 10px",
        '& .MuiTypography-root': {
            marginBottom: '0px !important'
        }
    },
    dividerSpan: {
        borderBottom: '1px solid #DDDDDD',
        height: '18px'
    },
    addNewButton: {
        background: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        textTransform: "none",
        boxShadow: "none",
        color: "#00B4E5",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: "normal",
        "&:hover": {
            background: "#FFFFFF",
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
            color: "#00B4E5",
        },
        "& .MuiButton-startIcon": {
            marginRight: "2px"
        }
    },
    Icon: {
        cursor: "pointer",
        width: "18px",
        height: "18px",
    },
}));
