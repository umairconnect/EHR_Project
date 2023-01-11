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
        margin: "10px 20px 0px",
        // padding: "10px 20px",
        padding: "10px 20px 20px",
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
        minHeight: "50px",
        "& .MuiButton-root": {
            maxHeight: "30px"
        },
    },
    collapseArea: {
        marginTop: "-15px"
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
            },
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
        fontSize: "12px",
        lineHeight: "14px",
        color: "#00B2E3",
        textDecoration: "none",
        textTransform: 'none',
        cursor: "pinter",
        "& a": {
            color: "#00B2E3",
            cursor: "pinter",
            textDecoration: "none"
        }
    },
    warningText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "31px",
        color: "#FD5F5F",
    },
    paymnetInfoText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "31px",
        color: "#52575C",
        "& span": {
            color: "#00B4E5"
        }
    },
    alignItem: {
        display: "flex",
        alignItems: 'center'
    },
    boldTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "17px",
        textAlign: "right",
        color: "#25282B",
        minWidth: "125px",
        padding: "5px 0px 5px 0px"

    },
    valueText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        textAlign: "center",
        color: "#52575C",
        minWidth: "120px",
        padding: "5px 10px"

    },
    title: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "17px",
        textAlign: "center",
        color: "#25282B",
        padding: "12px 15px 12px 12px"
    },
    customCheckBoxBtn: {
        marginLeft: "0px",
        padding: "5px",
        "& + .MuiFormControlLabel-label": {
            color: "#52575C",
            fontSize: "13px"
        },
        // "& svg": {
        //     background: "#FFFFFF",
        //     border: "1px solid #DDDDDD",
        //     boxSizing: "border-box",
        //     borderRadius: "4px",
        // }
    },
    fullAppliedIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "green",
        cursor: "pointer"
    },
    warningIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "#FB9600",
        cursor: "pointer"
    },
    notificationsIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "#11284B",
        cursor: "pointer"
    },
    infoIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "#1054AE",
        cursor: "pointer"
    },
    errorIcon: {
        fontSize: 18,
        margin: "2px 5px -5px 3px",
        color: "#FD5F5F",
        cursor: "pointer"
    },
    Icon: {
        width: "18px",
        height: "18px",
        cursor: "pointer"
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
    infoArea: {
        width: "100%",
        display: "flex",
        "& span": {
            display: "flex",
            marginRight: "15px"
        }
    },
    infoLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "31px",
        textAlign: "center",
        padding: "0px 5px 0px 0px"
    }
}))