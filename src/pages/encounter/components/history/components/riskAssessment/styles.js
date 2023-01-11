import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    recentBox:{
        backgroundColor:"#F2F2F2",
        minHeight:"100vh",
        maxWidth: "25%",
        marginTop:"-10px"
        
    },
    recentHeader:{
        display:"block",
        color:"#25282B",
        fontSize:"16px",
        fontWeight:"700",
        lineHeight:"35px",
        padding:"0 15px",
    },
    addEnBtn:{
        color:"#00B2E3",
        fontSize:"14px",
        cursor:"pointer",
        fontWeight:"normal",
        float:"right",
        "& img":{
            margin:"0 5px -4px 0"
        }
    },
    recentList:{
        margin: "0",
        padding: "0",
        position: "relative",
        listStyle: "none",
        borderTop:"solid #d5d5d5 1px",
        "& li":{
            width: "100%",
            display: "flex",
            position: "relative",
            boxSizing: "border-box",
            textAlign: "left",
            alignItems: "center",
            paddingTop: "8px",
            paddingBottom: "8px",
            justifyContent: "flex-start",
            textDecoration: "none",
            padding:"5px 10px",
            cursor:"pointer",
            borderBottom:"solid #d5d5d5 1px",
            "&:hover":{
                backgroundColor:"#e0e6f1",
                //opacity: "0.3"
            }
        }
    },
    listIcon:{
        minWidth: "56px",
        flexShrink: '0',
    },
    listContent:{
        flex: "1 1 auto",
        minWidth: "0",
        marginTop: "6px",
        marginBottom: "6px",
        color:"#52575C"
    },
    listContentTitle:{
        display:"block",
        marginBottom:"8px",
        fontWeight:"700",
        fontSize:"14px"

    },
    listContentCC:{
        display:"block"
    },
    listOfficeVisit:{
        marginLeft:"30px",
        fontWeight:"400"
    },
    lableInput: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        [theme.breakpoints.down("sm")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
        [theme.breakpoints.down("md")]: {
            lineHeight: "25px",
            paddingRight: 5,
        },
    },
    recentSearch:{
        padding:"3px 15px",
        "& .Mui-focused":{
            border: "1px solid #00b2e3",
            borderRadius: "4px",
        }
    },
    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 4,
        "& .MuiInputBase-input":{
          padding: "9.5px 12px",
          fontSize:"14px",
          color:"#4A4A4A",
          '&:focus': {
           
            outline: 0,
          },
        },
        
        "& .Mui-disabled": {
          backgroundColor:"#f3f3f3",
          color:"#4A4A4A"
        },
        "& svg":{
            color:"#00B2E3"
        }
    },
    noRecordFound:{
        display:"block",
        textAlign:"center",
        color:"rgba(0,0,0,.25)",
        padding:"5% 0",
        '& span':{
            display:"block",
        },
        '& svg':{
            color:"rgba(0,0,0,.25)",
            fontSize:70
        }
    },
      footerBtn:{
        padding:" 7px 0px",
        //marginTop:"15px",
        bottom: "0px",
        //width: "55%",
        // paddingLeft:"58%",
        position:"absolute",
        right:0,
        display: "flex",
        zIndex:3
      },
}));
