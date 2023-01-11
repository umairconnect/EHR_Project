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
            "& div": {
                paddingBottom: 0,
                marginBottom: '8px',
            }
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

    tablelayout: {
        width: "100%",
        textAlign: "left",
        marginBottom: "10px",
        marginTop: "10px",
        border: "1px solid #e4e4e4",

        "& tr": {
          cursor: "pointer",
        },

        "& th": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "0.01em",
            color: "#000000d9",
            padding: "7px 5px",
            fontWeight: "600",
        },
        "& td": {
            fontFamily: "Lato",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "0.01em",
            color: "#000000d9",
            padding: "7px 5px",
            fontWeight: "normal",
        },
        "& thead": {
            background: "#F0F0F0",
        }
    },
    soapCareTitle: {
        display: "flex",
        alignItems: "flex-start",
        "& div": {
            paddingBottom: 0,
        },
    },
    printBtn: {
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
    noRecPadd: {
        padding: "4px 7px 0px",
    },
}));