
//import * as configData from "../Configuration/config.json";
import { GetUserInfo } from "./GetUserInfo";
// import {PROGRESS_BAR_STATE} from '../redux/actions/' 
import axios from 'axios';

//ReduxPart

import store from '../redux/store';
import { selectProgressBarState } from '../redux/actions/progressBarAction';


export function PostDataAPI(methodName, apiData, userInfo, type, showProgress){

    //let baseUrl = configData.default.ApiUrl;
    let baseUrl = sessionStorage.getItem('server_api_url');
    let token = sessionStorage.getItem('auth_token');
    if (showProgress == undefined || showProgress == null)
        showProgress = true;

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
        //Show progress based on input param
        if (showProgress)
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