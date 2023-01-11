import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "620px",
        maxWidth: '650px',
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
    settingBox: {
        border: "1px solid #E1E1E1",
        borderRadius: "0px",
        width: "100%",
        padding: "10px",
        marginBottom: "5px",
        "& .MuiCheckbox-root": {
            padding: "0px 5px",
        },
        "& .MuiAccordion-root": {
            width: "100%",
            background: "transparent",
            border: "0",
            boxShadow: "none",
            padding: 0,
            margin: 0,
        },
        "& .MuiAccordionSummary-root": {
            padding: "0",
            minHeight: "unset",
        },
        "& hr": {
            margin: 0,
            opacity: 0.3,
        },
        "& .MuiAccordionDetails-root": {
            padding: "10px 0px",
        },
        "& .MuiAccordionSummary-content": {
            margin: 0,
        },
        "& .MuiAccordionSummary-expandIcon": {
            padding: "0 13px",
        },
        "& .MuiCollapse-wrapperInner": {
            marginTop: "8px",
        }
      
    },
    alignRight: {
        textAlign: "right",
    },
    expendIcon: {
        cursor: "pointer",
    }
}));