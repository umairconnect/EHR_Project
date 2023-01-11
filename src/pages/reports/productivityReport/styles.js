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
    checkbox: {
        "& .MuiFormControlLabel-label": {
            whiteSpace:"nowrap",
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
            }
        }
    },
    gridButtonsArea: {
        padding: "10px 0",
        textAlign: "right",
    },
    gridButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: "14px",
        color: "#00B2E3",
        textTransform: "none",
        padding: "6px 16px",
        textDecoration: "underline",
        cursor: "pointer",
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
    cardContainer: {
        marginTop: 10,
    },
    rootCard: {
        height: "126px",
        borderRadius: '10px',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        padding: '10px 5% 10px 5%',
        margin: '0 10px',
        "& img": {
            marginRight: '20px',
        },
    },
    cardTitle: {
        fontSize: '26px',
        fontWeight: 600,
        lineHeight: '16px',
        textAlign: 'right',
        color: '#565656',
        width: '80%',
        textAlign: 'left',
        letterSpacing: "0.6px"
    },
    cardCount: {
        fontSize: '44px',
        fontWeight: 300,
        lineHeight: '16px',
        color: '#00B4E5',
        width: '20%',
        textAlign: 'center',
        letterSpacing: "0.6px"
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
            margin: "0px 4px 8px 0px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        },
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
}))