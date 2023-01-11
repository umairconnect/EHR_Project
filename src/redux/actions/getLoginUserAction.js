
import { APICall } from '../../Services/APICall';

const isLoading = () => {
    return {
        type : "loading"
    }
}

const isError = (error) => {
    return {
        type: "isError",
        payload: error
    }
}

const dataFetched = (data) => {
    return {
        type: 'fetchedLogin',
        payload : data
    }
}

export const getLoginUser = (dispatch, emailaddress, password, history, setIsLoading, setError, setReturnMessage) => {

    setError(false);
    setIsLoading(true);
    let loginAttemptCount = 0;
    if (!!emailaddress && !!password) {

        return async (dispatch) => {
            let data = {
                EmailAddress: emailaddress,
                Password: password,
                LoginAttemptsCount: loginAttemptCount
            };
            //call loading action
            dispatch(isLoading);

            try {
                const response = await APICall('POST', 'auth/authenticate', data);
                if (response?.data) {
                    //call dataFetched action to load data
                    dispatch(dataFetched(response?.data))
                }
            } catch (e) {
                //call error action
                dispatch(isError(e.message));
            }

        }
    }
    else {
        setError(true);
        setIsLoading(false);
    }

}