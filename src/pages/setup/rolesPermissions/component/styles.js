import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    fileUploadInput: {
        display: "none"
    },
    fileUploadLabel: {

    },
    uploadFileBtn: {
        backgroundColor: '#f3f3f3',
        borderColor: '#f3f3f3',
        color: '#25282B',
        marginRight: 8,
        minWidth: 188,
        textTransform: "capitalize",
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "center",
        lineHeight: "40px",
        cursor: "pointer",

        '&:hover': {
            backgroundColor: '#DDDDDD',
            borderColor: '#DDDDDD',

        },
    },
    uploadFileIcon: {
        color: "#00b2e3",
        marginRight: 10
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
    trHeader: {
        height: '40px',
        display: 'flex',

        justifyContent: 'space-between',
        backgroundColor: '#D9DFDF',
    },
    trHeaderLabel: {
        color: 'black',
        fontSize: '16px!important',
        fontFamily: 'Lato',
        fontWeight: 'bold',
        marginTop: '10px',


    },
    gridRow: {

        border: '0.5px darkcyan',
        borderTop: '0.5px solid',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.01em',
        borderTop: '1px solid #E1E1E1',
        textAlign: 'left',
        paddingLeft: '15px',
    },

    gridRowBottom: {
        borderBottom: '1px solid #E1E1E1',
        padding: "8px 12px",

    },

    gridRowBottomLeft: {
        borderBottom: '1px solid #E1E1E1',
        borderLeft: '1px solid #E1E1E1',
        padding: "8px 12px",
    },
    gridRowBottomRight: {
        borderBottom: '1px solid #E1E1E1',
        borderRight: '1px solid #E1E1E1',
        padding: "8px 12px",
    },
    griLabel: {
        color: '#6E6E6E',
    },
    griLabelChild: {
        color: '#6E6E6E',
        paddingLeft: "30px"
    },
    gridFirstColumn: {
        backgroundColor: '#E8E8E8',
    },
    footer: {
        bottom: "0px",
        display: "flex",
        zIndex: 3,
        position: "fixed",
        width: "65%",
        margin: "auto",
        justifyContent: "center",
    },

}));
