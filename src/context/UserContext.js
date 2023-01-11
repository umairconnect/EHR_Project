import React from "react";
import { APICall } from '../Services/APICall';
import { PostDataAPI } from '../Services/APIService';
import { GetUserInfo } from "../Services/GetUserInfo";
import { SetMaxFileSize } from '../Services/GetConfiguration';
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();


function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true
            };
        case "SIGN_OUT_SUCCESS":
            return {
                ...state,
                isAuthenticated: false
            };
        case "SET_LOGIN_USER": {
            return {
                ...state,
                currentUser: action.payload
            };
        }
        case "SET_LOGOUT_USER": {
            return {
                ...state,
                currentUser: null
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

const INITIAL_STATE = {
    currentUser: null,
    isAuthenticated: !!sessionStorage.getItem("auth_token")
};

function UserProvider({ children }) {

    var [state, dispatch] = React.useReducer(userReducer, INITIAL_STATE);

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
    var context = React.useContext(UserStateContext);

    if (context === undefined) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
}

function useUserDispatch() {
    var context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}

// ###########################################################

async function loginUser(dispatch, emailaddress, password, history, setIsLoading, setError, setReturnMessage) {

    const setUser = user => ({
        type: 'SET_LOGIN_USER',
        payload: user
    });

    let attempt_count = JSON.parse(sessionStorage.getItem('login_attempts'));
    setError(false);
    setIsLoading(true);
    let loginAttemptCount = 0;

    if (!!emailaddress && !!password) {

        if (attempt_count == null) {
            sessionStorage.setItem('login_attempts', 1)
            loginAttemptCount = 1;
        }
        else {
            let count = parseInt(JSON.parse(sessionStorage.getItem('login_attempts')));
            loginAttemptCount = count
        }

        let data = {
            EmailAddress: emailaddress,
            Password: password,
            LoginAttemptsCount: loginAttemptCount
        };

        var response = await APICall('POST', 'auth/authenticate', data);
        if (response.success) {

            setError(null)
            setIsLoading(false)
            let baseUrl = sessionStorage.getItem('server_api_url');
            sessionStorage.clear();
            sessionStorage.setItem('server_api_url', baseUrl);
            sessionStorage.setItem('auth_token', response.data.authToken);
            sessionStorage.setItem('user_info', JSON.stringify(response.data));
            sessionStorage.removeItem("login_attempts");

            //Call api to get user info
            let user_info = JSON.parse(GetUserInfo());
            let data = {
                userID: user_info.user.userID
            }

            var result = await APICall('POST', 'auth/getRoleRights', data);
            if (result.success)
                sessionStorage.setItem('user_permissions', JSON.stringify(result.data))

            SetMaxFileSize();
            //For login
            dispatch({ type: 'LOGIN_SUCCESS' });
            //For Data
            dispatch(setUser(response.data));

            //history.push('/app/setup');
            history.push('/app/dashboard');
        }
        else {
            sessionStorage.setItem('login_attempts', parseInt(loginAttemptCount) + 1);
            setError(true);
            setIsLoading(false);
            setReturnMessage(response.message);
        }

    } else {
        sessionStorage.setItem('login_attempts', parseInt(loginAttemptCount) + 1);
        setError(true);
        setIsLoading(false);
        setReturnMessage(response.message);
    }
}

async function forgotPassowrd(emailaddress, history, setIsLoading, setError, setIsSuccess, setReturnMessage, setResetButtonDisalbed) {
    setError(false);
    setIsLoading(true);

    if (!!emailaddress) {
        let data = {
            EmailAddress: emailaddress
        };
        setResetButtonDisalbed(true);
        var response = await APICall('POST', 'auth/forgotPassword', data);
        if (response.success) {
            setError(null)
            setIsLoading(false)
            setIsSuccess(true)
            setReturnMessage(response.message);
        }
        else {
            setError(true);
            setIsLoading(false);
            setReturnMessage(response.message);
        }

    }
    else {
        setError(true);
        setIsLoading(false);
    }
}

async function validateToken(token, setIsAuthToken, setError, setIsValidToken) {
    setError(false)
    setIsAuthToken(true);
    if (!!token) {
        let data = {
            Token: token
        };

        var response = await APICall('POST', 'auth/validateResetToken', data);
        if (response.success) {
            setIsAuthToken(true);
            setIsValidToken(true);
        }
        else {
            setIsValidToken(false);
            setIsAuthToken(true);
        }

    } else {
        setError(true)
        setIsValidToken(false);
        setIsAuthToken(true);
    }
}

async function resetPassword(dispatch, token, newPassword, confirmPassword, history, setIsLoading, setError, setIsSuccess, setReturnMessage) {
    setError(false);
    setIsLoading(true);
    if (!!token && !!newPassword && !!confirmPassword) {
        if (newPassword == confirmPassword) {
            let data = {
                Token: token,
                Password: newPassword,
                ConfirmPassword: confirmPassword
            };

            var response = await APICall('POST', 'auth/resetPassword', data);
            if (response.success) {
                setError(null)
                setIsLoading(false)
                setIsSuccess(true);
                //alert(response.message);
                setReturnMessage(response.message)
                //alert("Password Reset Successfully.")
                // history.push('/app/login')
            }
            else {
                setError(true);
                setIsLoading(false);
            }
        }
        else {
            setIsSuccess(false);
            setIsLoading(false);
            setReturnMessage("Passwords can't match")
        }

    } else {
        setIsSuccess(true)
        setIsLoading(false);
    }
}

async function changePassword(dispatch, oldPassword, newPassword, confirmPassword, history, setIsLoading, setError, setIsSuccess, setReturnMessage) {

    let user = sessionStorage.getItem('user_info');

    if (user != null) {

        let userdata = JSON.parse(user).user;

        let email = userdata.emailAddress;

        if (!!email && !!oldPassword && !!newPassword && !!confirmPassword) {
            // !!email &&


            if (newPassword == confirmPassword) {
                let data = {
                    EmailAddress: email,
                    OldPassword: oldPassword,
                    NewPassword: newPassword,
                    ConfirmPassword: confirmPassword
                };

                //var response = await APICall('POST', 'auth/changePassword', data);
                PostDataAPI("auth/changePassword", data).then((response) => {
                    if (response.success) {

                        setError(false);
                        setIsLoading(false);
                        setIsSuccess(true);
                        setReturnMessage(response.message);
                    }
                    else {
                        setError(true);
                        setIsLoading(false);
                        setIsSuccess(false);
                        setReturnMessage(response.message);
                    }
                });
            }
            else {
                setIsSuccess(false);
                setIsLoading(false);
                setReturnMessage("Passwords can't match")
            }

        } else {
            setError(true)
            setIsLoading(false)
            //setIsSuccess(true)
        }
    }
    else {
        setError(true)
        setIsLoading(false)
    }

}
async function iDMeCallbackToken(token, setIsAuthToken, setError, setIsValidToken) {
    setError(false)
    setIsAuthToken(true);
    if (!!token) {
        let data = {
            Token: token
        };

        var response = await APICall('POST', 'auth/validateResetToken', data);
        if (response.success) {
            setIsAuthToken(true);
            setIsValidToken(true);
        }
        else {
            setIsValidToken(false);
            setIsAuthToken(true);
        }

    } else {
        setError(true)
        setIsValidToken(false);
        setIsAuthToken(true);
    }
}
async function updateUserSessionLog() {
    

}

function signOut(dispatch, history) {
    updateLogoutSessionLog();
    sessionStorage.clear();
    dispatch({ type: "SET_LOGOUT_USER" });
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    history.push("/login");
}
function updateLogoutSessionLog() {
   
    let user_info = JSON.parse(GetUserInfo());
    let data = {
        userID: user_info.user.userID
    }
    PostDataAPI("auth/logoutUserSessionLog", data).then((result) => {
        if (result.success) {

        }
    });    
}


export { UserProvider, useUserState, useUserDispatch, loginUser, forgotPassowrd, validateToken, resetPassword, changePassword, iDMeCallbackToken, signOut };
