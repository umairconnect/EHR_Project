import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({

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
      
    controlContainer: {
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
        marginTop: "30px",
        "& .MuiTypography-root": {
            margin: '12px 0px'
        }
    },
    allTasksCard: {
        margin: "5px 10px",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
    },
    allTasksInnerCard: {
        margin: "10px 20px",
    },
    allTasksFilterArea: {
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        // margin: "0px -30px 0px 5px",
        // margin: "-28px -20px 0px -9%",
        margin: "-25px 0 0 0",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "relative",
        float: "right",
        // top:"2px",
        '&:hover': {
            // backgroundColor: "#596270",
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            // color:"#11284B"
            color: "white",
        }
    },
}));