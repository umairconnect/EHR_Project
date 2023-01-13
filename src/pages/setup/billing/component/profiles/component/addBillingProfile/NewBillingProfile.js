import React, { useState, useEffect } from "react"
import useStyles from './styles'
import DeleteIcon from "../../../../../../../images/icons/trash.png";
import { withSnackbar } from '../../../../../../../components/Message/Alert'
import {
    Grid,
    Button,
    Tooltip,
} from "@material-ui/core"
import { FormBtn, ShadowBoxMin, Label, ErrorMessage } from "../../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../../components/SearchList/SearchList";
import SearchListField from "../../../../../../../components/SearchListField/SearchListField";
import { InputBaseField } from "../../../../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../../components/ActionDialog/ActionDialog";
import AddNdcCode from "../../../../../../billing/components/claim/components/addNewClaim/components/addNdcCode/AddNdcCode";
import LogDialog from "../../../../../../../components/LogDialog/LogDialog";
import { InputPaymentField } from "../../../../../../../components/InputField";
import { GetUserInfo } from '../../../../../../../Services/GetUserInfo';

import { Tag } from "antd";
function NewBillingProfile({ dialogOpenClose, handleClose, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;

    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const [isSaving, setIsSaving] = useState(false);

    const defaultAttributes = {
        billingProfileId: 0, ProfileName: '', profileCode: '', iCDList: [], cPTList: []
    };
    const [state, setState] = useState(defaultAttributes);
    const [dataId, setDataId] = useState(props.dataId);

    const [errorMessages, setErrorMessages] = useState({
        errorCarePlanType: false, errorInstructions: false
    });
    const [ndclistPopUp, setNdcListPopUp] = useState({
        billingProfileCptNdcId: 0, billingProfileCptId: 0, code: '', ndcCode: '', unitCode: '', quantity: '',
        isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date().toISOString(), ndcCodeName: ''
    });

    useEffect(() => {
        loadFormData();
    }, [dialogOpenClose]);

    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(dataId.dataId ? dataId.dataId : dataId),
            area: "Billing Profile setup",
            activity: "Load billing profile details",
            details: "User viewed billing profile screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    const loadFormData = () => {
        if (dataId > 0) {
            PostDataAPI("billing/profile/get", dataId.dataId ? dataId.dataId : dataId).then((result) => {
                if (result.success && result.data != null) {
                    result.data.billingProfileId = result.data.billingProfileId;
                    setState(result.data);
                    setICDList(result.data.icdList);
                    setCPTList(result.data.cptList);
                }
            })
            saveAuditLogInfo();
        }
        else {
            setState(defaultAttributes);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;


        if ((value.trim() === "" && value !== "") || value.trim().length > 64) {
            return;
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleICDChange = (name, item) => {
        const { id, value } = item;

        if (value != '') {
            if (ICDList.some(t => t.icdCode == id && !t.isDeleted)) {
                setState(prevState => ({
                    ...prevState,
                    icdTenCodeId: id,
                    icdTenCodeName: value
                }))
                showMessage("Error", 'Diagnosis code already selected.', "error", 3000);
                setTimeout(function () {
                    setState(prevState => ({
                        ...prevState,
                        icdTenCodeId: '',
                        icdTenCodeName: ''
                    }));
                }, 100);
                return;
            }
            setState(prevState => ({
                ...prevState,
                icdTenCodeId: id,
                icdTenCodeName: value
            }))
            setICDList(prevState => ([
                ...prevState,
                {
                    [name]: id,
                    ['description']: value,
                    ['serial']: ICDList.filter(t => !t.isDeleted).length + 1
                }
            ]));
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    icdTenCodeId: '',
                    icdTenCodeName: ''
                }));
            }, 100);
        }
    }
    const handleCPTChange = (name, item, elemCode) => {
        const { id, value } = item;
        if (value != '') {
            if (CPTList.some(t => t.cptCode == id && t.cptName == item.extraParam2 && !t.isDeleted)) {
                setState(prevState => ({
                    ...prevState,
                    cptCodeId: id,
                    cptCodeName: value
                }))
                showMessage("Error", 'CPT code already selected.', "error", 3000);
                setTimeout(function () {
                    setState(prevState => ({
                        ...prevState,
                        cptCodeId: "",
                        cptCodeName: ''
                    }));
                }, 100);
                return;
            }
            setState(prevState => ({
                ...prevState,
                cptCodeId: id,
                cptCodeName: value
            }))
            setCPTList(prevState => ([
                ...prevState,
                {
                    [elemCode]: id,
                    [name]: item.extraParam2,
                    ['billingProfileCPTId']: (prevState?.length > 0 && prevState.reduce((obj1, obj2) => obj1.billingProfileCPTId < obj2.billingProfileCPTId ? obj1 : obj2).billingProfileCPTId < 0 ? prevState.reduce((obj1, obj2) => obj1.billingProfileCPTId < obj2.billingProfileCPTId ? obj1 : obj2).billingProfileCPTId - 1 : -1),
                    ['ndcList']: []
                }
            ]));
            setTimeout(function () {
                setState(prevState => ({
                    ...prevState,
                    cptCodeId: "",
                    cptCodeName: ''
                }));
            }, 100);
        }
    }
    const handleNumberChange = (e, i, maxLength) => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= maxLength) {

                        const { name, value } = e.target;
                        const CPTClone = [...CPTList];
                        CPTClone[i][name] = value;

                        setCPTList(CPTClone);
                    }
                }
                else
                    e.preventDefault();
            }
            else {
                const { name, value } = e.target;
                const CPTClone = [...CPTList];
                CPTClone[i][name] = value;

                setCPTList(CPTClone);
            }
        }
        else
            e.preventDefault();
    };
    const handleCPTAttributeChange = (e, i, type) => {
        //if (isNaN(parseFloat(e.target.value))) {
        //    e.target.value = 0;
        //}
        if (!e.target.value)
            e.target.value = '0';
        const { name, value } = e.target;

        let attrValue = parseFloat(value);
        const CPTClone = [...CPTList];
        CPTClone[i][name] = attrValue;

        setCPTList(CPTClone);
    }
    const handleCPTPtrsAttributeChange = (e, i) => {

        const { name, value } = e.target;
        let isValid = true;
        //check serial exist        
        if (value && !ICDList.some(t => t.serial == value) || ICDList.length == 0) {
            showMessage("Error", 'ICD serial does not exist.', "error", 2000);
            isValid = false;
        }
        const CPTClone = [...CPTList];
        //validate ICD-10 DX Ptrs values index.
        const ptrsIndex = name.substring(7);
        if (ptrsIndex > 1) {
            let isEmpty = false;
            let alreadyExist = false;
            for (var j = ptrsIndex - 1; j >= 1; j--) {
                if (!CPTClone[i]['icdPtrs' + j] || CPTClone[i]['icdPtrs' + j] == '')
                    isEmpty = true;
                else if (CPTClone[i]['icdPtrs' + j] == value)
                    alreadyExist = true;
            }
            if (isEmpty) {
                showMessage("Error", 'Fill ICD-10 Dx Ptrs left to right.', "error", 2000);
                isValid = false;
            }
            if (alreadyExist) {
                showMessage("Error", 'ICD serial already used.', "error", 2000);
                isValid = false;
            }
        }
        if (!isValid) {
            e.target.value = '';
            return;
        }

        CPTClone[i][name] = value;

        setCPTList(CPTClone);
    }
    const handleModifiersChange = (name, item, row) => {
        const { id, value } = item;
        const CPTClone = [...CPTList];
        CPTClone[row][name] = id;
        setCPTList(CPTClone);
    }
    const [ICDList, setICDList] = useState([]);
    const [CPTList, setCPTList] = useState([]);

    const deleteProfile = () => {
        props.handleDelete(state.billingProfileId);
    }
    const deleteICDRow = (code) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            //mark object deleted
            let updatedICDList = ICDList.map((item, i) => item.icdCode == code ? { ...item, isDeleted: true } : item);
            //regenerate serial numbers
            updatedICDList.filter((t) => { return !t.isDeleted }).forEach((o, i) => { o.serial = i + 1; });
            setICDList(updatedICDList);
            //Clear ICD-10 entries in CPT rows
            CPTList.forEach((o) => {
                o.icdPtrs1 = o.icdPtrs2 = o.icdPtrs3 = o.icdPtrs4 = '';
            });
        });
    }
    const deleteCPTRow = (code) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            setCPTList(CPTList.map((item, i) => item.cptCode == code ? { ...item, isDeleted: true } : item));
        });
    }
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

    const ClearFormValues = () => {
        if (dataId > 0 || dataId != "") {
            //loadProfile();
        }
        else {
            setState(defaultAttributes);
        }
    };
    const ValidateSave = (errorList) => {
        if (!state.profileName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProfileName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProfileName: false
            }));
        }
        if (CPTList.filter((t) => !t.isDeleted).length == 0 && ICDList.filter((t) => !t.isDeleted).length == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCPT: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCPT: false
            }));
        }
    }

    const Save = e => {
        let errorList = [];

        ValidateSave(errorList);
        if (errorList.length < 1) {
            let method = "billing/profile/add";
            if (dataId.dataId ? dataId.dataId : dataId > 0)
                method = "billing/profile/update";

            state.iCDList = ICDList;
            state.cPTList = CPTList;
            setIsSaving(true);
            PostDataAPI(method, state, true).then((result) => {
                setIsSaving(false);
                if (result.success == true) {
                    setErrorMessages([]);
                    if (dataId < 1) {
                        if (result.success && result.data != null) {
                            setState(result.data);
                            showMessage("Success", "Billing profile saved successfully.", "success", 2000);

                            setDataId({
                                dataId: result.data.billingProfileId
                            });
                            setICDList(result.data.icdList);
                            setCPTList(result.data.cptList);
                            //setTimeout(() => { handleClose(); }, 2000);

                        }
                    }
                    else if (dataId > 0 || dataId != "") {
                        if (result.success) {
                            showMessage("Success", "Billing profile updated successfully.", "success", 3000);
                            //setTimeout(() => { handleClose(); }, 2000);
                        }
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                    //setIsSaveCall(false);
                }
            })
        }
    };
    const [showHideNdcCodeDialog, setShowHideNdcCodeDialog] = useState(false);
    const addNdcCodeDialogClose = () => {
        setShowHideNdcCodeDialog(false)
    }
    const [cptId, setCptId] = useState(0);
    const [cptIndex, setcptIndex] = useState(0);
    const [ndcCode, setNdcCode] = useState("");
    const [ndcCodeName, setNdcCodeName] = useState("");
    const handleNdcSave = (sObj) => {

        //for now we are implementing to save single ndc for a selected cpt.
        let lst = [...CPTList];
        let obj = lst[cptIndex];
        if (obj.ndcList.length > 0) {
            obj.ndcList[0].billingProfileCPTId = obj.billingProfileCPTId;
            obj.ndcList[0].ndcCode = sObj.ndcCode;
            obj.ndcList[0].unitCode = sObj.unitCode;
            obj.ndcList[0].quantity = sObj.quantity;
        }
        else {
            obj.ndcList.push({
                'billingProfileCPTId': obj.billingProfileCPTId,
                'ndcCode': sObj.ndcCode,
                'unitCode': sObj.unitCode,
                'quantity': sObj.quantity
            });
        }
        setCPTList(lst);
        setShowHideNdcCodeDialog(false);
    }

    const AddNdcCodes = (cptCode, index, ndcCode, ndcCodeName) => {

        cleanNdcPopUpFields();
        setCptId(cptId);
        setcptIndex(index)
        setNdcCode(ndcCode);
        setNdcCodeName(ndcCodeName)
        setShowHideNdcCodeDialog(true);
        CPTList.filter(tmprm => tmprm.cptCode == cptCode && ndcCode == ndcCode).map((item, i) => {
            setNdcListPopUp(item.ndcList[0]);
        });
    }
    const [logdialogstate, setLogDialogState] = useState(false);
    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
    }
    const cleanNdcPopUpFields = () => {
        setNdcListPopUp({
            billingProfileCptNdcId: 0, billingProfileCptId: 0, code: '', ndcCode: '', unitCode: '', quantity: '',
            isDeleted: false, createdBy: 0, updatedBy: 0, createDate: new Date().toISOString(), ndcCodeName: ''
        });
    }
    return (
        <>
            <ShadowBoxMin shadowSize={3} >
                <Grid container direction="row" >
                    <Grid container direction="row">
                        <Label title="Profile Name" mandatory={true} size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <InputBaseField
                                id="profileName"
                                name="profileName"
                                value={state.profileName}
                                labelPlacement="end"
                                placeholder="Profile Name"
                                onChange={handleChange}
                            />
                            {errorMessages.errorProfileName && (!state.profileName || state.profileName.trim() == "") ? (<ErrorMessage>
                                Please enter profile name
                            </ErrorMessage>) : ('')}
                        </Grid>
                    </Grid>
                    <Grid container direction="row" >
                        <Label title="Diagnosis" size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <SearchList
                                id="icdTenCodeId"
                                name="icdCode"
                                value={state.icdTenCodeId}
                                searchTerm={state.icdTenCodeName}
                                code="ICD"
                                apiUrl="ddl/loadItems"
                                placeholderTitle="Search for ICD-10 Diagnosis Codes"
                                onChangeValue={(name, item) => handleICDChange(name, item)}
                            />
                        </Grid>
                        <Grid container direction="row" >
                            <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                            <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                                <table className={classes.icdCodeTable} >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "5%" }}>Sr.</th>
                                            <th style={{ width: "30%", textAlign: "left" }}>Code</th>
                                            <th style={{ width: "60%", textAlign: "left" }} >Description</th>
                                            <th style={{ width: "5%" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ICDList.filter(o => o.isDeleted != true).map((item, i) => {
                                                return <tr>
                                                    <td>{item.serial}</td>
                                                    <td style={{ textAlign: "left" }}>{item.icdCode}</td>
                                                    <td style={{ textAlign: "left" }}>{item.description}</td>
                                                    <td style={{ textAlign: "right" }}>
                                                        {props.isEditable ?
                                                            <Tooltip title="Delete">
                                                                <img src={DeleteIcon} alt="delete" onClick={() => deleteICDRow(item.icdCode)} />
                                                            </Tooltip>

                                                            : ''}
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" >
                        <Label title="Procedures" size={2} mandatory={true} />
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <SearchList
                                id="cptCodeId"
                                name="cptName"
                                elemCode="cptCode"
                                value={state.cptCodeId}
                                searchTerm={state.cptCodeName}
                                code="CPT"
                                apiUrl="ddl/loadItems"
                                placeholderTitle="Search Procedures"
                                onChangeValue={(name, item, elemCode) => handleCPTChange(name, item, elemCode)}
                            />
                            {(errorMessages.errorCPT && CPTList.filter((t) => !t.isDeleted).length == 0 && ICDList.filter((t) => !t.isDeleted).length == 0) ? (<ErrorMessage>
                                Please select at least one procedure
                            </ErrorMessage>) : ('')}
                        </Grid>
                        <Grid container direction="row" >
                            <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                            <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                                <table className={classes.icdCodeTable}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "5%" }}>Sr.</th>
                                            <th style={{ width: "10%" }}>Code</th>
                                            <th style={{ width: "25%" }}>Modifier</th>
                                            <th style={{ width: "25%" }}>ICD-10 Dx Ptrs</th>
                                            <th style={{ width: "10%" }}>Quantity</th>
                                            <th style={{ width: "10%" }}>Price</th>
                                            <th style={{ width: "10%" }}>NDC</th>
                                            <th style={{ width: "5%", textAlign: "right" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            CPTList.filter(o => o.isDeleted != true).map((item, i) => {
                                                return <tr>
                                                    <td >{i + 1}</td>
                                                    <td>{item.cptCode}</td>
                                                    <td >
                                                        <tr>
                                                            <td className={classes.subTd}>
                                                                <SearchListField
                                                                    id={i}
                                                                    name="modifier1"
                                                                    value={item.modifier1}
                                                                    searchTerm={item.modifier1}
                                                                    code="get_modifiers_codes"
                                                                    apiUrl="ddl/loadItems"
                                                                    onChangeValue={(name, item, id) => handleModifiersChange(name, item, i)}
                                                                    placeholderTitle="M1"
                                                                    MaxLength="2"
                                                                    popperWidth={true}
                                                                />
                                                            </td>
                                                            <td className={classes.subTd}>
                                                                <SearchListField
                                                                    id={i}
                                                                    name="modifier2"
                                                                    value={item.modifier2}
                                                                    searchTerm={item.modifier2}
                                                                    code="get_modifiers_codes"
                                                                    apiUrl="ddl/loadItems"
                                                                    onChangeValue={(name, item, id) => handleModifiersChange(name, item, i)}
                                                                    placeholderTitle="M2"
                                                                    MaxLength="2"
                                                                    popperWidth={true}
                                                                />
                                                            </td>
                                                            <td className={classes.subTd}>
                                                                <SearchListField
                                                                    id={i}
                                                                    name="modifier3"
                                                                    value={item.modifier3}
                                                                    searchTerm={item.modifier3}
                                                                    code="get_modifiers_codes"
                                                                    apiUrl="ddl/loadItems"
                                                                    onChangeValue={(name, item, id) => handleModifiersChange(name, item, i)}
                                                                    placeholderTitle="M3"
                                                                    MaxLength="2"
                                                                    popperWidth={true}
                                                                />
                                                            </td>
                                                            <td className={classes.subTd}>
                                                                <SearchListField
                                                                    id={i}
                                                                    name="modifier4"
                                                                    value={item.modifier4}
                                                                    searchTerm={item.modifier4}
                                                                    code="get_modifiers_codes"
                                                                    apiUrl="ddl/loadItems"
                                                                    onChangeValue={(name, item, id) => handleModifiersChange(name, item, i)}
                                                                    placeholderTitle="M4"
                                                                    MaxLength="2"
                                                                    popperWidth={true}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </td>
                                                    <td >
                                                        <tr>
                                                            <td style={{ maxWidth: "50px", padding: "5px 2px 5px 0px" }}>
                                                                <InputBaseField
                                                                    name="icdPtrs1"
                                                                    value={item.icdPtrs1}
                                                                    onChange={(e) => handleCPTPtrsAttributeChange(e, i)}
                                                                />
                                                            </td>
                                                            <td style={{ maxWidth: "50px", padding: "5px 2px 5px 0px" }}>
                                                                <InputBaseField
                                                                    name="icdPtrs2"
                                                                    value={item.icdPtrs2}
                                                                    onChange={(e) => handleCPTPtrsAttributeChange(e, i)}
                                                                />
                                                            </td>
                                                            <td style={{ maxWidth: "50px", padding: "5px 2px 5px 0px" }}>
                                                                <InputBaseField
                                                                    name="icdPtrs3"
                                                                    value={item.icdPtrs3}
                                                                    onChange={(e) => handleCPTPtrsAttributeChange(e, i)}
                                                                />
                                                            </td>
                                                            <td style={{ maxWidth: "50px", padding: "5px 2px 5px 0px" }}>
                                                                <InputBaseField
                                                                    name="icdPtrs4"
                                                                    value={item.icdPtrs4}
                                                                    onChange={(e) => handleCPTPtrsAttributeChange(e, i)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </td>
                                                    <td className={classes.quantityTd}>
                                                        <InputPaymentField
                                                            name="quantity"
                                                            value={item.quantity}
                                                            MaxLength={11}
                                                            onChange={(e) => handleCPTAttributeChange(e, i)}
                                                        />
                                                    </td>
                                                    <td className={classes.priceTd}>
                                                        <InputPaymentField
                                                            name="price"
                                                            value={item.price}
                                                            MaxLength={11}
                                                            onChange={(e) => handleCPTAttributeChange(e, i)}
                                                        />
                                                    </td>
                                                    <td >{item.ndcList ? item.ndcList.map((objNDC, k) => {
                                                        return <Tag color="#5D8AB5" style={{ margin: "0px 2px", padding: "2px 4px" }} key={k}>{objNDC.ndcCode}</Tag>
                                                    }) : null}</td>
                                                    <td >
                                                        <div className={classes.cptTableAction}>
                                                            {props.isEditable ?
                                                                <>
                                                                    <Button
                                                                        name="ndc"
                                                                        className={classes.ndcCustomBtn}
                                                                        onClick={() => AddNdcCodes(item.cptCode, i, item.ndcList.length > 0 ? item.ndcList[0].ndcCode : '', item.ndcList.length > 0 ? item.ndcList[0].ndcCodeName : '')}
                                                                        disabled={!props.isEditable}>NDC</Button>

                                                                    <Tooltip title="Delete">
                                                                        <img src={DeleteIcon} className={classes.procedureAction} alt="delete" onClick={() => deleteCPTRow(item.cptCode)} />
                                                                    </Tooltip>
                                                                </>
                                                                : ''}
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
                        <Grid container direction="row" item alignItems="flex-start" justify="flex-start" xs={10} sm={10} md={10} lg={10} xl={10}>
                            {isSaving ?
                                <FormBtn id="loadingSave" >Save</FormBtn>
                                :
                                <FormBtn id="save" onClick={Save} disabled={!props.isEditable}>Save</FormBtn>
                            }
                            {
                                state.billingProfileId > 0 ?
                                    props.isDeleting ?
                                        <FormBtn id="loadingDelete" size="medium">Delete</FormBtn> :
                                        <FormBtn id="delete" onClick={() => deleteProfile()} size="medium" disabled={!props.isEditable}>Delete</FormBtn>
                                    : null
                            }
                            {state.billingProfileId > 0 ?
                                <FormBtn id={"save"} onClick={() => OpenCloseLogDialog(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                : null
                            }

                        </Grid>
                    </Grid>

                </Grid>
            </ShadowBoxMin>
            <LogDialog
                code="billingprofile"
                id={state.billingProfileId}
                dialogOpenClose={logdialogstate}
                onClose={(dialogstate) => OpenCloseLogDialog(dialogstate)}
            />
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
            {showHideNdcCodeDialog ? <AddNdcCode showHideDialog={showHideNdcCodeDialog} handleClose={addNdcCodeDialogClose} proCodeForNdc={cptId} ndcCode={ndcCode}
                stateNdcCode={ndclistPopUp} handleSave={(value) => handleNdcSave(value)} /> : ""}
        </>
    )
}
export default withSnackbar(NewBillingProfile)