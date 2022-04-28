import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.input) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.input[inputId].isValid;
                }
                // console.log(state.input[inputId].isValid);
            }
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };

        default:
            return state;
    }
};

export const useForm = (initInput, initFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        input: initInput,
        isValid: initFormValidity,
    });
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    return [formState, inputHandler];
};
