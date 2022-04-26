import Card from "../../shared/components/UI-elements/Card";
import PlatesItem from "./PlatesItem";

import "./platesList.css";

const PlatesList = ({ items }) => {
    if (items.length < 1) {
        return (
            <div className="plates-list center-div">
                <Card>
                    <h2>No shared plates yet. Share one!</h2>
                    <button>Share plate</button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {items.map((item) => {
                return <PlatesItem id={item.id} key={item.id} />;
            })}
        </ul>
    );
};

export default PlatesList;
