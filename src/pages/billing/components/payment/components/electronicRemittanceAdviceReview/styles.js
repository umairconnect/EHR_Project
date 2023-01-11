import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    filterBtn: {
        width: "32px",
        minWidth: "32px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "5px 20px 5px 0",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        float: "right",
        '&:hover': {
            border: "1px solid #11284b",
            color: "white",
        },
        newAddBtnLink: {
            color: "white",
        },
        "& img": {
            width: "19px",
            height: "17px",
        }
    },
    searchArea: {
        background: "#f1f1f2",
        margin: "10px 20px 10px",
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
            margin: 0
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
        // "& .MuiButton-root": {
        //     maxHeight: "30px"
        // },
    },
    searchSpan: {
        display: "flex",
        minWidth: "100%"
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
}))