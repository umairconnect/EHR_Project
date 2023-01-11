import moment from 'moment';
import { GetUserRolesRights } from '../../Services/GetUserRolesRights';
import { GetUserInfo } from '../../Services/GetUserInfo';
import { UserRoleRights } from "../../context/StaticDropDowns";


function getModulePermissionByRole(_role) {
    let user_role_rights_list = JSON.parse(GetUserRolesRights());
    let isEditable = false;
    if (user_role_rights_list) {
        let _isEditable = user_role_rights_list.filter(objRights => objRights.rightName == _role && objRights.permissionCode == UserRoleRights.Editable);
        if (_isEditable != null && _isEditable.length > 0) {
            isEditable = true;
        }
    }
    return isEditable;
}

function formatDate(strDate) {
    if (!strDate)
        return '';
    else
        return String((new Date(strDate).getMonth() + 1)).padStart(2, '0') + '/' + String(new Date(strDate).getDate()).padStart(2, '0') + '/' + new Date(strDate).getFullYear();
}
function formatDateTime(strDate) {
    if (!strDate)
        return '';
    else {
        var time = moment(strDate).format('hh:mm A');
        return String((new Date(strDate).getMonth() + 1)).padStart(2, '0') + '/' + String(new Date(strDate).getDate()).padStart(2, '0') + '/' + new Date(strDate).getFullYear() + ' ' + (time ? time : '');
    }
}

function formatDateTime2(strDate) {
    if (!strDate)
        return '';
    else {
        var time = moment(strDate).format('hh:mm A');
        return String((new Date(strDate).getMonth() + 1)).padStart(2, '0') + '/' + String(new Date(strDate).getDate()).padStart(2, '0') + '/' + new Date(strDate).getFullYear() + (time ? ' | ' + time : '');
    }
}

function formatTime(strDate) {
    if (!strDate)
        return '';
    else
        return moment(strDate).format('hh:mm a');
}
function formatTimeFull(strDate) {
    if (!strDate)
        return '';
    else
        return moment(strDate).format('hh:mm');
}
function formatCurrency(x) {
    if (x)
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    else return '0.00';
}
function formatNumber(number) {
    var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;

    //var unitlist = ["", "K", "M", "G"];
    //
    //let sign = Math.sign(number);
    //let unit = 0;
    //
    //while (Math.abs(number) > 1000) {
    //    unit = unit + 1;
    //    number = Math.floor(Math.abs(number) / 100) / 10;
    //}
    //console.log(sign * Math.abs(number) + unitlist[unit]);
    //return sign * Math.abs(number) + unitlist[unit];
}
function validateEmail(email) {
    let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    if (re.test(String(email).toLowerCase())) {
        re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return re.test(String(email).toLowerCase())
    } else { return false; }
}
function getAgeByDOBInYears(birthDate) {

    var result = '';
    if (birthDate.trim() != '' && birthDate != undefined) {

        var mdate = birthDate;
        var yearThen = parseInt(mdate.substring(0, 4), 10);
        var monthThen = parseInt(mdate.substring(5, 7), 10);
        var dayThen = parseInt(mdate.substring(8, 10), 10);

        var today = new Date();
        var birthday = new Date(yearThen, monthThen - 1, dayThen);
        var differenceInMilisecond = today.valueOf() - birthday.valueOf();

        var year_age = Math.floor(differenceInMilisecond / 31536000000);

        if (isNaN(year_age))
            result = '';
        else if (year_age > 0)
            result = year_age + " yrs";

    }
    return result;
}

function toDayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function getAgeByDOB(birthDate) {
    var result = '';
    if (birthDate.trim() != '' && birthDate != undefined) {

        var mdate = birthDate;
        var yearThen = parseInt(mdate.substring(0, 4), 10);
        var monthThen = parseInt(mdate.substring(5, 7), 10);
        var dayThen = parseInt(mdate.substring(8, 10), 10);

        var today = new Date();
        var birthday = new Date(yearThen, monthThen - 1, dayThen);
        var differenceInMilisecond = today.valueOf() - birthday.valueOf();

        var year_age = Math.floor(differenceInMilisecond / 31536000000);
        var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
        var month_age = Math.floor(day_age / 30);
        day_age = day_age % 30;


        if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age))
            result = '';
        else if (year_age > 0)
            result = year_age + ' years, ' + month_age + (month_age > 1 ? ' months, ' : ' month, ') + day_age + (day_age > 1 ? ' days' : ' day');
        else if (year_age === 0 && month_age > 0)
            result = month_age + (month_age > 1 ? ' months, ' : ' month, ') + day_age + (day_age > 1 ? ' days' : ' day');
        else if (year_age > 0 && month_age === 0)
            result = year_age + (year_age > 1 ? ' years, ' : ' year,') + day_age + (day_age > 1 ? ' days' : ' day');
        else if (day_age === 0)
            result = '';
        else
            result = day_age + (day_age > 1 ? ' days' : ' day');
    }
    return result;
}


function getFormatedDate(_date, _formate) {
    return moment(_date).format(_formate)
}

function getFormatedTemplateDetails(txtToAdd, patientDetails) {
    var array = [];
    if (patientDetails.address != null) {
        array.push(patientDetails.address);
    }
    if (patientDetails.city != null) {
        array.push(patientDetails.city);
    }
    if (patientDetails.state != null) {
        array.push(patientDetails.state);
    }
    if (patientDetails.countyCode != null) {
        array.push(patientDetails.countyCode);
    }
    if (patientDetails.country != null) {
        array.push(patientDetails.country);
    }
    var formatedValue = array.join(", ");
    return txtToAdd.
        replaceAll('[Patient Name]', patientDetails.name != null ? patientDetails.name : '').
        replaceAll('[Age]', patientDetails.birthDate != null ? getAgeByDOB(patientDetails.birthDate) : '').
        replaceAll('[Date of Birth]', patientDetails.birthDate != null ? getFormatedDate(patientDetails.birthDate, 'MM/DD/YYYY') : '').
        replaceAll('[Date of birth]', patientDetails.birthDate != null ? getFormatedDate(patientDetails.birthDate, 'MM/DD/YYYY') : '').
        replaceAll('[Phone]', patientDetails.cellPhone != null ? patientDetails.cellPhone : '').
        replaceAll('[Address]', formatedValue != null ? formatedValue : '').replaceAll('<p>', '').replaceAll('</p>', '').trim();
}

function getFormatedTemplateDetailChiefComplaint(txtToAdd, patientDetails) {
    var array = [];
    if (patientDetails.address != null) {
        array.push(patientDetails.address);
    }
    if (patientDetails.city != null) {
        array.push(patientDetails.city);
    }
    if (patientDetails.state != null) {
        array.push(patientDetails.state);
    }
    if (patientDetails.countyCode != null) {
        array.push(patientDetails.countyCode);
    }
    if (patientDetails.country != null) {
        array.push(patientDetails.country);
    }
    var formatedValue = array.join(", ");
    return txtToAdd.
        replaceAll('[Patient Name]', patientDetails.name != null ? patientDetails.name : '').
        replaceAll('[Age]', patientDetails.birthDate != null ? getAgeByDOB(patientDetails.birthDate) : '').
        replaceAll('[Date of Birth]', patientDetails.birthDate != null ? getFormatedDate(patientDetails.birthDate, 'MM/DD/YYYY') : '').
        replaceAll('[Date of birth]', patientDetails.birthDate != null ? getFormatedDate(patientDetails.birthDate, 'MM/DD/YYYY') : '').
        replaceAll('[Phone]', patientDetails.cellPhone != null ? patientDetails.cellPhone : '').
        replaceAll('[Address]', formatedValue != null ? formatedValue : '').trim();
}


function numberFormat(x) {
    return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}


const validDate = (date) => {
    let minimumDate = new Date('1753-01-01');
    let maximumDate = new Date('9999-12-31');
    let actualDate = new Date(date);
    if (actualDate.valueOf() < minimumDate.valueOf() || actualDate.valueOf() > maximumDate.valueOf()) {
        return true
    } else {
        return false
    }
}
const todayDate = () => {
    return new Date().getFullYear() + '-' + String((new Date().getMonth() + 1)).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');
}

const printReport = (reportUrl, parameters) => {
    var uniqV = '&rs:v=' + (new Date()).getTime();
    let userInfo = JSON.parse(GetUserInfo()).user;
    var _url = userInfo.reportServerUser + reportUrl + parameters + uniqV;
    console.log(_url);
    window.open(_url, '_blank', 'noopener,noreferrer');
}
export {
    formatDate,
    formatTime,
    formatTimeFull,
    formatCurrency,
    formatNumber,
    numberFormat,
    validateEmail,
    toDayDate,
    getAgeByDOB,
    getFormatedTemplateDetails,
    getFormatedTemplateDetailChiefComplaint,
    formatDateTime,
    getFormatedDate,
    formatDateTime2,
    getModulePermissionByRole,
    validDate,
    todayDate, printReport
}