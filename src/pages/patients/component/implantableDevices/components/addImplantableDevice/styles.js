import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "830px",
        maxHeight: "calc(100% - 50px)",
    },
    dialogContent: {
        minWidth: "820px",
        padding: "20px 10px 10px 10px"
    },
    box: {
        // display: "flex",
        // flexFlow: "column",
        height: "100%",
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        //maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
    },
    footer: {
        flex: "0 1 40px",
    },
    footerRight: {
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
    verifyBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        marginLeft: 20,
        minWidth: 90,
        padding: "3px 16px",
        fontFamily: "Lato",
        marginTop: "2px",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
        "&:disabled": {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
        // '& .MuiButton-startIcon svg': {
        //   marginLeft: "-10px",
        // }

    },
    deviceInfoSection: {
        width: "100%",
        backgroundColor: '#f9f7f8',
        borderRadius: 5,
        padding: "10px 15px",
        marginBottom: 10,
        border: '1px solid #FFFFFF',
        boxSizing: 'border-box',
        "& MuiTypography-root ": {
            marginBottom: 0,
        }
    },
    deviceInfoTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "12px",
        lineHeight: "25px",
        color: "#565656",
    },
    chargeDetailsArea: {
        display: "grid",
        rowGap: "5px",
        columnGap: "10px",
        width: "100%",
        gridTemplateColumns: "40% 60%",
        "& div": {
            display: "grid"
        }
    },
    labelTitle: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        lineHeight: "21px",
        color: "#52575C",
        textAlign: 'right'
    },
    labelValue: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "18px",
        // minHeight: "28px",
        color: "#52575C",
        minHeight: " 23px",
        marginBottom: "10px",
        paddingTop: "2px",

    },
    circularProgressBar: {
        marginLeft: 0,
        marginRight: theme.spacing(),
        color: "#FFFFFF"
    }
}));