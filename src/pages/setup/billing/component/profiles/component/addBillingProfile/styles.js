import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
    icdCodeTable: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "100%",
        borderCollapse: "collapse",
        margin: " 0px 0px 15px",
        minHeight: "95px",
        "& thead": {
            background: "#FFFFFF",
            border: "1px solid #E1E1E1",
            borderRadius: "8px",
            backgroundColor: "#E0E0E0",
            minWidth: "100%",
            height: "30px",
            textAlign: "left"
        },
        "& th": {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#52575C",
            padding: "0px 10px"
        },
        "& tr": {
            height: "30px"
        },
        "& td": {
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            color: "#52575C",
            padding: "0 10px 0 10px",
            "& .MuiInputBase-root": {
                marginBottom: "0px"
            },
            "& input": {

            }
        },
        "& img": {
            width: "18px",
            height: "18px",
            margin: "3px -2px 0 0",
            cursor: "pointer"
        }
    },
    deleteIcon: {
        //float: "right",
        cursor: "pointer",
        right: "15px",
        paddingTop: "5px",
        position: "absolute",
        cursor: "pointer",
        paddingTop: 5,
        "& img": {
            width: "18px",
            height: "18px",
        }
    },
    cptTableAction: {
        display: "flex",

        // "& img": {
        //     width: "18px",
        //     height: "18px",
        //     margin: "2px 5px 0px 0px"
        // }
    },
    ndcCustomBtn: {
        backgroundColor: '#11284b',
        textTransform: 'none',
        borderColor: '#11284b',
        color: 'white',
        marginRight: 8,
        minWidth: 75,
        padding: "0px 16px",
        fontFamily: "Lato",
        '&:hover': {
            backgroundColor: '#596270',
            borderColor: '#11284b',
            color: 'white',
        },
    },
    subTd: {
        // display: "inline-block",
        minWidth: "50px",
        // maxWidth: "23px",
        textAlign: "center",
        margin: "0 4px",
        maxWidth: "52px",
        padding: "0px 2px 0px 0px",
        "& .MuiAutocomplete-root": {
            width: "50px",
            "& .MuiInputBase-root": {
                width: "50px",
                padding: "2px 12px 0px",
                lineHeight: "21px",
                height: "35.63px",
                "& .MuiInputAdornment-root": {
                    display: "none"
                }
            },

        },
    },
    quantityTd: {
        minWidth: "70px",
        // maxWidth: "23px",
        textAlign: "center",
        margin: "0 4px",
        maxWidth: "70px",
        padding: "0px 2px 0px 0px",
        // "& .ant-input-number": {
        //     border: "none",
        //     boxShadow: "none",
        //     '&:focus': {
        //         boxShadow: "none"
        //     },
        // },
        "& .MuiAutocomplete-root": {
            width: "50px",
            "& .MuiInputBase-root": {
                padding: "2px 12px 0px",
                lineHeight: "21px",
                height: "35.63px",
                "& .MuiInputAdornment-root": {
                    display: "none"
                }
            },

        },
    },
    priceTd: {
        minWidth: "100px",
        textAlign: "center",
        margin: "0 4px",
        maxWidth: "100px",
        padding: "0px 2px 0px 0px",
        // "& .ant-input-number": {
        //     border: "none",
        //     boxShadow: "none",
        //     '&:focus': {
        //         boxShadow: "none"
        //     },
        // },
        "& .MuiAutocomplete-root": {
            width: "50px",
            "& .MuiInputBase-root": {
                padding: "2px 12px 0px",
                lineHeight: "21px",
                height: "35.63px",
                "& .MuiInputAdornment-root": {
                    display: "none"
                }
            },

        },
    },
    procedureAction: {
        width: "18px",
        height: "18px",
        margin: "3px 6px 0px 0px",
        cursor: "pointer"
    }
}));