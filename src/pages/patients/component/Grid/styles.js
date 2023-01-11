import {makeStyles} from "@material-ui/styles"

export default makeStyles(theme=>({
    pageTitleContent: {
        textAlign: "center",
        marginTop: "10%"
      },
      Icon:{
        width:"18px",
        height:"18px",
        cursor:"pointer"
      },
      newAddBtn2: {
        width:"112px",
        height:"32px",
        borderRadius:"8px",
        border:"1px solid #11284B",
        margin: "10px 0px 0px 5px",
        color: "#11284B",
        backgroundColor:"#F9F9F9",
        boxSizing:"border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position:"relative",
        '&:hover': {
          // backgroundColor: "#596270",
          backgroundColor:"#11284b",
          color: "white",
        },
        newAddBtnLink: {
          // color:"#11284B"
          color: "white",
        }
      },
      // dataTable:{
      //   marginTop:"10px"
      // },
      title:{
        margin:"10px 0px 0px 0px",
        fontFamily: "Lato",
        fontSize: 14,
        color: "#25282B",
        fontWeight:"bold",
      },
      btnIconRoot:{
        overflow:"visible"
      },
      BtnIcon:{
        width:"18px",
        height:"18px"
      },
      cardButton:{
        color: "#11284B",
        height:"30px",
        minWidth:"30px",
        backgroundColor:"#F9F9F9",
        boxSizing:"border-box",
        border:"1px solid #11284B",
        borderRadius:"8px",
        marginTop:"12px",
        // borderRight:"1px solid #C4C4C4",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position:"relative",
        '& .MuiButton-startIcon': {
          margin:"0px"
        },
        newAddBtnLink: {
          color: "white",
        },
},
}));