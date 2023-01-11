import {
    makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
    gridArea: {
        margin: "0px 20px",
        '& .custom-grid': {
            '& table thead>tr>th': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12,
                height: 40
            },

            '& table tbody>tr>td': {
                lineHeight: "normal",
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12,
                "& a": {
                    fontSize: 12,
                },
                "& .MuiTypography-root": {
                    fontSize: 12,
                    margin: 0
                }
            },

            '&  .ant-table tfoot>tr>td': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: 12,
                textAlign: "right",
                "& input": {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#000000d9",
                    textAlign: "right",
                }
            },
            "& .ant-pagination-item": {
                border: "none",
                color: "rgba(0, 0, 0, 0.85)"
            },
            "& .ant-pagination-prev, .ant-pagination-next": {
                border: "none"
            },
            "& .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link": {
                border: "none"
            }
        }
    },
    newAddBtn: {
        backgroundColor: "#11284B",
        color: "white",
        margin: "4.5px 16px 0",
        height: 30,
        fontSize: 12,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        '&:hover': {
            backgroundColor: "#596270",
        },
        newAddBtnLink: {
            color: "white",
        },
        '& .MuiSvgIcon-root': {
            fontSize: 13,
        },
        '& .MuiButton-startIcon.MuiButton-iconSizeSmall': {
            margin: "0px 5px -2px 0"
        }
    },
    positionRelative: {
        position: "relative",
    },
    newAddBtn2: {
        width: "112px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #11284B",
        margin: "0px 0px 0px 5px",
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        position: "absolute",
        top: "2px",
        '&:hover': {
            // backgroundColor: "#596270",
            backgroundColor: "#11284b",
            color: "white",
        },
        newAddBtnLink: {
            // color:"#11284B"
            color: "white",
        }
    },
    filterContainer: {
        display: "flex",
        position: "absolute",
        bottom: "30px",
        left: "30px"
    },
    filter: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        height: 15,
        width: 15,
        marginRight: 15
    },
    mandatoryIcon: {
        backgroundColor: "#feaaaa"
    },
    mandatoryText: {
        fontSize: "14px",
        color: "#feaaaa",
        marginRight: 15
    },
    defaultIcon: {
        backgroundColor: "#ffbd71"
    },
    defaultText: {
        fontSize: "14px",
        color: "#ffbd71"
    }
}));
