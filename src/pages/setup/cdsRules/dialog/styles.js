import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "550px",
        //minHeight: "92%"
    },
    dialogContent: {
        minWidth: "920px",
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
        padding: "15px 35px",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        float: "right",
        marginRight: "-8px"
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
    patientRadiobtn: {
        "& label": {
            fontSize: "14px",
            marginRight: "auto",
        }
     
    },
    btnSpan: {
        display: "flex",
        width: "100%"
    },
    attachmentBtn: {
        // position: "absolute",
        padding: "8px",
        // right: "50px",
    },
    actionimg: {
        "& img": {
            width: "20px",
            margin: "5px",
        }
    },
    activeDiagnoseList: {
        background: "white",
        padding: "6px 10px",
        border: "1px solid #ececec",
        marginBottom: "6px",
    },
    listDelete: {
        textAlign:"right",
        "& img": {
            width: "18px",
        }
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
          margin: "0px 4px 8px 0px"
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
      footerBtn: {
        padding: " 0px 0 7px 20px",
        position: "fixed",
        bottom: "0px",
        // backgroundColor: "#f3f3f3",
        width: "82%",
        // justifyContent: "center",
        // alignItems:" center",
        // paddingLeft:"13.6%",
        display: "flex",
        zIndex: 3
    },
}));