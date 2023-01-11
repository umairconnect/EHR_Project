import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "650px",
        // minHeight: "70vh",
    },
    DialogContent: {
        minWidth: "650px",
        //display: "flex",
        padding: "20px 10px 10px 10px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        minHeight: "200px",
        // overflow: "auto",
        paddingBottom: "10px"
    },
    switchRight: {
        textAlign: 'right',
        marginLeft: 'auto',
    },
    contentArea: {
        display: "flex",
        flexWrap: "wrap"
    },
    footer: {
        flex: "0 1 40px",

    },
    footerRight: {
        textAlign: "center",
        marginRight: 10
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
    scrollbarContainer: {
        padding: "0px 10px",
        marginBottom: 2,
    },
    dialogHeading: {
        margin: "5px 0px 5px 20px",
        fontFamily: "Lato",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        color: "#000000",
    },
    itemContainer: {
        width: "100%",
        position: "relative",
        display: "flex",
        flexWrap: "wrap"
    },
    leftItemBox: {
        // height: "55px",
        maxHeight: "55px",
        // width:"240px",
        margin: "5px 10px 0px 5px",
        display: "flex",
        border: "1px solid #E1E1E1",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
        cursor: "move"
    },
    rightItemBox: {
        height: "55px",
        margin: "5px 10px 0px 5px",
        display: "flex",
        border: "1px solid #E1E1E1",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
    },
    dragIcon: {
        width: 18,
        height: 18,
        padding: 0,
        margin: 16,
        marginRight: 5,
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    itemTitle: {
        width: 150,
        fontFamily: "Lato",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        margin: 'auto',
        color: "#000000"
    },
    historyitemTitle: {
        width: 187,
        marginLeft: 15,
        fontFamily: "Lato",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "left",
        marginTop: 10,
        color: "#000000"
    },
    root: {
        width: 47,
        height: 22,
        padding: 0,
        zIndex: 1000,
        // left:85,
        // marginTop: 14,
        margin: "14px 10px 0px 0px"
    },
    customroot: {
        width: 47,
        height: 22,
        padding: 0,
        zIndex: 1000,
        // left:85,
        // marginTop: 14,
        margin: "3px 10px 0px 0px"
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
        width: 19,
        height: 19,
    },
    track: {
        borderRadius: 13,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: "#C4C4C4",
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
    historyBox: {
        // height: "55px",
        // height:"185px",
        maxHeight: "unset",
        minHeight: "fit-content",
        // margin: "10px 10px 0px 10px",
        // display:"inline-block",
        margin: "5px 10px 0px 5px",
        border: "1px solid #E1E1E1",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
        // width:"240px",
    },
    innerItemBox: {
        // height: "55px",   
        minHeight: "50px",
        maxHeight: "50px",
        display: "flex",
        flexFlow: "row",
        // border: "1px solid #E1E1E1",
        backgroundColor: "#FFFFFF",
        // boxSizing: "border-box",
        // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
        cursor: "move",
        // width:"240px",
        "& >span": {
            margin: '14px 0px 0px 11px',
        }
    },
    historyItemBox: {
        flex: 1,
        height: "content-fit",
        display: "flex",
        // border: "1px solid #E1E1E1",
        backgroundColor: "#FFFFFF",
        // boxSizing: "border-box",
        // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
        alignItems: "center",
        margin: "0px 0px 14px 0px",
    },
}));