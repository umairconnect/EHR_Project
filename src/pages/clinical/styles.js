import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContent: {
    textAlign: "center",
    marginTop: "10%"
  },
  searchArea: {
    // height: "355px",
    // minHeight: "355px",
    background: "#f1f1f2",
    // background:"#ffffff",
    margin: "20px 20px 0px",
    padding: "10px 20px 0px",
    borderRadius: "5px",
    "& .MuiAutocomplete-root": {
      background: "#FFFFFF"
    },
    "& .MuiFormLabel-root": {
      marginBottom: 5
    },
  },
  clinicalFormTitle: {
    position: 'relative',
    width: "100%",
    color: "#25282B",
    fontSize: "15px",
    fontWeight: 600,
    margin: "-16px 0px 0px 0px"
  },
  clinicalBaseLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 14,
    height: 1,
    backgroundColor: "#DDDDDD",
    zIndex: 1
  },
  clinicalBaseTitle: {
    display: "inline-block",
    position: "relative",
    padding: "0 12px 0 0",
    backgroundColor: "#f1f1f2",
    zIndex: 2,
    fontSize: 15,
    fontWeight: 600,
  },
  gridArea: {
    margin: "0px 20px",
  },
  gridButtonsArea: {
    padding: "10px",
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
  orderTestContent: {
    // backgroundColor: "#FFFFFF"
  },
  // orderList: {
  //   margin: "5px 1px 10px 1px",
  //   padding: "0px",
  //   listStyle: "none",
  //   display: "flex",
  //   flexWrap: "wrap",

  //   "& li": {
  //     outline: 0,
  //     padding: "5px 30px 5px 12px",
  //     position: "relative",
  //     background: "#E1E1E1",
  //     borderRadius: "50px",
  //     minHeight: "24px",
  //     fontStyle: "normal",
  //     fontWeight: 700,
  //     fontSize: "14px",
  //     lineHeight: "17px",
  //     color: "#909090",
  //     minWidth: "90px",
  //     margin: "4px 4px 4px 0px"
  //   },
  // },
  // deleteIcon: {
  //   cursor: "pointer",
  //   right: "-7px",
  //   position: "absolute",
  //   paddingTop: 0,
  //   top: "50%",
  //   transform: "translate(-50%,-45%)",
  //   "& svg": {
  //     transform: "rotate(45deg)",
  //   },
  // },
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
      margin: "0px 4px 8px 0px"
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
  patientLable: {
    "& div label": {
      alignItems: "baseline",
      paddingTop: 10
    }
  },
  demographicDialogPaper: {
    // width: "95%",
    minHeight: '95vh',
    maxWidth: '80%',
    // overflow: "auto"
  },
  demographicDialogcontent: {
    padding: "16px 24px 10px 24px"
  },
  demographicDialogactions: {
    padding: "2px 8px 8px 8px"
  },
  crossButton: {
    position: "absolute",
    top: "8px",
    right: "23px",
    cursor: "pointer",
    padding: "3px",
    zIndex: "2",
    display: "block",
    "& :hover": {
      backgroundColor: "#F4F4F4",
    }
  },
  customClinicalGrid: {
    minHeight: "50px",
  },
  title: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#000000",
    margin: "8px ​0px 0px 0p",
    paddingRight: "20px"
  },
  checkBox: {
    marginTop: "-10px"
  },
  collapseClose: {
    padding: "10px 0px 0px 0px"
  },
  collapseOpen: {
    padding: "10px 0px 10px 0px"
  }
}));
