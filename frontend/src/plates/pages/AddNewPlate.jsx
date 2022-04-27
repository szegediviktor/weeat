import Input from "../../shared/components/form-elements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validator";

import "./addNewPlate.css";

const AddNewPlate = () => {
    return (
        <form className="form-add-new-plates">
            <Input
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter valid title!"
            />
        </form>
    );
};

export default AddNewPlate;
