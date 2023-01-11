 
const initialState = {
    isLoading: false,
    data: [],
    error: ""
}

const getLoginUserReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            }

        case 'isError':
            return {
                ...state,
                isLoading : false,
                error: action.payload
            }

        case 'fetchedLogin':
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }

        default:
            return state;
    }

}

export default getLoginUserReducer;