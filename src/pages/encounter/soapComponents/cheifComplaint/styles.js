import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    listTitle: {
        display: "flex",
        alignItems: "flex-start",
        "& img": {
            marginLeft: "5px",
            marginRight: "5px",
        },
        "& span": {
            fontFamily: 'Lato',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "17px",
            color: "#00B2E3",
            margin: "2px 10px",
            display: "flex",
            alignItems: "center",
        },
    },
    treeView: {
        padding: "0 11px",
        listStyle: "none",
    },
    treeContent: {
        "& p": {
            marginBottom: 0,
            wordWrap: 'break-word',
            minWidth: '600px',
            width: '600px',
            marginBottom: 0,
        }
    },
    mylist: {
        "& ul": {
            padding: "0 11px",
            listStyle: "none",
        }
    },
    myHPI: {
        width: "100%",
        paddingTop: "12px",
        borderTop: "1px solid #dddddd",
        marginTop: "5px",
        paddingBottom: 0,
        "& img": {
           display:"none",
        }
    },
    addNew: {
        cursor: "pointer",
    },
    soapBox: {
        margin: "10px 0px",
        padding: "12px 10px",
        background: "#F8F8F8",
        border: "1px solid #E1E1E1",

        "& h3": {
            fontFamily: 'Lato',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "19px",
        },
        "& textarea": {
            padding: "10px",
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
            padding: "0px 0px",
            "& ul": {
                width: "100%",
                marginBottom: "4px",
                marginTop: 0,
            },
          
        },
        "& .MuiAccordionSummary-content": {
            margin: 0,
            "& div": {
                paddingBottom: 0,
            }
        },
        "& .MuiAccordionSummary-expandIcon": {
            padding: "0 13px",
        },
        "& .MuiCollapse-wrapperInner": {
            marginTop: "0px",
        }
    },
    noRecord: {
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        paddingLeft: "20px",
        marginBottom: "10px",

    },
}));