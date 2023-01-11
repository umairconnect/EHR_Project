import React, { useState, useEffect, useRef } from "react"
import useStyles from './styles'
import CloseIcon from "../../../../../../images/icons/math-plus.png"
import AddIcon from '../../../../../../images/icons/add-icon.png';
import DeleteIcon from '../../../../../../images/icons/trash.png';

import { withSnackbar } from '../../../../../../components/Message/Alert'
import {
    Grid,
    Dialog,
    DialogContent,
    FormLabel,
    DialogTitle,
    IconButton,
    Typography,
    Button,
    Checkbox,
    FormHelperText
} from "@material-ui/core"
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FooterBtn, FormBtn, FormGroupTitle, Label, LinkS, ErrorMessage, DraggableComponent } from "../../../../../../components/UiElements/UiElements";
import SearchList from "../../../../../../components/SearchList/SearchList";
import { InputBaseField, TextareaField, SelectField } from "../../../../../../components/InputField/InputField";
// import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { PostDataAPI } from '../../../../../../Services/PostDataAPI';
import { ActionDialog } from "../../../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from "rc-scrollbars";
import { AttachFile, Add } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { GetUserInfo } from '../../../../../../Services/GetUserInfo';
import { allowedAttachments } from "../../../../../../common/allowedAttachments";
import MedicationForm from "../../../../../patients/component/medication/component/MedicationForm";

function AddResultDialog({ dialogOpenClose, handleClose, dataIdEdit, isView, readOnly, readOnlyAssignTo, updateGrid, isViewLabel, resultDialogStateTitle, ...props }) {
    var classes = useStyles();
    const { showMessage } = props;
    const inputFile = useRef(null);
    const componentStatusOptions = [
        {
            value: "Order Entered",
            label: "Order Entered",
        },
        {
            value: "Discontinued",
            label: "Discontinued",
        },
        {
            value: "In Progress",
            label: "In Progress",
        },
        {
            value: "Result Received",
            label: "Result Received",
        },
        {
            value: "Results reviewed with patient",
            label: "Results reviewed with patient",
        },
        {
            value: "Paper Order",
            label: "Paper Order",
        },
    ];
    const componentFlags = [
        {
            value: "High",
            label: "High",
        },
        {
            value: "Low",
            label: "Low",
        },
        {
            value: "Abnormal",
            label: "Abnormal",
        },
        {
            value: "Critical",
            label: "Critical",
        },
    ];
    const [state, setState] = useState({
        labOrderResultId: 0, labOrderId: null, performedBy: null, datePreformed: '', doctorSignoff: false, assignedProvider: 0, acccession: '',
        resultStatusCode: '', internalNote: '', resultDocument: '', labId: '', labName: '', isDeleted: false, createdBy: 0,
        updatedBy: 0, createDate: null, updateDate: '', collectedDate: '', reportDate: '', resultDate: new Date().toISOString().split('T')[0] + 'T' +
            (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()),
        associateProvider: 0, accession: '', receivedDate: '', labTestId: '', testName: '', commentsDate: new Date().toISOString(),
        labTest: [], labTestComponent: []
    });
    const [attachment, setAttachment] = useState({ file: null, fileToSend: null, fileName: null });
    const [labOrderIdsList, setLabOrderIdsList] = useState([]);
    const [providersList, setProvidersList] = useState([]);
    const [isSaveCall, setIsSaveCall] = useState(false);
    const [dataId, setDataId] = useState(0);
    const [errorMessages, setErrorMessages] = useState({ labTestComponentId: false, labName: false, labResults: false, labOrderId: false });
    const [userInfo, setUserInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    let iterationNumber = 0;
    const [testState, setTestState] = useState({
        labOrderTestId: 0, labOrderId: 0, labTestId: 0, labId: 0,
        mappedIcdCode: null, isDeleted: false, createDate: new Date().toISOString(),
        createdBy: 0, updateDate: null, updatedBy: 0, isStat: false, isInternalCollection: false,
        testNote: '', orderStatus: '', vendorName: ''
    });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });


    const [showMedicationFrom, setShowMedicationFrom] = useState(false);
    const commonAttachments = allowedAttachments();

    useEffect(() => {
        
        clear();

        var params = {
            code: "provider_By_Search",
            parameters: [userInfo.userID ? userInfo.userID.toString() : "", ""]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.length > 0) {
                    setProvidersList(
                        result.data.map((item, i) => {
                            return { value: parseInt(item.text1), label: item.text2 };
                        }));
                }
            }
        })


        if (props.labOrderId > 0)
            loadLabDetails(props.labOrderId);

    }, []);


    function clear() {

        setState({
            labOrderResultId: 0, labOrderId: null, performedBy: null, datePreformed: '', doctorSignoff: false, assignedProvider: 0, acccession: '',
            resultStatusCode: '', internalNote: '', resultDocument: '', labId: '', labName: '', isDeleted: false, createdBy: 0,
            updatedBy: 0, createDate: null, updateDate: '', collectedDate: '', reportDate: '', resultDate: new Date().toISOString().split('T')[0] + 'T' +
                (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()),
            associateProvider: 0, accession: '', receivedDate: '', labTestId: '', testName: '', commentsDate: new Date().toISOString(),
            labTest: [], labTestComponent: []
        });

        setErrorMessages({ labTestComponentId: false, labName: false, labResults: false, labOrderId: false });

        if (document.getElementById("uploadFile"))
            document.getElementById("uploadFile").value = '';
    }

    function onLoadInformation(labId,VendorName) {
        
        var params = {
            code: "lab_order_ids",
            parameters: [labId ? labId.toString() : "", VendorName]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                if (result.data.length > 0) {
                    setLabOrderIdsList(
                        result.data.map((item, i) => {
                            return { value: parseInt(item.text1), label: item.text2 };
                        }));
                }
            }
        })
    }

    const handleLabChange = (name, item) => {
        const { id, value, extraParam1} = item;

        clear();
        setLabOrderIdsList([]);

        setState(prevState => ({
            ...prevState,
            [name]: value,
            labId: id
        }));

        onLoadInformation(id, value);
    };

    const handleLabOrderChange = (e) => {
        const { name, value } = e.target;

        // clear();

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        getLabInfo(value);
    }

    function getLabInfo(id) {

        iterationNumber = 0;
        loadLabDetails(id);
    }

    function loadLabDetails(id) {
        PostDataAPI("task/labOrderResult/labOrderResultDetails", parseInt(id)).then((result) => {

            if (result.success && result.data != null) {
                
                result.data = handleFormatData(result.data);
                onLoadInformation(result.data.labId, "");
                setState(result.data);

            }
        })

    }

    const handleTestChange = (name, item) => {

        const { id, value } = item;

        setState(prevState => ({
            ...prevState,
            labTestId: id,
            testName: value
        }));

        if (state.labTest) {
            if (state.labTest.filter(tmprm => tmprm.labTestId == parseInt(id)) == "") {
                addLabTest(id, value);
            }
            else {
                showMessage("Error", "Lab test already exists.", "error", 8000);

                setTimeout(function () {
                    setState(prevState => ({
                        ...prevState,
                        labTestId: '',
                        testName: ''
                    }));
                }, 100);
            }
        }
        else
            addLabTest(id, value);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLabChangeObservation = (name, item, row) => {

        const { id, value } = item;

        var _labTestComponent = [];

        let i = parseInt(row.split('^')[1]);
        let selectedRow = parseInt(row.split('^')[0]);

        if (state.labTestComponent.filter(tmprm => !tmprm.isDeleted && tmprm.labOrderTestId == state.labTest[i].labOrderTestId && tmprm.labTestComponentId == parseInt(id)) == "") {

            if (!state.labTestComponent[i]) {

                _labTestComponent.push({

                    orderTestComponentValueId: 0, labOrderResultId: 0, labOrderTestId: state.labTest[i].labOrderTestId, labTestComponentId: id, labTestId: state.labTest[i].labTestId,
                    componentName: state.labTest[i].testName, unitCode: name == "unitCode" ? value : '', flag: name == "flag" ? value : '',
                    resultValue: name == "resultValue" ? value : '', normalRange: name == "normalRange" ? value : '',
                    labComments: name == "labComments" ? value : '', providerComment: name == "providerComment" ? value : '',
                    showOnPatientportal: name == "showOnPatientportal" ? value : false, isSigned: name == "isSigned" ? value : false, vendorNote: name == "vendorNote" ? value : false,
                    createdBy: 0, updatedBy: 0, createDate: null, isDeleted: false, updateDate: null, resultDate: name == "resultDate" ? value : null, testComponentStatusCode: name == "testComponentStatusCode" ? value : ''

                });
            }
            else {

                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow][name] = value;
                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow]["labTestComponentId"] = parseInt(id);
            }


            state.labTestComponent.map((item, i) => {

                _labTestComponent.push({
                    orderTestComponentValueId: item.orderTestComponentValueId, labOrderResultId: item.labOrderResultId, labOrderTestId: item.labOrderTestId, labTestId: item.labTestId,
                    labTestComponentId: item.labTestComponentId, componentName: item.componentName, unitCode: item.unitCode, flag: item.flag, resultValue: item.resultValue,
                    normalRange: item.normalRange, labComments: item.labComments, providerComment: item.providerComment, showOnPatientportal: item.showOnPatientportal,
                    isSigned: item.isSigned, vendorNote: item.vendorNote, createdBy: item.createdBy, updatedBy: item.updatedBy, createDate: item.createDate,
                    isDeleted: item.isDeleted, updateDate: item.updateDate, resultDate: item.resultDate, testComponentStatusCode: item.testComponentStatusCode

                });
            });

            setState(prevState => ({
                ...prevState,
                labTestComponent: _labTestComponent
            }));

            setTimeout(function () {
                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow][name] = '';
                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow]["labTestComponentId"] = 0;
            }, 100);
        }
        else {

            showMessage("Error", "Observation already exists for this test.", "error", 8000);

            state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow][name] = value;
            state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow]["labTestComponentId"] = parseInt(id);

            setTimeout(function () {
                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow][name] = '';
                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow]["labTestComponentId"] = 0;


                state.labTestComponent.map((item, i) => {

                    _labTestComponent.push({
                        orderTestComponentValueId: item.orderTestComponentValueId, labOrderResultId: item.labOrderResultId, labOrderTestId: item.labOrderTestId, labTestId: item.labTestId,
                        labTestComponentId: item.labTestComponentId, componentName: item.componentName, unitCode: item.unitCode, flag: item.flag, resultValue: item.resultValue,
                        normalRange: item.normalRange, labComments: item.labComments, providerComment: item.providerComment, showOnPatientportal: item.showOnPatientportal,
                        isSigned: item.isSigned, vendorNote: item.vendorNote, createdBy: item.createdBy, updatedBy: item.updatedBy, createDate: item.createDate,
                        isDeleted: item.isDeleted, updateDate: item.updateDate, resultDate: item.resultDate, testComponentStatusCode: item.testComponentStatusCode

                    });
                });

                setState(prevState => ({
                    ...prevState,
                    labTestComponent: _labTestComponent
                }));


            }, 100);

        }
    };

    const handleChangeComponent = (e) => {
        const { name, value, id } = e.target;

        var _labTestComponent = [];
        let i = parseInt(id.split('^')[1]);
        let selectedRow = parseInt(id.split('^')[0]);

        if (!state.labTestComponent[i]) {
            _labTestComponent.push({

                orderTestComponentValueId: 0, labOrderResultId: 0, labOrderTestId: state.labTestComponent[i].labOrderTestId, labTestComponentId: 0, labTestId: state.labTest[i].labTestId,
                componentName: state.labTest[i].testName, unitCode: name == "unitCode" ? value : '', flag: name == "flag" ? value : '',
                resultValue: name == "resultValue" ? value : '', normalRange: name == "normalRange" ? value : '',
                labComments: name == "labComments" ? value : '', providerComment: name == "providerComment" ? value : '',
                showOnPatientportal: name == "showOnPatientportal" ? value : false, isSigned: name == "isSigned" ? value : false, vendorNote: name == "vendorNote" ? value : false,
                createdBy: 0, updatedBy: 0, createDate: null, isDeleted: false, updateDate: null, resultDate: name == "resultDate" ? value : null, testComponentStatusCode: name == "testComponentStatusCode" ? value : '',
                flagStatus: name == "flagStatus" ? value : ''
            });
        }
        else {
            state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow][name] = value;
        }


        state.labTestComponent.map((item, i) => {

            _labTestComponent.push({
                orderTestComponentValueId: item.orderTestComponentValueId, labOrderResultId: item.labOrderResultId, labOrderTestId: item.labOrderTestId,
                labTestId: item.labTestId, labTestComponentId: item.labTestComponentId, componentName: item.componentName, unitCode: item.unitCode,
                flag: item.flag, resultValue: item.resultValue, normalRange: item.normalRange, labComments: item.labComments, providerComment: item.providerComment,
                showOnPatientportal: item.showOnPatientportal, isSigned: item.isSigned, vendorNote: item.vendorNote, createdBy: item.createdBy, updatedBy: item.updatedBy,
                createDate: item.createDate, isDeleted: item.isDeleted, updateDate: item.updateDate, resultDate: item.resultDate, testComponentStatusCode: item.testComponentStatusCode,
                flagStatus: item.flagStatus
            });
        });


        setState(prevState => ({
            ...prevState,
            labTestComponent: _labTestComponent
        }));
    }

    const addNewObservation = (rowNumber) => {
        
        var _TestsArrayComponent = [];

        // Update

        if (state.labTestComponent) {

            state.labTestComponent.push({

                orderTestComponentValueId: 0, labOrderResultId: 0, labOrderTestId: state.labTest[rowNumber].labOrderTestId,
                labTestComponentId: 0, labTestId: state.labTest[rowNumber].labTestId, componentName: '', unitCode: '',
                flag: '', resultValue: '', normalRange: '', labComments: '', providerComment: '', showOnPatientportal: false,
                isSigned: false, vendorNote: '', createdBy: 0, updatedBy: 0, createDate: null, isDeleted: false, updateDate: null,
                resultDate: new Date().toISOString().split('T')[0] + 'T' +
                    (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes())
                , testComponentStatusCode: ''
            });

            setState(prevState => ({
                ...prevState,
                labTestComponent: state.labTestComponent
            }));
        }
        else {
            // First insert 

            _TestsArrayComponent.push({

                orderTestComponentValueId: 0, labOrderResultId: 0, labOrderTestId: state.labTest[rowNumber].labOrderTestId,
                labTestComponentId: 0, labTestId: state.labTest[rowNumber].labTestId, componentName: '', unitCode: '',
                flag: '', resultValue: '', normalRange: '', labComments: '', providerComment: '', showOnPatientportal: false,
                isSigned: false, vendorNote: '', createdBy: 0, updatedBy: 0, createDate: null, isDeleted: false, updateDate: null,
                resultDate: new Date().toISOString().split('T')[0] + 'T' +
                    (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()), testComponentStatusCode: ''
            });

            setState(prevState => ({
                ...prevState,
                labTestComponent: _TestsArrayComponent
            }));
        }

    }

    const handleSelectFile = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    function handleFileUpload(e) {
        
        if (e.target.files == null || e.target.files.length <= 0)
            return;
        const name = e.target.files[0].name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        //var ext = e.target.files[0].name.match(/\.(.+)$/)[1];

        switch (ext) {
            case commonAttachments[ext]:
                break;
            default:
                showMessage("Error", "File format is not allowed,\n Only files with the following extensions are allowed: .png .jpg .jpeg .xlxs", "error", 3000);
                document.getElementById("uploadFile").value = '';
                return;
        }

        setAttachment({ file: null, fileToSend: null, fileName: null });

        setAttachment({
            file: URL.createObjectURL(e.target.files[0]),
            fileToSend: e.target.files[0],
            fileName: e.target.files[0].name
        })
    }

    function addLabTest(id, value) {


        var _TestsArray = [];
        var _TestsArrayComponent = [];

        testState.labOrderTestId = 0;
        testState.labOrderId = parseInt(state.labOrderId);
        testState.labTestId = parseInt(id);
        testState.labId = parseInt(state.labId);
        testState.mappedIcdCode = null;
        testState.isDeleted = false;
        testState.createDate = new Date().toISOString();
        testState.createdBy = 0;
        testState.updateDate = null;
        testState.updatedBy = 0;
        testState.isStat = false;
        testState.isInternalCollection = false;
        testState.testNote = ''; testState.orderStatus = ''; testState.vendorName = '';

        let method = "patient/labOrder/addLabOrderTest";

        PostDataAPI(method, testState, true).then((result) => {

            if (result.success == true) {

                if (result.success === true && result.data != null) {

                    // result.data.map((item, i) => {
                    var item = result.data;
                    _TestsArray.push({ labTestId: id, testName: value, labOrderTestId: item.labOrderTestId });


                    _TestsArrayComponent.push({

                        orderTestComponentValueId: 0, labOrderResultId: 0, labOrderTestId: item.labOrderTestId, labTestId: id, labTestComponentId: 0,
                        componentName: '', unitCode: '', flag: '', resultValue: '', normalRange: '', labComments: '',
                        providerComment: '', showOnPatientportal: false, isSigned: false, vendorNote: '', createdBy: 0, updatedBy: 0,
                        createDate: null, isDeleted: false, updateDate: null, resultDate: null, testComponentStatusCode: ''
                    });

                    // });

                    if (state.labTest) {
                        state.labTest.map((item, i) => {

                            _TestsArray.push({
                                labTestId: item.labTestId, testName: item.testName, labOrderTestId: item.labOrderTestId
                            });

                        });
                    }

                    if (state.labTestComponent) {
                        state.labTestComponent.map((itm, i) => {

                            _TestsArrayComponent.push({
                                orderTestComponentValueId: itm.orderTestComponentValueId, labOrderResultId: itm.labOrderResultId, labOrderTestId: itm.labOrderTestId, testName: itm.testName,
                                labTestId: itm.labTestId, labTestComponentId: itm.labTestComponentId, componentName: itm.componentName, unitCode: itm.unitCode, flag: itm.flag, resultValue: itm.resultValue,
                                normalRange: itm.normalRange, labComments: itm.labComments, providerComment: itm.providerComment, showOnPatientportal: itm.showOnPatientportal,
                                isSigned: itm.isSigned, vendorNote: itm.vendorNote, createdBy: itm.createdBy, updatedBy: itm.updatedBy, createDate: itm.createDate,
                                isDeleted: itm.isDeleted, updateDate: itm.updateDate, resultDate: itm.resultDate, testComponentStatusCode: itm.testComponentStatusCode
                            });
                        });
                    }

                    setState(prevState => ({
                        ...prevState,
                        labTest: _TestsArray,
                        labTestComponent: _TestsArrayComponent,
                        labTestId: '',
                        testName: ''
                    }));


                    setTestState({});
                }
            }

            else {
                showMessage("Error", result.message, "error", 3000);

            }
        })
    }

    function deleteLabTest(iteration) {


        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the test?", "confirm", function () {

            let labTestId = state.labTest[iteration].labTestId;

            let labOrderTestId = state.labTest[iteration].labOrderTestId;

            //state.labTestComponent.map((itm, i) => {
            //    if (labTestId == itm.labTestId)
            //        state.labTestComponent.splice(i, 1);
            //});

            testState.labOrderTestId = parseInt(state.labTest[iteration].labOrderTestId);
            testState.labOrderId = parseInt(state.labOrderId);
            testState.labTestId = parseInt(state.labTest[iteration].labTestId);
            testState.labId = parseInt(state.labId);
            testState.mappedIcdCode = null;
            testState.isDeleted = true;
            testState.createDate = new Date().toISOString();
            testState.createdBy = 0;
            testState.updateDate = null;
            testState.updatedBy = 0;
            testState.isStat = false;
            testState.isInternalCollection = false;
            testState.testNote = ''; testState.orderStatus = ''; testState.vendorName = '';


            let method = "patient/labOrder/deleteLabOrderTest";

            PostDataAPI(method, testState, true).then((result) => {

                if (result.success == true) {

                    if (result.success === true && result.data != null) {

                        if (state.labTest)
                            state.labTest.splice(iteration, 1);

                        setState(prevState => ({
                            ...prevState,
                            labTest: state.labTest
                        }));

                        var data = {
                            labOrderTestId: labOrderTestId
                        }

                        PostDataAPI("task/labOrderResult/deleteLabOrderTestComponents", data, true).then((result) => {

                            if (result.success == true) {

                                if (result.success === true && result.data != null) {
                                    if (state.labTestComponent) {
                                        state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == labOrderTestId).map((itmm, d) => {
                                            let _index = 0;
                                            _index = state.labTestComponent.findIndex(x => x.labOrderTestId === itmm.labOrderTestId);
                                            state.labTestComponent.splice(_index, 1);
                                        })

                                        setState(prevState => ({
                                            ...prevState,
                                            labTestComponent: state.labTestComponent
                                        }));
                                    }
                                }
                            }
                            else {
                                showMessage("Error", result.message, "error", 3000);

                            }
                        })

                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);

                }
            })

        });
    }

    const deleteSingleObservation = (_labTestComponentId, rowOrder) => {


        ShowActionDialog(true, "Delete", "Are you sure, you want to delete the observation?", "confirm", function () {

            let i = parseInt(rowOrder.split('^')[1]);
            let selectedRow = parseInt(rowOrder.split('^')[0]);
            let labTestComponentId = _labTestComponentId;

            if (labTestComponentId > 0) {
                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId).map((itm, l) => {

                    if (itm.labTestComponentId == labTestComponentId) {
                        let _index = 0;

                        _index = state.labTestComponent.findIndex(x => x.labTestComponentId == labTestComponentId && x.labOrderTestId == state.labTest[i].labOrderTestId);

                        if (itm.orderTestComponentValueId > 0)
                            state.labTestComponent[_index].isDeleted = true;
                        else
                            state.labTestComponent.splice(_index, 1);
                    }
                });

            }
            else {
                if (state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow].labOrderResultId == 0)
                    state.labTestComponent.splice(selectedRow, 1);
                else
                    state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow].isDeleted = true;

                setErrorMessages(prevState => ({
                    ...prevState,
                    labTestComponentId: false
                }));

            }

            setState(prevState => ({
                ...prevState,
                labTestComponent: state.labTestComponent
            }));

        });
    }

    function validate(validated) {


        if (state.labOrderId == 0 || state.labOrderId === null || state.labOrderId === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                labOrderId: true
            }));

            validated = false;
        }
        if (state.labName === null || state.labName === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                labName: true
            }));

            validated = false;
        }

        

        if (state.labTest && state.labTest.length > 0) {

            if (state.labTestComponent.filter(tmprm => tmprm.isDeleted == false).length === 0 && validated != false && state.labTest.length > 0) {
                showMessage("Error", "Please select at least 1 observation against a test.", "error", 3000);
                validated = false;
            }
            else {
                state.labTestComponent.map((itm, i) => {

                    if (!itm.labTestComponentId || itm.labTestComponentId == "") {
                        setErrorMessages(prevState => ({
                            ...prevState,
                            labTestComponentId: true
                        }));

                        validated = false;
                    }
                })

            }

        }
        else {
            showMessage("Error", "Please select at least 1 test.", "error", 3000);
            validated = false;

            //setErrorMessages(prevState => ({
            //    ...prevState,
            //    labResults: true
            //}));

            //validated = false;
        }

        return validated;
    }

    function formatDataValues(formData) {
        // iterate on Main State

        for (var key in state) {
            if (state[key] && key != "fileName" && key != "formFile" && key != "encUserID" && key != "labTestComponent" && key != "labTest")
                formData.append(key, state[key]);
        }

        formData.append("formFile", attachment.fileToSend);
        formData.append("fileName", attachment.fileName);

        // iterate on State Array for Form

        for (var i = 0; i < state.labTestComponent.length; i++) {

            state.labTestComponent[i].showOnPatientportal = false;

            for (var key in state.labTestComponent[i]) {

                if (key === 'createDate' && state.labTestComponent[i][key] == null)
                    formData.append("createDate", new Date().toISOString());
                else if (key === 'updateDate' && state.labTestComponent[i][key] == null)
                    formData.append("updateDate", new Date().toISOString());
                else if (key === 'resultDate' && state.labTestComponent[i][key] == null)
                    formData.append("resultDate", new Date().toISOString());
                else if (key === 'collectedDate' && state.labTestComponent[i][key] == null)
                    formData.append("collectedDate", new Date().toISOString());
                else if (key === 'reportDate' && state.labTestComponent[i][key] == null)
                    formData.append("reportDate", new Date().toISOString());
                else
                    formData.append("labTestComponent" + "[" + i + "]." + key, state.labTestComponent[i][key]);
            }
        }

        for (var k = 0; k < state.labTest.length; k++) {

            for (var keyValue in state.labTest[k]) {
                formData.append("labTest" + "[" + k + "]." + keyValue, state.labTest[k][keyValue]);
            }
        }

        return formData;
    }

    function save() {

        var validated = true;
        validated = validate(validated);

        if (validated == false)
            return;

        let method = "task/labOrderResult/addLabOrderResult";
        if (state.labOrderResultId > 0)
            method = "task/labOrderResult/updateLabOrderResult";

        let formData = new FormData();
        formData = formatDataValues(formData);
        setLoading({ isSaving: true });
        PostDataAPI(method, formData, true, "formData").then((result) => {
            setLoading({ isSaving: false });
            if (result.success == true) {
                setErrorMessages([]);

                if (state.labOrderResultId < 1) {

                    if (result.success && result.data != null) {

                        showMessage("Success", "Lab result saved successfully.", "success", 2000);
                        handleFormatData(result.data);
                        setState(result.data);
                        setDataId({ dataId: result.data.labOrderResultId });
                        setTimeout(function () { handleClose(); }, 500);
                        updateGrid();

                    }
                }
                else if (state.labOrderResultId > 0 || state.labOrderResultId != "") {

                    if (result.success) {
                        handleFormatData(result.data);
                        setState(result.data);
                        showMessage("Success", "Lab result updated successfully.", "success", 3000);
                        updateGrid();
                    }
                }

            }
            else {
                showMessage("Error", result.message, "error", 3000);
                setIsSaveCall(false);
                setLoading({ isSaving: false });
            }
        })

    }

    function handleFormatData(data) {

        if (data.resultDocument)
            document.getElementById("uploadFile").value = data.resultDocument.split('\\')[4];

        data.collectedDate = data.collectedDate === '0001-01-01T00:00:00' ? '' : data.collectedDate;
        data.reportDate = data.reportDate === '0001-01-01T00:00:00' ? '' : data.reportDate;
        data.resultDate = data.resultDate === '0001-01-01T00:00:00' ? new Date().toISOString().split('T')[0] + 'T' +
            (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) : data.resultDate;

        if (data.labTestComponent) {
            data.labTestComponent.map((item, i) => {

                if (item.resultValue === "null")
                    item.resultValue = '';
                if (item.unitCode == 'null')
                    item.unitCode = '';
                if (item.vendorNote === 'false' || item.vendorNote === 'null')
                    item.vendorNote = '';
                if (item.providerComment === 'null')
                    item.providerComment = '';
                if (item.normalRange === 'null')
                    item.normalRange = '';

            });
        }

        return data;

    }

    const handleCloseMedicationForm = () => {

        loadLabDetails(state.labOrderId);
        setShowMedicationFrom(false);
    }

    const handleDialogSuccess = (message) => {
        showMessage("Success", message, "success", 3000);
        loadLabDetails(state.labOrderId);
        setShowMedicationFrom(false);
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
    const handleCheckBoxChange = e => {

        const { name, value, id } = e.target;

        let i = parseInt(id.split('^')[1]);
        let selectedRow = parseInt(id.split('^')[0]);

        state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow][name] =
            !state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[i].labOrderTestId)[selectedRow][name];

        setState(prevState => ({
            ...prevState,
            labTestComponent: state.labTestComponent
        }));
    };
    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={dialogOpenClose}
            PaperComponent={DraggableComponent}
            {...props}
        >

            {
                showMedicationFrom ? (<MedicationForm patientId={state.patientId} medicationId={state.medicationId} dialogOpenClose={showMedicationFrom} handleClose={() => handleCloseMedicationForm()} handleSuccess={handleDialogSuccess} />)
                    : ('')
            }

            <DialogTitle>
                <Grid lg={12} container direction="row">

                    <Grid item xs={11} sm={11} md={11} lg={11}
                        container
                        direction="row"
                        id="draggable-dialog-title"
                    >
                        <FormGroupTitle>{resultDialogStateTitle}</FormGroupTitle>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} >
                        <Grid container direction="row" justify="flex-start" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                            <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent
                className={classes.dialogcontent}
            >
                <Grid lg={12} container direction="row">
                    <Scrollbars autoHeight autoHeightMax={500} style={{ maxHeight: "calc(100% - 64px)", }}>
                        <div className={classes.mainContent}>
                            <Grid lg={12} container direction="row">

                                <Grid lg={12} container direction="row">

                                    <Label title="Lab" mandatory={true} size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <SearchList name="labName"
                                            value={state.labName}
                                            searchTerm={state.labName}
                                            code="active_Labs"
                                            apiUrl="ddl/loadItems"
                                            onChangeValue={(name, item) => handleLabChange(name, item)}
                                            placeholderTitle="Search Lab"
                                            isDisabled={props.labOrderId > 0 ? true : false}
                                        />
                                        {errorMessages.labName && !state.labName ? (<ErrorMessage >
                                            Please select lab
                                        </ErrorMessage>) : ('')}
                                    </Grid>

                                    <Label title="Assigned Provider" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <SelectField
                                            placeholder="Select Provider"
                                            disableUnderline
                                            onChange={handleChange}
                                            name="assignedProvider"
                                            value={state.assignedProvider}
                                            options={providersList}
                                            Disabled={props.labOrderId > 0 ? true : false}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid lg={12} container direction="row">

                                    <Label title="Order #" size={2} mandatory={true} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        {props.labOrderId > 0 ?
                                            <InputBaseField
                                                id="labOrderId"
                                                name="labOrderId"
                                                onChange={handleChange}
                                                value={props.labOrderId}
                                                IsDisabled={props.labOrderId > 0 ? true : false}
                                            /> :
                                            <SelectField
                                                placeholder="Select Order #"
                                                disableUnderline
                                                onChange={handleLabOrderChange}
                                                name="labOrderId"
                                                value={props.labOrderId > 0 ? props.labOrderId : state.labOrderId}
                                                options={labOrderIdsList}
                                                Disabled={props.labOrderId > 0 ? true : false}
                                            />
                                        }
                                        {errorMessages.labOrderId && !state.labOrderId ? (<ErrorMessage >
                                            Please select lab order
                                        </ErrorMessage>) : ('')}

                                    </Grid>

                                    <Label title="Accession #" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <InputBaseField
                                            id="acccession"
                                            name="acccession"
                                            onChange={handleChange}
                                            value={state.acccession}
                                            IsDisabled={props.labOrderId > 0 ? true : false}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid lg={12} container direction="row">

                                    <Label title="Collected Date" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <InputBaseField
                                            type="datetime-local"
                                            id="collectedDate"
                                            name="collectedDate"
                                            onChange={handleChange}
                                            value={state.collectedDate}
                                            IsDisabled={props.labOrderId > 0 ? true : false}
                                        />
                                    </Grid>

                                    <Label title="Report Date" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <InputBaseField
                                            type="datetime-local"
                                            id="reportDate"
                                            name="reportDate"
                                            onChange={handleChange}
                                            value={state.reportDate}
                                            IsDisabled={props.labOrderId > 0 ? true : false}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid lg={12} container direction="row">

                                    <Label title="Result Date" size={2} />
                                    <Grid item xs={12} sm={4} md={4} lg={3} >
                                        <InputBaseField
                                            type="datetime-local"
                                            id="resultDate"
                                            name="resultDate"
                                            onChange={handleChange}
                                            value={state.resultDate}
                                            IsDisabled={props.labOrderId > 0 ? true : false}
                                        />
                                    </Grid>

                                </Grid>

                                <Grid lg={12} container direction="row">

                                    <Label title="Comments" size={2} isTextAreaInput={true} />
                                    <Grid item xs={12} sm={10} md={10} lg={8} >
                                        <TextareaField
                                            id="internalNote"
                                            name="internalNote"
                                            rowsMin={4}
                                            onChange={handleChange}
                                            value={state.internalNote}
                                            Disabled={props.labOrderId > 0 ? true : false}
                                            MaxLength='4000'
                                        />
                                    </Grid>

                                </Grid>

                                <Grid lg={12} container direction="row">

                                    <Label title="Upload Documents" size={2} />
                                    <Grid item xs={12} sm={10} md={10} lg={10} >
                                        <span className={classes.btnSpan}>
                                            <InputBaseField
                                                isDisabled={true}
                                                id="uploadFile"
                                                name="uploadFile"
                                                placeholder="Upload File"
                                                value={attachment.fileName}
                                                //IsDisabled={true}
                                                IsDisabled={props.labOrderId > 0 ? true : false}
                                            />
                                            <IconButton
                                                className={classes.attachmentBtn}
                                                color="primary"
                                                onClick={handleSelectFile}>
                                                <AttachFile />
                                            </IconButton>

                                        </span>
                                        <form>
                                            <div>
                                                <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={handleFileUpload} accept=".png, .jpg, .jpeg" />
                                            </div>
                                        </form>
                                    </Grid>

                                    <Grid container xs={12} sm={2} md={2} lg={2} xl={2}>
                                        <Typography className={classes.valueText}>{<LinkS target={"_blank"} href={"." + state.resultDocument}>{state.resultDocument ? state.resultDocument.split('\\')[4] : ''}</LinkS>}</Typography>
                                    </Grid>

                                </Grid>

                                <Grid lg={12} container direction="row">
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <FormGroupTitle>Tests</FormGroupTitle>
                                    </Grid>
                                </Grid>

                                {/* <FormGroupTitle>Observation</FormGroupTitsle> */}
                                {
                                    state.labTest ?
                                        state.labTest.map((item, i) => {
                                            iterationNumber = i;
                                            return <>
                                                <Grid lg={12} container direction="row">
                                                    {/* <Grid item xs={12} sm={1} md={1} lg={1} /> */}
                                                    <Grid item xs={12} sm={10} md={10} lg={9} >

                                                        <ul className={classes.orderList}>
                                                            <li> {item.testName}
                                                                {props.labOrderId > 0 ? '' : <span><Add className={classes.attachmentDeleteBtn} onClick={() => deleteLabTest(i)} /></span>}
                                                            </li>
                                                        </ul>

                                                        {/* <ul className={classes.observationList}>
                                                            <li>

                                                                <Typography className={classes.fileNameText}>{item.testName}</Typography>

                                                                {props.labOrderId > 0 ? '' : <Add className={classes.attachmentDeleteBtn} onClick={() => deleteLabTest(i)} />}
                                                            </li>
                                                        </ul> */}
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tableBorder}>
                                                        {
                                                            state.labTestComponent && state.labTest[iterationNumber] ?
                                                                state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[iterationNumber].labOrderTestId).map(
                                                                    (observationItem, l) => {
                                                                        if (observationItem.isDeleted == true) {
                                                                            return "";
                                                                        }
                                                                        else {
                                                                            return (
                                                                                <>
                                                                                    <Grid lg={12} container direction="row">
                                                                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                                                                            <div className={classes.tableArea}>
                                                                                                {l === 0 ?
                                                                                                    <div className={classes.tableHead}>
                                                                                                        <Grid item xs={12} sm={3} md={3} lg={3}>
                                                                                                            <FormLabel className={classes.tableLabel} >Observation</FormLabel>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                                                                                            <FormLabel className={classes.tableLabel} >Result</FormLabel>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                                            <FormLabel className={classes.tableLabel} >Unit</FormLabel>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                                            <FormLabel className={classes.tableLabel} >Flag</FormLabel>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                                                                                            <FormLabel className={classes.tableLabel} >Result Date</FormLabel>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                                            <FormLabel className={classes.tableLabel} >Status</FormLabel>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                                            <FormLabel className={classes.tableLabel} >Signed</FormLabel>
                                                                                                        </Grid>
                                                                                                    </div>
                                                                                                    : null
                                                                                                }

                                                                                                <Accordion className={classes.labAccordion}>
                                                                                                    <div className={classes.tableBody}>
                                                                                                        <Grid item xs={12} sm={3} md={3} lg={3}>
                                                                                                            <span style={{ display: 'flex' }}>
                                                                                                                <AccordionSummary
                                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                                    aria-controls={observationItem.id}
                                                                                                                    id={observationItem.id}
                                                                                                                    className={classes.expandAccord}
                                                                                                                ></AccordionSummary>
                                                                                                                <SearchList
                                                                                                                    mandatory={observationItem.componentName ? false : true}
                                                                                                                    name="componentName" value={observationItem.componentName}
                                                                                                                    searchTerm={observationItem.componentName} code="lab_tests_components"
                                                                                                                    elemCode="labTestComponentId"
                                                                                                                    apiUrl="ddl/loadItems"
                                                                                                                    onChangeValue={(name, item, id) => handleLabChangeObservation(name, item, l + "^" + i)}
                                                                                                                    placeholderTitle="Search Observation"
                                                                                                                    popperWidth={true}
                                                                                                                />
                                                                                                            </span>
                                                                                                            {errorMessages.labTestComponentId && (!observationItem.labTestComponentId || observationItem.labTestComponentId == "") ? (
                                                                                                                <FormHelperText className={classes.labResultErrorMessage}>
                                                                                                                    <span>Please select observation</span>
                                                                                                                </FormHelperText>
                                                                                                                // <ErrorMessage >
                                                                                                                //     Please select observation
                                                                                                                // </ErrorMessage>
                                                                                                            ) : ('')}

                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                                                                                            <span style={{ marginLeft: "5px" }}>
                                                                                                                <InputBaseField
                                                                                                                    id={l + "^" + i}
                                                                                                                    name="resultValue"
                                                                                                                    value={observationItem ? observationItem.resultValue : ''}
                                                                                                                    placeholder="Result"
                                                                                                                    onChange={handleChangeComponent}

                                                                                                                />
                                                                                                            </span>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                                            <span style={{ marginLeft: "5px" }}>
                                                                                                                <InputBaseField
                                                                                                                    id={l + "^" + i}
                                                                                                                    name="unitCode"
                                                                                                                    value={observationItem ? observationItem.unitCode : ''}
                                                                                                                    placeholder="Unit Code"
                                                                                                                    onChange={handleChangeComponent}

                                                                                                                />
                                                                                                            </span>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                                            <span style={{ marginLeft: "5px" }}>
                                                                                                                <SelectField
                                                                                                                    id={l + "^" + i}
                                                                                                                    name="flagStatus"
                                                                                                                    value={observationItem ? observationItem.flagStatus : ''}
                                                                                                                    placeholder="Status"
                                                                                                                    options={componentFlags}
                                                                                                                    onChange={handleChangeComponent}

                                                                                                                />
                                                                                                            </span>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                                                                                            <span style={{ marginLeft: "5px" }}>
                                                                                                                <InputBaseField
                                                                                                                    id={l + "^" + i}
                                                                                                                    type="datetime-local"
                                                                                                                    name="resultDate"
                                                                                                                    value={observationItem.resultDate ? observationItem.resultDate : state.resultDate}
                                                                                                                    onChange={handleChangeComponent}

                                                                                                                />
                                                                                                            </span>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                                            <span style={{ marginLeft: "5px" }}>
                                                                                                                <SelectField
                                                                                                                    id={l + "^" + i}
                                                                                                                    name="testComponentStatusCode"
                                                                                                                    value={observationItem ? observationItem.testComponentStatusCode : ''}
                                                                                                                    placeholder="Status"
                                                                                                                    options={componentStatusOptions}
                                                                                                                    onChange={handleChangeComponent}

                                                                                                                />
                                                                                                            </span>
                                                                                                        </Grid>
                                                                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                                                                            <span style={{ marginLeft: "5px" }}>
                                                                                                                <Checkbox
                                                                                                                    id={l + "^" + i}
                                                                                                                    color="primary"
                                                                                                                    name="isSigned"
                                                                                                                    checked={observationItem.isSigned}
                                                                                                                    onChange={handleCheckBoxChange}
                                                                                                                    className={classes.labResultBoxValueBtn}
                                                                                                                    {...props}

                                                                                                                />
                                                                                                            </span>
                                                                                                        </Grid>
                                                                                                    </div>
                                                                                                    {/* {showObservationDetails ? */}
                                                                                                    <AccordionDetails className={classes.labAccordDetails}>
                                                                                                        <Grid container xs={12} sm={12} md={12} lg={12} >

                                                                                                            <Label title="Vendor Notes" size={2} isTextAreaInput={true} />
                                                                                                            <Grid item xs={12} sm={8} md={8} lg={7} >
                                                                                                                <TextareaField
                                                                                                                    rowsMin={3}
                                                                                                                    id={l + "^" + i}
                                                                                                                    name="vendorNote"
                                                                                                                    value={observationItem ? observationItem.vendorNote : ''}
                                                                                                                    onChange={handleChangeComponent}
                                                                                                                    placeholder="Vendor Notes"
                                                                                                                    Disabled={props.labOrderId > 0 ? true : false}
                                                                                                                />
                                                                                                            </Grid>
                                                                                                        </Grid>

                                                                                                        <Grid container xs={12} sm={12} md={12} lg={12} >
                                                                                                            <Label title="Provider Comments" size={2} isTextAreaInput={true} />
                                                                                                            <Grid item xs={12} sm={8} md={8} lg={7} >
                                                                                                                <TextareaField
                                                                                                                    rowsMin={3}
                                                                                                                    id={l + "^" + i}
                                                                                                                    name="providerComment"
                                                                                                                    value={observationItem ? observationItem.providerComment : ''}
                                                                                                                    onChange={handleChangeComponent}
                                                                                                                    placeholder="Provider Comments"

                                                                                                                />
                                                                                                            </Grid>
                                                                                                            <Grid container alignItems="flex-end" justify="center" xs={12} sm={3} md={3} lg={3} >
                                                                                                                <Button
                                                                                                                    variant="contained"
                                                                                                                    color="secondary"
                                                                                                                    className={classes.deleteButton}
                                                                                                                    endIcon={<img src={DeleteIcon} />}
                                                                                                                    onClick={() => deleteSingleObservation(observationItem.labTestComponentId, l + "^" + i)}
                                                                                                                    disabled={!props.isEditable}
                                                                                                                >
                                                                                                                    Delete Observation
                                                                                                                </Button>

                                                                                                            </Grid>
                                                                                                        </Grid>

                                                                                                        {/* {state.labTestComponent && state.labTestComponent.filter(tmprm => tmprm.labOrderTestId == state.labTest[iterationNumber].labOrderTestId && tmprm.isDeleted == false).length == l + 1 ?
                                                                                                <Grid lg={12} container direction="row">
                                                                                                    <Grid container xs={12} sm={12} md={12} lg={12} >
                                                                                                        <Grid item xs={12} sm={2} md={2} lg={2} />
                                                                                                        <Link>
                                                                                                            <Typography className={classes.diagnosisLabel}>Diagnosis </Typography>
                                                                                                        </Link>
                                                                                                        <Grid item xs={12} sm={4} md={4} lg={4} >
                                                                                                            <Button
                                                                                                                variant="contained"
                                                                                                                color="secondary"
                                                                                                                className={classes.addNewRecordButton}
                                                                                                                endIcon={<img src={AddIcon} />}
                                                                                                                onClick={() => addNewObservation(i)}
                                                                                                            >
                                                                                                                Add New Record
                                                                                                            </Button>
                                                                                                        </Grid>

                                                                                                    </Grid>
                                                                                                    <Grid container xs={12} sm={12} md={12} lg={12} >
                                                                                                        <Grid item xs={12} sm={2} md={2} lg={2} />
                                                                                                        <Grid item xs={12} sm={9} md={9} lg={9} >
                                                                                                            {state.labOrderDiagnosis ?
                                                                                                                state.labOrderDiagnosis.filter(tmprm => tmprm.labOrderTestId == state.labTest[iterationNumber].labOrderTestId).map((itm, l) => (
                                                                                                                    <Typography className={classes.diagnosesList}> - {itm.icdName}</Typography>
                                                                                                                ))
                                                                                                                : null
                                                                                                            }
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Grid> : null
                                                                                                         } */}
                                                                                                        {/* </> : ""
                                                                                    } */}
                                                                                                    </AccordionDetails>
                                                                                                </Accordion>
                                                                                                {/*))*/}
                                                                                                {/*: null*/}
                                                                                                {/*      }*/}
                                                                                            </div>
                                                                                        </Grid>
                                                                                    </Grid>

                                                                                </>
                                                                            )
                                                                        }
                                                                    })
                                                                : null
                                                        }
                                                    </Grid>
                                                </Grid>
                                                <Grid lg={12} container direction="row">
                                                    <Grid item xs={12} sm={10} md={10} lg={9} >
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            className={classes.addNewButton}
                                                            endIcon={<img src={AddIcon} />}
                                                            onClick={() => addNewObservation(i)}
                                                            disabled={!props.isEditable}                                                        >
                                                            Add New Observation
                                                        </Button>
                                                    </Grid>
                                                </Grid>

                                            </>
                                        })
                                        : null
                                }
                                {/* {errorMessages.labResults && (!state.labTestComponent || state.labTestComponent.length === 0) ? (<ErrorMessage >
                                    Please select observation
                                </ErrorMessage>) : ('')} */}
                                {props.labOrderId <= 0 ?
                                    <Grid lg={12} container direction="row" style={{ marginTop: "10px" }}>

                                        <Label title="Add a Test" size={2} mandatory={true} />
                                        <Grid item xs={12} sm={8} md={8} lg={7} >
                                            <SearchList
                                                name="testName"
                                                value={state.testName}
                                                searchTerm={state.testName}
                                                code="labOrder_test"
                                                apiUrl="ddl/loadItems"
                                                onChangeValue={(name, item) => handleTestChange(name, item)}
                                                placeholderTitle="Search test"
                                                isDisabled={props.labOrderId > 0 ? true : false}
                                            />
                                        </Grid>
                                    </Grid>
                                    : null}

                            </Grid>
                        </div>
                    </Scrollbars>
                    <Grid container alignItems="center" justify="flex-end" direction="row" xs={12} sm={12} md={12} lg={12} >
                        <FooterBtn className={classes.footerBtn}>
                            {loading.isSaving ? <FormBtn id={"loadingSave"} size="medium">Saving</FormBtn> :
                                /*  props.labOrderId <= 0 ?*/
                                <FormBtn id={"save"} onClick={save} size="medium" disabled={!props.isEditable}>Save</FormBtn>
                                /*  : null*/
                            }
                            <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>
                        </FooterBtn>
                    </Grid>
                </Grid>
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
            </DialogContent>
        </Dialog>
    )
}
export default withSnackbar(AddResultDialog)
