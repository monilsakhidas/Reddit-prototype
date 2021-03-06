let initialState = {
    userData: {},
    loginError: "",
    loginMessage: ""
}
var login = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "login_success":
            newState.id = action.payload.response.data;
            newState.error = false;
            newState.message = "Login Success";
            return newState;
        case "login_failed":
            newState.loginError = true;
            newState.loginMessage = action.payload.response.response.data.msg
            return newState;
        default:
            return newState;
    }
}

export default login