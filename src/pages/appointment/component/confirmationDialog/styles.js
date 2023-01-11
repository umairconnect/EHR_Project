import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "550px",
        //minHeight: "92%"
    },
    DialogContent: {
        // minWidth: "550px",
        // minHeight: "675px",
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
    customMultiSelect: {
        width: "100%",
        border: "1px solid #e6e6e6",
        padding: "4px 5px",
        fontSize: "14px;",
        "& :focus": {
            background: "none !important",
        }
    },

    confirmMethodh3: {

        padding: "10px 0px 0 16px",
        fontWeight: "600",
        lineHeight: "1",
        color: "#172c4b",
        fontSize: "14px",

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
}));