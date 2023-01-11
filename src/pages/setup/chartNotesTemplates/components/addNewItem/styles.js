import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "720px",
        maxWidth: '750px',
    },
    physicalExamDailog: {
        minWidth: "520px",
        maxWidth: '550px',
    },
    dialogContent: {
        padding: "20px 10px 10px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "pointer"
    },
    contentContainer: {
        marginBottom: "10px",
        padding: "12px",
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "580px",
        minHeight: "200px",
        // overflow: "auto",
        marginBottom: "10px"
    },
    CustomSelectEditor: {
        width: "200px",
        float: "right",
        position: "absolute",
        top: '20px',
        right: '11px',
        "& select": {
            border: "1px solid #dddddd",
            padding: "9px 12px",
            fontSize: "14px",
            borderRadius: "5px",
        }
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
    comlplaintrichTextEdit: {
        width: "100%",
        margin: "10px 0px",
        overflow: "auto",
        "& .RichTextEditor__paragraph___3NTf9": {
            margin: "0",
        },
        "& .RichTextEditor__editor___1QqIU": {
            maxHeight: "260px",
            minHeight: "260px",
            overflow: "auto",
        },
        "& .RichTextEditor__editor___1QqIU .public-DraftEditor-content": {
            minHeight: "202px",
        }
    },
}));