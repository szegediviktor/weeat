import { useContext, useState } from "react";
import Input from "../../shared/components/form-elements/Input";
import Button from "../../shared/components/form-elements/Button";
import { useForm } from "../../shared/hooks/useform";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_MINLENGTH,
} from "../../shared/utils/validator";
import { AuthenticationContext } from "../../shared/context/auth-usecontext";

const Auth = (props) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const auth = useContext(AuthenticationContext);

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    // console.log(formState.isValid);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.input,
                    name: null,
                },
                formState.input.email.isValid &&
                    formState.input.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.input,
                    name: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLoginMode((previousMode) => !previousMode);
    };
    const authSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.input);
        auth.login();
    };

    return (
        <>
            <form className="form-add-new-plates" onSubmit={authSubmitHandler}>
                <h1 className="auth-title">
                    {isLoginMode ? "LOGIN" : "SIGNUP"}
                </h1>
                <hr />
                {!isLoginMode && (
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Name:"
                        validators={[VALIDATOR_MINLENGTH(3)]}
                        errorText="Please enter a valid name (at least 3 characters)!"
                        onInput={inputHandler}
                    />
                )}
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email:"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address!"
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password:"
                    validators={[
                        VALIDATOR_MINLENGTH(5),
                        VALIDATOR_MAXLENGTH(15),
                    ]}
                    errorText="Please enter a valid password (from 5 characters to 15) !"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? "LOGIN" : "SIGNUP"}
                </Button>
                <Button inverse type="button" onClick={switchModeHandler}>
                    I WANT TO {isLoginMode ? "SIGNUP" : "LOGIN"}
                </Button>
            </form>
        </>
    );
};

export default Auth;
