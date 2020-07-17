import React, { createContext, useReducer, useContext } from "react";

const UPDATE_CORRECT_ANSWER = "UPDATE_CORRECT_ANSWER"
const UPDATE_USER_ANSWER = "UPDATE_USER_ANSWER"
const VERIFY_ANSWER = "VERIFY_ANSWER"

const AnswerStoreContext = createContext();
const { Provider } = AnswerStoreContext;

const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_CORRECT_ANSWER:
            return {
                ...state,
                correctAnswer: action.correctAnswer
            };

        case UPDATE_USER_ANSWER:
            return {
                ...state,
                userAnswer: action.userAnswer
            }

        case VERIFY_ANSWER:
            return {
                ...state,
                verification: state.userAnswer === state.correctAnswer //returns true if the user's answer is correct.  
            }
        default:
            return state;
    }
}

const AnswerStoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        correctAnswer: "",
        userAnswer: "",
        verification: false
    });

    return <Provider value={[state, dispatch]} {...props} />

}

const useAnswerStoreContext = () => {
    return useContext(AnswerStoreContext);
}

export { AnswerStoreProvider, useAnswerStoreContext };