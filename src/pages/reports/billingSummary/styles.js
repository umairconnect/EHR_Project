import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles((theme) => ({
    shadowBox: {
        margin: "0px 15px",
        padding: "20px 15px",
        borderRadius: "10px"
    },
    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#25282B",
            fontFamily: "Lato",
            width: "80px",
            maxWidth: "50px",
            fontSize: "14px",
            opacity: "1",
            height: "36px"
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#11284B",
            borderRadius: " 0px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#00B2E3",
            color: "#11284B",
        },
        "& .MuiTab-root": {
            minWidth: "80px",
            minHeight: "32px"
        }
    },
    tabRoot: {
        maxWidth: "100%",
        // top: '35px',
        position: 'relative',
        borderBottom: '1px solid #A3A3A3',
        marginBottom: '5px',
        minHeight: '36px'
    },
    dataCard: {
        height: '155px',
        // width: '195px',
        width: '33%',
        marginRight: '20px',
        padding: '10px 15px',
        background: "#fff", border: '1px solid #E1E1E1',
        boxShadow: '0px 4px 4px rgba(124, 124, 124, 0.15)',
        borderRadius: '8px',
    },
    cardLabel: {
        color: "#25282B",
        fontFamily: "Lato",
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: "18px",
    },
    fastestCardText: {
        height: "123px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "& p": {
            fontFamily: "Lato",
            fontSize: "48px",
            fontWeight: 300,
            lineHeight: "18px",
            textAlign: "center",
            color: "#27AE60",
            margin: 0
        }
    },
    slowestCardText: {
        height: "123px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "& p": {
            fontFamily: "Lato",
            fontSize: "48px",
            fontWeight: 300,
            lineHeight: "18px",
            textAlign: "center",
            color: "#EB5757",
            margin: 0
        }
    },
    averageCardText: {
        height: "123px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "& p": {
            fontFamily: "Lato",
            fontSize: "48px",
            fontWeight: 300,
            lineHeight: "18px",
            textAlign: "center",
            color: "#4572A7",
            margin: 0
        }
    },
    adjustmentReasonsTable: {
        borderSpacing: 0,
        width: "100%",
        background: "#FFFFFF",
        border: "1px solid #E1E1E1",
        boxSizing: "border-box",
        borderRadius: "8px",
        borderCollapse: "inherit",
        margin: "0px",
        boxShadow: "0px 4px 4px rgba(124, 124, 124, 0.15)",
        borderTop: 'none',
        "& thead": {
            border: "none",
            backgroundColor: "#fafafa",
            minWidth: "100%",
            height: "40px",
            "& td": {
                color: "#11284B",
                fontWeight: "bold",
            }
        },
        // "& th": {
        //     fontStyle: "normal",
        //     fontWeight: "bold",
        //     fontSize: "14px",
        //     color: "#11284B",
        //     padding: "0px 0px 0 5px",
        //     textAlign: "inherit",
        // },
        // "& tr": {
        //     height: "35px"
        // },
        "& td": {
            borderTop: "1px solid #E1E1E1",
            textAlign: "left",
            fontStyle: "normal",
            // fontWeight: 400,
            fontSize: "14px",
            color: "#52575C",
            padding: "5px 0px 5px 10px",
            // "& span": {
            //     paddingLeft: "13px"
            // }
        }
    },
    [theme.breakpoints.down('sm')]: {
        fastestCardText: {
            "& p": {
                fontSize: "30px",
                lineHeight: "32px",
            }
        },
        slowestCardText: {
            "& p": {
                fontSize: "30px",
                lineHeight: "32px",
            }
        },
        averageCardText: {
            "& p": {
                fontSize: "30px",
                lineHeight: "32px",
            }
        },
    },
    [theme.breakpoints.up('md')]: {
        fastestCardText: {
            "& p": {
                fontSize: "30px",
                lineHeight: "32px",
            }
        },
        slowestCardText: {
            "& p": {
                fontSize: "30px",
                lineHeight: "32px",
            }
        },
        averageCardText: {
            "& p": {
                fontSize: "30px",
                lineHeight: "32px",
            }
        },
    },
}))