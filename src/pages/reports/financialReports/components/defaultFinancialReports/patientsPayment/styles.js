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
    customGrid: {
        minHeight: "45px",
        "& .MuiButton-root": {
            margin: "0px 0px 10px 10px"
        },
        "& .MuiFormLabel-root": {
            marginBottom: "10px !important"
        }
        // marginBottom: "10px"
    },

    dialogPaper: {
        maxWidth: '80%',
      },
      dialogcontent: {
        padding: "16px 24px 10px 24px"
      },
      box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
      },
      header: {
        flex: "0 1 auto",
        display: "flex",
        cursor: "move",
        position: "relative",
      },
      content: {
        flex: "1 1 auto",
      },
      crossButton: {
        position: "absolute",
        top: "-13px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
          backgroundColor: "#F4F4F4",
        }
      },
      
      shadowBox: {
        padding: "15px 15px 60px 15px",
        border: "1px solid #E8E8E8",
        borderRadius: "10px",
        minHeight: "calc(100vh - 60px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        marginBottom: "-23px"
    },


}));
