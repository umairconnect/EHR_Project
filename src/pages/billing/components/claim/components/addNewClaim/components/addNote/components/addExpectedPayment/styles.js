import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "450px",
        maxWidth: "80%"
        //minHeight: "92%"
    },
    dialogContent: {
        minWidth: "550px",
        padding: "20px 10px 10px 10px"
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
        //maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
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
}));