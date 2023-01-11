import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    listTitle: {
        color: "#25282B",
        fontSize: "16px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        padding: "0px 0px 20px 0px",
        "& span": {
            float: "left",
        }
    },
    addNew: {
        marginLeft: 15,
        cursor: "pointer"
    },
    treeView: {
        margin: 0,
        padding: 0,
        listStyle: "none",
        paddingLeft: "7px",
        // marginTop: 7,
        marginBottom: "20px",
        "& li": {
            marginTop: "7px",
            margin: 0,
            outline: 0,
            padding: 0,
            listStyle: "none",
        },
    },
    treeContent: {
        width: "100%",
        display: "flex",
        alignItems: "center",
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
    },
    noRecord: {
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop: "10px",
        paddingLeft: "20px",
        marginBottom: "20px",

    },
    DisnoRecord: {
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop: "0px !important",
        paddingLeft: "20px",
        marginBottom: "20px",
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
            padding: "8px 0px",
            "& ul": {
                width: "100%",
                marginBottom: "4px",
                marginTop: 0,
            },
            "& div": {
                paddingBottom: 0,
                marginBottom: '3px',
                marginTop: '3px',
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
