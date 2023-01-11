import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    fileUploadInput:{
        display:"none"
    },
    fileUploadLabel:{

    },
    concentForm: {
        "& .MuiFormControlLabel-label": {
            fontSize: "14px",
        }
    },
    consentFormList: {
        margin: "5px 1px 10px 1px",
        padding: "0px",
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        "& li": {
            color: '#5D8AB5',
            minHeight: "30px",
            outline: 0,
            padding: "5px 12px 5px 12px",
            position: "relative",
            fontSize: "12px",
            background: "#f6f6f6",
            fontWeight: "600",
            border: "1px solid #E1E1E1",
            boxSizing: "border-box",
            boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
            borderRadius: "25px",
            // minWidth: "115px",
            margin: "4px 4px 4px 0px",
            display: "flex",
            alignItems: "center",
            "& a": {
                textDecoration: "none",
                color: '#5D8AB5',
                fontSize: "12px",
                "&:hover": {
                    textDecoration: "none",
                    color: '#5D8AB5',
                }
            }
        },
    },
    deleteIcon: {
        cursor: "pointer",
        color: "#FD5F5F",
        position: "relative",
        height: "24px",
        width: "24px",
        paddingTop: 0,
        "& svg": {
            transform: "rotate(45deg)",
        },
    },
    uploadFileBtn:{
        backgroundColor: '#f3f3f3',
        borderColor: '#f3f3f3',
        color: '#25282B',
        marginRight: 8,
        minWidth: 188,
        textTransform:"capitalize",
        display:"inline-flex",
        alignItems:"center",
        borderRadius:4,
        justifyContent:"center",
        lineHeight:"40px",
        cursor:"pointer",
        marginBottom: '10px',
        
        '&:hover': {
            backgroundColor: '#DDDDDD',
            borderColor: '#DDDDDD',
            
        },
    },
    uploadFileIcon:{
        color:"#00b2e3",
        marginRight:10
    },
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
    },
    formTitle: {
        position: 'relative',
        width: "100%",
        color: "#25282B",
        fontSize: 15,
        marginBottom: 20,
    },
    baseLine: {
        content: '',
        position: 'absolute',
        left: 100,
        right: 0,
        top: 14,
        height: 1,
        backgroundColor: "#DDDDDD",
    },
    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        padding: " 3px 12px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 4,
    },
    lableInput: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
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
    lableText: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#828282",
        fontSize: 12,
        marginBottom: 20,
    },
    lableTextarea: {
        lineHeight: "25px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 20,
    },
    baseTextarea: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        padding: " 5px 12px",
        width: "100%",
        fontFamily: "Lato",
        resize: "none",
        marginBottom: 20,
        '&:focus': {
            border: "1px solid #DDDDDD",
        },
    },
    mandatorColor: {
        color: "#ff0000"
    },
    resetBtn: {
        textTransform: 'none',
        backgroundColor: '#DDDDDD',
        borderColor: '#F3F3F3',
        color: '#11284b',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    updateBtn: {
        textTransform: 'none',
        backgroundColor: '#11284b',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },

    saveBtn: {
        textTransform: 'none',
        backgroundColor: '#11284b',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },

    deleteBtn: {
        textTransform: 'none',
        backgroundColor: '#dd3232',
        borderColor: '#dd3232',
        color: 'white',
        marginRight: 8,
        minWidth: 90,
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    labelAlign: {
        lineHeight: "40px",
        paddingRight: 15,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        marginBottom: 13,
        justifyContent: "flex-end",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    checkboxAlign:{
        marginLeft:"8px",
        paddingLeft:"0px"
    },
    footerBtn:{
        padding:" 0px 0 7px",
        position: "fixed",
        bottom: "0px",
       // backgroundColor: "#f3f3f3",
        width: "82%",
        // justifyContent: "center",
        // alignItems:" center",
        // paddingLeft:"13.6%",
        display: "flex",
        zIndex:3
      },
      controls:{
          display:"block"
      }
}));
