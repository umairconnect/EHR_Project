
//import * as configData from "../Configuration/config.json";
import { GetUserInfo } from "./GetUserInfo";
// import {PROGRESS_BAR_STATE} from '../redux/actions/' 
import axios from 'axios';

//ReduxPart

import store from '../redux/store';
import { selectProgressBarState } from '../redux/actions/progressBarAction';


function PostDataAPI(methodName, apiData, userInfo, type) {

    //let baseUrl = configData.default.ApiUrl;
    let baseUrl = sessionStorage.getItem('server_api_url');
    let token = sessionStorage.getItem('auth_token');


    if (userInfo == true) {

        let user_info = JSON.parse(GetUserInfo());

        if (type == "formData")
            apiData.append("encUserID", user_info.user.userID); // apiData.append("userInfo", JSON.stringify( user_info.user))
        else
            apiData.encUserID = user_info.user.userID;
    }

    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
        store.dispatch(selectProgressBarState(true));
        axios.post(baseUrl + methodName, apiData, {
            headers: headers
        })
            .then((response) => {
                resolve(response.data);
                store.dispatch(selectProgressBarState(false));
            })
            .catch((error) => {
                reject(error);
                store.dispatch(selectProgressBarState(false));
            })
    });
}


function PutDataAPI(methodName, apiData, userInfo, type) {

    //let baseUrl = configData.default.ApiUrl;
    let baseUrl = sessionStorage.getItem('server_api_url');
    let token = sessionStorage.getItem('auth_token');


    if (userInfo == true) {

        let user_info = JSON.parse(GetUserInfo());

        if (type == "formData")
            apiData.append("encUserID", user_info.user.userID); // apiData.append("userInfo", JSON.stringify( user_info.user))
        else
            apiData.encUserID = user_info.user.userID;
    }

    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
        store.dispatch(selectProgressBarState(true));
        axios.put(baseUrl + methodName, apiData, {
            headers: headers
        })
            .then((response) => {
                resolve(response.data);
                store.dispatch(selectProgressBarState(false));
            })
            .catch((error) => {
                reject(error);
                store.dispatch(selectProgressBarState(false));
            })
    });
}

function DeleteDataAPI(methodName, apiData, userInfo, type) {

    //let baseUrl = configData.default.ApiUrl;
    let baseUrl = sessionStorage.getItem('server_api_url');
    let token = sessionStorage.getItem('auth_token');


    if (userInfo == true) {

        let user_info = JSON.parse(GetUserInfo());
        if (type == "formData")
            apiData.append("encUserID", user_info.user.userID); // apiData.append("userInfo", JSON.stringify( user_info.user))
        else
            apiData.encUserID = user_info.user.userID;
    }

    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
        store.dispatch(selectProgressBarState(true));
        axios.delete(baseUrl + methodName, { data: apiData }, {
            headers: headers
        })
            .then((response) => {
                resolve(response.data);
                store.dispatch(selectProgressBarState(false));
            })
            .catch((error) => {
                reject(error);
                store.dispatch(selectProgressBarState(false));
            })
    });
}

function GetDataAPI(methodName, apiParams) {

    //let baseUrl = configData.default.ApiUrl;
    let baseUrl = sessionStorage.getItem('server_api_url');
    let token = sessionStorage.getItem('auth_token');
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
        store.dispatch(selectProgressBarState(true));
        let url = baseUrl + methodName;
        if (apiParams != null && apiParams != '')
            url += "?" + apiParams
        axios.get(url, {
            headers: headers
        })
            .then((response) => {
                resolve(response.data);
                store.dispatch(selectProgressBarState(false));
            })
            .catch((error) => {
                reject(error);
                store.dispatch(selectProgressBarState(false));
            })
    });
}

function PostExternalAPI(path, apiData) {


    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' 
    }

    return new Promise((resolve, reject) => {
        store.dispatch(selectProgressBarState(true));
        axios.post(path, apiData, {
            headers: headers
        })
            .then((response) => {
                resolve(response.data);
                store.dispatch(selectProgressBarState(false));
            })
            .catch((error) => {
                reject(error);
                store.dispatch(selectProgressBarState(false));
            })
    });
}

function GetExternalAPI(path, apiParams) {

    
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' 
    }

    return new Promise((resolve, reject) => {
        store.dispatch(selectProgressBarState(true));
        let url = path;
        if (apiParams != null && apiParams != '')
            url += "?" + apiParams
        axios.get(url, {
            headers: headers
        })
            .then((response) => {
                resolve(response.data);
                store.dispatch(selectProgressBarState(false));
            })
            .catch((error) => {
                reject(error);
                store.dispatch(selectProgressBarState(false));
            })
    });
}

export { PostDataAPI, GetDataAPI, DeleteDataAPI, PutDataAPI, GetExternalAPI, PostExternalAPI};