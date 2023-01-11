
//import * as configData from "../Configuration/config.json";
import { GetUserInfo } from "./GetUserInfo";
import axios from 'axios';
//ReduxPart

import store from '../redux/store';
import { selectProgressBarState } from '../redux/actions/progressBarAction';

export function DeleteDataAPI(methodName, apiData, userInfo, type) {

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