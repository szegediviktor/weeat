import { useState } from "react";

import Button from "../../shared/components/form-elements/Button";
import Modal from "../../shared/components/UI-elements/Modal";
import Card from "../../shared/components/UI-elements/Card";

import "./platesItem.css";

const PlatesItem = (props) => {
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => {
        setShowMap(true);
    };
    const closeMapHandler = () => {
        setShowMap(false);
    };

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="plate-item_modal-content"
                footerClass="plate-item_modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <h1>This going to be the map</h1>
                </div>
            </Modal>

            <li className="plate-item">
                <Card className="plate-item_details">
                    <div className="plate-item_img">
                        <img src={props.img} alt={props.title} />
                    </div>
                    <div className="plate-item_info">
                        <h2>{props.title}</h2>
                        <h3>
                            {props.chefName.length > 0
                                ? `${props.chefName} / `
                                : null}
                            {props.restaurantName}
                        </h3>
                        <p>{props.description}</p>
                        <br />
                        <p>{`Rating: ${props.rate} / 10`}</p>
                        <br />
                    </div>
                    <div className="plate-item_actions">
                        <Button inverse onClick={openMapHandler}>
                            Map
                        </Button>
                        <Button to={`/plates/${props.id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlatesItem;
