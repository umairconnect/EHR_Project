import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    dialogPaper: {
        maxWidth: "1100px",
    },
    dialogContent: {
        // minHeight: "660px",
        minWidth: "1050px",
        display: "flex",
        padding: "10px 15px",

        // overflow: "auto"
    },
    righInnerContent: {
        marginRight: "15px",
        border: "1px solid #E1E1E1",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        // height: "100%",
        backgroundColor: "#FFFFFF",
        width: "100%"
    },
    header: {
        flex: "0 1 auto",
        cursor: "move"
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "450px",
        minHeight: "200px",
        overflow: "auto",
        // marginBottom: "10px",
        display: "flex",
        // overflow: "initial !important",
        // height: "initial !important",
    },
    crossButton: {
        position: "absolute",
        top: "3px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    footer: {
        flex: "0 1 40px",

    },
    footerRight: {
        float: "right",
        marginRight: "-8px",
        // [theme.breakpoints.down("lg")]: {
        //     marginRight:"150px",
        // },
        // [theme.breakpoints.down("xl")]: {
        //     marginRight:"150px",
        // },
    },
    heading: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '35px',
        color: '#3E3E3E',
        padding: '0px 15px'
    },
    title: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        color: '#00B4E5',
        paddingRight: '10px'
    },
    text: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        color: '#565656',
    },
    text1: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '20px',
        color: '#2A2D30',
    },
    colorText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        color: '#27AE60',
    },
    colorText1: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '20px',
        color: '#27AE60',
    },
    text2: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        color: '#2A2D30',
    },
    list: {
        margin: 0,
        // margin: "5px 1px 10px 1px",
        padding: 0,
        border: 'none',
        listStyle: "none",
        borderTop: "1px solid #e1e1e1",
        "& li": {
            alignItems: "center",
            minHeight: "35px",
            padding: "5px 0px 5px 10px",
            fontSize: "12px",
            borderBottom: "1px solid #E1E1E1",
            minWidth: "100%",
            display: "grid",
            maxWidth: "100%",
            gridAutoFlow: "column",
            gridTemplateColumns: "60% 20% 20%",
            "& .MuiButton-root": {
                minWidth: "75px !important",
                maxWidth: "75px !important",
                width: "75px !important",
                height: '30px',
            }
        },
    },
    table: {
        width: "100%",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "4px",
        borderCollapse: "collapse",
        margin: " 0px 0px 15px",
        "& thead": {
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            minWidth: "100%",
            height: "35px",
            color: "#11284B",
            fontWeight: "bold",
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#11284B",
            padding: "0px 0px 0 5px",
            textAlign: "inherit",
        },
        "& tr": {
            height: "35px"
        },
        "& td": {
            borderTop: "1px solid #E1E1E1",
            textAlign: "left",
            fontStyle: "normal",
            // fontWeight: 400,
            fontSize: "14px",
            color: "#11284B",
            padding: "5px 0px 5px 10px",
            "& img": {
                width: "18px",
                height: "18px",
                cursor: "pointer"
            },
            "& .MuiInputBase-root": {
                marginBottom: "0px !important",
            },
            "& .MuiInputBase-input": {
                lineHeight: "21px",
                minHeight: "30px",
                height: "30px",
                '&:focus': {
                    border: "1px solid #00b2e3",
                    borderRadius: "4px",
                },
            },
            "& span": {
                paddingLeft: "13px"
            }
        }
    },
    btnCenter: {
        textAlign: "center",
        marginTop: "15px",
        marginBottom: "10px"
    }
}))