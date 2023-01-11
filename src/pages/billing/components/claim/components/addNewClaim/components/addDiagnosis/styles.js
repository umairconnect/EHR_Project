import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    tabPan: {
        width: "100%",
        overflow: "initial !important",
        height: "initial !important",
    },
    loader: {
        width: "42px",
    },
    

    unspecified: {
        position: 'relative',
        marginLeft: '25px',
        '&:before': {
            content: "''",
            top: '-2px',
            left: '-26px',
            width: '20px',
            height: '20px',
            borderRadius: '50px',
            position: 'absolute',
            backgroundColor: "yellow",
          }
    },

 
    
    ExpiredCod: {
        position: 'relative',
        marginLeft: '25px',
        '&:before': {
            content: "''",
            top: '-2px',
            left: '-26px',
            width: '20px',
            height: '20px',
            borderRadius: '50px',
            position: 'absolute',
            backgroundColor: "#EB5B5B",
          }
    },

    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            width: "165px",
            maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            backgroundColor: "#00B2E3",
            borderRadius: " 0px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B2E3",
            color: "#11284B",
            // borderRadius:"10px 10px 0px 0px",
            // height: "100%",
        },
        "& .MuiTab-root": {
            minWidth: "165px"
        }
    },
    tabRoot: {
        maxWidth: "330px",
    },

    divider: {
        marginBottom: "10px"
    },
    //New Styles.
    DialogContent: {
        minWidth: "950px",
        display: "flex",
    },
    DialogContentLeftSide: {
        flex: "1",
        backgroundColor: "#F4F4F4",
        padding: "8px 10px 5px 10px",
        maxWidth: "350px",
        flexBasis: "350px",
        // minHeight:"521px",
    },
    DialogContentRightSide: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    leftHeader: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move",
        flexWrap: "wrap"
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move",
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "495px",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "10px"
    },
    footer: {
        flex: "0 1 40px",
        display: "flex",
        justifyContent: "space-between",
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
    leftSideHeader: {
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "10px 10px 0 0",
        height: "47px",
    },
    quickPickHeader: {
        display: "flex",
        // border: "1px solid #DBDADA",
        borderRadius: "0px 0px 4px 4px",
    },
    muiPaper: {
        borderRadius: "10px 10px 0px 0px"
    },
    dataLoader: {
        width: "50px",
        margin: "139px"
    },
    //
    listHeader: {
        // padding: "12px 0px 8px 0px",
        padding: '12px 5px 8px 5px',
        borderBottom: "1px solid #DBDADA",
        borderTop: "1px solid #DBDADA",
        width: "100%",
        backgroundColor: "#FFFFFF"
    },
    templatesList: {
        margin: "0px 0px 5px 0px",
        padding: "0",
        listStyle: "none",
        maxHeight: "550px",

        "& li": {
            position: "relative",
            fontSize: "12px",
            color: "#000",
            display: "flex",
            width: "100%",
            // height:30,
            lineHeight: "30px",
            margin: 0,
            outline: 0,
            padding: "0 5px 0 5px",
            listStyle: "none",
            color: "#000",
            fontSize: 12,
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "#F3F3F3"
            }

        }
    },
    templatesHeaderCode: {
        color: "#52575C",
        minWidth: 70,
        fontSize: 13,
        fontWeight: "bold",
        float: "left",
        fontFamily: "Lato",
        padding: "0px 0px 0px 5px",
    },
    templatesCode: {
        color: "#52575C",
        minWidth: 70,
        fontSize: 12,
        float: "left",
        padding: "0px 0px 0px 5px",
    },
    templatesHeaderDescription: {
        width: "100%",
        color: "#52575C",
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: "Lato",
        padding: "0px 10px 0px 0px",
    },
    templatesDescription: {
        width: "100%",
        color: "#52575C",
        fontSize: 12,
        float: "left",
        // right: 5,
        position: "relative",
        marginRight: "15px",
        padding: "0px 10px 0px 0px",
    },
    deleteItemIcon: {
        marginTop: "15px",
        float: "right",
        transform: "translateY(-50%)",
        width: "14px",
        display: "inline-flex",
        cursor: "pointer",
        position: "absolute",
        right: 8,
        "& img": {
            width: "14px",
            header: "14px",
        }
    },
    tabPanel: {
        width: "330px",
        minHeight: "440px",
        margin: "0px",
        backgroundColor: "#FFFFFF",
        borderRadius: "0px",
        // border: "1px solid #DBDADA"
        // overflow: "auto"
    },
    icdCodeTable: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        margin: " 0px 0px 15px",
        "& thead": {
            background: "#FFFFFF",
            border: "1px solid #E1E1E1",
            borderRadius: "8px",
            // backgroundColor: "#E0E0E0",
            backgroundColor: "#f6f6f6",
            minWidth: "100%",
            height: "30px",
            color: "#11284B",
            textAlign: "left"
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#52575C",
            padding: "0px 10px"
        },
        "& tr": {
            height: "30px"
        },
        "& td": {
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            color: "#11284B",
            padding: "5px 10px 0px 10px"
        },
        "& img": {
            width: "18px",
            height: "18px",
            marginTop: "3px",
            cursor: "pointer"
        }
    },
    linkText: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "14px",
        textAlign: "right",
        textDecoration: "underline",
        color: "#25282B",
        padding: "10px 0px 10px 10px",
        cursor: "pointer"
    },
    procedureNoteText: {
        // fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "14px",
        textAlign: "right",
        color: "#25282B",
        margin: "10px 0px 20px 0px"
    },
    procedureNoteTextHeading: {
        // fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "14px",
        textAlign: "right",
        color: "#25282B",
        margin: "10px 0px 20px 0px"
    }
}))