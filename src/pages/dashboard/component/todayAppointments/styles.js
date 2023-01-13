import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  fontStyle: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: "0.4px",
  },
  todayAppointmentList: {
    '& .ant-avatar-image': {
      marginLeft: "0",
    },
    '& h4': {
      marginTop: '0px',
      fontWeight: "600",
      fontSize: "13px",
      lineHeight: "initial",
    },
    '& .ant-list-item-action li': {
      color: "#555555",
      fontSize: "12px",
    },
    '& .ant-list-item-action-split': {
      backgroundColor: "#555555"
    },
    '& .ant-list-item-meta-description': {
      color: "#444444",
      fontSize: "12px",
    },
    '& .ant-list-item': {
      padding: "5px 0",
    },
  
  },
  alignmentImg: {
    textAlign: "center",
    padding: "20px",
    "& h3": {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '21px',
      color: '#000000',
      opacity: '0.3',
    },
    "& img": {
      width: '160px',
    }
  },
  telehealthBadge: {
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  todayAppointmentStatus: {
    fontSize: "10px",
  },
  confirmedStatus: {
    color: "#3FC80F",
  },
  inLobbyStatus: {
    color: "#BD9A38",
  },
  pendingStatus: {
    color: "#FB9600",
  },
  daySearchBox: {
    position: "absolute",
    top: "45px",
    right: "20px",
    '& .ant-select-selector': {
      borderRadius: "10px",
      minWidth: "150px",
    }
  },
  createAppointment: {
    fontWeight: '400',
    fontSize: '18px',
    color: '#00B2E3 !important',
    margin: '10px 0px',
    display: 'block',
    textDecoration: 'none',
  }
}));
