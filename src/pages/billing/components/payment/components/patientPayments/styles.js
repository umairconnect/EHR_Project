import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    shadowBox: {
        padding: "15px 15px 60px 15px",
        border: "1px solid #E8E8E8",
        borderRadius: "10px",
        minHeight: "calc(100vh - 60px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        marginBottom: "-23px"
    },
    searchArea: {
        // minHeight: "320px",
        // background: "#f1f1f2",
        background: "#F8F8F8",
        margin: "10px 0px 0px",
        padding: "15px 20px",
        borderRadius: "5px",
        border: "1px solid #E1E1E1",
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
        // "& .MuiFormLabel-root": {
        //     marginBottom: 5
        // },
    },
    title: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        color: "#000000",
        margin: "8px ​0px 0px 0p"
    },
    customGrid: {
        minHeight: "50px",
        // marginBottom: "10px"
    },
    gridArea: {
        // margin: "0px 20px",
    },
    gridButtonsArea: {
        padding: "10px 0px 10px 10px",
        textAlign: "right",
    },
    eobActionButtonsArea: {
        padding: "0px 10px",
        textAlign: "right",
    },
    gridButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "14px",
        color: "#00B2E3",
        textTransform: "none",
        paddingRight: 5,
        textDecoration: "underline"
    },
    newAddBtn: {
        backgroundColor: "#11284B",
        color: "white",
        margin: "4.5px 16px 0",
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
    stickySave: {
        jusitfyContent: "center",
        position: 'fixed',
        bottom: '3px',
        left: '75px',
    },
    editButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        textDecoration: "underline",
        textTransform: "none",
        color: "#00B2E3",
    },
    // eobPaymentTable: {
    //     width: "100%",
    //     "& tr": {
    //         height: "48px",
    //     },
    //     "& td": {
    //         fontFamily: "Lato",
    //         fontStyle: "normal",
    //         fontWeight: "normal",
    //         fontSize: "14px",
    //         textAlign: "left",
    //         color: "#52575C",
    //         padding: "0px 8px"
    //     },
    // },
    // linkItem: {
    //     fontFamily: "Lato",
    //     fontStyle: "normal",
    //     fontWeight: "normal",
    //     fontSize: "14px",
    //     textAlign: "left",
    //     color: "#00B4E5",
    //     padding: "0px 8px",
    //     textDecoration: "underline"
    // },
    // labelTd: {
    //     fontFamily: "Lato",
    //     fontStyle: "normal",
    //     fontWeight: "normal",
    //     fontSize: "14px",
    //     /* line-height: 17px", */
    //     color: "#25282B",
    //     textAlign: "right",
    // },
    // boldTd: {
    //     fontFamily: "Lato",
    //     fontStyle: "normal",
    //     fontWeight: "bold",
    //     fontSize: "14px",
    //     /* line-height: 17px", */
    //     color: "#25282B",
    //     textAlign: "right",
    // },
    //html table
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
            padding: "0px 0px 0 5px",
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
            padding: "2px 0px 2px 5px",
            "& .ant-input-number": {
                border: "none",
                height: "25px",
                width: "120px"
            },
            "& .ant-input-number-input": {
                lineHeight: "21px",
                minHeight: "25px",
                height: "25px"
            },
        }
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
    statusTh: {
        minWidth: "120px",
        paddingLeft: "30px !important"
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
    inputTableTd: {
        minWidth: "120px",
        textAlign: "right !important"
    },
    statusTd: {
        minWidth: "120px",
        paddingLeft: "30px !important"
    },
    tableInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        minWidth: "100%",
        maxWidth: "38px",
        color: "#52575C",
        fontSize: 12,
        padding: "0 2px",
        lineHeight: "21px",
        textAlign: "center",
        minHeight: "25px",
        "&:disabled": {
            backgroundColor: "#f3f3f3",
            background: "#f3f3f3",
        }
    },
    tableInputPayment: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        minWidth: "100%",
        maxWidth: "38px",
        color: "#52575C",
        fontSize: 12,
        padding: "0 2px",
        lineHeight: "21px",
        textAlign: "right",
        minHeight: "25px",
        "&:disabled": {
            backgroundColor: "#f3f3f3",
            background: "#f3f3f3",
        }
    },
    tableSelect: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        minWidth: "100%",
        maxWidth: "38px",
        color: "#52575C",
        fontSize: 12,
        padding: "0 2px",
        lineHeight: "21px",
        textAlign: "left",
        minHeight: "25px",
        "&:disabled": {
            backgroundColor: "#f3f3f3",
            background: "#f3f3f3",
        }
    },
    tablePaymentInput: {
        "& input": {
            border: "1px solid #DDDDDD",
            borderRadius: "4px",
            width: "100%",
            minWidth: "100%",
            maxWidth: "38px",
            color: "#52575C",
            fontSize: 12,
            padding: "0 2px",
            lineHeight: "21px",
            textAlign: "right",
            minHeight: "25px",
            "&:disabled": {
                backgroundColor: "#f3f3f3",
                background: "#f3f3f3",
            },
            '&:focus': {
                //textAlign: "left !important",
                width: "100%",
                border: "1px solid #00b2e3",
                borderRadius: "4px",
                outline: 0,
            },

        },
        "& .ant-input-number-handler-wrap": {
            display: "none"
        }
    },
    printTd: {
        width: "15px",
        height: "18px",
        cursor: "pointer",
        marginRight: "10px"
    },
    tdBold: {
        fontWeight: "bold !important",
        textAlign: "right !important"
    },
    amountTd: {
        textAlign: "right !important",
        minWidth: "120px"
    },
    startBalanceTd: {

    },
    //
    headerContainer: {
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
    },
    insuranceNameContainer: {
        display: "flex",
        minHeight: "32px",
        alignItems: "center"
    },
    headerSubContainer: {
        display: "grid",
        maxWidth: "100%",
        gridAutoFlow: "column",
        gridTemplateColumns: "33% 25% 18%"
        // gridTemplateColumns: "35% 25% 17% 8%",
        // gridTemplateColumns: "35% 35% 20%",
        // gridTemplateColumns: "2fr 2fr 1fr",
    },
    headerSubContainerChild: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            display: "flex",
            minHeight: "32px",
            alignItems: "center",
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
        fontSize: "14px",
        color: "#25282B",
        textAlign: "right",
        maxWidth: "150px",
        padding: "0px 8px",
        minWidth: "170px",
    },
    labelValue: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#52575C",
        textAlign: "left",
        padding: "0px 8px",
    },
    inputTd: {
        width: "100%",
        minWidth: "100%",
        margin: "0px 8px",
        alignItems: "flex-start !important",
        "& .MuiCheckbox-root": {
            padding: "0 5px 0 0 !important"
        }
    },
    headerBtnContainer: {
        position: "absolute",
        right: "30px"
    }
}))