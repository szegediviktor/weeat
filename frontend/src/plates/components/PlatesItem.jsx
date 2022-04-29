import { useState, useContext } from "react";

import Button from "../../shared/components/form-elements/Button";
import Modal from "../../shared/components/UI-elements/Modal";
import Card from "../../shared/components/UI-elements/Card";
import Map from "../../shared/components/UI-elements/Map";

import { AuthenticationContext } from "../../shared/context/auth-usecontext";

import "./platesItem.css";

const PlatesItem = (props) => {
    const [showMap, setShowMap] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const auth = useContext(AuthenticationContext);

    const openMapHandler = () => {
        setShowMap(true);
    };
    const closeMapHandler = () => {
        setShowMap(false);
    };

    const showDeleteWarningHandler = () => {
        setShowConfirmationModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmationModal(false);
    };
    const confirmDeleteHandler = () => {
        setShowConfirmationModal(false);
        console.log("delete has done");
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
                    <Map
                        center={{
                            lng: props.coordinates.lng,
                            lat: props.coordinates.lat,
                        }}
                        zoom={16}
                    />
                </div>
            </Modal>

            <Modal
                show={showConfirmationModal}
                onCancel={cancelDeleteHandler}
                header="Are you really want to DELETE this plate?"
                footerClass="plate-item_modal-actions"
                footer={
                    <>
                        <Button inverse onClick={cancelDeleteHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </>
                }
            >
                <p>Be careful! You can NOT change it later!</p>
            </Modal>

            <li className="plate-item">
                <Card className="plate-item_details">
                    <div className="plate-item_img">
                        <img src={props.img} alt={props.title} />
                    </div>
                    <div className="plate-item_info">
                        <h2>{props.title}</h2>
                        <h3>
                            {props.chefName.length > 0 &&
                                `${props.chefName} / `}
                            {props.restaurantName}
                        </h3>
                        <p>{props.description}</p>
                        <p>{`Rating: ${props.rate} / 10`}</p>
                    </div>
                    <div className="plate-item_actions">
                        <Button inverse onClick={openMapHandler}>
                            Map
                        </Button>
                        {auth.isLoggedIn && (
                            <Button to={`/plates/${props.id}`}>EDIT</Button>
                        )}
                        {auth.isLoggedIn && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlatesItem;
