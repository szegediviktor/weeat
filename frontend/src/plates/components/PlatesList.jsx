import Card from "../../shared/components/UI-elements/Card";
import PlatesItem from "./PlatesItem";

import "./platesList.css";

const PlatesList = (props) => {
    if (props.items.length < 1) {
        return (
            <div className="plates-list">
                <Card>
                    <h2>No shared plates yet. Share one!</h2>
                    <button>Share plate</button>
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
