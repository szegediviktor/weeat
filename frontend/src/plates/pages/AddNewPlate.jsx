import { useCallback, useReducer } from "react";

import Input from "../../shared/components/form-elements/Input";
import Button from "../../shared/components/form-elements/Button";
import {
    VALIDATOR_MAXLENGTH,
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

    const plateSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.input); // This will be for the http request -> backend
    };

    return (
        <form className="form-add-new-plates" onSubmit={plateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Plate Name:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter valid title!"
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description:"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid description (at least 5 characters)!"
                onInput={inputHandler}
            />
            {/* Address input validation will be more precise on backend, this is just for the main fe logic */}
            <Input
                id="chef"
                element="input"
                label="The Chef:"
                // validators={}
                errorText="Please enter the name of the Chef!"
                onInput={inputHandler}
            />
            <Input
                id="restaurant-name"
                element="input"
                label="The Restaurant:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter a valid restaurant name!"
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                label="Restaurant Address:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter an address!"
                onInput={inputHandler}
            />
            <Input
                id="rate"
                element="input"
                label="Rate (0 to 10):"
                validators={[VALIDATOR_MAXLENGTH(2)]}
                errorText="Please rate this plate 0-10!"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Add this Plate!
            </Button>
        </form>
    );
};

export default AddNewPlate;
