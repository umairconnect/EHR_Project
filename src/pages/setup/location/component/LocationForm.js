import React, { useState, useEffect } from "react";
import {
    Grid,
    InputBase,
    FormLabel,
    NativeSelect,
} from '@material-ui/core';

import useStyles from "./styles";
import { InputBaseField, CheckboxField, TextareaField, SelectField } from '../../../../components/InputField';
import { ShadowBox, FooterBtn, FormGroupTitle, FormBtn, Label, ErrorMessage } from '../../../../components/UiElements';
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import LogDialog from '../../../../components/LogDialog/LogDialog';
import { ActionDialog } from '../../../../components/ActionDialog/ActionDialog';
import { withSnackbar } from '../../../../components/Message/Alert';
import { USAStateListOptions } from '../../../../context/StaticDropDowns';
import DeleteIcon from "../../../../images/icons/trash.png";
import AddIcon from '../../../../images/icons/add-icon.png';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function LocationForm(props) {
    var classes = useStyles();

    const { showMessage } = props;

    const [dialogBoxOpenClose, setDialogBoxOpenClose] = useState(false);
    const [dialogClose, setDialogClose] = useState(false);

    const [locationPage, setPocationPage] = useState(false);
    const [title, setTitle] = useState('Location');
    const [dataId, setDataId] = useState(props.dataId);

    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const [isFormEditable, setIsFormEditable] = useState(props.isFormEditable);

    const [previousLocState, setpreviousLocState] = useState({ previousLocation: "" });
    const onClose = onClose => {
        setDialogClose(onClose);
        setDialogBoxOpenClose(false);
    }
    const [state, setState] = useState({

        address: "", description: "", locationName: "", locationID: 0, isPrimaryLocation: false, city: "", country: "", state: "",
        zip: "", phone: "", emailAddress: "", taxanomyCode: "", fax: "", timeZone: "", officeStartHours: "08:00", officeClosingHours: "17:00", numberOfRooms: "", IsDeleted: false,
        createDate: new Date().toISOString(), createdBy: 0, UpdatedBy: 0,
        roomDTOlst: [], officeTimeList: [],

        billingPracticeNpi: '',
        billingEin: '',
        billingUpin: '',
        billingMedicare: '',
        billingMedicad: '',
        billingCampus: ''
    });
    const [officeTimeList, setOfficeTimeList] = useState([]);

    const locationFormRef = useState({ locationNameRef: "", addressRef: "", openingHoursRef: "", closingHoursRef: "", examRoomsRef: "" });
    const [errorMessages, setErrorMessages] = useState({
        errorLocName: false, errorAddress: false, errorEmail: false, errorStartHours: false,
        errorClosedHours: false, dateRangeError: false, errorNumberOfRooms: false, errorDuplicateRooms: false,
        errorPhoneLength: false, errorFaxLength: false, errorOfficeTimeList: false,
        errorOfficeTimeListComparsion: false, errorPracticeNpi: false, errorPracticeNpiLength: false, moveToElementId: ''
    })

    const [logdialogstate, setLogDialogState] = useState(false);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });

    const [isPrimaryChecked, setIsPrimaryChecked] = useState(false);

    const handleEINnumbers = e => {

        const { name, value } = e.target;

        const newValue = value.match().join('-');


        setState(prevState => ({
            ...prevState,
            [name]: newValue
        }));

    }

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOfficeTimingSpecialicationChange = (e, index) => {
        const { id, name, value } = e.target;
        if (state.officeTimeList.some(t => t.specializationId == value && !t.isDeleted)) {
            showMessage("Error", 'Specialization already exists.', "error", 1000);
            e.target.value = '';
            return;
        }
        const selectedText = e.target.options[e.target.selectedIndex].text;
        const list = state.officeTimeList;
        list[index][id] = parseInt(!value ? 0 : value);
        list[index][name] = selectedText;
        setState(prevState => ({
            ...prevState,
            ["officeTimeList"]: list
        }));
        if (!state.officeTimeList.some(t => t.specializationId <= 0 && !t.isDeleted)) {
            errorMessages.errorOfficeTimeList = false;
        }
        if (!state.officeTimeList.some(t => t.openingHours.split(':')[0] > t.closingHours.split(':')[0] && !t.isDeleted)) {
            errorMessages.errorOfficeTimeListComparsion = false;
        }
    };
    const handleOfficeTimingInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = state.officeTimeList;
        list[index][name] = value;
        setState(prevState => ({
            ...prevState,
            ["officeTimeList"]: list
        }));

    };
    const handleOfficeTimingRemoveClick = index => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete?", "confirm", function () {
            let updatedList = state.officeTimeList.map((item, i) => i == index ? { ...item, isDeleted: true } : item);

            setState(prevState => ({
                ...prevState,
                ["officeTimeList"]: updatedList
            }));
        });

        // setOfficeTimeList(list);
    };
    const handleOfficeTimingAddClick = () => {
        const list = state.officeTimeList;

        list.push({ specializationId: 0, speciality: "", openingHours: "09:00", closingHours: "18:00", isDeleted: false });
        setState(prevState => ({
            ...prevState,
            ["officeTimeList"]: list
        }));
    };

    const handleZipChange = e => {

        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= 5) {

                        const { name, value } = e.target;
                        setState(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }
                }
                else
                    e.preventDefault();
            }
            else {
                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };

    const handleFaxChange = e => {

        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                const { name, value } = e.target;
                if ((e.target.value === '' || re.test(e.target.value))) {

                    var cleaned = ('' + e.target.value).replace(/\D/g, '')
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
                    if (match) {
                        var intlCode = (match[1] ? '+1 ' : ''),
                            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorFaxLength: false
                        }));

                        return;
                    }

                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorFaxLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorFaxLength: false
                    }));
                }
            }

        }
        else
            e.preventDefault();
    };

    const handleHomePhoneChange = e => {

        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                const { name, value } = e.target;
                if ((e.target.value === '' || re.test(e.target.value))) {

                    var cleaned = ('' + e.target.value).replace(/\D/g, '')
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
                    if (match) {
                        var intlCode = (match[1] ? '+1 ' : ''),
                            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorPhoneLength: false
                        }));

                        return;
                    }

                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: false
                    }));
                }
            }

        }
        else
            e.preventDefault();

    }

    const handleRoomCountChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));


        if (state.roomDTOlst == null)
            state.roomDTOlst = [];
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNumberOfRooms: false
            }));

            setErrorMessages(prevState => ({
                ...prevState,
                errorDuplicateRooms: false
            }));
        }


        while (parseInt(e.target.value) != state.roomDTOlst.length) {

            if (parseInt(e.target.value) > state.roomDTOlst.length) {
                state.roomDTOlst.push({ roomID: 0, roomName: "" });
            }
            else if (parseInt(e.target.value) < state.roomDTOlst.length) {
                state.roomDTOlst.pop();
            }
            else break;
        }

    };

    const handleRoomChange = e => {


        state.roomDTOlst[parseInt(e.target.name)].roomName = e.target.value;

        let roomList = state.roomDTOlst;

        setState(prevState => ({
            ...prevState,
            roomDTOlst: roomList

        }));

    }

    const handleCheckPrimaryLocation = e => {

        if (!state.isPrimaryLocation) {
            // if (!window.confirm("Only one location can be set as primary, do you want to mark selected as primary."))
            //     return;

            ShowActionDialog(true, "Delete", "Only one location can be set as primary, do you want to mark selected as primary.", "confirm", function () {

                setState(prevState => ({
                    ...prevState,
                    isPrimaryLocation: !state.isPrimaryLocation
                }));
            })
        }
    }
    const [specializationList, setSpecializationList] = useState([]);
    const getSpecializationList = e => {
        var params = {
            code: "provider_specilizations",
            parameters: []
        }
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setSpecializationList(
                    result.data.map((item, i) => {
                        return { value: item.id, label: item.text1 };
                    }));
            }
        });
    }
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            entityId: parseInt(dataId),
            area: "Location",
            activity: "Load location details",
            details: "User viewed location detail screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        saveAuditLogInfo();
        getSpecializationList();
        if (dataId > 0 || dataId != "") {

            state.description = "";
            state.locationName = "";
            state.locationID = dataId;
            state.isPrimaryLocation = false;
            state.address = "";
            state.city = "";
            state.country = "";
            state.state = "";
            state.zip = "";
            state.phone = "";
            state.emailAddress = "";
            state.taxanomyCode = "";
            state.fax = "";
            state.timeZone = "";
            state.officeStartHours = "08:00";
            state.officeClosingHours = "17:00";
            state.numberOfRooms = "";
            state.roomDTOlst = [];
            state.officeTimeList = [];

            loadLocation();
        }
        else {

            setState({
                address: "", description: "", locationName: "", locationID: 0, isPrimaryLocation: false, city: "", country: "", state: "", zip: "", phone: "", emailAddress: "", taxanomyCode: "", fax: "", timeZone: "", officeStartHours: "08:00", officeClosingHours: "17:00", numberOfRooms: "",
                createDate: new Date().toISOString(), createdBy: 0, UpdatedBy: 0,
                roomDTOlst: [], officeTimeList: [],
                billingPracticeNpi: '',
                billingEin: '',
                billingUpin: '',
                billingMedicare: '',
                billingMedicad: '',
                billingCampus: ''
            });

        }

    }, []);


    function cleanValuesFields() {
        setState({
            address: "", description: "", locationName: "", locationID: 0, isPrimaryLocation: false, city: "", country: "", state: "", zip: "", phone: "", emailAddress: "", taxanomyCode: "", fax: "", timeZone: "", officeStartHours: "08:00", officeClosingHours: "17:00", numberOfRooms: "",
            roomDTOlst: [],
            billingPracticeNpi: '',
            billingEin: '',
            billingUpin: '',
            billingMedicare: '',
            billingMedicad: '',
            billingCampus: ''
        });


        setErrorMessages({
            errorLocName: false, errorAddress: false, errorEmail: false, errorStartHours: false, errorClosedHours: false, dateRangeError: false, errorNumberOfRooms: false, errorDuplicateRooms: false,
            errorPracticeNpi: false, errorPracticeNpiLength: false
        });
    }
    function checkRoom() {
        var room = false;
        for (var i = 0; i < state.roomDTOlst.length; i++) {
            if (state.roomDTOlst[i].roomName.trim() != "")
                room = true;
        }
        return room;
    }
    const [visible, setVisible] = useState(true)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 0) {
            setVisible(false)
        }
        else if (scrolled <= 0) {
            setVisible(true)
        }
    };
    window.addEventListener('scroll', toggleVisible);

    function setMoveToElementId(elementId) {
        if (errorMessages.moveToElementId.length <= 0) {
            errorMessages.moveToElementId = elementId;
        }
    }
    const Save = e => {
        errorMessages.moveToElementId = '';
        let errorList = []
        let temproomlst = []
        let result = false
        if (state.locationName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocName: true
            }));
            setMoveToElementId('locationName')
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLocName: false
            }));
        }

        if (state.officeClosingHours.trim() === "" || state.officeClosingHours === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorClosedHours: true
            }));
            errorList.push(true);
            // locationFormRef.closingHoursRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorClosedHours: false
            }));
        }

        if (state.officeStartHours.trim() > state.officeClosingHours.trim() || state.officeStartHours.trim() === state.officeClosingHours.trim()) {

            setErrorMessages(prevState => ({
                ...prevState,
                dateRangeError: true
            }));

            errorList.push(true);
            //locationFormRef.openingHoursRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                dateRangeError: false
            }));
        }

        if (state.officeStartHours.trim() === "" || state.officeStartHours === undefined) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorStartHours: true
            }));

            errorList.push(true);
            // locationFormRef.openingHoursRef.focus();

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorStartHours: false
            }));
        }

        if (state.address.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAddress: true
            }));
            setMoveToElementId('address')
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAddress: false
            }));

        }

        if (state.emailAddress && validateEmail(state.emailAddress.trim()) === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: false
            }));

        }

        if (state.phone != "" && state.phone != undefined && state.phone.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: false
            }));
        }

        if (state.fax != "" && state.fax != undefined && state.fax.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorFaxLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFaxLength: false
            }));
        }

        //NPI
        if (state.isPrimaryLocation && (!state.billingPracticeNpi || state.billingPracticeNpi.trim() == "")) {
            setErrorMessages(prevState => ({ ...prevState, errorPracticeNpi: true }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({ ...prevState, errorPracticeNpi: false }));
        }

        if (state.isPrimaryLocation && (state.billingPracticeNpi && state.billingPracticeNpi.trim() != "" && state.billingPracticeNpi.length < 10)) {
            setErrorMessages(prevState => ({ ...prevState, errorPracticeNpiLength: true }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({ ...prevState, errorPracticeNpiLength: false }));
        }

        const testRoomList = state.roomDTOlst.map((rm, key) => {
            if (key > 0) {
                let duplicateNameList = temproomlst.filter(tmprm => tmprm.roomName.trim() == rm.roomName.trim());
                temproomlst.push({ roomID: rm.rm, roomName: rm.roomName.trim() });
                if (duplicateNameList.length > 0) {
                    result = true;
                    return;
                }
            }
            else
                temproomlst.push({ roomID: rm.rm, roomName: rm.roomName.trim() });
        });

        if (state.roomDTOlst.length <= 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNumberOfRooms: true
            }));
            errorList.push(true);
            //window.scrollTo({
            //    top: document.documentElement.scrollHeight,
            //    behavior: 'smooth',
            //    block: 'start'
            //
            //});
            setMoveToElementId('numberOfRooms')
        }
        else {
            var room = checkRoom();
            setErrorMessages(prevState => ({
                ...prevState,
                errorNumberOfRooms: !room
            }));
            if (!room) {
                errorList.push(true);
                setMoveToElementId('numberOfRooms')
            }
        }

        if (result) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorDuplicateRooms: true
            }));
            errorList.push(true);
            setMoveToElementId('numberOfRooms')
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDuplicateRooms: false
            }));
        }

        validateOfficeTimeList(errorList);
        const element = document.getElementById(errorMessages.moveToElementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
        if (errorList.length < 1) {

            let method = "location/Addlocation";
            if (dataId > 0 || dataId != "")
                method = "location/updateLocation";
            setIsSaveLoading(true);
            PostDataAPI(method, state, true).then((result) => {
                setIsSaveLoading(false);
                if (result.success == true) {

                    setErrorMessages([]);
                    if (result.data.roomDTOlst == null) {
                        result.data.roomDTOlst = [];
                    }

                    if (result.data.officeTimeList == null) {
                        result.data.officeTimeList = [];
                    }

                    setState(result.data);

                    if (dataId < 1) {

                        showMessage("Success", "Location saved successfully.", "success", 3000);
                    }
                    else if (dataId > 0 || dataId != "") {
                        showMessage("Success", "Location updated successfully.", "success", 3000);
                    }
                    setDataId(
                        result.data.locationID
                    );
                    setIsPrimaryChecked(result.data.isPrimaryLocation);

                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })

        }
        else {
            e.preventDefault();

        }

    };
    const validateOfficeTimeList = (errorList) => {
        const lst = state.officeTimeList;
        var updatedList = [];
        if (state.officeTimeList && state.officeTimeList.length > 0 && state.officeTimeList.some(t => t.specializationId <= 0 && !t.isDeleted)) {

            updatedList = lst.map(t => t.specializationId <= 0 && !t.isDeleted ? { ...t, hasSpecError: true } : { ...t, hasSpecError: false });
            errorList.push(true);
        }
        else {
            if (lst && lst.length > 0) {
                updatedList = lst.map(t => { return { ...t, hasSpecError: false } });
            }

        }
        if (state.officeTimeList && state.officeTimeList.length > 0 && state.officeTimeList.some(t => t.openingHours.split(':')[0] > t.closingHours.split(':')[0] && !t.isDeleted)) {

            updatedList = updatedList.map(t => t.specializationId <= 0 && !t.isDeleted ? { ...t, hasComparisonError: true } : { ...t, hasComparisonError: false });
            errorList.push(true);
        }
        else {
            if (updatedList && updatedList.length > 0) {
                updatedList = updatedList.map(t => { return { ...t, hasComparisonError: false } });
            }

        }
        setState(prevState => ({
            ...prevState,
            ['officeTimeList']: updatedList
        }));
    }
    function DeleteLocation() {

        ShowActionDialog(true, "Delete", "Are you sure, you want to delete “" + state.locationName + "”?", "confirm", function () {
            state.locationID = dataId.dataId ? dataId.dataId : dataId;
            state.roomDTOlst = [];
            let method = "location/deleteLocation";
            setIsDeleteLoading(true);
            PostDataAPI(method, state, true).then((result) => {
                setIsDeleteLoading(false);

                if (result.success == true) {
                    showMessage("Success", "Location deleted successfully.", "success", 3000); setTimeout(() => { BackToLocation(); }, 2000);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }

    function ClearFormValues() {

        if (dataId > 0 || dataId != "") {
            state.description = "";
            state.locationName = "";
            state.locationID = dataId.dataId ? dataId.dataId : dataId;
            state.isPrimaryLocation = false;
            state.address = "";
            state.city = "";
            state.country = "";
            state.state = "";
            state.zip = "";
            state.phone = "";
            state.emailAddress = "";
            state.taxanomyCode = "";
            state.fax = "";
            state.timeZone = "";
            state.officeStartHours = "08:00";
            state.officeClosingHours = "17:00";
            state.numberOfRooms = "";
            // cleanValuesFields();
            state.roomDTOlst = [];
            //document.getElementById("location-form").reset();
            loadLocation();
            setErrorMessages({
                errorNumberOfRooms: false, errorDuplicateRooms: false
            });
        }
        else {

            //document.getElementById("location-form").reset();
            cleanValuesFields();

        }

    }

    function loadLocation() {

        PostDataAPI("location/GetLocation", dataId.dataId ? dataId.dataId : dataId).then((result) => {


            if (result.success && result.data != null) {
                // Set data Here

                var obj = { Room1: "", Room2: "", Room3: "", Room4: "", Room5: "", Room6: "", Room7: "", Room8: "", Room9: "", Room10: "", Room11: "", Room12: "", Room13: "", Room14: "", Room15: "" };
                if (result.data.roomDTOlst == null) {
                    result.data.roomDTOlst = [];
                }

                if (result.data.officeTimeList == null) {
                    result.data.officeTimeList = [];
                }

                setState({

                    description: result.data.description,
                    locationName: result.data.locationName,
                    locationID: result.data.locationID,
                    isPrimaryLocation: result.data.isPrimaryLocation,
                    address: result.data.address,
                    city: result.data.city,
                    country: result.data.country,
                    state: result.data.state,
                    zip: result.data.zip,
                    phone: result.data.phone,
                    emailAddress: result.data.emailAddress,
                    taxanomyCode: result.data.taxanomyCode,
                    fax: result.data.fax,
                    timeZone: result.data.timeZone,
                    officeStartHours: result.data.officeStartHours,
                    officeClosingHours: result.data.officeClosingHours,
                    numberOfRooms: result.data.roomDTOlst.length.toString(),
                    createDate: result.data.createDate,
                    createdBy: result.data.createdBy,
                    updatedBy: result.data.updatedBy,

                    roomDTOlst: result.data.roomDTOlst,
                    officeTimeList: result.data.officeTimeList,
                    billingPracticeNpi: result.data.billingPracticeNpi,
                    billingEin: result.data.billingEin,
                    billingUpin: result.data.billingUpin,
                    billingMedicare: result.data.billingMedicare,
                    billingMedicad: result.data.billingMedicad,
                    billingCampus: result.data.billingCampus,

                });


                setpreviousLocState({
                    previousLocation: result.data.locationName
                });

                setIsPrimaryChecked(result.data.isPrimaryLocation);
            }
        })

    }

    function validateEmail(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase())
        } else { return false; }
    }

    function BackToLocation() {
        document.getElementById("btnIdGetLocations").click();
    }

    function validateStartClosingHours() {
        let status = true;
        if (state.officeStartHours > state.officeClosingHours && state.officeStartHours != '' && state.officeClosingHours != '')
            status = false;
        return status;
    }

    const OpenCloseLogDialog = (statedialog) => {
        setLogDialogState(statedialog)
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
    return (
        <>
            <ShadowBox shadowSize={3} >
                {/* <form id="location-form" Save={Save}> */}
                <Grid container >
                    <FormGroupTitle>Location Details</FormGroupTitle>
                    <Grid item lg={12} container direction="row">

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}>
                                <FormLabel className={classes.lableInput}>Location Name<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}
                        <Label title="Location Name" mandatory={true} size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBaseField
                                id="locationName"
                                placeholder="Location Name"
                                onChange={handleChange}
                                type="text"
                                name="locationName"
                                value={state.locationName}
                                MaxLength="100"
                            //inputProps={{ ref: input => locationFormRef.locationNameRef = input }}

                            />
                            {errorMessages.errorLocName && !state.locationName.trim() != "" ? (<ErrorMessage>
                                Please enter location name
                            </ErrorMessage>) : ('')}
                        </Grid>

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}>
                                <FormLabel className={classes.lableInput}>Primary Location:</FormLabel>
                            </Grid> */}
                        <Label title="Primary Location" size={2} />
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <CheckboxField
                                id="primaryLocation"
                                color="primary"
                                onChange={handleCheckPrimaryLocation}
                                name="isPrimaryLocation"
                                checked={state.isPrimaryLocation}
                                disabled={isPrimaryChecked}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}
                            container
                            direction="row">

                            {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}>
                                    <FormLabel className={classes.lableTextarea}>Description:</FormLabel>
                                </Grid> */}
                            <Label title="Description" isTextAreaInput={true} size={2} />

                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <TextareaField
                                    id="description"
                                    rowsMin={5}
                                    placeholder="Description"
                                    onChange={handleChange}
                                    name="description"
                                    value={state.description}
                                    MaxLength='2000'
                                />
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item lg={12} container direction="row">
                        <Grid item xs={12} sm={12} md={12} lg={12} container direction="row"
                        >
                            <Grid item container direction="row" xs={12} sm={6} md={6} lg={6}>
                                {/* <Grid item xs={12} sm={4} md={4} lg={4}
                                        container
                                        direction="row"
                                        className={classes.labelAlign}>
                                        <FormLabel className={classes.lableInput}>Address<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                                    </Grid> */}
                                <Label title="Address" isTextAreaInput={true} mandatory={true} size={4} />

                                <Grid item xs={12} sm={8} md={8} lg={6} >
                                    <TextareaField
                                        id="address"
                                        rowsMin={5}
                                        placeholder="Address"
                                        onChange={handleChange}
                                        name="address"
                                        value={state.address}
                                        MaxLength="2000"
                                    />
                                    {errorMessages.errorAddress && !state.address.trim() != "" ? (<ErrorMessage textArea={true}>
                                        Please enter address
                                    </ErrorMessage>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" display="contents" xs={12} sm={6} md={6} lg={6}>
                                <Grid item xs={12} sm={4} md={4} lg={2}
                                    container
                                    direction="column"
                                    className={classes.ResponsivelabelAlign} >
                                    <FormLabel className={classes.CitylableInput}>City:</FormLabel>
                                    <FormLabel className={classes.stateLabelInput}>State:</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8} md={8} lg={6} >
                                    <InputBase
                                        id="city"
                                        className={classes.citybaseInput}
                                        placeholder="City"
                                        onChange={handleChange}
                                        name="city"
                                        value={state.city}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                    <SelectField
                                        id="state"
                                        id="select"
                                        name="state"
                                        placeholder="Select State"
                                        value={state.state}
                                        onChange={handleChange}
                                        options={USAStateListOptions} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}
                            container
                            direction="row">

                            {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}  >
                                    <FormLabel className={classes.lableInput}>Zip:</FormLabel>
                                </Grid> */}
                            <Label title="Zip" size={2} />

                            <Grid item xs={12} sm={4} md={4} lg={3}>

                                <InputBaseField
                                    id="zipCode"
                                    placeholder="Zip Code"
                                    onChange={handleZipChange}
                                    //type="Number"
                                    name="zip"
                                    value={state.zip}
                                    MaxLength="5"
                                />

                            </Grid>


                            {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}  >
                                    <FormLabel className={classes.lableInput}>Country:</FormLabel>
                                </Grid> */}
                            <Label title="Country" size={2} />

                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <NativeSelect
                                    id="country"
                                    id="country"
                                    name="country"
                                    onChange={handleChange}
                                    value={state.country}
                                    disableUnderline
                                    className={classes.baseInput}>
                                    <option value="USA">USA</option>
                                </NativeSelect>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}
                        container
                        direction="row">

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">
                                <FormLabel className={classes.lableInput}>Cell #:</FormLabel>
                            </Grid> */}
                        <Label title="Cell #" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <InputBaseField
                                id="phone"
                                placeholder="(863) 993-2966"
                                onChange={handleHomePhoneChange}
                                name="phone"
                                value={state.phone}
                                MaxLength="14"
                            />
                            {errorMessages.errorPhoneLength && state.phone != "" ? (<ErrorMessage>
                                The Cell number is invalid
                            </ErrorMessage>) : ('')}

                        </Grid>
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-start">
                                <FormLabel className={classes.lableInput}>Fax:</FormLabel>
                            </Grid> */}
                        <Label title="Fax" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >

                            <InputBaseField
                                id="fax"
                                placeholder="(863) 993-2966"
                                onChange={handleFaxChange}
                                name="fax"
                                value={state.fax}
                                MaxLength="14"
                            />
                            {errorMessages.errorFaxLength && state.fax != "" ? (<ErrorMessage>
                                The fax number is invalid
                            </ErrorMessage>) : ('')}

                        </Grid>


                        <Grid item xs={12} sm={12} md={12} lg={12}
                            container
                            direction="row">

                            {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}>
                                    <FormLabel className={classes.lableInput}>Email:</FormLabel>
                                </Grid> */}
                            <Label title="Email" size={2} />

                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <InputBaseField
                                    id="email"
                                    // className={classes.baseInput}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    name="emailAddress"
                                    value={state.emailAddress}
                                    inputProps={{ maxLength: 255 }}

                                />
                                {errorMessages.errorEmail && !validateEmail(state.emailAddress) ? (<ErrorMessage>
                                    Please enter valid email
                                </ErrorMessage>) : ('')}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">

                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">
                                <FormLabel className={classes.lableInput}>Time Zone:</FormLabel>
                            </Grid> */}
                        <Label title="Time Zone" size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <NativeSelect id="select" name="timeZone" inputProps={{ maxLength: 32 }}
                                onChange={handleChange} value={state.timeZone}
                                disableUnderline className={classes.baseInput}>
                                <option value="HAT">Hawaii Time</option>
                                <option value="AST">Alaska Time</option>
                                <option value="PT">Pacific Time</option>
                                <option value="MT"> Mountain Time</option>
                                <option value="CT">Central Time</option>
                                <option value="ET">Eastern Time</option>
                            </NativeSelect>
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">
                                <FormLabel className={classes.lableInput}>Opening Hours<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}

                        <Label title="Opening Hours" mandatory={true} size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBase
                                id="officeOpeningHours"
                                className={classes.baseInput}
                                placeholder="Office Opening Hours"
                                onChange={handleChange}
                                name="officeStartHours"
                                value={state.officeStartHours}
                                inputProps={{ maxLength: 50 }}
                                type="time"
                            // inputProps={{ ref: input => locationFormRef.openingHoursRef = input }}
                            />
                            {errorMessages.errorStartHours && !state.officeStartHours ? (<ErrorMessage>
                                Please enter opening hours
                            </ErrorMessage>) : ('')}



                        </Grid>
                        {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">
                                <FormLabel className={classes.lableInput}>Closing Hours<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                            </Grid> */}
                        <Label title="Closing Hours" mandatory={true} size={2} />

                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            <InputBase
                                id="officeClosingHours"
                                className={classes.baseInput}
                                placeholder="Office Closing Hours"
                                onChange={handleChange}
                                name="officeClosingHours"
                                value={state.officeClosingHours}
                                inputProps={{ maxLength: 50 }}
                                type="time"
                            // inputProps={{ ref: input => locationFormRef.closingHoursRef = input }}
                            />
                            {errorMessages.errorClosedHours && !state.officeClosingHours ? (<ErrorMessage>
                                Please enter closing hours
                            </ErrorMessage>) : ('')}


                            {errorMessages.dateRangeError ?
                                (<ErrorMessage>
                                    Closing must be greater then opening hours
                                </ErrorMessage>) : ('')}

                        </Grid>



                    </Grid>

                    <Grid item lg={12} container direction="row">
                        <Grid item xs={12} sm={2} md={2} lg={2}
                            container
                            direction="row"
                            className={classes.labelAlign}
                            alignItems="flex-end">

                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3} >
                            {errorMessages.dateRangeError && !validateStartClosingHours() ?
                                (<ErrorMessage>
                                    Opening hours cannot be later then closing hours
                                </ErrorMessage>) : ('')}
                        </Grid>
                    </Grid>

                    <Grid item lg={12} container direction="row">
                        <FormGroupTitle>Speciality wise Timings</FormGroupTitle>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />


                        <Grid item container direction="row" lg={12} >

                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />

                            <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                                <FormLabel className={classes.officeTimingLabel}>Speciality:</FormLabel>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />

                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <FormLabel className={classes.officeTimingLabel}>Opening Hours:</FormLabel>

                                    </Grid>
                                    <Grid item xs={1} sm={1} md={1} lg={1} />
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <FormLabel className={classes.officeTimingLabel}>Closing Hours:</FormLabel>

                                    </Grid>

                                </Grid>

                            </Grid>

                        </Grid>
                        {
                            state.officeTimeList ?
                                state.officeTimeList.map((item, i) => (
                                    !item.isDeleted ?

                                        <Grid key={i} container item direction="row" lg={12} >
                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
                                            <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                                                <SelectField
                                                    id="specializationId"
                                                    name="specialization"
                                                    value={item.specializationId}
                                                    onChange={(e) => handleOfficeTimingSpecialicationChange(e, i)}
                                                    placeholder="Select Speciality"
                                                    options={specializationList}
                                                />
                                                {
                                                    item.hasSpecError && item.specializationId <= 0 && !item.isDeleted ? (<ErrorMessage>
                                                        Please select speciality.
                                                    </ErrorMessage>) : ('')
                                                }
                                            </Grid>

                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>

                                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                                        <InputBaseField
                                                            type="time"
                                                            id="openingHours"
                                                            name="openingHours"
                                                            value={item.openingHours}
                                                            onChange={(e) => handleOfficeTimingInputChange(e, i)}
                                                        />

                                                    </Grid>

                                                    <Grid item xs={1} sm={1} md={1} lg={1} />

                                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                                        <InputBaseField
                                                            type="time"
                                                            id="closingHours"
                                                            name="closingHours"
                                                            value={item.closingHours}
                                                            onChange={(e) => handleOfficeTimingInputChange(e, i)}
                                                        />

                                                    </Grid>

                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        <img
                                                            src={DeleteIcon}
                                                            alt="delete"
                                                            className={classes.officeTimeDeleteIcon}
                                                            onClick={() => handleOfficeTimingRemoveClick(i)}
                                                        />
                                                    </Grid>
                                                    <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        {
                                                            item.hasComparisonError && item.openingHours.split(':')[0] > item.closingHours.split(':')[0] && !item.isDeleted ? (<ErrorMessage>
                                                                Closing hours can not be earlier than opening hours.
                                                            </ErrorMessage>) : ('')
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                        : null

                                )) : null
                        }
                        <Grid container item direction="row" lg={12} >

                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />

                            <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                                <span
                                    className={classes.addOfficeTimeLabel}
                                    title="Add speciality wise timing"
                                    onClick={handleOfficeTimingAddClick} >
                                    <img
                                        src={AddIcon}
                                        alt="Add speciality wise timing"
                                        onClick={handleOfficeTimingAddClick} />
                                    Add speciality wise timing
                                </span>
                            </Grid>
                            <Grid item xs={6} sm={6} md={7} lg={7} xl={7} />

                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <FormGroupTitle>Billing Details</FormGroupTitle>

                        <Grid container direction="row">
                            <Label title="Practice NPI" mandatory={state.isPrimaryLocation} size={2} />
                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                <InputBaseField
                                    id="billingPracticeNpi"
                                    name="billingPracticeNpi"
                                    value={state.billingPracticeNpi}
                                    onChange={handleChange}
                                    placeholder="Practice NPI"
                                    maxLength="10"
                                    inputProps={{ maxLength: 10 }}
                                />
                                {
                                    errorMessages.errorPracticeNpi && (!state.billingPracticeNpi || state.billingPracticeNpi.trim() == "") ? (<ErrorMessage>
                                        Please enter practice NPI
                                    </ErrorMessage>) : ('')
                                }
                                {
                                    errorMessages.errorPracticeNpiLength && (state.billingPracticeNpi.trim().length < 10) ? (<ErrorMessage>
                                        NPI must be 10 digits
                                    </ErrorMessage>) : ('')
                                }

                            </Grid>

                            <Label title="EIN" size={2} />

                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Grid container >

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <InputBaseField
                                            placeholder="Ein"
                                            id="billingEin"
                                            name="billingEin"
                                            value={state.billingEin}
                                            onChange={handleChange}
                                            maxLength="9"
                                            inputProps={{ maxLength: 9 }}
                                        />

                                    </Grid>

                                    <Label title="UPIN" size={3} />

                                    <Grid item xs={4} sm={3} md={3} lg={3}>
                                        <InputBaseField
                                            placeholder="Upin"
                                            id="billingUpin"
                                            name="billingUpin"
                                            value={state.billingUpin}
                                            onChange={handleChange}
                                            maxLength="9"
                                            inputProps={{ maxLength: 9 }}
                                        />

                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid container direction="row">
                            <Label title="Medicare" size={2} />
                            <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                <InputBaseField
                                    id="billingMedicare"
                                    name="billingMedicare"
                                    value={state.billingMedicare}
                                    onChange={handleChange}
                                    placeholder="Medicare"
                                    maxLength="50"
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={1} md={1} lg={1} xl={1} />

                            <Label title="Medicaid" size={2} />

                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Grid container >

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <InputBaseField
                                            placeholder="Medicaid"
                                            id="billingMedicad"
                                            name="billingMedicad"
                                            value={state.billingMedicad}
                                            onChange={handleChange}
                                            maxLength="9"
                                            inputProps={{ maxLength: 9 }}
                                        />

                                    </Grid>

                                    <Label title="Campus" size={3} />

                                    <Grid item xs={4} sm={3} md={3} lg={3}>
                                        <InputBaseField
                                            placeholder="Campus"
                                            id="billingCampus"
                                            name="billingCampus"
                                            value={state.billingCampus}
                                            onChange={handleChange}
                                            maxLength="9"
                                            inputProps={{ maxLength: 9 }}
                                        />

                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                    </Grid>

                    <Grid item lg={12} container direction="row">
                        <FormGroupTitle>Rooms</FormGroupTitle>
                        <Grid item lg={12} container direction="row">

                            {/* <Grid item xs={12} sm={2} md={2} lg={2}
                                    container
                                    direction="row"
                                    className={classes.labelAlign}>
                                    <FormLabel className={classes.lableInput}>Number of Exam Rooms<FormLabel className={classes.mandatorColor}>*</FormLabel>:</FormLabel>
                                </Grid> */}
                            <Label title="Number of Exam Rooms" mandatory={true} size={2} />
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                <NativeSelect
                                    id="numberOfRooms"
                                    onChange={handleRoomCountChange}
                                    name="numberOfRooms"
                                    value={state.numberOfRooms}
                                    disableUnderline
                                    className={classes.baseInput}
                                // inputProps={{ ref: input => locationFormRef.examRoomsRef = input }}
                                >
                                    <option value="0">Select No. of Exam Rooms</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                </NativeSelect>
                                {errorMessages.errorNumberOfRooms && !checkRoom() ? (<ErrorMessage>
                                    At least one exam room must exist
                                </ErrorMessage>) : ('')}


                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={3}
                                container
                            >
                                {/*<FormLabel className={classes.lableText}>Select Number  of rooms to add Exam rooms</FormLabel>*/}
                            </Grid>


                        </Grid>

                        {
                            state.roomDTOlst ?

                                state.roomDTOlst.map((item, i) => (
                                    <Grid key={i} item lg={12}
                                        container
                                        direction="row">
                                        <Grid item xs={12} sm={2} md={2} lg={2}
                                            container
                                            direction="row"
                                            className={classes.labelAlign}
                                            alignItems="flex-end">

                                        </Grid>
                                        <Grid item xs={12} sm={4} md={4} lg={3}>
                                            <InputBase
                                                className={classes.baseInput}
                                                placeholder={"Exam room " + (1 + i)}
                                                onChange={handleRoomChange}
                                                name={i.toString()}
                                                value={state.roomDTOlst[i].roomName}
                                                inputProps={{ maxLength: 255 }}
                                            />
                                        </Grid>
                                    </Grid>
                                ))
                                : null
                        }

                        <Grid item lg={12} container direction="row">
                            <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end">

                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={3} >
                                {errorMessages.errorDuplicateRooms ?
                                    (<ErrorMessage>
                                        Rooms have duplicate name.
                                    </ErrorMessage>) : ('')}
                            </Grid>
                        </Grid>


                        <Grid item lg={12}
                            container
                            direction="row">
                            <Grid item xs={12} sm={2} md={2} lg={2}
                                container
                                direction="row"
                                className={classes.labelAlign}
                                alignItems="flex-end"
                            >

                            </Grid>
                            <LogDialog
                                code="location"
                                id={dataId}
                                dialogOpenClose={logdialogstate}
                                onClose={(dialogstate) => setLogDialogState(dialogstate)}
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

                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <FooterBtn className={classes.footerBtn}>

                                    {
                                        isSaveLoading ?
                                            <FormBtn id={"loadingSave"} size="medium">Save</FormBtn>

                                            : <FormBtn id={"save"} onClick={Save} size="medium" disabled={!isFormEditable}>Save</FormBtn>

                                    }
                                    {dataId != 0 ?
                                        state.isPrimaryLocation == true ? null :
                                            isDeleteLoading ?
                                                <FormBtn id={"loadingDelete"} size="medium">Delete</FormBtn>
                                                : <FormBtn id={"delete"} onClick={DeleteLocation}
                                                    size="medium" disabled={!isFormEditable}>Delete</FormBtn>

                                        : null
                                    }
                                    <FormBtn id={"resetBtn"} onClick={ClearFormValues} size="medium" >Reset </FormBtn>

                                    {dataId != 0 ?
                                        <FormBtn id={"save"} onClick={() => setLogDialogState(true)} size="medium" btnType="logs" >Logs</FormBtn>
                                        : null
                                    }

                                </FooterBtn>
                            </Grid>
                        </Grid>
                    </Grid>



                </Grid>

                {/* </form> */}
            </ShadowBox>

        </>
    );
}

export default withSnackbar(LocationForm)
