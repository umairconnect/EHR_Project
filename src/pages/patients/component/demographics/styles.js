import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  shadowBoxWidth:{
    flexGrow:1,
    
},
tabHeader:{
  boxShadow:"none",
  backgroundColor:"white",
  borderBottom:"2px solid #A3A3A3",
},
tabs:{
  boxShadow:"none",
  "& button":{
    textTransform:"capitalize",
    color: "#25282B",
    fontFamily:"Lato",
    fontSize:"14px",
    opacity:"1",
    minWidth:"auto"
  },
  "& button.Mui-selected":{
    fontWeight:"bold",
    minWidth:"auto"
  },
  "& .MuiTabs-indicator":{
    backgroundColor:"#00B4E5",
    height: "3px",
  }
},
//tabPanel:{
//  paddingBottom:25,
//}
}));
