import { useReducer } from "react";

import { validate } from "../../utils/validator";

import "./input.css";

const inputReducer = (state, action) => {
    console.log(state);
    console.log(action);

    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: "",
        isTouched: false,
        isValid: false,
    });

    console.log(inputState);

    const changeHandler = (e) => {
        dispatch({
            type: "CHANGE",
            val: e.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({ type: "TOUCH" });
    };

    const element =
        props.element === "input" ? (
            <input
                type={props.type}
                id={props.id}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
            />
        ) : (
            <textarea
                rows={props.rows || 3}
                id={props.id}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
            />
        );

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                "form-control--invalid"
            }`}
            value={inputState.value}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <p>{props.errorText}</p>
            )}
        </div>
    );
};

export default Input;
