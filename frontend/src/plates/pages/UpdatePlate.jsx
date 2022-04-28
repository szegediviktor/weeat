import { useParams } from "react-router-dom";

import { DUMMY_PLATES_DB } from "./UserPlates";

import Input from "../../shared/components/form-elements/Input";
import Button from "../../shared/components/form-elements/Button";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validator";
import { useForm } from "../../shared/hooks/useform";

import "./addNewPlate.css";

const UpdatePlate = () => {
    const plateId = useParams().plateId;

    const identifiedPlate = DUMMY_PLATES_DB.find(
        (plate) => plate.id === plateId
    );

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: identifiedPlate.title,
                isValid: true,
            },
            description: {
                value: identifiedPlate.description,
                isValid: true,
            },
        },
        true
    );

    const updatePlateSubmitFormHandler = (e) => {
        e.preventDefault();
        console.log(formState.input);
    };

    // console.log(identifiedPlate.description);

    if (!identifiedPlate) {
        return (
            <div className="centered-div">
                <h2>Could not any plate</h2>
            </div>
        );
    }

    return (
        <form
            className="form-add-new-plates"
            onSubmit={updatePlateSubmitFormHandler}
        >
            <Input
                id="title"
                element="input"
                type="text"
                label="Plate name:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter valid name!"
                onInput={inputHandler}
                initValue={formState.input.title.value}
                initValid={formState.input.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description:"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid description (at least 5 characters)!"
                onInput={inputHandler}
                initValue={formState.input.description.value}
                initValid={formState.input.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Update Plate
            </Button>
        </form>
    );
};

export default UpdatePlate;
