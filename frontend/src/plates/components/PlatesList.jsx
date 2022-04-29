import Button from "../../shared/components/form-elements/Button";
import Card from "../../shared/components/UI-elements/Card";
import PlatesItem from "./PlatesItem";

import "./platesList.css";

const PlatesList = (props) => {
    if (props.items.length < 1) {
        return (
            <div className="plate-list centered-div">
                <Card>
                    <h2>You don't have any plates yet.</h2>
                    <h2>Would you like to have one?</h2>
                    <br />
                    <Button to="/plates/add">Share plate</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="plate-list">
            {props.items.map((item) => {
                return (
                    <PlatesItem
                        id={item.id}
                        key={item.id}
                        img={item.imageURL}
                        title={item.title}
                        restaurantName={item.restaurantName}
                        chefName={item.chefName}
                        description={item.description}
                        rate={item.rate}
                        address={item.address}
                        creatorId={item.creator}
                        coordinates={item.location}
                    />
                );
            })}
        </ul>
    );
};

export default PlatesList;
