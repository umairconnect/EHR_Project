import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({

    
  dialogcontentTwo: {
    padding: "16px 24px 10px 24px"
  },
  pageTitleContent: {
    textAlign: "center",
    marginTop: "10%"
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
  buttonSection: {
    marginBottom: "-35px"
  },
  newAddBtn2: {
    width: "112px",
    height: "32px",
    borderRadius: "8px",
    border: "1px solid #11284B",
    margin: "0px 0px 0px 5px",
    color: "#11284B",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    padding: "0 12px",
    // position: "absolute",
    // top: "2px",
    '&:hover': {
      backgroundColor: "#11284b",
      color: "white",
    },
    newAddBtnLink: {
      color: "white",
    }
  },
  headerGroupBtn: {
    border: "1px solid #C4C4C4",
    boxSizing: "border-box",
    borderRadius: "8px",
    height: "32px",
    marginLeft: 5,
    "& .MuiButton-root": {
      textTransform: "none",
      color: "#52575C",
      fontSize: 14,
      fontWeight: "normal",
      "& img": {
        height: "20px",
        width: "18px"
      }
    },
    "& .MuiButton-outlined": {
      border: "none",
    },
    "& .MuiButton-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.26)",
    },
    "& .MuiButtonGroup-groupedOutlinedHorizontal:first-child": {
      borderRight: "2px solid #C4C4C4",
      minWidth: "140px"
    },
  },
  antTableArea: {
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
        textAlign: "right",
        "& input": {
          fontSize: "12px",
          fontWeight: "bold",
          color: "#000000d9",
          textAlign: "right",
        },
      },
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

  textRight: {
    textAlign: "right"
},
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
    searchArea: {
        // minHeight: "320px",
        background: "#f1f1f2",
        // margin: "10px 20px 0px",
        padding: "15px 20px 11px",
        // padding: "15px 20px 0px 15px",
        borderRadius: "5px",
        position: "relative",
        // marginBottom: 15,
        "& .MuiAutocomplete-root": {
            background: "#FFFFFF"
        },
        "& .MuiFormLabel-root": {
            marginBottom: 0
        },
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
        // marginBottom: "10px"
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
                },
                "& .MuiTypography-root": {
                    fontSize: 12,
                    margin: "0",
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
        padding: "15px 10px",
        textAlign: "left",
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
}))