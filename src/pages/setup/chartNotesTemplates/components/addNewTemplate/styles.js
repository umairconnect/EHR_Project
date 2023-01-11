import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
    templateInfoList: {
        margin: "5px 1px 20px 1px",
        // padding: "0px",
        listStyle: "none",
        "& li": {
            // fontFamily: 'Lato',
            display: "flex",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '25px',
            color: '#000000',
        }
    }, footer: {
        margin: "auto",
        paddingTop: "15px",
    },
    footerButtons: {
        justifyContent: "center",
        display: "flex",
    },
    orderList: {
        margin: "-10px 1px 10px 1px",
        padding: "0px",
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        "& li": {
            color: '#5D8AB5',
            // height: "35px",
            minHeight: "30px",
            outline: 0,
            // padding: "0 12px 0 12px",
            padding: "5px 30px 5px 12px",
            position: "relative",
            fontSize: "12px",
            background: "#f6f6f6",
            fontWeight: "600",
            border: "1px solid #E1E1E1",
            boxSizing: "border-box",
            boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
            borderRadius: "25px",
            minWidth: "115px",
            // maxWidth: "220px",
            // width: "120px",
            margin: "4px 4px 4px 0px"
        },
    },
    deleteIcon: {
        cursor: "pointer",
        // right: "7px",
        // paddingTop: "5px",
        // position: "absolute",
        color: "#FD5F5F",
        // justifyContent: "center",
        right: "-7px",
        position: "absolute",
        paddingTop: 0,
        top: "50%",
        transform: "translate(-50%,-45%)",
        "& svg": {
            transform: "rotate(45deg)",
        },
    },
    customAccordion: {
        width: "100%",
        marginBottom: "10px !important",
        "& .MuiAccordionSummary-root": {
            maxHeight: "33px",
            minHeight: "33px",
            backgroundColor: "#f3f3f3"
        },
        "& MuiAccordionDetails-root": {
            flexDirections: "column",
        }
    },
    heading: {
        // fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "17px",
        color: "#25282B",
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 10px 0px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        // position: "absolute",
        // top: "2px",
        '&:hover': {
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            color: "white",
        }
    },
    accordionTable: {
        width: "100%",
        textAlign: "left",
        "& thead": {
            height: "29px",
            backgroundColor: "#8893a5",
            color: "white",
        },
        "& tbody": {
            "& td": {
                // fontFamily: 'Lato',
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#2A2D30",
            }
        }

    },
    Icon: {
        width: "18px",
        height: "18px",
        cursor: "pointer"
    },
}));