import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "80%",
        maxWidth: '80%',
        padding: "25px 20px",
        "& hr": {
            display: "none",
        }
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

    shadowBox: {
        padding: "15px 15px 60px 15px",
        //border: "1px solid #E8E8E8",
        borderRadius: "10px",
        minHeight: "calc(100vh - 60px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        marginBottom: "-23px"
    },
    searchArea: {
        background: "#f1f1f2",
        padding: "15px 20px 0",
        borderRadius: "5px",
        position: "relative",
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
        "& h6": {
            "& span": {
                background: '#f1f1f2'
            }
        }
    },
    customGrid: {
        minHeight: "45px",
        // marginBottom: "10px"
        "& label": {
            minHeight: 'unset',
            paddingTop: '10px',
        }
    },
    searchSpan: {
        display: "flex",
        minWidth: "100%"
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
    collapseBtn: {
        width: "32px",
        minWidth: "32px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0 20px 0 20px",
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
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            color: "white",
        },
        "& .MuiSvgIcon-root": {
            width: "25px",
            height: "25px",
        }
    },
    otherSection: {
        boxSizing: "border-box",
        minHeight: "99px",
        background: "#F8F8F8",
        border: "1px solid #E1E1E1",
        padding: "10px 15px",
        margin: "10px"
    },
    addNew: {
        display: "initial",
        alignItems: "center",
        cursor: "pointer",
        color: "#25282B",
        width: "100%",
        position: "relative",
        fontSize: "15px",
        fontWeight: 600,
        marginBottom: "12px",
        "& img": {
            width: "20px",
            height: "20px",
            cursor: "pointer !important",
            margin: "-2px 0px 0px 5px"
        }
    },
    Icon: {
        width: "18px",
        height: "18px",
        cursor: "pointer",
        margin: "3px 0 3px 15px"
    },
    labResultIcon: {
        width: "18px",
        height: "18px",
        cursor: "pointer",
        margin: "34px 0 0px 15px"
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
      borderContainer: {
        border: "1px solid rgb(224, 224, 224)",
        padding: "10px",
        borderRadius: "7px",
        "& h4": {
            fontWeight: "500",
            color:"#25282B",
            fontZize: "14px",
        }
      },
      DoesHaveTitle: {
            lineHeight: "20px",
            paddingRight: 15,
            fontFamily: "Lato",
            color: "#25282B",
            fontSize: 14,
            marginLeft: 3,
            fontWeight: "bold",
      },
      paddingRight5: {
        paddingRight: "5px",
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