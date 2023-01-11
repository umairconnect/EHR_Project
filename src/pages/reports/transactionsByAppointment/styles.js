import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogcontentTwo: {
        padding: "16px 24px 10px 24px"
      },
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
    },
    searchArea: {
        // minHeight: "320px",
        background: "#f1f1f2",
        margin: "10px 20px 10px",
        padding: "20px 20px 0px",
        borderRadius: "5px",
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
        // "& .MuiFormLabel-root": {
        //     marginBottom: 5
        // },
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
                fontSize: 12,
                "& a": {
                    fontSize: 12,
                },
                "& .MuiTypography-root": {
                    fontSize: 12,
                    margin:"0",
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
            "& .ant-pagination-item": {
                border: "none",
                color: "rgba(0, 0, 0, 0.85)"
            },
            "& .ant-pagination-prev, .ant-pagination-next": {
                border: "none"
            },
            "& .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link": {
                border: "none"
            }
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
        // marginBottom: "10px"
    },
    claimLableInput: {
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        paddingTop: "10%",
        minHeight: "40px",
        textAlign: "right"
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
    Icon: {
        width: "18px",
        height: "18px",
        cursor: "pointer",
        marginLeft: 5,
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

    dialogPaper: {
        maxWidth: '80%',
      },
      dialogcontent: {
        padding: "16px 24px 10px 24px"
      },
      box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
      },
      header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move",
        position: "relative",
      },
      content: {
        flex: "1 1 auto",
      },
      crossButton: {
        position: "absolute",
        top: "-13px",
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
            border: "1px solid #E8E8E8",
            borderRadius: "10px",
            minHeight: "calc(100vh - 60px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            marginBottom: "-23px"
        },

        orderList: {
            margin: "0px 1px 5px 1px",
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
    
}));
