import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
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
            color: "#FFFFFF",
            backgroundColor: "#596270",
        },
        '& a': {
            color: "#FFFFFF",
            textDecoration: "none",
            "& :hover": {
                color: "#FFFFFF"
            }
        },
        '& .MuiSvgIcon-root': {
            fontSize: 13,
        },
        '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
            margin: "0px 5px -2px 0"
        }
    },
    btnLink: {
        color: "#FFFFFF",
        textDecoration: "none",
        "&:hover": {
            color: "#FFFFFF"
        }
    },
    container: {
        display: "flex",
    },
    centent: {
        flex: "1",
        padding: "0 12px",
    },
    cententArea: {
        display: "flex",
        border: "1px solid #E1E1E1",
        borderRadius: "5px",
        marginBottom: 20,
    },
    soapToggleLeftArea: {
        paddingRight: 0,
        padding: "0",
        flex: "unset",
        width: 0,

        transition: "width 1s",
    },
    soapToggleRightArea: {
        //paddingRight: 10,
        //padding: "15px 12px",
        flex: "1",
        position: "relative",
        width: "100%",
        backgroundColor: "#fafbfc",
        transition: "-webkit-transition:1s",
        "& svg": {
            zIndex: 10,
        }
    },

    soapGreyContainer: {
        backgroundColor: "#fafbfc", 
        padding: "15px 25px",
        paddingLeft: "25px",
    },

    soapCententLeft: {
        paddingRight: 10,
        padding: "15px 12px",
        flex: "1",
        position: 'relative'
    },
    soapCententRight: {
       // borderLeft: "3px solid #ECECEC",
        width: "100%",
        transition: "-webkit-transition:1s",
        //backgroundColor: "#fafbfc",
        position: "relative",
        flex: "2",
        position: "relative",
        borderLeft: "1px solid #e1e1e1",
        padding: '7px 8px 10px 10px',
    },
    CollapseLeftToggle: {
        display: 'none',
    },
    cententLeft: {
        flex: "1",
        paddingRight: 10,
        padding: "15px 12px",
    },
    cententRight: {
        flex: "1",
        paddingLeft: 25,
        padding: "15px 25px",
        borderLeft: "3px solid #ECECEC",
       
    },
    listTitle: {
        color: "#25282B",
        fontSize: "16px",
        fontFamily: "Lato",
        lineHeight: "16px",
        fontWeight: "bold",
        padding: "0px 0px 20px 0px",
        clear: "both",
        "& span": {
            float: "left",
            marginBottom: "15px",
        }
    },
    toggleButton: {
        width: "40px",
        position: "absolute",
        top: "395px",
        left: "-20px",
        background: "#11284B",
        padding: "10px",
        cursor: "pointer",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "41px",
        color: "white",

    },
    // rightListTitle:{
    //     color:"#25282B",
    //     fontSize:"16px",
    //     fontFamily:"Lato",
    //     lineHeight:"16px",
    //     fontWeight:"bold",
    //     padding:"0px 0px 20px 0px",
    //     clear:"both",
    //     marginBottom:"20px",
    //     "& span":{
    //         float:"left",
    //         marginBottom:"15px",
    //     }
    // },
    listSubChild: {
        paddingLeft: 0
    },
    editBtn: {
        marginLeft: 15,
        cursor: "pointer",
        "& img": {
            width: "16px",
            height: "16px"
        },
    },
    headerGroupBtn: {
        float: "right",
        marginBottom: 15,
        "& .MuiButton-root": {
            textTransform: "none",
            color: "#52575C",
            fontSize: 14,
            fontWeight: "normal",
        },
        "& .MuiButton-root.Mui-disabled": {
            color: "rgba(0, 0, 0, 0.26)",
        }
    },
    settingBtnIcon: {
        float: "right",
        border: "1px solid #E7E7E7",
        boxSizing: "border-box",
        borderRadius: "5px",
        background: "#FFFFFF",
        padding: 0,
        height: 37,
        width: 48,
    },
    createdByInfoArea: {
        background: "#FFFFFF",
        border: "1px solid #E7E7E7",
        // height: "45px",
        width: "53%",
        boxSizing: "border-box",
        borderRadius: "5px",
        margin: "-2px 0px 0px -20px",
    },
    createdByInfoAreaSoap: {
        background: "#FFFFFF",
        border: "1px solid #E7E7E7",
        // height: "45px",
        width: "53%",
        boxSizing: "border-box",
        borderRadius: "5px",
        margin: "-2px 0px 0px 0px",
    },
    createdByHeading: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "11px",
        lineHeight: "16px",
        /* identical to box height, or 145% */
        // display: "flex",
        alignItems: "center",
        textAlign: "right",
        letterSpacing: "0.4px",
        color: "#000000",
        padding: "0px 5px"
    },
    createdByText: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "11px",
        lineHeight: "16px",
        /* identical to box height, or 145% */
        // display: "flex",
        alignItems: "center",
        textAlign: "right",
        letterSpacing: "0.4px",
        color: "#1054AE",
    },
    soapContainer: {
        
    },
    soapMainHeading: {
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "22px",
    },
    soapBox: {
        margin: "4px 0px",
        padding: "5px",
        background: "#F8F8F8",
        border: "1px solid #E1E1E1",
        "& h3": {
            fontFamily: 'Lato',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "19px",
        }
    }
}));
