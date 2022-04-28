import { useReducer, useEffect } from "react";

import { validate } from "../../utils/validator";

import "./input.css";

const inputReducer = (state, action) => {
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
        value: props.initValue || "",
        isTouched: false,
        isValid: props.initValid || false,
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

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
                value={inputState.value}
            />
        ) : (
            <textarea
                rows={props.rows || 3}
                id={props.id}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
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
            {props.notChangeable && (
                <p className="changeability-text">
                    *You can NOT change it later!
                </p>
            )}
            {!inputState.isValid && inputState.isTouched && (
                <p>{props.errorText}</p>
            )}
        </div>
    );
};

export default Input;
