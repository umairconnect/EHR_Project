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
        marginTop: 10
        // marginBottom: "-23px"
    },
 
    dialogPaper: {
        width: "80%",
        minWidth: "80%",
        maxHeight: "95vh",
        maxWidth: '80%',
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        padding: "18px 10px 10px 20px",
    },
    header: {
        flex: "0 1 auto",
        display: "flex"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "580px",
        minHeight: "200px",
        // overflow: "auto",
        marginBottom: "10px"
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
        left: "96%",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    searchArea: {
        // minHeight: "320px",
        background: "#f1f1f2",
        // margin: "10px 20px 0px",
        padding: "15px 20px 11px",
        // padding: "15px 20px 0px 15px",
        borderRadius: "5px",
        position: "relative",
        marginBottom: 15,
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
        "& .MuiFormLabel-root": {
            marginBottom: 0
        },
    },
    gridArea: {
        '& .custom-grid': {
            "& .ant-table-row-expand-icon-cell": {
                display: "none"
            },
            '& table thead>tr>th': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12,
                height: 40
            },

            '& table tbody .ant-table-row-level-0>td': {
                height: "42px !important",
                background: "#E1F2FF",
                backgroundColor: "#E1F2FF",
            },
            '& table tbody .ant-table-expanded-row-level-1>td': {
                padding: "0 !important"
            },
            '& table tbody>tr>td': {
                lineHeight: "normal",
                paddingLeft: 8,
                // paddingRight: 8,
                borderRadius: "0 !important",
                // padding: "10px 8px",
                fontSize: 12
            },

            '&  .ant-table tfoot>tr>td': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12,
                textAlign: "right",
                "& a": {
                    fontSize: "12px",
                },
                "& input": {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#000000d9",
                    textAlign: "right",
                },
            },
            "& .MuiTypography-root": {
                margin: "0 !important",
                fontSize: "12px !important",
            }
        },
    },
    gridButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: "14px",
        margin: "0 !important",
        color: "#00B2E3",
        textTransform: "none",
        // padding: "6px 16px",
        textDecoration: "underline",
        cursor: "pointer",
    },
    divider: {
        minWidth: "1px",
        padding: "0 0 5px !important"
    },
    customGrid: {
        minHeight: "45px",
        "& .MuiButton-root": {
            // margin: "0px 0px 10px 10px"
        },
        "& .MuiFormLabel-root": {
            marginBottom: "10px !important"
        }
        // marginBottom: "10px"
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
    tableSection: {
        overflow: "auto"
    },
    proceduresTable: {
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        // margin: " 0px 0px 15px",
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
            padding: "0px 10px 0 0px",
            textAlign: "inherit",
        },
        "& th:nth-child(1)": {
            padding: "0px 0px 0 5px !important",
        },
        "& tr": {
            height: "42px",
            minWidth: "100%",
            width: "100%",
        },
        "& td": {
            borderTop: "1px solid #E1E1E1",
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            color: "#11284B",
            padding: "8px 2px 8px 2px",
            "& a": {
                fontSize: "12px",
            },
        }
    },
    balanceDueTd: {
        fontWeight: "700 !important",
        color: "#1054AE !important",
    },
    mainRow: {
        backgroundColor: "#E1F2FF",
        background: "#E1F2FF",
    },
    notSubmittedTd: {

    },
    rightAligned: {
        textAlign: "right !important"
    }
}))