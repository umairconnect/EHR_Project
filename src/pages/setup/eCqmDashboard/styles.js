import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    shadowBox: {
        padding: "15px 15px 60px 15px",
        //  border: "1px solid #E8E8E8",
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
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
        "& .MuiFormLabel-root": {
            marginBottom: 0
        },
    },
    textRight: {
        textAlign: "right"
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
    },
    print_dialog_grid: {
        "& th": {
            fontSize: "12px !important",
        },
        "& td": {
            fontSize: "12px !important",
        },
        "& a": {
            fontSize: "12px !important",
        },
        "& p": {
            fontSize: "12px !important",
        }

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
                fontSize: 12,
                "& .MuiTypography-root": {
                    fontSize: 12,
                }
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
            "& .ant-table-selection-column": {
                paddingTop: '10px !important',
                paddingBottom: '11px',
            }
        }
    },
    gridButtonsArea: {
        padding: "10px 0",
        textAlign: "right",
    },
    
    // gridButton: {
    //     fontFamily: "Lato",
    //     fontStyle: 'normal',
    //     fontWeight: 700,
    //     fontSize: "14px",
    //     color: "#00B2E3",
    //     textTransform: "none",
    //     padding: "6px 16px",
    //     textDecoration: "none",
    //     cursor: "pointer",
    // },

    
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
    scoreProgresBar: {
        display: 'flex'
    },
    root: {
        height: 10,
        borderRadius: 5,
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
    userIcon: {
        marginRight: 10
    },
    textIconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center"
    }
}))