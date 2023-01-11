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
        background: "#f1f1f2",
        // margin: "10px 20px 0px",
        padding: "15px 20px",
        borderRadius: "5px",
        position: "relative",
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
            }
        }
    },
    gridButtonsArea: {
        padding: "10px",
        textAlign: "right",
    },
    // eobActionButtonsArea: {
    //     padding: "0px 10px",
    //     textAlign: "right",
    //     position: "absolute",
    //     top: "22px",
    //     right: 1,
    // },
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
    //         minHeight: "32px",
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
    //         "& input": {
    //             fontSize: "14px",
    //             color: "#52575C",
    //             textAlign: "right",
    //             maxWidth: "125px",
    //             width: "125px"
    //         }
    //     },
    // },
    // insNameTd:{
    //     min

    // },
    // valueTd: {
    //     minWidth: "220px !important",
    //     maxWidth: "220px !important",
    // },
    // boldTd: {
    //     fontFamily: "Lato",
    //     fontStyle: "normal",
    //     fontWeight: "bold",
    //     fontSize: "14px",
    //     /* line-height: 17px", */
    //     color: "#25282B",
    //     textAlign: "right",
    //     minWidth: "150px",
    //     maxWidth: "150px !important"
    // },
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
    Icon: {
        width: "18px",
        height: "18px",
        cursor: "pointer",
        margin: "0px 2px"
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
    //
    headerContainer: {
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
    },
    insuranceNameContainer: {
        display: "flex",
        minHeight: "32px",
        alignItems: "flex-start"
    },
    headerSubContainer: {
        display: "grid",
        maxWidth: "100%",
        gridAutoFlow: "column",
        gridTemplateColumns: "30% 40% 25%"
    },
    headerSubContainerChild: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            display: "flex",
            minHeight: "32px",
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