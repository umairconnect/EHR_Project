import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    //cardButton:{
    //  color: "#11284B",
    //  height:"30px",
    //  minWidth:"30px",
    //  backgroundColor:"#F9F9F9",
    //  boxSizing:"border-box",
    //  borderRight:"1px solid #C4C4C4",
    //  fontSize: 15,
    //  fontFamily: "Lato",
    //  textTransform: "none",
    //  padding: "0 14px",
    //  position:"relative",
    //  '& .MuiButton-startIcon': {
    //    margin:"0px"
    //  },
    //  newAddBtnLink: {
    //    color: "white",
    //  },
    //},
    dialogPaper: {
        width: "80%",
        height: "95vh",
        minHeight: '95vh',
        maxWidth: '80%',
    },
    lableInput: {
        lineHeight: "20px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 15,
        alignItems: "center",
        // margin: "10px 0px 10px 0px",
        [theme.breakpoints.down("sm")]: {
            lineHeight: "10px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "20px",
            paddingRight: 5,
        },
    },
    labelAlignBtn: {
        justifyContent: "flex-end",
        margin: "25px 0px 18px 0px",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    labelAlign: {
        justifyContent: "flex-end",
        alignItems: "flex-start",
        margin: "8px 0px 18px 0px",
        // alignItems:"center",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
            alignItems: "flex-start"
        },
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "50px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    chip: {
        margin: "0px 5px 5px 5px",
    },
    diagnosesRecordLabel: {
        width: "119px",
        height: "14px",
        marginLeft: "10px",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color: "#00B4E5",
    },
    tableLabelInput: {
        //paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        padding: "0px 0px 0px 50px"
        //marginBottom: 13,
        //paddingTop:"6%",
        //minHeight:"40px",
        //textAlign:"right"
    },
    observationTable: {
        border: "1px solid #E0E0E0",
        boxSizing: "border-box",
    },
    observationTableHead: {
        border: "1px solid #E0E0E0",
        background: "#F2F2F2",
        boxSizing: "border-box",
    },
    observationTableHeadLabel: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "13px",
        lineHeight: "16px",
        color: "#11284B",
    },
    addIconSpan: {
        fontSize: "14px",
        margin: "5px 5px 10px 5px",
        color: "#00B4E5",
        fontFamily: "Lato",
        fontWeight: "400",
        cursor: "pointer"
    },
    addIcon: {
        margin: "7px 0px",
        cursor: "pointer"
    },
    checkIcon: {
        margin: "7px 20px",
        cursor: "pointer"
    }
}));