import React, { createContext, useReducer, useContext } from "react";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE = "UPDATE";

const UserStoreContext = createContext();
const { Provider } = UserStoreContext;

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                loggedIn: true,
                user: {
                    ...action.user,
                    password: ""
                }
            }
        case LOGOUT:
            return {
                loggedIn: false,
                user: {}
            }
        case UPDATE:
            return {
                loggedIn: true,
                user: {
                    ...state.user,
                    [action.category]: action.updatedData
                }
            }
        default:
            return state;
    }
}

const UserStoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        loggedIn: false,
        user: {}
    });

    return <Provider value={[state, dispatch]} {...props} />

}

const useUserStoreContext = () => {
    return useContext(UserStoreContext);
}

export { UserStoreProvider, useUserStoreContext };