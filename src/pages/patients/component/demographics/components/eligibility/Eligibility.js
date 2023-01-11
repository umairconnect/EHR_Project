import React, { useState, useEffect } from "react";
import {
    Grid,
    FormLabel,
    Collapse,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles";
import { PostDataAPI } from '../../../../../../Services/APIService';
import { RadioboxField, SelectField } from "../../../../../../components/InputField";
import { ShadowBoxMin, FormGroupTitle, FormBtn, Label } from "../../../../../../components/UiElements";
import EditAbleGrid from "../../../../../../components/SearchGrid/component/EditAbleGrid"
import LoadingIcon from "../../../../../../images/icons/loaderIcon.gif";
//import { USAStateListOptions } from "../../../../../../context/StaticDropDowns";

import { withSnackbar } from "../../../../../../components/Message/Alert";
import { formatDate, formatTime } from '../../../../../../components/Common/Extensions';
import { data as gridCnfg } from '../../../../../../components/SearchGrid/component/setupData';
import { Table, Empty } from "antd";
import '../../../../../../components/SearchGrid/style.css';
import '../../../../../../components/SearchGrid/antStyle.css';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';

const eligibilityTypeOptions = [
    {
        value: "Primary",
        label: "Primary",
        className: 'adjustLabels',
    },
    {
        value: "Secondary",
        label: "Secondary",
        className: 'adjustLabels',
    },
];
function Eligibility(props) {
    const { showMessage } = props;
    var classes = useStyles();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isLoading, setIsLoading] = useState(null);
    const [clickSearchLoading, setClickSearchLoading] = useState(false);
    const [isOpenClose, setIsOpenClose] = useState({ collapseOne: false, collapseTwo: true, collapseThree: true, })
    const [rowData, setRowsData] = useState([])
    const defaultAttributes = {
        eligibilityCheckId: 0, payerId: 0, patientId: props.dataId, benefitCategoryCode: '',
        benefitSubcategoryCode: '', copayAmt: 0, copayPercent: 0, certificate: '',
        groupNumber: '', eligibilityResponse: '', eligibilityResponseDatetime: '', subscriberInfo: '',
        summaryText: '', detailText: '', isDeleted: false, benefitOrderCode: 'Primary', payerCode: '', planCode: '', updateDate: '',
        payerName: '', planName: ''
    };
    const [state, setState] = useState(defaultAttributes);
    const [allShowHide, setAllShowHide] = useState(false);
    const [benifitData, SetBenifitData] = useState([]);
    const [groupData, SetGroupData] = useState([])
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const ShowActionDialog = (actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback
        }));
    }
    const loadData = (benefitOrderCode, benefitCategoryCode) => {
        SetGroupData([]);
        if (props.dataId > 0) {
            const searchObj = { PatientId: props.dataId, BenefitOrderCode: benefitOrderCode, benefitCategoryCode: benefitCategoryCode };
            PostDataAPI("insuranceeligibilitycheck/loadData", searchObj).then((result) => {
                if (result.success && result.data != null) {
                    if (result.data.eligibilityResponseDatetime)
                        result.data.eligibilityResponseDatetime = result.data.eligibilityResponseDatetime.split('T')[0];
                    result.data.benefitCategoryCode = benefitCategoryCode;
                    if (!result.data.updateDate)
                        result.data.updateDate = result.data.createDate;

                    setState(result.data);
                    loadGridData(result.data.eligibilityCheckId, benefitCategoryCode);

                }
                else {
                    let obj = defaultAttributes;
                    obj.benefitOrderCode = benefitOrderCode;
                    obj.benefitCategoryCode = benefitCategoryCode;
                    setState(obj);
                }

            })
        }
        else {
            setState(defaultAttributes);
        }
    }
    const checkEligibilityId = () => {
        if (state.eligibilityCheckId > 0) {
            ShowActionDialog(true, "Delete", "Are you sure you want to check again?", "confirm", function () {
                checkEligibility()
            })
        } else {
            checkEligibility()
        }
    }
    const checkEligibility = () => {
        if (!state.eligibilityResponseDatetime)
            state.eligibilityResponseDatetime = null;
        if (!state.updateDate)
            state.updateDate = null;
        setClickSearchLoading(true)
        PostDataAPI("patient/Eligibility/check", state, true).then((result) => {
            setClickSearchLoading(false)
            if (result.success == true) {
                showMessage("Success", 'Eligibility details pulled successfully, please view detail on the screen.', "success", 2000);
                if (state.eligibilityCheckId < 1)
                    setState(prevState => ({
                        ...prevState,
                        ["eligibilityCheckId"]: result.data.eligibilityCheckId
                    }));
            }
            else {
                showMessage("Error", result.message, "error", 15000);
            }

            loadData(state.benefitOrderCode, state.benefitCategoryCode);
        })
    }

    const handleEligibilityTypeChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        loadData(value, state.benefitCategoryCode);

    }
    const handleServiceTypeChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (state.eligibilityCheckId > 0)
            loadGridData(state.eligibilityCheckId, value);
    }
    const [pageLoading, setPageLoading] = useState(false);
    const [eligibilityServiceTypes, setEligibilityServiceTypes] = useState([]);
    const getEligibilityServiceTypeDataList = e => {
        setPageLoading(true)
        var params = {
            code: "get_eligibility_service_types",
            parameters: []
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            setPageLoading(false)
            if (result.success && result.data != null) {
                setEligibilityServiceTypes(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        });
    }

    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: props.dataId,
            area: "Patient",
            activity: "Load patient details",
            details: "User viewed patient demographics eligibility screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }
    useEffect(() => {
        saveAuditLogInfo()
        getEligibilityServiceTypeDataList();
        loadData(state.benefitOrderCode, "");

    }, []);

    const loadGridData = (id, benefitCategoryCode) => {
        SetGroupData([]);
        var data = {
            eligibilityCheckId: id,
            benefitCategoryCode: benefitCategoryCode
        }
        var dataArray = [];
        var groups = [];
        PostDataAPI("insuranceeligibilitycheck/loadBenifitData", data, true).then((result) => {
            if (result.success == true) {
                result.data.map((item, i) => {
                    if (item.info == "Health Care Facility")
                        return;

                    if (item.info == 'Contact Following Entity for Eligibility or Benefit Information')
                        item.info = "Eligibility/Benefit Information";
                    if (dataArray[item.info]) {
                        dataArray[item.info].push(item);

                    } else {
                        dataArray[item.info] = [item];
                        groups.push(item.info);
                    }

                });
            }
            else {
                showMessage("Error", result.message, "error");
            }
            SetGroupData(groups);
            SetBenifitData(dataArray);
        });

    }
    return (
        <>
            <ShadowBoxMin shadowSize={3} >
                {pageLoading ? <img className={classes.loader} src={LoadingIcon} alt="Loading..." /> :
                    <form id="employer-form" className={classes.formAlignment}>
                        <Grid container >
                            <FormGroupTitle>Insurance Eligibility</FormGroupTitle>

                            <Grid item lg={12} container direction="row">
                                <Label title="Benefits" size={2} />
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <SelectField
                                        placeholder="Service Type"
                                        name="benefitCategoryCode"
                                        value={state.benefitCategoryCode}
                                        options={eligibilityServiceTypes}
                                        onChange={handleServiceTypeChange}
                                    />

                                </Grid>
                                <Grid item xs={12} md={4} sm={4} lg={3}>
                                    <div style={{ marginLeft: "17px" }}>
                                        {clickSearchLoading ?
                                            <FormBtn id="loadingSave" size="medium" > Check Eligibility </FormBtn>
                                            :
                                            <FormBtn id={"save"} size="medium" onClick={checkEligibilityId}>Check Eligibility</FormBtn>
                                        }

                                    </div>
                                </Grid>

                            </Grid>
                            <Grid item lg={12} container direction="row">

                                <Grid item xs={12} md={2} sm={2} lg={2} >
                                </Grid>
                                <Grid item xs={12} md={4} sm={4} lg={3} >
                                    <RadioboxField
                                        id="benefitOrderCode"
                                        name="benefitOrderCode"
                                        value={state.benefitOrderCode}
                                        labelPlacement="end"
                                        options={eligibilityTypeOptions}
                                        onChange={handleEligibilityTypeChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row">
                                <Label title="Payer" size={2} />
                                <Grid item xs={12} md={5} sm={4} lg={5} >
                                    <FormLabel className={classes.label}>{state.payerName}
                                    </FormLabel>
                                </Grid>


                            </Grid>
                            <Grid item lg={12} container direction="row" className={`${classes.bg} ${classes.p10}`}>
                                {/*<Label title="Copay" size={2} />*/}
                                {/*<Grid item xs={12} sm={2} md={1} lg={1} >*/}
                                {/*    <div className={classes.labelSub}>{state.copayAmt} ({state.copayPercent}%)</div>*/}
                                {/*</Grid>*/}
                                {/*<Label title="Certificate" size={2} />*/}
                                {/*<Grid item xs={12} sm={2} md={1} lg={1} >*/}
                                {/*    <div className={classes.labelSub}>{state.certificate}</div>*/}
                                {/*</Grid>*/}
                                <Label title="Group #" size={2} />
                                <Grid item xs={12} sm={2} md={1} lg={1} >
                                    <div className={classes.labelSub}>{state.groupNumber}</div>
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row" className={classes.bg}>
                                <Label title="Eligibility Response" size={2} />
                                <Grid item xs={12} sm={8} md={5} lg={5} >
                                    <div className={classes.labelSub}><span className={classes.active}>{state.eligibilityResponse}</span> {state.eligibilityResponseDatetime}</div>
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row" className={classes.bg}>
                                <Label title="Subscriber" size={2} />
                                <Grid item xs={12} sm={8} md={5} lg={5} >
                                    <div className={classes.labelSub}>{state.subscriberInfo} </div>
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container direction="row" className={classes.bg}>
                                <Label title="Last Updated" size={2} />
                                <Grid item xs={12} sm={8} md={5} lg={5} >
                                    <div className={classes.labelSub}>{state.updateDate ? formatDate(state.updateDate) : " - "} {state.updateDate ? " " + formatTime(state.updateDate) : ""} </div>
                                </Grid>
                            </Grid>
                            {/*<Grid item lg={12} container direction="row" >*/}
                            {/*    <Label title="Coverage Details" size={2} />*/}
                            {/*    <Grid item xs={12} sm={8} md={5} lg={5} >*/}
                            {/*        <div className={classes.coverageLinkList}>*/}
                            {/*            <span className={classes.coverageLink} onClick={() => setAllShowHide(true)}>Show All</span>*/}
                            {/*            <span className={classes.breakLine}>|</span>*/}
                            {/*            <span className={classes.coverageLink} onClick={() => setAllShowHide(false)}>Hide All</span>*/}
                            {/*            <span className={classes.breakLine}>|</span>*/}
                            {/*            <span className={classes.coverageLink}>Show All Details</span>*/}
                            {/*        </div>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                            {groupData.map((item, i) => (
                                <Grid item lg={12} container direction="row" className={classes.colBorder}>
                                    <Accordion className={classes.accordion} >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                            {item}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="custom-grid">
                                                <Table
                                                    scroll={true}
                                                    dataSource={benifitData[item]}
                                                    pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 15, 20, 30] }}
                                                    columns={gridCnfg[item.replaceAll(' ', '').replaceAll('-', '')] ? gridCnfg[item.replaceAll(' ', '').replaceAll('-', '')] : gridCnfg['ActiveCoverageDetails']}
                                                    rowClassName={(record, index) => "claimRow"}
                                                    locale={{
                                                        emptyText: (
                                                            <Empty
                                                                image={isLoading && LoadingIcon}
                                                                description={isLoading ? "Loading..." : "No Record Found"}
                                                                imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                            />
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))
                            }
                            {/* <Grid item lg={12} container direction="row" className={classes.colBorder}>
                            <Accordion className={classes.accordion} >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                    item.itemTitle
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="custom-grid">
                                        <Table
                                            scroll={true}
                                            dataSource={groupData}
                                            pagination={{ defaultPageSize: 8, showSizeChanger: true, pageSizeOptions: [8, 15, 30] }}
                                            columns={gridCnfg["ActiveCoverageDetails"]}
                                            rowClassName={(record, index) => "claimRow"}
                                            locale={{
                                                emptyText: (
                                                    <Empty
                                                        image={isLoading && LoadingIcon}
                                                        description={isLoading ? "Loading..." : "No Record Found"}
                                                        imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                                    />
                                                )
                                            }}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Grid> */}
                        </Grid>
                    </form>}
            </ShadowBoxMin >
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}
                //onSubmit={actiondialogprops.dialogactiontype === true ? Save : deleteAppointment}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    );
}
export default withSnackbar(Eligibility)