import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "1020px"
    },
    DialogContent: {
        // minWidth: "832px",
        minWidth: "1020px",
        minHeight: "550px",
        display: "flex",
        "& .MuiGrid-grid-lg-11": {
            maxWidth: "95%",
            flexBasis: "95%",
        },
    },
    DialogContentLeftSide: {
        flex: "1",
        backgroundColor: "#F4F4F4",
        padding: "5px",
        maxWidth: "330px",
        flexBasis: "330px",
        // minHeight:"521px",
        padding: "12px 10px 5px 10px",
    },
    DialogContentRightSide: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "530px",
        minHeight: "400px",
        overflow: "auto",
        marginBottom: "10px",
        "& table.dataTable thead  > tr > th.sorting:last-child:before": {
            display: "none"
        },
        "& table.dataTable thead  > tr > th.sorting:last-child:after": {
            display: "none"
        },
        "& table.dataTable thead  > tr > th:last-child": {
            pointerEvents: "none !important"
        },
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
    leftSideHeader: {
        //backgroundColor:"#00B2E3",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#11284B",
        borderRadius: "10px 10px 0 0",
        height: "80px",
        minWidth: "100%",
        padding: "15px 15px 10px 12px",
    },
    richTextEdit: {
        width: "100%",
        height: "390px",
        "& .RichTextEditor__paragraph___3NTf9": {
            margin: "0",
        }
    },
    addRosBox: {
        zIndex: "99999",
        fontFamily: "Lato",
        boxShadow: "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
    },
    paper: {
        padding: "5px 10px",
        minWidth: "394px",
        maxWidth: "394px",
        minHeight: "275px",
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    addRosTitle: {
        flex: "0 1 auto",
        padding: "2px",
        borderBottom: "1px solid #DDDDDD",
        color: "#11284B",
        fontSize: "16px",
        fontWeight: "bold",
    },
    addRosContent: {
        flex: "1 1 auto",
        overflow: "auto",
        padding: "10px 15px 10px 2px",
    },
    addRosFooter: {
        flex: "0 1 40px",
        padding: "8px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    headerLabel: {
        "& label": {
            marginTop: 5,
            marginBottom: 0,
        }
    },
    lableInput: {
        paddingRight: 19,
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        paddingTop: "10px",
        minHeight: "40px",
        textAlign: "right",
        display: "block"
    },
    addNewIcon: {
        float: "right",
        marginLeft: "7px",
        cursor: "pointer",
        paddingTop: 10,
    },
    deleteIcon: {
        float: "right",
        cursor: "pointer",
        paddingTop: 10,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    Icon: {
        cursor: "pointer",
        width: "18px",
        height: "18px"
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
            '&:focus': {
                border: "1px solid #00b2e3",
                borderRadius: "4px",
                outline: 0,
            },
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },

    },
    inputContainer: {
        maxHeight: "200px",
        overflow: "auto"
    },
    listHeader: {
        margin: "10px 0px 0px -12px",
        borderBottom: "1px solid #DBDADA",
        paddingLeft: 8,
    },
    quickPickHeader: {
        // maxHeight:"420px",
        paddingLeft: "0px"
    },
    leftInnerBox: {
        height: "100%",
        background: "#FFFFFF",
        border: "1px solid #DBDADA",
        borderRadius: "0px 0px 4px 4px"
    },
    listItemRoot: {
        padding: "2px 0px 2px 0px"
    },
    listTitle: {
        fontWeight: "600",
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        textAlign: "left",
        display: "block"
    },
    listitem: {
        fontFamily: "Lato",
        color: "#25282B",
        fontSize: 14,
        textAlign: "left",
        display: "block"
    },
    templatesList: {
        margin: "0px 0px 5px 0px",
        padding: "0",
        listStyle: "none",
        maxHeight: "550px",

        "& li": {
            position: "relative",
            fontSize: "12px",
            color: "#000",
            display: "flex",
            width: "100%",
            // width:"264px",
            // height:30,
            marginBottom: 10,
            margin: 0,
            outline: 0,
            padding: "0 12px 0 5px",
            listStyle: "none",
            color: "#000",
            fontSize: 12,
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "#F3F3F3"
            }

        }
    },
    listItemName: {
        display: "flex",
        // flex:"1 1 1",
        // minWidth:0,
    },
    templatesCode: {
        color: "#25282B",
        minWidth: 73,
        fontSize: 12,
        fontWeight: "bold",
        float: "left",
        padding: "0px 15px 0px 5px"
    },
    templatesName: {
        width: "215px",
        color: "#25282B",
        fontSize: 12,
        fontWeight: "bold",
        // float:"left",  
        // maxWidth:"100px",
        padding: "0px 5px 0px 0px"
    },
    templatesCodeDetail: {
        color: "#52575C",
        minWidth: 70,
        // maxWidth:70,
        fontSize: 12,
        float: "left",
        padding: "0px 18px 0px 5px",
        lineHeight: "20px",
    },
    templatesNameDetail: {
        width: "215px",
        color: "#52575C",
        fontSize: 12,
        float: "left",
        padding: "0px 10px 0px 0px",
        lineHeight: "18px",
    }
}));
