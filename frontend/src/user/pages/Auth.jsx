import Input from "../../shared/components/form-elements/Input";
import Button from "../../shared/components/form-elements/Button";
import { useForm } from "../../shared/hooks/useform";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_MINLENGTH,
} from "../../shared/utils/validator";

const Auth = (props) => {
    const [formState, inputHandler] = useForm(
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

    const authSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.input);
    };

    return (
        <>
            <form className="form-add-new-plates" onSubmit={authSubmitHandler}>
                <h1 className="auth-title">Login</h1>
                <hr />
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email:"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address!"
                    onInput={inputHandler}
                    notChangable={true}
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
                    notChangable={true}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    LOGIN
                </Button>
            </form>
        </>
    );
};

export default Auth;
