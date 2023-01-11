import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    dialogContent: {
        minWidth: "550px",
        padding: "20px 10px 10px 10px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        //maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
    },
    // AddButtonIcon: {
    //     color: '#2eb8dc',
    //     textTransform: 'capitalize',
    //     fontSize: '16px',
    // },
    AddButtonIcon: {
        color: "#ffffff !important",
        border: "1px solid",
        display: "inline-block",
        padding: "5px 12px",
        fontSize: "16px",
        userSelect: "none",
        cursor: "pointer",
        borderRadius: "5px",
        textTransform: "capitalize",
        backgroundColor: "#172B49",
        // "& :hover": {
        //     backgroundColor: "grey !important",
        //     color: "black !important",
        //     border: "1px solid transparent",
        // },

        "&:hover": {
            background: "#292929",
            backgroundColor: "#e2e2e2",
            border: "1px solid transparent",
            color: "black !important",
        },
    },

    deleteButtonIcon: {
        width: "21px",
        position: "relative",
        top: "-1px",
    },
    AdjustmentReasonDialog: {
        minWidth: "350px",
    },

    actionTextAlign: {
        textAlign: "center"
    },

    crossButton: {
        position: "absolute",
        top: "8px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    adjustmentReasonsFields: {
        "& MuiGrid-item": {
            margin: "5px",
        }
    },
    adjustmentReasonsTable: {
        width: "100%",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        borderCollapse: "collapse",
        margin: " 0px 0px 15px",
        "& thead": {
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            minWidth: "100%",
            height: "35px",
            color: "#11284B",
            fontWeight: "bold",
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
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
            // fontWeight: 400,
            fontSize: "14px",
            color: "#11284B",
            padding: "5px 0px 5px 10px",
            "& img": {
                width: "18px",
                height: "18px",
                cursor: "pointer"
            },
            "& .MuiInputBase-root": {
                marginBottom: "0px !important",
            },
            "& .MuiInputBase-input": {
                lineHeight: "21px",
                minHeight: "30px",
                height: "30px",
                '&:focus': {
                    border: "1px solid #00b2e3",
                    borderRadius: "4px",
                },
            },
            "& span": {
                paddingLeft: "0px"
            }
        }
    },
    amountTd: {
        width: "35%"
    },
    reasonCodeTd: {
        width: "55%"
    },
    actionTd: {
        width: "10%"
    }
}))