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
    functionalStatusContain: {
        marginTop: '16px',
        // "& div": {
        //     display: "inline-block",
        //     marginBottom: "0px !important",
        //     margin: 0,
        // },
        "& span": {
            textAlign: 'right',
            width: '100%',
        },
        "& ul": {
            width: '100%',
            maxWidth: '100%',
            marginBottom: '4px',
            marginTop: '0px !important',
            "& li": {
                marginBottom: 0,
                paddingBottom: 0,
                "& div": {
                    
                }
            }
        },
        "& span": {
           // textAlign: 'right',
          //  paddingRight: '0px',
          //  width: '100%',
        },
        
    },
  
    CognitiveStatusContain: {
        paddingTop: '8px',
        "& ul": {
            display: 'inline-block',
        }
    },
    comlplaintrichTextEdit: {
        width: "100%",
        minHeight: "180px",
        maxHeight: "180px",
        margin: "10px 0px",
        overflow: "auto",
        "& .RichTextEditor__paragraph___3NTf9": {
            margin: "0",
        },
        "& .RichTextEditor__editor___1QqIU .public-DraftEditor-content": {
            minHeight: "75px",
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
        "& h4": {
            fontFamily: 'Lato',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "14px",
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
        "& .EditorToolbar__root___3_Aqz": {
            marginBottom: '0 !important',
        },
        "& .MuiAccordionDetails-root": {
            padding: "0px 0px",
            display: "unset !important",
            "& ul": {
                width: "100%",
                marginBottom: "4px",
                marginTop: 0,
            },
            "& div": {
                paddingBottom: 0,
              //  marginBottom: '8px',
                clear: "both",
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
}));