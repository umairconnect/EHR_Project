import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    shadowBox: {
        padding: "15px 15px 60px 15px",
        // border: "1px solid #E8E8E8",
        borderRadius: "10px",
        minHeight: "calc(100vh - 60px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        marginBottom: "-23px"
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
        background: "#f1f1f2",
        padding: "20px 20px 20px",
        borderRadius: "5px",
        position: "relative",
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
    },
    customGrid: {
        minHeight: "50px",
       
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
                textTransform: "capitalize !important",
                "& a": {
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
        padding: "5px 10px",
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

    orderList: {
        margin: "5px 1px 0px 1px",
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