import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
   
    treeView:{
        margin: 0,
        padding: 0,
        listStyle: "none",
        paddingLeft: "7px",
        marginBottom: "20px",
    },
    treeViewLi:{
        margin: 0,
        outline: 0,
        padding: 0,
        listStyle: "none",
        marginTop: 7,
    },
    treeContent:{
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    treeLabel:{
        color: "#5D8AB5",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
        "& p":{
            margin:0,
            padding:0,
        }
    },
    DistreeLabel:{
        color: "#52575C",
        fontSize: 14,
        fontFamily: "Lato",
        width: "100%",
        position: "relative",
        paddingLeft: 4,
        "& p":{
            margin:0,
            padding:0,
        }
    },
    
    noRecord:{
        color: "#5D8AB5",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop:"10px",
        paddingLeft: "20px",
        marginBottom: "20px",

    },
    DisnoRecord:{
        color: "#52575C",
        fontSize: 12,
        fontFamily: "Lato",
        width: "100%",
        marginTop:"10px",
        paddingLeft: "20px",
        marginBottom: "20px",
    }

}));
