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
        padding: "10px",
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
        textTransform: "none"
    },
    // eobPaymentTable: {
    //     width: "100%",
    //     "& tr": {
    //         height: "32px",
    //         display: "flex",
    //         flexWrap: "wrap",
    //         alignContent: "center",
    //     },
    //     "& td": {
    //         fontFamily: "Lato",
    //         fontStyle: "normal",
    //         fontWeight: "normal",
    //         fontSize: "14px",
    //         textAlign: "left",
    //         color: "#52575C",
    //         padding: "0px 8px",
    //         minWidth: "170px",
    //         "& input": {
    //             color: "#52575C",
    //             background: "transparent",
    //             width: "100%",
    //             border: "none",
    //             fontSize: "14px",
    //             textAlign: "left",
    //             fontFamily: "Lato",
    //             '&:focus': {
    //                 textAlign: "left !important",
    //                 width: "100%",
    //                 border: "none",
    //                 outline: 0,
    //             },
    //         }
    //     },
    // },
    // valueTd: {
    //     width: "200px !important",
    //     minWidth: "200px !important",
    //     maxWidth: "200px !important",
    // },
    linkItem: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        textAlign: "left",
        color: "#00B4E5",
        padding: "0px 8px",
        textDecoration: "underline"
    },
    // linkItemProvider: {
    //     fontFamily: "Lato",
    //     fontStyle: "normal",
    //     fontWeight: "normal",
    //     fontSize: "14px",
    //     textAlign: "left",
    //     color: "#00B4E5",
    //     padding: "0px 8px",
    //     lineHeight: "40px",
    //     textDecoration: "underline"
    // },
    // labelTd: {
    //     fontFamily: "Lato",
    //     fontStyle: "normal",
    //     fontWeight: "normal",
    //     fontSize: "14px",
    //     color: "#25282B",
    //     textAlign: "right",
    //     maxWidth: "150px"
    // },
    // inputLabelTd: {
    //     fontFamily: "Lato",
    //     fontStyle: "normal",
    //     fontWeight: "normal",
    //     fontSize: "14px",
    //     color: "#25282B",
    //     textAlign: "right",
    //     lineHeight: "40px",
    //     maxWidth: "150px"
    // },
    // boldTd: {
    //     fontFamily: "Lato",
    //     fontStyle: "normal",
    //     fontWeight: "bold",
    //     fontSize: "14px",
    //     /* line-height: 17px", */
    //     color: "#25282B",
    //     textAlign: "right",
    //     maxWidth: "150px"
    // },
    // inputTd: {
    //     width: "220px !important",
    //     minWidth: "220px !important",
    //     maxWidth: "220px !important",
    // },
    // inputRow: {
    //     minHeight: "42px !important",
    //     alignContent: "flex-start !important",
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
            color: "#11284B",
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "12px",
            color: "#11284B",
            padding: "0px 0px 0 5px",
            textAlign: "inherit",
            minWidth: "80px"

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
            padding: "2px 0 2px 5px",
            "& .ant-input-number": {
                border: "none",
                height: "25px",
            },
            "& .ant-input-number-input": {
                lineHeight: "21px",
                minHeight: "25px",
                height: "25px"
            },

        }
    },
    activeLine: {
        backgroundColor: "#60b53e"
    },
    deletedLine: {
        backgroundColor: "#ff2b2b"
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
        minWidth: "60px",
        maxWidth: "100%",
        textAlign: "center",
        margin: "0 4px",

        "& .MuiAutocomplete-root": {
            marginBottom: 0,
            "& .MuiInputBase-root": {
                padding: "0 1px",
                borderRadius: "2px",
                fontSize: "12px",
                lineHeight: "21px",
                height: "25px",
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
    linkName: {
        color: "#00B4E5",
        fontSize: "14px",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    statusTd: {
        minWidth: "90px"
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
        textAlign: "right",
        minHeight: "25px",
        "&:disabled": {
            backgroundColor: "#f3f3f3",
            background: "#f3f3f3",
        },
        "input::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
        },
        "input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
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
    tableSelectInput: {
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
    deleteTdSpan: {

    },
    deleteTd: {
        width: "16px",
        height: "16px",
        cursor: "pointer"
    },
    tdBold: {
        padding: "2px 0 2px 5px",
        fontWeight: "bold !important",
        textAlign: "right !important"
    },
    actionTd: {
        minWidth: "100%",
        width: "100%",
        textAlign: "center"
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
    Btn: {
        // width:"112px",
        // height:"32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 0px 10px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        top: "2px",
        '& a svg': {
            float: "left",
            marginRight: 5,
        },
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
            '& a': {
                color: "white",
            },
        },
    },
    InputNumber: {

        "& .ant-input-number-input-wrap": {

            "& input": {
                color: "#4A4A4A",
                width: "100%",
                border: "none",
                fontSize: "14px",
                textAlign: "left",
                fontFamily: "Lato",
                '&:focus': {
                    textAlign: "left !important",
                    width: "100%",
                    border: "none",
                    outline: 0,
                },
            }
        },
        "& .ant-input-number-handler-wrap": {
            display: "none"
        },
        "& .ant-input-number-handler-wrap": {
            display: "none"
        }
    },
    //
    headerContainer: {
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
    },
    insuranceNameContainer: {
        display: "flex",
        minHeight: "32px"
    },
    headerSubContainer: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "33%",
        // gridTemplateColumns: "2fr 2fr 1fr",
    },
    headerSubContainerChild: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            display: "flex",
            minHeight: "32px",
            alignItems: "flex-start",
            "& a": {
                textDecoration: "underline !important"
            }
        },
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
        "& a": {
            color: "#00B4E5",
            textDecoration: "underline",
            ":hover": {
                cursor: "pointer"
            }
        }
    },
    inputTd: {
        width: "100%",
    }
}))