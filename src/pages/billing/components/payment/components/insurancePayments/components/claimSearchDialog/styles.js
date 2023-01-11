import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "950px",
        maxWidth: "950px",
        // minHeight: "650px",
        // maxHeight: "90%",
        // minHeight: "calc(100vh - 60px)",
        //minHeight: "92%"
    },
    dialogContent: {
        // minWidth: "950px",
        padding: "20px 15px 10px 15px",
        overflow: "hidden !important",
        height: "initial !important",
        // minHeight: "calc(100% - 64px)",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        minHeight: "100%",
        height: "100%",
        minHeight: 300,
        overflow: "initial !important",
        // height: "initial !important",
        "& .MuiButton-root": {
            marginLeft: "10px"
        },
        "& .MuiTypography-body1": {
            height: "24px",
            paddingTop: "3px"
        }
    },
    gridContainer: {
        minWidth: '100%',
    },
    footer: {
        flex: "0 1 40px",
        // position: "absolute",
        // bottom: "10px",
        // right: "10px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    widthSixty: {
        maxWidth: '50% !important',
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
    btnSpan: {
        display: "flex",
        width: "100%"
    },
    attachmentBtn: {
        // position: "absolute",
        padding: "8px",
        // right: "50px",
    },
    claimSearchTable: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        margin: " 0px 0px 15px",
        "& thead": {
            background: "#FFFFFF",
            border: "1px solid #E1E1E1",
            borderRadius: "8px",
            // backgroundColor: "#E0E0E0",
            backgroundColor: "#f6f6f6",
            minWidth: "100%",
            height: "30px",
            color: "#11284B",
            textAlign: "left"
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#52575C",
            padding: "0px 10px"
        },
        "& tr": {
            height: "30px"
        },
        "& td": {
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            color: "#11284B",
            padding: "5px 10px 0px 10px"
        },
        "& img": {
            width: "18px",
            height: "18px",
            marginTop: "3px",
            cursor: "pointer"
        }
    },
    scrollbarsInnerArea: {
        padding: "0 15px"
    }
}));