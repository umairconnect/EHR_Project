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
        color: "#00B2E3",
        margin: "2px 10px",
        display: "flex",
        fontSize: "14px",
        fontStyle: "normal",
        alignItems: "center",
        fontFamily: "Lato",
        fontWeight: 500,
        lineHeight: '17px',
        "& img": {
            margin: "0 5px",
        }
    },
    treeView: {
        margin: 0,
        padding: 0,
        listStyle: "none",
        paddingLeft: "7px",
        // marginTop: 7,
        marginBottom: "10px",
        "& li": {
            margin: 0,
            outline: 0,
            padding: 0,
            listStyle: "none",
            cursor: "pointer",
            margin: "0px 0",
            "& :hover": {
               // color: "#00B4E5",
            },
        },
    },
    treeLabel: {
        color: "#5D8AB5",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
    },
    DistreeLabel: {
        color: "#52575C",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
        cursor: 'default',
    },

    noRecord: {
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        // marginTop:"10px",
        marginTop: "5px",
        paddingLeft: "20px",
        // marginBottom: "10px",
        marginBottom: "20px",
        fontWeight: "500",

    },

    treeIcon: {
        width: 15,
        display: "flex",
        flexShrink: 0,
        marginRight: 4,
        justifyContent: 'center',
        "& SVG": {
            fill: "#00B4E5",
            fontSize: "22",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
        },
    },
    DistreeIcon: {
        width: 15,
        display: "flex",
        flexShrink: 0,
        marginRight: 4,
        justifyContent: 'center',
        "& SVG": {
            fill: "#52575C",
            fontSize: "22",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
        },
    },
    treeContentHover: {
        width: "100%",
        display: "flex",
        cursor: "pointer",

    },
    treeContent: {
        width: "100%",
        display: "flex",
        marginTop: "0px",
        marginBottom: "0px",

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
                marginBottom: "0px",
                marginTop: 0,
            },
            "& div": {
                paddingBottom: 0,
                marginBottom: '0px',
                marginTop: '2px',
            }
        },
        "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "flex-start",
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
    }
}));