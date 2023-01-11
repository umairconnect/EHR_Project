import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    DialogContentLeftSide: {
        flex: "1",
        maxWidth: "310px",
        flexBasis: "310px",
        background: "#FFFFFF",
        margin: 10,
        padding: 10,
        border: "1px solid #DBDADA",
        borderRadius: "0px 0px 4px 4px",
        // minHeight:"521px",
    },
    DialogContentRightSide: {
        flex: "1",
        padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        // padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "580px",
        minHeight: "200px",
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
    linkItem: {
        margin: "3px",
        cursor: "pointer",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        textDecoration: "underline",
        color: "#00B4E5",
    },
    medicineList: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        "& li": {
            color: "#000000",
            padding: "8px 5px 0px 2%",
            margin: "0px 0px 10px 5%",
            fontSize: "14px",
            fontStyle: "normal",
            fontFamily: "Lato",
            fontWeight: "normal",
            background: "#F0F0F0",
            lineHeight: "17px",
        }
    },
    listItemName: {
        fontSize: "14px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        background: "#F0F0F0",
        lineHeight: "17px",
        padding: "5px 10px",
        color: "#11284B",
    },
    listItemheading: {
        fontSize: "13px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        background: "#F0F0F0",
        lineHeight: "1px",
        padding: "5px 10px",
        color: "#25282B",
    },
    listItemDescription: {
        fontSize: "12px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        background: "#F0F0F0",
        lineHeight: "17px",
        padding: "5px 10px",
        color: "#25282B",
        display: "block"
    },
    informationText: {
        fontSize: "12px",
        fontStyle: "normal",
        fontFamily: "Lato",
        fontWeight: "normal",
        lineHeight: "14px",
        color: "#25282B",
        textAlign: "left",
        padding: "0px 0px 10px 5%",
    },
    baseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 4,
        "& .MuiInputBase-input": {
            padding: "9.5px 12px",
            fontSize: "14px",
            color: "#4A4A4A",
            // '&:focus': {
            //   border: "1px solid #00b2e3",
            //   borderRadius: "4px",
            //   outline: 0,
            // },
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },
    },
    chipRoot: {
        height: "20px",
        fontSize: 12,
        backgroundColor: "#F0F0F0",
        fontFamily: "Lato",
        "& .svg": {
            background: "#828282",
        }
    },
    listCrossButton: {
        color: "red",
        position: "relative",
        float: "right",
        // marginTop: "5px",
        cursor: "pointer",
        padding: "0px 0px 0px",
        zIndex: "2",
        display: "block",
        "& svg": {
            transform: "rotate(45deg)",
        },
        // "& :hover": {
        //     backgroundColor: "#F4F4F4",
        // }
    },
}));