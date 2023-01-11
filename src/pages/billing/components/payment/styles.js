import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    shadowBox: {
        padding: "15px 15px 15px 15px",
        border: "1px solid #E8E8E8",
        borderRadius: "10px",
        minHeight: "calc(100vh - 120px)",
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
    gridArea: {
        // margin: "0px 20px",ant-table-tbody
        '& .custom-grid': {
            '& table thead>tr>th': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12,
                height: 40
            },
            "& .ant-table-container": {
                // height: 250,
                minHeight: 250
            },
            '& table tbody>tr': {
                height: "42.8px",
                minHeight: "42.8px"
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
                textAlign: "right"
            }
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
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
}));