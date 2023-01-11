import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogPaper: {
        minWidth: "1150px",
        // maxWidth: "100%",
        // padding: '15px 20px',
        padding: '15px 0px 15px 20px',
        maxHeight: '100vh',
        mixWidth: '100wv'
    },
    DialogContent: {
        minWidth: "100%",
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
        // maxHeight: "530px",
        minHeight: "400px",
        overflow: "auto",
        marginBottom: "10px",
        paddingRight: "20px",
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
    gridArea: {
        // margin: "0px 20px",
        '& .dataTable': {
            '& table tbody>tr>td': {
                fontSize: '12px !important',
            }
        },
        '& .custom-grid': {
            '& table thead>tr>th': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: '12px !important',
                height: 40
            },

            '& table tbody>tr>td': {
                lineHeight: "normal",
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: '12px !important',
                "& .MuiTypography-root": {
                    fontSize: '12px !important',
                },
                "& a": {
                
                }
            },

            '&  .ant-table tfoot>tr>td': {
                paddingLeft: 8,
                paddingRight: 8,
                fontSize: '12px !important',

            }
        }
    },
    gridButtonsArea: {
        padding: "5px 10px",
        textAlign: "right",
    },
    gridButton: {
        fontFamily: "Lato",
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: "14px",
        color: "#00B2E3",
        textTransform: "none",
        textDecoration: "underline",
        cursor: "pointer",
    },
}));
