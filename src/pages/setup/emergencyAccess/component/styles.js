import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "520px",
        maxWidth: '520px',
    },
    allowAccessPaper: {
        minWidth: "40%",
        maxWidth: '40%',
    },
    allowAccessContent: {
        padding: "20px 20px 10px",
    },
    dialogContent: {
        minWidth: "520px",
        maxWidth: '520px',
        padding: "20px 20px 10px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "pointer"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "580px",

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
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    infoIcon: {
        width: "70px",
        margin: "15px auto",
    },
    paragraf: {
        fontSize: "16px",
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