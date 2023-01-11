import React, { useState, useEffect, useRef } from "react";
import {
    Dialog,
    FormLabel,
    Grid,
    Typography,
    IconButton,
    FormHelperText,
    Button,
    Icon,
    Tooltip,
} from "@material-ui/core";
import useStyles from "./styles";
import { AttachFile } from '@material-ui/icons';
import AddIcon from "../../../../../../images/icons/add-icon.png"
import { withSnackbar } from "../../../../../../components/Message/Alert";
import { InputBaseField, SelectField, InputPaymentField } from "../../../../../../components/InputField/InputField";
import { DraggableComponent, FormBtn, FormGroupTitle, Label, ErrorMessage, LinkS, ShadowBoxMin } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import SearchListField from "../../../../../../components/SearchListField/SearchListField";
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { Add as AddPlusIcon } from '@material-ui/icons';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import AddCodeDialog from "./components/addCodeDialog/AddCodeDialog";
import { Table } from "antd";
import { data as gridCnfg } from '../../../../../../components/SearchGrid/component/setupData';
import RefreshIcon from '@material-ui/icons/Refresh';
import Delete from "../../../../../../images/icons/trash.png"
import LogDialog from "../../../../../../components/LogDialog/LogDialog";

function AddFeeSchedule({ showHideDialog, handleClose, feeScheduleLabel, updateGrid, isMasterFeeSchedule, ...props }) {

    const { showMessage } = props;
    // handle styles
    const classes = useStyles();
    const [isMasterFee, setIsMasterFee] = useState(isMasterFeeSchedule);
    let [feeSourceOption, setFeeSourceOption] = useState([
        { value: "Manual", label: "Manual" },
        { value: "Custom", label: "Custom" },
        { value: "Medicare", label: "Medicare" },
        { value: "Existing", label: "Existing Schedule" }
    ]);
    const [isSaving, setIsSaving] = useState(false);

    const [showHideAddCodeDialog, setShowHideAddCodeDialog] = useState(false);

    // handle status of procedure.
    const [dataId] = useState(0);
    const inputFile = useRef(null);

    const [attachment, setAttachment] = useState({ file: null, userFileName: null });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [state, setState] = useState({

        feeScheduleId: 0, payerCode: "", payerName: "", feeScheduleName: isMasterFee == true ? "Master Fee Schedule" : "", feeSourceCode: isMasterFee == true ? "Master" : "Custom",
        effectiveDate: isMasterFee == true ? (new Date().getFullYear() + "-01-01") : null, usagePercent: null, usageTypeCode: "", isDeleted: false, createdBy: 0,
        locationIds: '', feeProcedureCode: '', feeProcedureName: '', isMaster: isMasterFee == true, createDate: new Date(),
        lstBillFeeScheduleLocation: [], lstBillFeeScheduleProvider: [], lstProcFeeSchedule: []
    });
    const [errorMessages, setErrorMessages] = useState({
        errorFeeSchedulerName: false, errorFeeSourceCode: false, errorEffectiveDate: false
    });
    const [locationId, setLocationId] = useState(0);
    const [feeScheduleList, setFeeScheduleList] = useState([]);
    const [existingScheduleValue, setExistingScheduleValue] = useState(0);
    const [customSearchValue, setCustomSearchValue] = useState("");

    const [rowsData, setRowsData] = useState([]);
    const [masterFeeProcedures, setMasterFeeProcedures] = useState([]);
    const [logdialogstate, setLogDialogState] = useState(false);
    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }

    useEffect(() => {
        initialization();
        cleanValuesFields();
        if (isMasterFee == true) {
            feeSourceOption.push({ value: "Master", label: "Master Fee Schedue" });
        }

    }, [showHideDialog]);

    const loadData = (list) => {

        setRowsData(
            list &&
            list.filter(tmprm => tmprm.isDeleted != true).map((item, i) => {

                item.strM1 = <span className={classes.posSpan}>
                    <SearchListField
                        id={i}
                        name="m1"
                        value={item.m1}
                        searchTerm={item.m1Name}
                        code="get_modifiers_codes"
                        apiUrl="ddl/loadItems"
                        onChangeValue={(name, item) => handleModifiersChange(name, item, i)}
                        placeholderTitle="M1"
                        MaxLength="2"
                        popperWidth={true}
                    />
                </span>
                item.strFacilityPrice = <span className={classes.posSpan}>
                    <InputPaymentField
                        id="facilityPrice"
                        name={i}
                        placeholder="$0.00"
                        value={item.facilityPrice}
                        onChange={handleChangeDynamic}
                        MaxLength={15}

                    />
                </span>

                item.strMedicareFee = <span className={classes.posSpan}>
                    {item.medicareFee}
                </span>

                item.action =
                    <div style={{ width: "100%", textAlign: "center" }}>
                        {props.isEditable ?
                            <Tooltip title="Delete">
                                <Icon> <img src={Delete} onClick={() => handleDelete(i)} className={classes.Icon} /> </Icon>
                            </Tooltip>
                            : ''}
                    </div>

                return { ...item }

            }))

    }

    const initialization = () => {

        var user = sessionStorage.getItem('user_info');
        var locationlist = JSON.parse(user).userLocations;
        let primaryLocation = locationlist.filter(loc => loc.text2 == "True" || loc.Text2 == true);

        if (primaryLocation[0]) {
            setState(prevState => ({
                ...prevState,
                locationId: parseInt(primaryLocation[0].id)
            }))
        }

        var params = {
            code: "get_billing_fee_schedule",
            parameters: [""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setFeeScheduleList(
                    result.data.map((item, i) => {
                        return { value: item.text1, label: item.text2 };
                    }));
            }
        })

    }

    // Change handlers 
    const handleSearcdhListChange = (name, item) => {

        let { id, value } = item;

        setState(prevState => ({
            ...prevState,
            locationId: id,
            locationName: value
        }));

        handleLocations(id, value);

    }

    const handleLocations = (id, value) => {

        setLocationId(0);
        var _locationList = [];

        if (state.lstBillFeeScheduleLocation) {

            if (state.lstBillFeeScheduleLocation.filter(tmprm => tmprm.locationId === parseInt(id) && tmprm.locationName === value) == "") {

                _locationList.push({
                    locationFeeSchId: null, feeScheduleId: null, locationId: parseInt(id),
                    locationName: value, isDeleted: false, createdBy: 0, createDate: new Date()
                });


                state.lstBillFeeScheduleLocation.map((itm, i) => {

                    _locationList.push({
                        locationFeeSchId: itm.locationFeeSchId, feeScheduleId: itm.feeScheduleId, locationId: itm.locationId,
                        locationName: itm.locationName, isDeleted: itm.isDeleted, createdBy: itm.createdBy,
                        createDate: itm.createDate
                    });
                });

                setState(prevState => ({
                    ...prevState,
                    lstBillFeeScheduleLocation: _locationList
                }));

                var _locationIds = [];

                if (state.lstBillFeeScheduleLocation) {

                    state.lstBillFeeScheduleLocation.map((item, i) => {
                        _locationIds = [..._locationIds, item.locationId];
                    });
                    _locationIds = [..._locationIds, parseInt(id)];

                    setState(prevState => ({
                        ...prevState,
                        locationIds: _locationIds.join(', ')
                    }));
                }
            }
            else {

                showMessage("Error", "Location already selected", "error", 8000);

                setTimeout(function () {
                    setState(prevState => ({
                        ...prevState,
                        locationId: 0,
                        locationName: ''
                    }));
                }, 100);

                return;
            }

        }

        setTimeout(function () {
            setState(prevState => ({
                ...prevState,
                locationId: 0,
                locationName: ''
            }));
        }, 100);

    }

    const handleChange = (e) => {

        let { name, value } = e.target;


        if (value.trim() === "" && value !== "") {
            return;
        }

        if (name === 'usageTypeCode') {
            setExistingScheduleValue(parseFloat(value));
        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSearchChange = (name, item) => {

        const { id, value, extraParam2 } = item;

        if (name === 'feeProcedureName') {

            setState(prevState => ({
                ...prevState,
                feeProcedureName: extraParam2,
                feeProcedureCode: id
            }));

            if (extraParam2 != "")
                handleAddProcedures(id, extraParam2);

            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    feeProcedureName: '', feeProcedureCode: 0
                }));
            }, 100);
        }
        else if (name === 'userName') {
            handleLocationProviders(id, value);
        }
        else if (name === 'payerCode') {
            setTimeout(function () {
                if (value == '') {
                    setState(prevState => ({
                        ...prevState,
                        payerName: '', payerCode: ''
                    }));
                }
                else {
                    setState(prevState => ({
                        ...prevState,
                        payerName: value, payerCode: id
                    }));
                }
            }, 100);
        }
        else if (name === 'CustomSearch') {
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    CustomSearchName: value, CustomSearch: id
                }));
            }, 100);
        }


    }

    const handleAddProcedures = (id, value) => {
        var _proceduresArray = [];

        if (state.lstProcFeeSchedule) {
            if (state.lstProcFeeSchedule.filter(tmprm => tmprm.procedureCode === id && tmprm.procedureDescription === value && tmprm.isDeleted == false) == "") {
                if (state.feeSourceCode == 'Medicare' || state.feeSourceCode == 'Existing') {
                    var percentAmt = 0;
                    var medicareAmt = 0;
                    var objFeeProcedure = masterFeeProcedures.filter(t => t.procedureCode == id);
                    objFeeProcedure = objFeeProcedure[0];
                    if (objFeeProcedure) {
                        percentAmt = state.usagePercent * objFeeProcedure.facilityPrice / 100;
                        medicareAmt = objFeeProcedure.facilityPrice;
                    }
                    _proceduresArray.push({
                        procedureFeeScheduleId: 0, feeScheduleId: 0, procedureCode: id, procedureDescription: value, m1: '', m2: '', m3: '', m4: '',
                        nonFacilityPrice: 0, facilityPrice: percentAmt, global: '', physSupv: '', currentFee: 0, medicareFee: medicareAmt, isDeleted: false, createdBy: 0,
                        createDate: new Date()
                    });
                }
                else {
                    var objFeeProcedure = masterFeeProcedures.filter(t => t.procedureCode == id);
                    objFeeProcedure = objFeeProcedure[0];
                    _proceduresArray.push({
                        procedureFeeScheduleId: 0, feeScheduleId: 0, procedureCode: id, procedureDescription: value, m1: '', m2: '', m3: '', m4: '',
                        nonFacilityPrice: 0, facilityPrice: objFeeProcedure ? objFeeProcedure.facilityPrice : 0, global: '', physSupv: '', currentFee: 0, medicareFee: objFeeProcedure ? objFeeProcedure.facilityPrice : 0, isDeleted: false, createdBy: 0,
                        createDate: new Date()
                    });
                }
                state.lstProcFeeSchedule.map((item, i) => {

                    _proceduresArray.push({
                        procedureFeeScheduleId: item.procedureFeeScheduleId, feeScheduleId: item.feeScheduleId, procedureCode: item.procedureCode,
                        procedureDescription: item.procedureDescription, m1: item.m1, m2: item.m2, m3: item.m3, m4: item.m4, nonFacilityPrice: item.nonFacilityPrice,
                        facilityPrice: item.facilityPrice ? parseFloat(isNaN(item.facilityPrice) ? 0 : item.facilityPrice) : 0, global: item.global, physSupv: item.physSupv, currentFee: item.currentFee ? item.currentFee : 0, medicareFee: item.medicareFee ? item.medicareFee : 0,
                        createDate: item.createDate, isDeleted: item.isDeleted, createdBy: item.createdBy
                    });
                })


                setState(prevState => ({
                    ...prevState,
                    lstProcFeeSchedule: _proceduresArray
                }))

                loadData(_proceduresArray);

            }
            else {

                showMessage("Error", "Procedure already selected", "error", 8000);

                setTimeout(function () {
                    setState(prevState => ({
                        ...prevState,
                        userId: 0,
                        userName: ''
                    }));
                }, 100);

                return;
            }
        }
    }

    const handleLocationProviders = (id, value) => {

        var _providersArray = [];

        setState(prevState => ({
            ...prevState,
            userId: id,
            userName: value
        }));

        if (state.lstBillFeeScheduleProvider.filter(tmprm => tmprm.userId === id && tmprm.userName === value) == "") {

            _providersArray.push({
                providerFeeSchId: 0, feeScheduleId: null, userId: id, userName: value, isDeleted: false, createdBy: 0, createDate: new Date()
            });

            if (state.lstBillFeeScheduleProvider) {
                state.lstBillFeeScheduleProvider.map((item, i) => {

                    _providersArray.push({
                        providerFeeSchId: item.providerFeeSchId, feeScheduleId: item.feeScheduleId, userId: item.userId, userName: item.userName,
                        isDeleted: item.isDeleted, createdBy: item.createdBy, createDate: item.createDate
                    });
                })
            }

            setState(prevState => ({
                ...prevState,
                lstBillFeeScheduleProvider: _providersArray
            }))

            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    userId: 0,
                    userName: ''
                }));
            }, 100);

        }
        else {

            showMessage("Error", "provider already selected", "error", 8000);

            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    userId: 0,
                    userName: ''
                }));
            }, 100);

            return;
        }
    }

    const handleExistingOptCalcProceduresSave = (id, errorList) => {

        let _proceduresArray = [];
        setIsSaving(true);
        if (id > 0) {
            PostDataAPI('feeschedule/getProcedureFeeSchedulebyId', parseInt(id)).then((result) => {
                setIsSaving(false);

                if (result.success && result.data != null) {

                    if (result.data) {

                        result.data.map((item, i) => {

                            _proceduresArray.push({
                                procedureFeeScheduleId: 0, feeScheduleId: 0, procedureCode: item.procedureCode,
                                procedureDescription: item.procedureDescription, m1: item.m1, m2: item.m2, m3: item.m3, m4: item.m4, nonFacilityPrice: item.nonFacilityPrice,
                                facilityPrice: parseFloat((parseFloat(isNaN(state.usagePercent) ? 0 : state.usagePercent) / 100).toFixed(2) * parseFloat(isNaN(item.facilityPrice) ? 0 : item.facilityPrice).toFixed(2)).toFixed(2),
                                global: item.global, physSupv: item.physSupv, currentFee: item.currentFee ? item.currentFee : 0, medicareFee: item.medicareFee ? item.medicareFee : 5, createDate: item.createDate, isDeleted: false,
                                createdBy: item.createdBy
                            });
                        })
                    }
                    handleFormattingAndSave(_proceduresArray, 1);
                }
                else if (result.data === null) { }
                else
                    showMessage("Error", result.message, "error", 8000);
            })
        }
        else {
            showMessage("Error", "Please select fee schedule.", "error", 8000);
            errorList.push(true);
            return;
        }

    }
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(props.dataId),
            area: "Fee schedule setup",
            activity: "Load fee schedule details",
            details: "User viewed fee schedule screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }
    // Change handlers 
    const cleanValuesFields = () => {

        setState({

            feeScheduleId: 0, payerCode: "", payerName: "", feeScheduleName: isMasterFee == true ? "Master Fee Schedule" : "", feeSourceCode: isMasterFee == true ? "Master" : "Custom",
            effectiveDate: isMasterFee == true ? (new Date().getFullYear() + "-01-01") : null, usagePercent: null, usageTypeCode: "", isDeleted: false, createdBy: 0, isMaster: isMasterFee == true,
            locationIds: '', feeProcedureCode: '', feeProcedureName: '', createDate: new Date(),
            lstBillFeeScheduleLocation: [], lstBillFeeScheduleProvider: [], lstProcFeeSchedule: []

        });

        setErrorMessages({ errorFeeSchedulerName: false, errorFeeSourceCode: false, errorEffectiveDate: false });

        setAttachment({ file: null, userFileName: null });

        if (props.dataId > 0) {
            loadFeeScheduler(props.dataId);
            saveAuditLogInfo();
        }
        else {
            var effectiveYear = new Date().getFullYear();
            loadMasterFeeScheduleProcedures(effectiveYear);
        }

    }

    //To Show Action Dialog
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
    function handleFileUpload(e) {

        var ext = e.target.files[0].name.match(/\.(.+)$/)[1];

        switch (ext) {
            case 'xlsx':
                break;
            default:
                showMessage("Error", "This file format is not allowed,\n Only Excel files are allowed.", "error", 3000);
                document.getElementById("fileUploadField").value = '';
                return;
        }

        setAttachment({ file: e.target.files[0] ? e.target.files[0] : null, userFileName: e.target.files[0] ? e.target.files[0].name : null });
        e.target.value = "";
    }
    const handleSelectFile = () => {
        if (state.feeScheduleId <= 0)
            inputFile.current.click();
    };

    const deleteLocation = (index) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete selected location?", "confirm", function () {

            if (state.lstBillFeeScheduleLocation) {
                state.lstBillFeeScheduleLocation.filter(tmprm => tmprm.isDeleted === false).map((item, i) => {

                    if (i === parseInt(index)) {
                        if (item.locationFeeSchId > 0)
                            item.isDeleted = true;
                        else
                            state.lstBillFeeScheduleLocation.splice(index, 1);
                    }
                })

                setState(prevState => ({
                    ...prevState,
                    lstBillFeeScheduleLocation: state.lstBillFeeScheduleLocation
                }));
            }
        })
    }

    const handleModifiersChange = (name, item, row) => {
        const { id, value } = item;
        //let lstProcedureFeeSch = [...state.lstProcFeeSchedule];
        //let objMasterFee = masterFeeProcedures.filter(t =>
        //    t.procedureCode == lstProcedureFeeSch[row]['procedureCode'] &&
        //    t.m1 == id);
        //objMasterFee = objMasterFee[0];
        //lstProcedureFeeSch[row][name] = id;
        //lstProcedureFeeSch[row][name.trim() + "Name"] = value;
        //lstProcedureFeeSch[row]['facilityPrice'] = objMasterFee ? objMasterFee.facilityPrice : '';
        //lstProcedureFeeSch[row]['medicareFee'] = objMasterFee ? objMasterFee.facilityPrice : '';
        //setState(prevState => ({
        //    ...prevState,
        //    lstProcFeeSchedule: lstProcedureFeeSch
        //}));


        setState((prevState) => {
            let temp = {
                ...prevState,
                lstProcFeeSchedule: [...prevState.lstProcFeeSchedule]
            };
            let objMasterFee = masterFeeProcedures.filter(t =>
                t.procedureCode == temp.lstProcFeeSchedule[row]['procedureCode'] &&
                t.m1 == id);
            objMasterFee = objMasterFee[0];
            temp.lstProcFeeSchedule[row][name] = id;
            temp.lstProcFeeSchedule[row][name.trim() + "Name"] = value;
            temp.lstProcFeeSchedule[row]['facilityPrice'] = objMasterFee ? objMasterFee.facilityPrice : '';
            temp.lstProcFeeSchedule[row]['medicareFee'] = objMasterFee ? objMasterFee.facilityPrice : '';
            loadData(temp.lstProcFeeSchedule);
            return temp
        });
    }

    const handleDelete = (row) => {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the procedure from fee schedule?", "confirm", function () {

            let stateList = [];
            setState((prevState) => {
                let temp = {
                    ...prevState,
                    lstProcFeeSchedule: [...prevState.lstProcFeeSchedule]
                }
                temp.lstProcFeeSchedule[row]["isDeleted"] = true;
                stateList = temp.lstProcFeeSchedule;
                return temp
            })

            loadData(stateList);
        })
    }

    const handleFormattingAndSave = (obj, callIndex) => {


        let method = "feeschedule/add";
        if (state.feeScheduleId > 0) {
            method = "feeschedule/update";
        }

        if (state.feeScheduleId < 1) {

            if (callIndex == 1)
                state.lstProcFeeSchedule = obj;

            const formData = new FormData();

            for (var key in state) {
                if ((state[key] && key != "fileName" && key != "formFile" && key != "encUserID")) {
                    if (key === 'usagePercent')
                        formData.append("usagePercent", state.usagePercent ? parseInt(state.usagePercent) : null);
                    else if (key === 'effectiveDate')
                        formData.append("effectiveDate", state.effectiveDate == "" ? null : state.effectiveDate);
                    else if (key === 'feeScheduleId')
                        formData.append("feeScheduleId", state.feeScheduleId ? parseFloat(state.feeScheduleId) : null);
                    else if (key === 'createDate')
                        formData.append("createDate", new Date().toISOString());
                    else if (key === 'lstBillFeeScheduleLocation') {  // Location Array
                        for (var keyy in state.lstBillFeeScheduleLocation) {

                            for (var field in state.lstBillFeeScheduleLocation[keyy]) {

                                if (field === 'createDate')
                                    formData.append("lstBillFeeScheduleLocation[" + [keyy] + "]." + field, new Date().toISOString());
                                else if (field === 'locationFeeSchId')
                                    formData.append("lstBillFeeScheduleLocation[" + [keyy] + "]." + field, state.lstBillFeeScheduleLocation[keyy].locationFeeSchId ? parseInt(state.lstBillFeeScheduleLocation[keyy].locationFeeSchId) : 0);
                                else if (field === 'feeScheduleId')
                                    formData.append("lstBillFeeScheduleLocation[" + [keyy] + "]." + field, state.lstBillFeeScheduleLocation[keyy].feeScheduleId ? parseInt(state.lstBillFeeScheduleLocation[keyy].feeScheduleId) : 0);
                                else if (field === 'locationId')
                                    formData.append("lstBillFeeScheduleLocation[" + [keyy] + "]." + field, state.lstBillFeeScheduleLocation[keyy].locationId ? parseInt(state.lstBillFeeScheduleLocation[keyy].locationId) : 0);
                                else
                                    formData.append("lstBillFeeScheduleLocation[" + [keyy] + "]." + field, state.lstBillFeeScheduleLocation[keyy][field]);
                            }
                        }
                    } // Provider Array
                    else if (key === 'lstBillFeeScheduleProvider') {
                        for (var keyy in state.lstBillFeeScheduleProvider) {

                            for (var field in state.lstBillFeeScheduleProvider[keyy]) {

                                if (field === 'providerFeeSchId')
                                    formData.append("lstBillFeeScheduleProvider[" + [keyy] + "]." + field, state.lstBillFeeScheduleProvider[keyy].providerFeeSchId ? parseInt(state.lstBillFeeScheduleProvider[keyy].providerFeeSchId) : 0);
                                else if (field === 'feeScheduleId')
                                    formData.append("lstBillFeeScheduleProvider[" + [keyy] + "]." + field, state.lstBillFeeScheduleProvider[keyy].feeScheduleId ? parseInt(state.lstBillFeeScheduleProvider[keyy].feeScheduleId) : 0);
                                else if (field === 'createDate')
                                    formData.append("lstBillFeeScheduleProvider[" + [keyy] + "]." + field, new Date().toISOString());
                                formData.append("lstBillFeeScheduleProvider[" + [keyy] + "]." + field, state.lstBillFeeScheduleProvider[keyy][field]);
                            }
                        }
                    }// Fee SCheduler  Array
                    else if (key === 'lstProcFeeSchedule') {
                        for (var keyy in state.lstProcFeeSchedule) {

                            for (var field in state.lstProcFeeSchedule[keyy]) {

                                if (field === 'facilityPrice')
                                    formData.append("lstProcFeeSchedule[" + [keyy] + "]." + field, state.lstProcFeeSchedule[keyy].facilityPrice ? parseFloat(isNaN(state.lstProcFeeSchedule[keyy].facilityPrice) ? 0 : parseFloat(state.lstProcFeeSchedule[keyy].facilityPrice)) : 0);
                                else
                                    if (field === 'createDate')
                                        formData.append("lstProcFeeSchedule[" + [keyy] + "]." + field, new Date().toISOString());
                                    else
                                        formData.append("lstProcFeeSchedule[" + [keyy] + "]." + field, state.lstProcFeeSchedule[keyy][field]);
                            }
                        }
                    }
                    else
                        formData.append(key, state[key]);
                }
            }
            setIsSaving(true);

            formData.append("excelFile", attachment.file);
            PostDataAPI(method, formData, true, "formData").then((result) => {
                setIsSaving(false);

                if (result.success == true) {

                    setErrorMessages([]);

                    if (result.success && result.data != null) {
                        showMessage("Success", "Fee schedule saved successfully.", "success", 3000);
                        updateGrid();

                        result.data = handleFormat(result.data);
                        setState(result.data);
                        setAttachment({ file: null, userFileName: null });
                        setTimeout(() => {
                            handleClose();
                        }, 2000);
                    }
                }
                else {
                    let errorMessage = result.message.split('.')[0];
                    let userID = result.message.split('^')[2];
                    if (errorMessage.trim() == 'There are error(s) in excel file') {
                        window.location.assign("." + "\\Documents\\temp\\" + userID + "\\" + result.message.split('^')[1]);
                        showMessage("Error", "There are error(s) in the uploaded fie, Please fix the errors and try again.", "error", 3000);
                    }
                    else
                        showMessage("Error", errorMessage, "error", 3000);
                }
            })
        }
        else if (state.feeScheduleId > 0) {

            state.usagePercent = state.usagePercent ? parseInt(state.usagePercent) : null;
            state.effectiveDate = state.effectiveDate == "" ? null : state.effectiveDate;

            if (state.lstBillFeeScheduleLocation) {
                state.lstBillFeeScheduleLocation.map((item, i) => {

                    item.locationFeeSchId = item.locationFeeSchId ? parseInt(item.locationFeeSchId) : 0;
                    item.feeScheduleId = item.feeScheduleId ? parseInt(item.feeScheduleId) : null;
                    item.locationId = item.locationId ? parseInt(item.locationId) : null;
                });
            }

            if (state.lstBillFeeScheduleProvider) {
                state.lstBillFeeScheduleProvider.map((im, k) => {
                    im.providerFeeSchId = im.providerFeeSchId ? parseInt(im.providerFeeSchId) : 0;
                    im.feeScheduleId = im.feeScheduleId ? parseInt(im.feeScheduleId) : null;
                });

            }

            if (state.lstProcFeeSchedule) {
                state.lstProcFeeSchedule.map((item, j) => {

                    item.facilityPrice = isNaN(item.facilityPrice) ? 0 : parseFloat(item.facilityPrice);
                });

            }
            setIsSaving(true);

            PostDataAPI(method, state, true).then((result) => {
                setIsSaving(false);

                if (result.success) {

                    result.data.lstProcFeeSchedule = state.lstProcFeeSchedule;
                    result.data = handleFormat(result.data);
                    setState(result.data);
                    showMessage("Success", "Fee schedule updated successfully.", "success", 3000);
                    updateGrid();
                }
                else
                    showMessage("Error", result.message, "error", 3000);

            })
        }

    }

    const ValidateFeeScheduler = (errorList) => {
        if (state.feeScheduleName == "" || state.feeScheduleName == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorFeeSchedulerName: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFeeSchedulerName: false
            }));
        }

        if (state.feeSourceCode == "" || state.feeSourceCode == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorFeeSourceCode: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFeeSourceCode: false
            }));
        }

        if (state.effectiveDate == "" || state.effectiveDate == undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorEffectiveDate: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEffectiveDate: false
            }));
        }

        if (errorList.length < 1) {
            if (state.feeScheduleId <= 0 && state.feeSourceCode === "Existing") {
                if (state.usagePercent == '' || state.usagePercent == null) {
                    setState(prevState => ({
                        ...prevState,
                        usageTypeCode: 0
                    }));

                    showMessage("Error", "Please enter value  in Use", "error", 8000);
                    errorList.push(true);
                    return;
                }
            }
        }

        if (attachment.file === null && state.feeScheduleId <= 0 && (state.feeSourceCode === "Custom" || state.feeSourceCode === "Master")) {
            showMessage("Error", "Please select file.", "error", 8000);
            errorList.push(true);
            return
        }

    }

    const Save = e => {

        saveCalled();
    };

    const saveCalled = () => {

        let errorList = [];
        ValidateFeeScheduler(errorList);

        if (errorList.length < 1) {

            if (state.feeScheduleId <= 0 && state.feeSourceCode === "Existing") {

                handleExistingOptCalcProceduresSave(existingScheduleValue, errorList);
            }
            else
                handleFormattingAndSave(null, 0);
        }
    }

    const loadFeeScheduler = (feeId) => {
        PostDataAPI('feeschedule/get', parseInt(feeId)).then((result) => {
            if (result.success && result.data != null) {
                result.data = handleFormat(result.data);
                if (result.data.isMaster)
                    feeSourceOption.push({ value: "Master", label: "Master Fee Schedue" });
                setIsMasterFee(result.data.isMaster);
                setState(result.data);

                if (result.data.lstProcFeeSchedule) {
                    setState(prevState => ({
                        ...prevState,
                        lstProcFeeSchedule: result.data.lstProcFeeSchedule
                    }));
                    loadData(result.data.lstProcFeeSchedule);
                }
                var effectiveYear = 0;

                if (result.data.feeSourceCode == 'Existing') {
                    loadExistingFeeScheduleProcedures(result.data.usageTypeCode);
                }
                else {
                    if (result.data.effectiveDate)
                        effectiveYear = new Date(result.data.effectiveDate).getFullYear();
                    loadMasterFeeScheduleProcedures(effectiveYear);
                }
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 3000);
        })
    }
    const loadMasterFeeScheduleProcedures = (year) => {
        PostDataAPI('feeschedule/getMasterFeeScheduleProceduresByYear', year).then((result) => {
            if (result.success && result.data != null) {
                setMasterFeeProcedures(result.data);
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 3000);
        })
    }
    const loadExistingFeeScheduleProcedures = (id) => {
        PostDataAPI('feeschedule/get', id).then((result) => {
            if (result.success && result.data != null) {
                setMasterFeeProcedures(result.data.lstProcFeeSchedule);
            }
            else if (result.data === null) { }
            else
                showMessage("Error", result.message, "error", 3000);
        })
    }

    const handleFormat = (dataSet) => {

        dataSet.effectiveDate = dataSet.effectiveDate ? dataSet.effectiveDate.split("T")[0] : '';

        var _locationIds = [];

        if (dataSet.lstBillFeeScheduleLocation) {

            dataSet.lstBillFeeScheduleLocation.map((item, i) => {
                _locationIds = [..._locationIds, item.locationId];
            });

            dataSet.locationIds = _locationIds.join(', ');
        }
        return dataSet;
    }

    const handleChangeDynamic = (e) => {

        const { id, name, value } = e.target;

        let stateList = [];
        setState((prevState) => {
            let temp = {
                ...prevState,
                lstProcFeeSchedule: [...prevState.lstProcFeeSchedule]
            }
            temp.lstProcFeeSchedule[name]["facilityPrice"] = parseFloat(value);
            stateList = temp.lstProcFeeSchedule;
            return temp
        })

        loadData(stateList);
    }

    const filterCustomData = () => {
        if (state.CustomSearch) {
            var params = {
                Id: state.feeScheduleId,
                Text1: state.CustomSearch ? state.CustomSearch.toString() : ""
            };

            PostDataAPI("feeschedule/getProcedureFilterSerach", params).then((result) => {

                if (result.success && result.data != null) {

                    var _proceduresArray = [];

                    result.data.map((item, i) => {

                        _proceduresArray.push({
                            procedureFeeScheduleId: item.procedureFeeScheduleId, feeScheduleId: item.feeScheduleId, procedureCode: item.procedureCode,
                            procedureDescription: item.procedureDescription, m1: item.m1 == 'null' ? '' : item.m1, m2: item.m2 == 'null' ? '' : item.m2,
                            m3: item.m3 == 'null' ? '' : item.m3, m4: item.m4 == 'null' ? '' : item.m4, nonFacilityPrice: item.nonFacilityPrice,
                            facilityPrice: item.facilityPrice ? parseFloat(isNaN(item.facilityPrice) ? 0 : item.facilityPrice) : 0, global: item.global == 'null' ? '' : item.global,
                            physSupv: item.physSupv == 'null' ? '' : item.physSupv, currentFee: item.currentFee, medicareFee: item.medicareFee ? item.medicareFee : 5,
                            createDate: item.createDate, isDeleted: item.isDeleted, createdBy: item.createdBy
                        });
                    })
                    if (state.CustomSearch) {
                        if (state.CustomSearch && state.CustomSearch.length > 1) {
                            for (var i = 0; i < state.CustomSearch.split(',').length; i++) {

                                var existsObj = search(state.CustomSearch.split(',')[i], state.lstProcFeeSchedule);
                                if (existsObj != undefined) {

                                    if (existsObj.procedureFeeScheduleId && existsObj.procedureFeeScheduleId < 1) {
                                        _proceduresArray.push({
                                            procedureFeeScheduleId: existsObj.procedureFeeScheduleId, feeScheduleId: existsObj.feeScheduleId, procedureCode: existsObj.procedureCode,
                                            procedureDescription: existsObj.procedureDescription, m1: existsObj.m1 == 'null' ? '' : existsObj.m1, m2: existsObj.m2 == 'null' ? '' : existsObj.m2,
                                            m3: existsObj.m3 == 'null' ? '' : existsObj.m3, m4: existsObj.m4 == 'null' ? '' : existsObj.m4, nonFacilityPrice: existsObj.nonFacilityPrice,
                                            facilityPrice: existsObj.facilityPrice ? parseFloat(isNaN(existsObj.facilityPrice) ? 0 : existsObj.facilityPrice) : 0, global: existsObj.global == 'null' ? '' : existsObj.global,
                                            physSupv: existsObj.physSupv == 'null' ? '' : existsObj.physSupv, currentFee: existsObj.currentFee, medicareFee: existsObj.medicareFee ? existsObj.medicareFee : 5,
                                            createDate: existsObj.createDate, isDeleted: existsObj.isDeleted, createdBy: existsObj.createdBy
                                        });
                                    }
                                }

                            }

                        } else {
                            var existsObj = search(state.CustomSearch, state.lstProcFeeSchedule);
                            if (existsObj != undefined) {
                                if (existsObj.procedureFeeScheduleId && existsObj.procedureFeeScheduleId < 1) {
                                    _proceduresArray.push({
                                        procedureFeeScheduleId: existsObj.procedureFeeScheduleId, feeScheduleId: existsObj.feeScheduleId, procedureCode: existsObj.procedureCode,
                                        procedureDescription: existsObj.procedureDescription, m1: existsObj.m1 == 'null' ? '' : existsObj.m1, m2: existsObj.m2 == 'null' ? '' : existsObj.m2,
                                        m3: existsObj.m3 == 'null' ? '' : existsObj.m3, m4: existsObj.m4 == 'null' ? '' : existsObj.m4, nonFacilityPrice: existsObj.nonFacilityPrice,
                                        facilityPrice: existsObj.facilityPrice ? parseFloat(isNaN(existsObj.facilityPrice) ? 0 : existsObj.facilityPrice) : 0, global: existsObj.global == 'null' ? '' : existsObj.global,
                                        physSupv: existsObj.physSupv == 'null' ? '' : existsObj.physSupv, currentFee: existsObj.currentFee, medicareFee: existsObj.medicareFee ? existsObj.medicareFee : 5,
                                        createDate: existsObj.createDate, isDeleted: existsObj.isDeleted, createdBy: existsObj.createdBy
                                    });
                                }
                            }

                        }
                    }
                    loadData(_proceduresArray);
                }
            })
        }
    }

    const clearfilter = () => {

        setState(prevState => ({
            ...prevState,
            CustomSearch: '',
            CustomSearchName: ''
        }));

        setAttachment({ file: null, userFileName: null });

        loadFeeScheduler(props.dataId);
    }

    function search(code, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].procedureCode === code) {
                return myArray[i];
            }
        }
    }

    const handleCustomCpt = (extValue) => {
        setCustomSearchValue(extValue);

    }

    const openCustomDialog = () => {
        setShowHideAddCodeDialog(true);
    }

    const closeCustomDialog = () => {
        setShowHideAddCodeDialog(false);
    }

    const handleCustomSave = (customObj) => {
        let _proceduresArray = [];

        _proceduresArray.push({
            procedureFeeScheduleId: 0, feeScheduleId: 0, procedureCode: customObj.code, procedureDescription: customObj.str, m1: '', m2: '', m3: '', m4: '',
            nonFacilityPrice: 0, facilityPrice: 10, global: '', physSupv: '', currentFee: 0, medicareFee: 5, isDeleted: false, createdBy: 0,
            createDate: new Date()
        });

        if (state.lstProcFeeSchedule) {

            state.lstProcFeeSchedule.map((item, i) => {

                _proceduresArray.push({
                    procedureFeeScheduleId: item.procedureFeeScheduleId, feeScheduleId: item.feeScheduleId, procedureCode: item.procedureCode,
                    procedureDescription: item.procedureDescription, m1: item.m1, m2: item.m2, m3: item.m3, m4: item.m4, nonFacilityPrice: item.nonFacilityPrice,
                    facilityPrice: item.facilityPrice ? parseFloat(isNaN(item.facilityPrice) ? 0 : item.facilityPrice) : 0, global: item.global, physSupv: item.physSupv, currentFee: item.currentFee ? item.currentFee : 0, medicareFee: item.medicareFee ? item.medicareFee : 5,
                    createDate: item.createDate, isDeleted: item.isDeleted, createdBy: item.createdBy
                });
            })
        }

        setState(prevState => ({
            ...prevState,
            lstProcFeeSchedule: _proceduresArray
        }))

        loadData(_proceduresArray);
        setCustomSearchValue("");
    }

    return (
        <>
            <ShadowBoxMin shadowSize={3} className={classes.shadowBox}>
                <div className={classes.box}>
                    <div className={classes.content}>
                        <Grid container direction="row" >
                            <FormGroupTitle>{feeScheduleLabel}</FormGroupTitle>

                            <Grid container direction="row">
                                <Label title="Name" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <InputBaseField
                                        placeholder="Enter Name"
                                        id="feeScheduleName"
                                        name="feeScheduleName"
                                        value={state.feeScheduleName}
                                        onChange={handleChange}
                                        MaxLength="200"
                                        IsDisabled={isMasterFee}
                                    />
                                    {(!state.feeScheduleName || state.feeScheduleName.trim() === "") && errorMessages.errorFeeSchedulerName ? (<ErrorMessage>
                                        Please enter fee scheduler name
                                    </ErrorMessage>) : ('')}
                                </Grid>
                                <Label title="Effective From" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <InputBaseField
                                        type="date"
                                        id="effectiveDate"
                                        name="effectiveDate"
                                        value={state.effectiveDate}
                                        onChange={handleChange}
                                        IsDisabled={isMasterFee}
                                    />
                                    {errorMessages.errorEffectiveDate && !state.effectiveDate ? (<ErrorMessage>
                                        Please select effective date
                                    </ErrorMessage>) : ('')}
                                </Grid>
                            </Grid>

                            <Grid container direction="row" >

                                <div className={classes.divider}></div>

                            </Grid>
                            {isMasterFee == true ? "" :
                                <Grid container item direction="row" alignItems="baseline">
                                    <Grid container item direction="row" xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12} alignItems="baseline">

                                            <Label title="Location" size={4} />
                                            <Grid container item alignItems="flex-start" justify="flex-start" xs={12} sm={8} md={8} lg={6} xl={6}>
                                                <SearchList
                                                    id="locationId"
                                                    name="locationId"
                                                    value={state.locationId}
                                                    searchTerm={state.locationName}
                                                    code="login_provider_locations"
                                                    apiUrl="ddl/loadItems"
                                                    isUser={true}
                                                    onChangeValue={(name, item) => handleSearcdhListChange(name, item)}
                                                    placeholderTitle="Search by Location Name"
                                                />

                                                <ul className={classes.providerList}>
                                                    {
                                                        state.lstBillFeeScheduleLocation ?
                                                            state.lstBillFeeScheduleLocation.filter(tmprm => tmprm.isDeleted === false).map((item, i) => {
                                                                return <li key={item.locationId}>
                                                                    {item.locationName}
                                                                    <span className={classes.deleteIcon} onClick={() => deleteLocation(i)} ><AddPlusIcon /></span>
                                                                </li>
                                                            })
                                                            : null
                                                    }
                                                </ul>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    <Grid container item direction="row" xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <Label title="Payer" size={2} />
                                            <Grid item container alignItems="flex-start" justify="flex-end" xs={12} sm={8} md={8} lg={6} xl={6}>
                                                <SearchList
                                                    id="feeScheduleName"
                                                    name="payerCode"
                                                    value={state.payerCode}
                                                    elemCode="payerName"
                                                    searchTerm={state.payerName}
                                                    code="get_payer"
                                                    apiUrl="ddl/loadItems"
                                                    onChangeValue={(name, item, elemCode) => handleSearchChange(name, item, elemCode)}
                                                    placeholderTitle="Search by Payer Name"
                                                />

                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                            <Grid container item direction="row" >

                                <Grid item direction="row" xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <Grid container item direction="row" >
                                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} />

                                        <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>


                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item direction="row" xs={12} sm={6} md={6} lg={6} xl={6} />

                            </Grid>

                            <Grid container direction="row">

                                <div className={classes.divider}></div>

                            </Grid>

                            <Grid container direction="row" >
                                <Label title="Fee Source" size={2} mandatory={true} />
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                    <SelectField
                                        id="feeSourceCode"
                                        name="feeSourceCode"
                                        placeholder="Select Fee Source"
                                        options={feeSourceOption}
                                        value={state.feeSourceCode}
                                        onChange={handleChange}
                                        Disabled={(state.feeScheduleId > 0 || isMasterFee == true) ? true : false}
                                    />
                                    {errorMessages.errorFeeSourceCode && !state.feeSourceCode ? (<ErrorMessage>
                                        Please select Fee Source
                                    </ErrorMessage>) : ('')}

                                </Grid>

                            </Grid>
                            {
                                state.feeSourceCode === "Existing" || state.feeSourceCode === "Medicare" ?
                                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12} alignItems="baseline">

                                        <Label title="Use" size={2} mandatory={true} />

                                        <Grid item xs={12} sm={2} md={1} lg={1} xl={1}>
                                            <InputBaseField
                                                id="usagePercent"
                                                name="usagePercent"
                                                value={state.usagePercent}
                                                onChange={handleChange}
                                                MaxLength="4"
                                                IsDisabled={(state.feeSourceCode === "Existing" || state.feeSourceCode === "Medicare") && state.feeScheduleId > 0}
                                            />
                                        </Grid>

                                        {state.feeSourceCode === "Medicare" ? <Grid item alignItems="flex-start" justify="flex-end" xs={3} sm={3} md={3} lg={3} xl={3}> <Typography style={{ paddingLeft: "10px" }} className={classes.percentLabel}>% of Medicare (100%=actual Medicare rate)</Typography></Grid> :
                                            state.feeSourceCode === "Existing" ? <Grid item alignItems="flex-start" justify="flex-end" xs={1} sm={1} md={1} lg={1} xl={1} style={{ maxWidth: "5%" }}> <Typography style={{ textAlign: "center" }}>% of </Typography> </Grid> : null}

                                        <Grid item direction="row" xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>


                                                <Grid item alignItems="flex-start" justify="flex-end" xs={12} sm={10} md={10} lg={10} xl={10}>
                                                    {state.feeSourceCode === "Existing" ? <SelectField
                                                        id="usageTypeCode"
                                                        name="usageTypeCode"
                                                        value={state.usageTypeCode}
                                                        placeholderTitle="Search Use"
                                                        options={feeScheduleList}
                                                        onChange={handleChange}
                                                        placeholder="Select Fee Schedule"
                                                        Disabled={state.feeScheduleId <= 0 ? false : true}
                                                    />
                                                        : null}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    :
                                    state.feeSourceCode === "Custom" || state.feeSourceCode === "Master" ?
                                        <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                            {state.feeScheduleId <= 0 || isMasterFee == true ?
                                                <Label title="File" size={2} mandatory={true} /> : null}
                                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <span className={classes.btnSpan}>
                                                    {state.feeScheduleId <= 0 || isMasterFee == true ?
                                                        < InputBaseField
                                                            id="feeSourceExcelFile"
                                                            name="feeSourceExcelFile"
                                                            value={attachment.userFileName}
                                                            onChange={handleChange}
                                                            IsDisabled={true}
                                                            placeholder={"Choose a file"}
                                                            endAdornment={
                                                                <IconButton
                                                                    className={classes.attachmentBtn}
                                                                    color="primary"
                                                                    onClick={handleSelectFile}>
                                                                    <AttachFile />
                                                                </IconButton>
                                                            }
                                                        /> : null}
                                                </span>
                                                {(state.feeScheduleId <= 0 || isMasterFee == true) ?
                                                    <form>
                                                        <div>
                                                            <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".xlsx,.xls,.xlsm" />
                                                        </div>
                                                    </form>
                                                    : null}
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                {(state.feeSourceCode === "Custom" && state.feeScheduleId <= 0) || state.feeSourceCode === "Master" ? <Typography className={classes.fileLink} style={{ fontSize: "16px" }} >
                                                    < LinkS onClick={"." + "\\Documents\\template\\billing\\MCR_Fee_Scheduler_Template.xlsx"} download={"MCR_Fee_Scheduler_Template.xlsx"} href={"." + "\\Documents\\template\\billing\\MCR_Fee_Scheduler_Template.xlsx"}>
                                                        <u>Download MCR fee scheduler template</u>
                                                    </LinkS></Typography> : null}
                                            </Grid>
                                        </Grid>
                                        : null
                            }
                            {
                                (state.feeScheduleId > 0 || state.feeSourceCode === "Manual") ?
                                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Label title="Procedure Code" size={2} />

                                        <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                            <SearchList
                                                id="feeProcedureCode"
                                                name="feeProcedureName"
                                                value={state.feeProcedureCode}
                                                searchTerm={state.feeProcedureName}
                                                code="CPT"
                                                apiUrl="ddl/loadItems"
                                                onChangeValue={(name, item) => handleSearchChange(name, item)}
                                                getInputValue={(value) => handleCustomCpt(value)}
                                                placeholderTitle="Search Procedure"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                            {props.isEditable ?
                                                <>
                                                    <span className={classes.addNew} title={"Add New "} onClick={() => setShowHideAddCodeDialog(true)}>
                                                        <img src={AddIcon} alt="Add New" />Add Custom CPT
                                                    </span>
                                                </>
                                                : ''}
                                        </Grid>
                                        {/* <Grid item xs={12} sm={2} md={2} lg={2} xl={2} /> */}

                                    </Grid>
                                    : null
                            }

                            {
                                state.feeScheduleId > 0 ?

                                    <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <div className={classes.divider}></div>

                                        </Grid>

                                        <Grid container item spacing={12} xs={12} sm={12} md={12} lg={12} xl={12}>


                                            <Label title="Search By Code" size={2} />

                                            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                                                <InputBaseField
                                                    id="CustomSearch"
                                                    name="CustomSearch"
                                                    value={state.CustomSearch}
                                                    onChange={handleChange}
                                                    placeholder="Search Code"
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                                <Grid container justify="flex-end" lg={12} >
                                                    <FormBtn id="save" onClick={filterCustomData} >Filter</FormBtn>
                                                    <FormBtn id="reset" onClick={clearfilter}>Clear</FormBtn>
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                    : null
                            }

                            <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>

                                <div className={classes.divider2}></div>

                            </Grid>
                            {
                                state.feeSourceCode === "Manual" || ((state.feeSourceCode === "Existing" || state.feeSourceCode === "Custom" || state.feeSourceCode === "Medicare" || state.feeSourceCode === "Master") && state.feeScheduleId > 0) ?
                                    <Grid container item direction="row" justify="flex-end" xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                            <div className="custom-grid">
                                                <Table
                                                    checkStrictly={true}
                                                    scroll={true}
                                                    pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                                    dataSource={rowsData}
                                                    columns={state.feeSourceCode === "Master" ? gridCnfg["AddMasterFeeSchedule"] : gridCnfg["AddFeeSchedule"]}
                                                />
                                            </div>


                                        </Grid>
                                    </Grid>

                                    : null
                            }

                        </Grid>

                        {/* </Scrollbars> */}

                    </div>
                    <Grid container item className={classes.scrollbarsInnerGrid} direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid container justify="center" >
                            {isSaving ?
                                <FormBtn id="loadingSave" > Save</FormBtn>
                                :
                                <FormBtn id="save" onClick={Save} disabled={!props.isEditable}> Save</FormBtn>
                            }
                            {/* <FormBtn id="reset" onClick={handleClose}> Close </FormBtn> */}
                            {state.feeScheduleId > 0 ?
                                <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                : null
                            }

                        </Grid>
                    </Grid>
                </div>
            </ShadowBoxMin>

            {/* </Dialog > */}
            {showHideAddCodeDialog ?
                <AddCodeDialog
                    showHideDialog={openCustomDialog}
                    handleClose={closeCustomDialog}
                    customValue={customSearchValue}
                    handleSaveCustom={(value) => handleCustomSave(value)}
                />
                : null
            }
            <LogDialog
                code="feeschedule"
                id={state.feeScheduleId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={() => { actiondialogprops.OnOk() }}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
        </>
    )

}
export default withSnackbar(AddFeeSchedule)
