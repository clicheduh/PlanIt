const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    if (action.type === 'LOGIN_ERROR') {
        // whatever is returned will be the state of this reducer
        console.log('Signin error');
        return {
            ...state,
            authError: 'Login failed'
        };
    } else if (action.type === 'LOGIN_SUCCESS') {
        // whatever is returned will be the state of this reducer
        console.log('Signin success');
        return {
            ...state,
            authError: null
        };
    } else if (action.type === 'LOGOUT_SUCCESS') {
        // whatever is returned will be the state of this reducer
        console.log('Signout successful!');
        return state;
    } else if (action.type === 'SIGNUP_SUCCESS') {
        // whatever is returned will be the state of this reducer
        console.log('Signup successful!');
        return {
            ...state,
            authError: null
        };
    } else if (action.type === 'SIGNUP_ERROR') {
        // whatever is returned will be the state of this reducer
        console.log('Signup error');
        return {
            ...state,
            authError: action.err.message
        };
    } else {
        return state;
    }
};

export default authReducer;
