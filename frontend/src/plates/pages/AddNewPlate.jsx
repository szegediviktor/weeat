import { useCallback, useReducer } from "react";

import Input from "../../shared/components/form-elements/Input";
import Button from "../../shared/components/form-elements/Button";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validator";

import "./addNewPlate.css";

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

const AddNewPlate = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        input: {
            title: { value: "", isValid: false },
            description: { value: "", isValid: false },
        },
        isValid: false,
    });

    // console.log(formState);

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    return (
        <form className="form-add-new-plates">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter valid title!"
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid description (at least 5 characters)!"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Add this Plate!
            </Button>
        </form>
    );
};

export default AddNewPlate;
