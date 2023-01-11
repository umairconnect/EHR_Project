import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    dialogPaper: {
        width: "750px",
        // height: "95vh",
        // minHeight: '90vh',
        // maxWidth: '80%',
        // maxHeight: "calc(100% - 14px)",
    },
    dialogContent: {
        // minWidth: "950px",
        display: "flex",
        backgroundColor: "#fff",
        padding: "20px 20px 10px",
    },
    dialogContentRightSide: {
        flex: "1",
        backgroundColor: "#fff",
        padding: "20px 10px 5px 10px",
        // minHeight:"521px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        width: "100%"
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        maxHeight: "575px",
        // minHeight: "575px",
        overflow: "initial !important",
        marginBottom: "10px",
        "& .MuiFormGroup-root": {
            flexDirection: "column",
            paddingRight: '10px'
        },
        "& .MuiTypography-root": {
            color: "#000000"
        }
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
        display: "flex",
        float: "right",
        marginRight: "-8px"
    },
    crossButton: {
        position: "absolute",
        top: "8px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    cardContainer: {
        padding: '0 0 25px 0',
        borderRadius: "8px",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxShadow: "0px 5px 5px rgb(16 30 115 / 5%)",
        marginBottom: '9px',
    },
    cardHeader: {
        height: '41px',
        alignItems: 'center',
        background: '#F3F3F3',
        borderRadius: '8px 8px 0px 0px',
    },
    cardHeading: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#25282B',
        paddingLeft: '20px',
        letterSpacing: '0.01em'
    },
    itemHeader: {
        height: '29px',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#E1E1E1',
        marginBottom: '5px',
        '& .MuiTypography-root': {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '20px',
            color: '#25282B',
            paddingLeft: '20px',
            letterSpacing: '0.01em'
        }
    },
    noHeight: {
        height: "unset !important"
    },
    cardItem: {
        minWidth: '100%',
        "& .MuiGrid-container": {
            height: "50px"
        },
        "& svg": {
            fill: "#F2994A",
            width: "18px",
            height: "18px",
            marginLeft: '8px'
        },
        "& .MuiButtonBase-root": {
            margin: '0 0 5px 15px'
        }
    },
    invitationCardItem: {
        minWidth: '100%',
        "& .MuiGrid-container": {
            height: 'auto'
        },
        "& .MuiTypography-root": {
            textAlign: 'left',
            padding: '0 10px'
        },
        "& a": {
            margin: 0,
            textDecoration: 'underline'
        },
        "& svg": {
            fill: "#F2994A",
            width: "18px",
            height: "18px",
            margin: '0 8px 0 8px'
        },
    },
    checkIcon: {
        width: "18px",
        height: "15px",
        margin: '0 8px 0 8px'
    },
    grid: {
        height: "50px"
    },
    warningCotainer: {
        display: "flex",
        alignItems: 'center',
        '& .MuiTypography-root': {
            textAlign: "left",
            padding: 0
        }
    },
    cardText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#25282B',
        paddingRight: '20px',
        textAlign: "right",
        // alignItems: "center",
    },
    addNew: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        color: "#00B4E5",
        /* justify-content:"center", */
        fontSize: "14px",
        fontFamily: "'Lato'",
        fontWeight: "600",
        marginLeft: "20px",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "0px 10px 0px 0px"
        }
    },
    grid: {
        width: "100%"
    },
    deleteContainer: {
        width: "100%",
        textAlign: "right !important",
        "& img": {
            marginRight: "15px"
        }
    },
    deleteIcon: {
        width: "15px",
        width: "15px",
    },
    acceptedAddNew: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        color: "#00B4E5",
        /* justify-content:"center", */
        fontSize: "14px",
        fontFamily: "'Lato'",
        fontWeight: "600",
        margin: "15px 20px 0",
        "& img": {
            width: "20px",
            height: "20px",
            margin: "0px 10px 0px 0px"
        }
    },
    addNewContainer: {
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
    }
}))