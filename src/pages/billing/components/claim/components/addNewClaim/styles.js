import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    formPrintContainer: {
        '@media print': {
            display: "block",
            padding: "20px 10px",
            '& label': {
                marginBottom: 0,
            },
            '& $textAreaLabel': {

                '& div': {
                    minHeight: "50px",
                    marginTop: 0,
                    marginBottom: 10,
                },
            },
            '& $labelAlign': {
                textAlign: "left"
            }
            // '& $claimLableInput': {
            //     display: "none"
            // },
            // '& $copayLableInput': {
            //     display: "none"

            // }
        },
        // '@page': {
        //     size: "5cm 5cm",
        //     padding: "25px",
        // }
    },
    customLabel: {
        color: "#25282B",
        maxWidth: "20%",
        flexBasis: "20%",
        padding: "0 12px",
        textAlign: "right"
    },
    customField: {
        maxWidth: "30%",
        flexBasis: "30%",
    },
    revCodeList: {
        width: '100%',
    },
    cavityCode: {
        padding: '2px',
        fontSize:'12px',
    },
    AddNewClaimTabs: {
        boxShadow: "none",
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            fontSize: "16px",
            opacity: "1",
            minWidth: "auto",
            padding: "9px 25px 10px 25px",
        },
        "& button.Mui-selected": {
            fontWeight: "bold",
            minWidth: "auto"
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B4E5",
            height: "3px",
        }
    },

    tabHeader: {
        boxShadow: "none",
        backgroundColor: "white",
        borderBottom: "2px solid #A3A3A3",
    },
    tabs: {
        boxShadow: "none",
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            fontSize: "14px",
            opacity: "1",
            minWidth: "auto"
        },
        "& button.Mui-selected": {
            fontWeight: "bold",
            minWidth: "auto"
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B4E5",
            height: "3px",
        }
    },

    claimTabPanel: {
        width: "100% !important",
        overflow: "unset !important",
        height: "unset !important",
        paddingTop: "30px",
        borderTop: "1px solid #e4e4e4",
    },
    textAreaLabel: {

        '& div': {
            minHeight: "50px",
        },
    },
    claimContainer: {
        padding: "0px 12px",
    },
    labelAlign: {
        justifyContent: "flex-end",
        textAlign: "right",
        lineHeight: "37px",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
            textAlign: "left",
        },
    },
    claimLableInput: {
        paddingRight: 10,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "25%",
        minHeight: "40px",
        textAlign: "right"
    },
    copayLableInput: {
        paddingRight: 10,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "15%",
        minHeight: "40px",
        textAlign: "right"
    },
    mandatorColor: {
        color: "#ff0000",
        fontSize: 16,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        lineHeight: "10px"
    },
    addNew: {
        // marginLeft: 5,
        cursor: "pointer",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "10px 0px 0px 5px"
        }
    },
    printPayment: {
        cursor: "pointer",
        "& img": {
            width: "16px",
            height: "20px",
            margin: "10px 0px 0px 5px"
        }
    },
    addNote: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        "& img": {
            width: "17px",
            height: "17px",
            margin: "0 5px 0 0",
        }
    },
    editNote: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        "& img": {
            width: "17px",
            height: "17px",
            margin: "-3px 5px 0 0",
        }
    },
    addDiagnosis: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        marginLeft: "10px",
        display: "flex",
        alignItems: "center",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "0 5px 0 0",
        }
    },
    editDiagnosis: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        marginLeft: "10px",
        display: "flex",
        alignItems: "center",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "-3px 5px 0 0",
        }
    },
    addProcedures: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "0 5px 0 0",
        }
    },
    editProcedures: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "40px",
        minWidth: "150px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "-3px 5px 0 0",
        }
    },
    addNDC: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "28px",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "0px 0px 2px -3px",
        }
    },
    editNDC: {
        cursor: "pointer",
        color: "#00B4E5",
        lineHeight: "28px",
        "& img": {
            width: "16px",
            height: "16px",
            margin: "0px 0px 2px 0px",
        }
    },
    startAdornment: {
        background: "#E0E0E0",
        width: "25px",
        height: "38px",
        padding: "0px 0px 0px 5px",
    },
    noteText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "10px",
        padding: "15px 0px 0px",
        color: "#52575C",
    },
    subTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        margin: "10px 0px 18px",
        textAlign: "left",
        color: "#25282B",
    },
    labelAlign: {
        justifyContent: "flex-end",
        textAlign: "right",
        lineHeight: "37px",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
            textAlign: "left",
        },
    },

    smallCheckboxtwo: {
        display: "flex",
        flexFlow: "row wrap",
        width: "330px",
      
        "& label": {
            padding: "2px 1px",

        },
        "& span.MuiFormControlLabel-label": {
            display: "inline-flex",
            border: "1px solid #c9c9c9",
            width: "16px",
            fontSize: "11px",
        },
        "& span": {
            padding: 0,
            margin: 0,
            width: 0,
            textAlign: "center",
            justifyContent: "center",

        },
        "& .MuiFormControlLabel-labelPlacementTop": {
            margin: "0 1px !important",
        },
        "& .MuiSvgIcon-root": {
            width: "0.8em",
            height: "0.8em",
        },
        "& div:nth-child(n+16)": {

        }
    },

    smallCheckbox: {
        display: "flex",
        flexFlow: "row wrap",
        "& label": {
            padding: "2px 1px",

        },
        "& span.MuiFormControlLabel-label": {
            display: "inline-flex",
            border: "1px solid #c9c9c9",
            width: "16px",
            fontSize: "11px",
        },
        "& span": {
            padding: 0,
            margin: 0,
            width: 0,
            textAlign: "center",
            justifyContent: "center",

        },
        "& .MuiFormControlLabel-labelPlacementTop": {
            margin: "0 1px !important",
        },
        "& .MuiSvgIcon-root": {
            width: "0.8em",
            height: "0.8em",
        },
        "& div:nth-child(n+16)": {

        }
    },
    lableInput: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "6%",
        minHeight: "40px",
        textAlign: "right"
    },
    icdCodeTable: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        margin: "0px 0px 0px",
        "& thead": {
            background: "#FFFFFF",
            border: "1px solid #E1E1E1",
            borderRadius: "8px",
            backgroundColor: "#E0E0E0",
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
            width: "15px",
            height: "15px",
            margin: "3px 0px 0px 12px",
            cursor: "pointer"
        }
    },

    iformationTable: {
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        margin: " 0px 0px 15px",
        "& thead": {
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            minWidth: "100%",
            height: "35px",
            color: "#11284B",
            textAlign: "left",
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "12px",
            color: "#11284B",
            padding: "0px 0px 0 8px",
            textAlign: "left",
        },
        "& tr": {
            height: "35px"
        },
        "& td": {
            borderTop: "1px solid #E1E1E1",
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            color: "#11284B",
            padding: "8px"
        }
    },

    addinformationlist: {
        color: "#28b9e0",
        textTransform: "capitalize",
    },
    deleteIconIaction: {
        width: "22px",
        position: "relative",
        top: "-2px",
    },

    proceduresTable: {
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        margin: " 0px 0px 15px",
        "& thead": {
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            minWidth: "100%",
            height: "35px",
            color: "#11284B"
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "12px",
            color: "#11284B",
            padding: "0px 0px 0 8px",
            textAlign: "inherit",
        },
        "& tr": {
            height: "35px"
        },
        "& td": {
            borderTop: "1px solid #E1E1E1",
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            color: "#11284B",
            padding: "2px 0px 2px 9px"
        }
    },
    numberRight: {
        "& input": {
            textAlign: "right !important"
        },
        textAlign: "right !important"
    },
    numberCenter: {
        textAlign: "center !important"
    },
    subTh: {
        display: "inline-block",
        minWidth: "30px",
        maxWidth: "30px",
        textAlign: "center",
        fontSize: 10,
        letterSpacing: "2px",
        color: "#52575C",
    },
    subTd: {
        display: "inline-block",
        minWidth: "23px",
        maxWidth: "23px",
        textAlign: "center",
        margin: "0 4px",

        "& .MuiAutocomplete-root": {
            "& .MuiInputBase-root": {
                padding: "0 1px",
                borderRadius: "2px",
                fontSize: "12px",
                lineHeight: "21px",
                height: "21px",
                color: "#52575C",
                '&:focus': {
                    border: "1px solid #00b2e3",
                    borderRadius: "2px",
                    outline: 0,
                },
                "& .MuiInputAdornment-root": {
                    display: "none"
                }
            },
            "& .MuiAutocomplete-input": {
                paddingLeft: "2px",
                textOverflow: "clip",
            }
        },
    },
    unitTd: {
        display: "inline-block",
        minWidth: "46px",
        maxWidth: "46px",
        textAlign: "center",
        margin: "0 4px 0 0",
    },
    NDCCodeTd: {
        display: "inline-block",
        minWidth: "61px",
        maxWidth: "61px",
        textAlign: "center",
    },
    dateTd: {
        display: "inline-block",
        minWidth: "94px",
        maxWidth: "94px",
        margin: "0 4px 0 0",
    },
    tableInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        maxWidth: "94px",
        // color: "#52575C",
        color: "#000",
        fontSize: 12,
        padding: "0 2px",
        lineHeight: "21px",
        textAlign: "center"
    },
    deleteTd: {
        width: "15px",
        height: "15px",
        cursor: "pointer"
        /*float: "right",*/

    },
    dollarTd: {
        color: "#00B2E3",
        float: "right",
        fontSize: "16px",
        lineHeight: "14px",
        marginLeft: "5px",
        marginRight: "8px",
    },
    tdBold: {
        fontWeight: "bold !important",
        textAlign: "right !important"

    },
    checkBoxTable: {
        width: 16,
        height: 16,
        margin: "0 6px 0 0",
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    DialogContentRightSide: {
        flex: "1",
        padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        // padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },

    header: {
        flex: "0 1 auto",
        cursor: "move",
        display: "flex",
        padding: "0px 8px 0px 15px"
    },
    content: {
        flex: "1 1 auto",
        minHeight: "200px",
        overflow: "!important",
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
    claimTypeBody: { minWidth: "400px" },

    gridArea: {
        float: 'right',
        width: '70%',
        paddingTop: '8px',
    },
    
    gridButtonsArea: {
        padding: "5px 0px 5px 0px",
        marginBottom: "0px",
        textAlign: "right",
        borderBottom: "1px solid #f3f3f3",
        "& .MuiGrid-container": {
            maxHeight: "30px",
            height: "30px",
            "& .MuiTypography-body1": {
                fontStyle: "normal",
                fontSize: "14px",
                minHeight: "35px",
                textAlign: "left",
                fontFamily: "Lato",
                lineHeight: "35px",
            }
        }
    },
    gridButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#00B2E3",
        textTransform: "capitalize",
        minWidth: 48,
        "& a": {
            color: "#00B2E3",
            textDecoration: "none"
        }
    },
    footerBtn: {
        padding: " 0px 0 7px",
        position: "fixed",
        bottom: "0px",
        width: "82%",
        display: "flex",
        zIndex: 3,
        paddingLeft: "14.3%",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "6%"
        }
    },
    newAddBtn: {
        backgroundColor: "#11284B",
        color: "white",
        margin: "4.5px 16px -20px",
        height: 30,
        fontSize: 12,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        '&:hover': {
            backgroundColor: "#596270",
        },
        newAddBtnLink: {
            color: "white",
        },
        '& .MuiSvgIcon-root': {
            fontSize: 13,
        },
        '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
            margin: "0px 5px -2px 0"
        }
    },
    positionRelative: {
        position: "relative",
    },
    billingNotesText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "10px",
        lineHeight: "12px",
        color: "#52575C",
        textAlign: "right",
        margin: "-20px 8px 0px 0px"
    },
    posSpan: {
        width: "100%",
        minWidth: "100%",
        "& .MuiAutocomplete-root": {
            "& .MuiInputBase-root": {
                "& .MuiInputAdornment-root": {
                    display: "none"
                }
            },
        },
    },
    descriptionTd: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "150px",
    },
    modifierTd: {
        minWidth: 140,
    },
    serviceDateTd: {
        minWidth: 210,
    },
    dxCodeTd: {
        minWidth: 140
    },
    btnLink: {
        color: "#FFFFFF",
        textDecoration: "none",
        "&:hover": {
            color: "#FFFFFF"
        }
    },
    dialogPaper: {
        maxWidth: '85%',
        maxHeight: "calc(100% - 0px)",
    },
    dialogcontent: {
        padding: "16px 12px 10px 12px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move",
    },
    content: {
        flex: "1 1 auto",
        minHeight: "200px",
        overflow: "auto",
        marginBottom: "40px",
        "& .MuiPaper-elevation3": {
            minHeight: "740px !important"
        }
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
    NdcTd: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
    }
}));