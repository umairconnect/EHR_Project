import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "600px",
        height: "670",
        minHeight: "370px"
    },
    DialogContent: {
        minWidth: "600px",
        //display: "flex",
        padding: "20px 10px 10px 10px",
        overflow: "initial !important",
        height: "initial !important",
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
        // maxHeight: "450px",
        paddingRight: "15px",
        minHeight: "200px",
        overflow: "initial !important",
        height: "initial !important",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "20px",
        paddingBottom: "10px"
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
        width: "98%"
    },
    attachmentBtn: {
        position: "relative",
        padding: "8px",
        right: "35px",
    },
}));