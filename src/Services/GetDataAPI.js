
//import * as configData from "../Configuration/config.json";
import axios from 'axios';
//ReduxPart

import store from '../redux/store';
import {selectProgressBarState} from '../redux/actions/progressBarAction';

export function GetDataAPI(methodName, apiParams) {

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

