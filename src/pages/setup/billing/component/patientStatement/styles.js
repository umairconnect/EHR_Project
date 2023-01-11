import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    collapseBtn: {
        margin: "0px !important"
    },
    searchArea: {
        background: "#f1f1f2",
        margin: "10px 20px",
        padding: "10px 20px",
        borderRadius: "5px",
        "& .MuiTypography-subtitle1": {
            margin: 0,
            height: 30,
        },
        "& .MuiTypography-subtitle1>span:first-child": {
            background: "#f1f1f1",
        },
        "& .MuiButton-root": {
            margin: "0px 0px 0px 10px"
        },
        "& .MuiFormGroup-row": {
            marginTop: "-10px 0 5px 0",
        },
        "& .MuiFormControlLabel-root": {
            marginRight: "40px"
        }
    },
    customGrid: {
        minHeight: "45px",
        "& .MuiFormLabel-root": {
            marginBottom: "10px !important",
            backgroundColor: 'transparent !important'

        },
        "& .Mui-disabled": {
            backgroundColor: "#e7e7e7"
        },
        // "& .MuiFormControlLabel-root.Mui-disabled": {
        //     backgroundColor: "#f1f1f2 !important"
        // },
        // "& .MuiCheckbox-colorPrimary.Mui-disabled": {
        //     backgroundColor: "transparent !important"
        // },
        // "& .MuiFormControlLabel-label.Mui-disabled": {
        //     backgroundColor: "transparent !important"
        // },
        // "& .MuiFormLabel-root": {
        //     color: "#8a8a8a !important"
        // }
    },
    disabledLabel: {
        "& .MuiFormLabel-root": {
            color: "#8a8a8a !important"
        }
    },
    searchSpan: {
        display: "flex",
        minWidth: "100%",
        alignItems: "center",
        alignContent: "center",
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
                textAlign: "right"
            }
        }
    },
    gridButtonsArea: {
        padding: "10px 0px 10px 10px",
        textAlign: "right",
        "& .MuiFormControlLabel-root": {
            marginRight: "10px !important"
        },
        "& .MuiButtonGroup-grouped": {
            minWidth: "20px",
        },
        "& .MuiButton-outlined": {
            border: "none",
            padding: "5px 0px"
        }
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
        },
        "& .MuiButton-outlined": {
            border: "none",
            padding: "0px"
        }
    },
    gridArrowButton: {
        color: "#00B2E3",
        border: "none",
        padding: 0,
        color: "#00B2E3",
        "& .MuiButton-outlined": {
            border: "none",
            padding: "5px 0px"
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
        textAlign: "center",
        "&:disabled": {
            backgroundColor: "#e7e7e7"
        }
    },
}))