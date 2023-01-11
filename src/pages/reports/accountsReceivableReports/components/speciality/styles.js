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
        }
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
}))