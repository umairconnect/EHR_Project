import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    cententArea:{
        display: "flex",
        border: "1px solid #E1E1E1",
        borderRadius: "5px",
        marginBottom:20,
    },
    cententLeft:{
        flex: "1",
        paddingRight:10,
        padding:"15px 12px",
    },
    cententRight:{
        flex: "1",
        paddingLeft:10,
        padding:"15px 12px",
        borderLeft:"3px solid #ECECEC"
    },
    listTitle:{
        color:"#25282B",
        fontSize:"16px",
        fontFamily:"Lato",
        lineHeight:"16px",
        fontWeight:"bold",
        padding:"0px 0px 20px 0px",
        marginBottom:"15px",
        "& span":{
            float:"left",
        }
    },
    listSubChild:{
        paddingLeft:20
    },
    editBtn:{
        marginLeft:15,
        cursor:"pointer",
        "& img":{
            width:"16px",
            height:"16px"
        },
    },

}));
