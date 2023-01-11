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

  faxButton: {
    color: "#11284B",
    height: "32px",
    minWidth: "30px",
    backgroundColor: "#F9F9F9",
    boxSizing: "border-box",
    border: "1px solid #11284B",
    borderRadius: "8px",
    // margin: "5px 5px -32px 0px",
    margin: "0px 0px 0px 5px",
    // borderRight:"1px solid #C4C4C4",
    fontSize: 15,
    fontFamily: "Lato",
    textTransform: "none",
    // padding: "0 12px",
    padding: "0 12px 0 14px",
    position: "relative",
    '& .MuiButton-startIcon': {
      // margin: "0px"
    },
    newAddBtnLink: {
      color: "white",
    },
    "& img": {
      objectFit: "contain",
      width: "18px",
      height: "18px",
    },
    "& .MuiAvatar-root": {
      width: "unset"
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
  },
  content: {
    flex: "1 1 auto",
    minHeight: "200px",
    overflow: "auto",
    marginBottom: "10px"
  },
  crossButton: {
    position: "relative",
    top: "-12px",
    right: "10px",
    cursor: "pointer",
    padding: "3px",
    zIndex: "2",
    display: "block",
    "& :hover": {
      backgroundColor: "#F4F4F4",
    }
  },
}));
