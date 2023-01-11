import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        maxWidth: "1100px",
        // maxHeight: "100%"
    },
    DialogContent: {
        // minHeight: "660px",
        minWidth: "1050px",
        display: "flex",
        padding: "10px 15px",

        // overflow: "auto"
    },
    smallDialogPaper: {
        // minHeight: "660px",
        minWidth: "970px",
        // maxWidth: "832px"
    },
    DialogContentLeftSide: {
        flex: "1",
        // backgroundColor: "#F4F4F4",
        padding: "12px 10px 5px 10px",
        maxWidth: "280px",
        flexBasis: "280px",
        // minHeight:"521px",
    },
    DialogContentRightSide: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    righInnerContent: {
        paddingRight: "10px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        // height: "100%",
        backgroundColor: "#FFFFFF",
        width: "100%"
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
        // marginBottom: "10px",
        display: "flex",
        // overflow: "initial !important",
        // height: "initial !important",
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
    footer: {
        flex: "0 1 40px",

    },
    footerRight: {
        float: "right",
        marginRight: "-8px",
        // [theme.breakpoints.down("lg")]: {
        //     marginRight:"150px",
        // },
        // [theme.breakpoints.down("xl")]: {
        //     marginRight:"150px",
        // },
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
    templatesList: {
        margin: "0px 0px 5px 0px",
        padding: "0",
        listStyle: "none",
        border: "1px solid #E0E0E0",
        borderRadius: "5px",
        minWidth: "100%",
        "& li": {
            position: "relative",
            color: "#00b2e3",
            display: "flex",
            width: "100%",
            lineHeight: "18px",
            margin: " 5px 0",
            outline: 0,
            padding: "6px 5px 6px 10px",
            fontSize: 14,
            cursor: "pointer",
            alignItems: "center",
            borderBottom: "1px solid #E0E0E0",
            '&:hover': {
                backgroundColor: "#F3F3F3"
            }

        }
    },
    loader: {
        width: "100px",
        margin: "90px"
    },
    //--//
    headerSubContainer: {
        display: "grid",
        maxWidth: "100%",
        gridAutoFlow: "column",
        gridTemplateColumns: "50% 50%"
        // gridTemplateColumns: "33% 25% 18%"
        // gridTemplateColumns: "35% 25% 17% 8%",
        // gridTemplateColumns: "35% 35% 20%",
        // gridTemplateColumns: "2fr 2fr 1fr",
    },
    headerSubContainerChild: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            display: "flex",
            minHeight: "21px",
            alignItems: "flex-start",
            // alignItems: "flex-start",
            "& a": {
                textDecoration: "underline !important"
            }
        },
        "& .PrivateSwitchBase-root": {
            padding: "0px",
        }
    },
    headerLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        color: "#25282B",
        textAlign: "left",
        maxWidth: "150px",
        padding: "0px 8px",
        minWidth: "170px",
    },
    labelValue: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color: "#52575C",
        textAlign: "left",
        padding: "0px 8px",
    },
    largeHeaderLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#25282B",
        textAlign: "left",
        padding: "0px 8px",
        maxWidth: "140px",
        minWidth: "120px",
    },
    largeLabelValue: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
        textAlign: "left",
        padding: "0px 8px",
    },
    allergyContainer: {
        display: "grid",
        maxWidth: "100%",
        gridAutoFlow: "column",
        gridTemplateColumns: "25% 25% 25% 25%"
    },
    allergySubContainer: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            display: "flex",
            minHeight: "21px",
            alignItems: "flex-start",
            // alignItems: "flex-start",
            "& a": {
                textDecoration: "underline !important"
            }
        },
        "& .PrivateSwitchBase-root": {
            padding: "0px",
        }
    },
    allergyHeaderLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        color: "#25282B",
        textAlign: "left",
        maxWidth: "150px",
        padding: "0px 8px",
        // minWidth: "170px",
    },
    allergyLabelValue: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color: "#52575C",
        textAlign: "left",
        padding: "0px 8px",
    },
    immunizationsContainer: {
        display: "grid",
        maxWidth: "100%",
        gridAutoFlow: "column",
        gridTemplateColumns: "20% 20% 20% 20% 20%"
    },
    immunizationSubContainer: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            display: "flex",
            minHeight: "21px",
            alignItems: "flex-start",
            // alignItems: "flex-start",
            "& a": {
                textDecoration: "underline !important"
            }
        },
        "& .PrivateSwitchBase-root": {
            padding: "0px",
        }
    },
    medicationsHeading: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        color: '#5D8AB5',
    },
    proceduresContainer: {
        display: "grid",
        maxWidth: "100%",
        gridAutoFlow: "column",
        gridTemplateColumns: "33% 33% 33% "
    },
    resultText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '28px',
        color: '#00B2E3',
    },
    resultTextBold: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '28px',
        color: '#000000',
    },
    resultLabel: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '28px',
        color: '#000000',
        textAlign: "right"
    },
    resultLabel2: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '28px',
        color: '#000000',
    },
    resultsTable: {
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
            backgroundColor: "#DADADA",
            minWidth: "100%",
            height: "32px",
            color: "#11284B",
            textAlign: "left"
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "12px",
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
            fontSize: "12px",
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
}));
