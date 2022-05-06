import Input from "../../shared/components/form-elements/Input";
import Button from "../../shared/components/form-elements/Button";
import {
    VALIDATOR_MAX,
    VALIDATOR_MIN,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validator";
import { useForm } from "../../shared/hooks/useform";

import "./addNewPlate.css";

const AddNewPlate = () => {
    const [formState, inputHandler] = useForm(
        {
            title: { value: "", isValid: false },
            description: { value: "", isValid: false },
            chef: { value: "", isValid: false },
            restaurant: { value: "", isValid: false },
            address: { value: "", isValid: false },
            rate: { value: "", isValid: false },
        },
        false
    );

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
                label="Plate name:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter valid name!"
                onInput={inputHandler}
                notChangeable={false}
            />
            <Input
                id="description"
                element="textarea"
                label="Description:"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid description (at least 5 characters)!"
                onInput={inputHandler}
                notChangeable={false}
            />
            {/* Address input validation will be more precise on backend, this is just for the main fe logic */}
            <Input
                id="chef"
                element="input"
                label="The Chef:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter the name of the Chef!"
                onInput={inputHandler}
                notChangeable={true}
            />
            <Input
                id="restaurant"
                element="input"
                label="The Restaurant:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid restaurant name!"
                onInput={inputHandler}
                notChangeable={true}
            />
            <Input
                id="address"
                element="input"
                label="Restaurant Address:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter an address!"
                onInput={inputHandler}
                notChangeable={true}
            />
            <Input
                id="rate"
                element="input"
                label="Rate (0 to 10):"
                validators={[VALIDATOR_MAX(10), VALIDATOR_MIN(0)]}
                errorText="Please enter a number from 0 to 10!"
                onInput={inputHandler}
                notChangeable={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Add this Plate!
            </Button>
        </form>
    );
};

export default AddNewPlate;
