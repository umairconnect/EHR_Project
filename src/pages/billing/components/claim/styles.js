import { BottomNavigation } from "@material-ui/core";
import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        maxWidth: '80%',
    },
    dialogcontent: {
        padding: "16px 24px 10px 24px"
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
        position: "relative",
    },
    content: {
        flex: "1 1 auto",
    },
    crossButton: {
        position: "absolute",
        top: "-13px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
    },
    searchArea: {
        // minHeight: "320px",
        background: "#f1f1f2",
        margin: "10px 20px 0px",
        padding: "20px 20px 0px",
        borderRadius: "5px",
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
        // "& .MuiFormLabel-root": {
        //     marginBottom: 5
        // },
    },
    gridArea: {
        margin: "0px 20px",
        '& .custom-grid': {
            '& table thead>tr>th': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12,
                height: 40
            },

            '& table tbody>tr>td': {
                lineHeight: "normal",
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12
            },

            '&  .ant-table tfoot>tr>td': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12,
                textAlign: "right",
                "& input": {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#000000d9",
                    textAlign: "right",
                }
            },
            // "& .ant-pagination-item": {
            //     border: "none",
            //     color: "rgba(0, 0, 0, 0.85)"
            // },
            // "& .ant-pagination-prev, .ant-pagination-next": {
            //     border: "none"
            // },
            // "& .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link": {
            //     border: "none"
            // }
        }
    },
    gridButtonsArea: {
        padding: "10px",
        textAlign: "right",
    },
    gridButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "14px",
        color: "#00B2E3",
        textTransform: 'none',
        "& a": {
            color: "#00B2E3",
            textDecoration: "none"
        }
    },
    newAddBtn2: {
        width: "114px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "5px 0px 5px 20px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        float: "left",
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            color: "white",
        },
        "& .MuiSvgIcon-root": {
            width: "18px",
            height: "18px",
            marginRight: "5px"
        }
    },
    customGrid: {
        minHeight: "45px",
        "& .MuiButton-root": {
            margin: "0px 0px 10px 10px"
        },
        "& .MuiFormLabel-root": {
            marginBottom: "10px !important"
        }
        // marginBottom: "10px"
    },
    // collapseBtn: {
    //     width: "32px",
    //     minWidth: "32px",
    //     height: "32px",
    //     borderRadius: "8px",
    //     border: "1px solid #11284B",
    //     margin: "5px 20px 5px 0",
    //     color: "#11284B",
    //     backgroundColor: "#F9F9F9",
    //     boxSizing: "border-box",
    //     fontSize: 15,
    //     fontFamily: "Lato",
    //     textTransform: "none",
    //     padding: "0 12px",
    //     position: "relative",
    //     float: "right",
    //     '&:hover': {
    //         backgroundColor: "#11284b",
    //         color: "white",
    //     },
    //     newAddBtnLink: {
    //         color: "white",
    //     },
    //     "& .MuiSvgIcon-root": {
    //         width: "25px",
    //         height: "25px",
    //     }
    // },
    labelAlign: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    claimLableInput: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "10%",
        minHeight: "40px",
        textAlign: "right"
    },
    dateInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        height: "37.63px",
        color: "#52575C",
        fontSize: 14,
        padding: "0 8px 0px 0px",
        lineHeight: "21px",
        textAlign: "center"
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
        }
    },
    Icon: {
        width: "18px",
        height: "18px",
        cursor: "pointer",
        marginLeft: 5,
    },
    deleteIcon: {
        cursor: "pointer",
        // right: "7px",
        // paddingTop: "5px",
        // position: "absolute",
        color: "#FD5F5F",
        // justifyContent: "center",
        right: "-7px",
        position: "absolute",
        paddingTop: 0,
        top: "50%",
        transform: "translate(-50%,-45%)",
        "& svg": {
            transform: "rotate(45deg)",
            fontSize: 22
        },
    },

    orderList: {
        margin: "5px 1px 10px 1px",
        padding: "0px",
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        "& li": {
            color: '#5D8AB5',
            // height: "35px",
            minHeight: "30px",
            outline: 0,
            // padding: "0 12px 0 12px",
            padding: "5px 30px 5px 12px",
            position: "relative",
            fontSize: "12px",
            background: "#f6f6f6",
            fontWeight: "600",
            border: "1px solid #E1E1E1",
            boxSizing: "border-box",
            boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
            borderRadius: "25px",
            minWidth: "115px",
            // maxWidth: "220px",
            // width: "120px",
            margin: "0px 4px 8px 0px"
        },
    },

    //
    // proceduresTable: {
    //     background: "#FFFFFF",
    //     border: "1px solid #E1E1E1",
    //     boxSizing: "border-box",
    //     borderRadius: "4px",
    //     width: "100%",
    //     borderCollapse: "collapse",
    //     margin: " 0px 0px 15px",
    //     "& thead": {
    //         border: "none",
    //         borderRadius: "8px",
    //         backgroundColor: "#fafafa",
    //         minWidth: "100%",
    //         height: "35px",
    //         color: "#11284B"
    //     },
    //     "& th": {
    //         fontStyle: "normal",
    //         fontWeight: "bold",
    //         fontSize: "12px",
    //         color: "#11284B",
    //         padding: "0px 0px 0 8px",
    //         textAlign: "inherit",
    //     },
    //     "& tr": {
    //         height: "35px"
    //     },
    //     "& td": {
    //         borderTop: "1px solid #E1E1E1",
    //         textAlign: "left",
    //         fontStyle: "normal",
    //         fontWeight: 400,
    //         fontSize: "12px",
    //         color: "#11284B",
    //         padding: "2px 0px 2px 9px"
    //     }
    // },
    // subTh: {
    //     display: "inline-block",
    //     minWidth: "30px",
    //     maxWidth: "30px",
    //     textAlign: "center",
    //     fontSize: 10,
    //     letterSpacing: "2px",
    //     color: "#52575C",
    // },
    // subTd: {
    //     display: "inline-block",
    //     minWidth: "23px",
    //     maxWidth: "23px",
    //     textAlign: "center",
    //     margin: "0 4px",

    //     "& .MuiAutocomplete-root": {
    //         "& .MuiInputBase-root": {
    //             padding: "0 1px",
    //             borderRadius: "2px",
    //             fontSize: "12px",
    //             lineHeight: "21px",
    //             height: "21px",
    //             color: "#52575C",
    //             '&:focus': {
    //                 border: "1px solid #00b2e3",
    //                 borderRadius: "2px",
    //                 outline: 0,
    //             },
    //             "& .MuiInputAdornment-root": {
    //                 display: "none"
    //             }
    //         },

    //     },
    // },
    // dateTd: {
    //     display: "inline-block",
    //     minWidth: "94px",
    //     maxWidth: "94px",
    //     margin: "0 4px 0 0",
    // },
    // tableInput: {
    //     border: "1px solid #DDDDDD",
    //     borderRadius: "4px",
    //     width: "100%",
    //     maxWidth: "94px",
    //     color: "#52575C",
    //     fontSize: 12,
    //     padding: "0 2px",
    //     lineHeight: "21px",
    //     textAlign: "center"
    // },
    // NDCCodeTd: {
    //     display: "inline-block",
    //     minWidth: "61px",
    //     maxWidth: "61px",
    //     textAlign: "center",
    // },
    // addNDC: {
    //     cursor: "pointer",
    //     color: "#00B4E5",
    //     lineHeight: "28px",
    //     "& img": {
    //         width: "20px",
    //         height: "20px",
    //         margin: "0 0px -5px 5px",
    //     }
    // },
    // unitTd: {
    //     display: "inline-block",
    //     minWidth: "46px",
    //     maxWidth: "46px",
    //     textAlign: "center",
    //     margin: "0 4px 0 0",
    // },
    // dollarTd: {
    //     color: "#00B2E3",
    //     float: "right",
    //     fontSize: "16px",
    //     lineHeight: "14px",
    //     marginLeft: "5px",
    //     marginRight: "8px",
    // },
    // deleteTd: {
    //     width: "15px",
    //     height: "15px",
    //     float: "right",

    // },
    // addNote: {
    //     cursor: "pointer",
    //     color: "#00B4E5",
    //     lineHeight: "40px",
    //     minWidth: "150px",
    //     fontSize: "14px",
    //     "& img": {
    //         width: "20px",
    //         height: "20px",
    //         margin: "0 5px -5px 0",
    //     }
    // },
    // tdBold: {
    //     fontWeight: "bold !important"
    // },
    //
    searchArea: {
        // minHeight: "320px",
        background: "#f1f1f2",
        // margin: "10px 20px 0px",
        // padding: "0px 20px",
        margin: "10px 20px 10px",
        padding: "10px 20px",
        borderRadius: "5px",
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
        // "& .MuiFormLabel-root": {
        //     marginBottom: 5
        // },
        "& .MuiTypography-subtitle1": {
            margin: 0,
            height: 30,
        },
        "& .MuiTypography-subtitle1>span:first-child": {
            background: "#f1f1f1",
        },
        "& .MuiButton-root": {
            margin: "0px 0px 0px 10px"
        }
    },
    title: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        color: "#000000",
        margin: "8px ​0px 0px 0p",
        paddingRight: "15px"
    },
    customSearchGrid: {
        minHeight: "50px",
    },
    customGrid: {
        minHeight: "45px",
        // "& .MuiButton-root": {
        //     margin: "0px 10px 10px 0px"
        // },
        "& .MuiFormLabel-root": {
            marginBottom: "10px !important"
        }
    },
    searchSpan: {
        display: "flex",
        minWidth: "100%"
    },
}));
