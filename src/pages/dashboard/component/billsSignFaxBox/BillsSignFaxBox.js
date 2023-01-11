import React, { useState, useEffect } from "react"; //, { useState }
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { BoxContainer, IconAvatars, IconAvatarsSmall, FooterButton } from '../boxContainer/BoxContainer';
import FaxIcon from '../../../../images/icons/dashboardFaxIcon.png';
import BillsIcon from '../../../../images/icons/dashboardBillsIcon.png';
import DocumentsIcon from '../../../../images/icons/dashboardDocumentsIcon.png';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { formatDate, formatTime, getAgeByDOB } from '../../../../components/Common/Extensions';
import { useHistory } from "react-router-dom";
// styles
import useStyles from "./styles";
import { IsEditable } from '../../../../Services/GetUserRolesRights';

export default function BillsSignFaxBox(props) {
    var classes = useStyles();

    const history = useHistory();
    const [moduleAccess, setModuleAccess] = useState({ isClinical: false, isDocumentToSign: false })

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [pendingSuperBill, setPendingSuperBill] = useState([]);
    const [documentsToSign, setDocumentsToSign] = useState([]);
    const [pendingSuperBillCount, setPendingSuperBillCount] = useState(0);
    const [documentsToSignCount, setDocumentsToSignCount] = useState(0);
    const reloadData = () => {
     
        if (props.pendingBills) {
            var _billCounter = 0;
            
            setPendingSuperBill(
                props.pendingBills.map((item, i) => {
                    _billCounter++;
                    var divider = "";
                    if (item.text2 && item.text3) {
                        divider = " | ";
                    }
                    var _age = getAgeByDOB(item.text3.split(' ')[0]);
                    var _gender = item.text2 ? item.text2 : "";
                    var _patientDetails = _gender + divider + _age;
                    return {
                        patientId: item.id,
                        patientName: item.text1,
                        patientGender: item.text2 ? item.text2 : "",
                        patientAge: getAgeByDOB(item.text3.split(' ')[0]),
                        patientDetails: _patientDetails,
                        superBillDate: item.text4,
                        encounterLink: "/app/encounter?id="+item.id+"/" + item.id1+"/"+item.id2
                    };
                }));
            setPendingSuperBillCount(_billCounter);
        }

        if (props.unsignDoc) {
            var _documentToSign = 0;
            setDocumentsToSign(
                props.unsignDoc.map((item, i) => {
                    _documentToSign++;
                    var divider = "";
                    if (item.text4 && item.text5) {
                        divider = " | ";
                    }
                    var _age = getAgeByDOB(item.text5.split(' ')[0]);
                    var _gender = item.text4 ? item.text4 : "";
                    var _patientDetails = _gender + divider + _age;
                    return {
                        documentControlId: item.id,
                        patientName: item.text1,
                        providerName: item.text2,
                        documentDate: item.text3,
                        patientGender: item.text4 ? item.text4 : "",
                        patientAge: getAgeByDOB(item.text5.split(' ')[0]),
                        patientDetails: _patientDetails,
                    };
                }));
            setDocumentsToSignCount(_documentToSign);
        }
       
    }

    const goToDocumentSign = ()=> {
        history.push({
            pathname: '/app/tasks',
            state: {
              toDocumentSign: true,
            }
          });
    }

    function loadLabResultSetting() {
        setModuleAccess(prevState => ({
            ...prevState,
            ['isDocumentToSign']: props.isDocumentToSign,
            ['isClinical']: props.isClinical
        }));
    }

    useEffect(() => {
        reloadData();
        loadLabResultSetting();
    }, [props.isUpdate]);
    return (
        <>
            {/* Pending Super Bills, Documents to sign, Fax referrals  components  */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {/*  item xs={6}> */}
                        <BoxContainer>
                            <IconAvatarsSmall title={"Pending Super Bills"} value={''} width={"48%"} textColor={"#b96a13"} bgColor={"#f2e3cf"} valuewidth={"31%"} imgUrl={BillsIcon} />
                            <Grid container spacing={2}>
                                {pendingSuperBill.length > 0 ?
                                    pendingSuperBill.slice(0,2).map((item) => (
                                        <Grid item xs={6}>
                                            <PendingSuperBill
                                                name={item.patientName}
                                                gender={item.patientGender}
                                                age={item.patientAge}
                                                details={item.patientDetails}
                                                date={item.superBillDate}
                                                viewNoteLink={item.encounterLink} 
                                                boxHeight="144px"/>
                                        </Grid>
                                    ))
                                    : <h1 className={classes.noReportFound}>No Pending Super Bill</h1>}
                            </Grid>
                            {moduleAccess.isClinical?  <a className={classes.viewAllLink}>
                                <FooterButton title={"View All"} linkUrl={'/app/clinical?pendingSuperBills=true'} />
                            </a> : <FooterButton title={"View All"} disabledBtn={true} />}
                        </BoxContainer>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.documentSignContan}>
                        {/* item xs={6}> */}
                        <BoxContainer>
                            <IconAvatarsSmall title={"Documents To Sign"} value={''} width={"48%"} valuewidth={"31%"} textColor={"#525a61"} bgColor={"#d8d9da"} imgUrl={DocumentsIcon} />

                            {documentsToSign.length > 0 ?
                                documentsToSign.slice(0,3).map((item) => (
                                    <DocumentsToSign
                                        name={item.patientName}
                                        gender={item.patientGender}
                                        age={item.patientAge}
                                        details={item.patientDetails}
                                        date={item.documentDate}
                                        drName={item.providerName} />
                                ))
                                : <h1 className={classes.noReportFound}>No Document To Sign</h1>}
                            {moduleAccess.isDocumentToSign ? <a onClick={goToDocumentSign} className={classes.viewAllLink}>
                                <FooterButton title={"View All"} />
                            </a> : <FooterButton title={"View All"} disabledBtn={true} />}

                        </BoxContainer>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.faxReferalContain}>
                <BoxContainer>
                    <IconAvatars marginTop={"54px"} marginBottom={"54px"} title={"No Fax Referrals"} value={"0"} bgColor={"#ffe9e9"} imgUrl={FaxIcon} />
                    <a className={classes.viewAllLink}>
                      <FooterButton title={"View All"} linkUrl={'/'} disabledBtn={true} />
                    </a>
              
                </BoxContainer>
            </Grid>

        </>
    );
}

{/* Pending Super Bills details components */ }
function PendingSuperBill(props) {
    var classes = useStyles();
    return (
        <Paper className={classes.billBox} style={{height: props.boxHeight}}>
            <Typography className={`${classes.name} ${classes.fontStyle}`}>
                {props.name}
            </Typography>
            <Typography className={`${classes.pendingSupergenderAge} ${classes.fontStyle}`}>
                {props.details}
            </Typography>
            <Typography className={`${classes.name} ${classes.date} ${classes.fontStyle}`}>
                {props.date}
            </Typography>
            
            <Link to={props.viewNoteLink ? props.viewNoteLink : "/"} style={{ textDecoration: "none" }}>
                <Button className={`${classes.noteLinkBtn}  ${classes.fontStyle}`} >View Encounter</Button>
            </Link>
        </Paper>
    );
}

{/* Documents to sign details components */ }
function DocumentsToSign(props) {
    var classes = useStyles();
    return (
        <Grid container alignItems="center" direction="row" className={classes.signBox}>
            <Grid item xs={4}>
                <Typography className={`${classes.name} ${classes.fontStyle}`}>
                    {props.name}
                </Typography>
                <Typography className={`${classes.genderAge} ${classes.fontStyle}`}>
                    {props.details}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography className={`${classes.name} ${classes.date} ${classes.fontStyle} ${classes.colorLight}`}>
                    {props.date}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography className={`${classes.name} ${classes.date} ${classes.fontStyle} ${classes.colorLight}`}>
                    {props.drName}
                </Typography>
            </Grid>
        </Grid>
    );
}
