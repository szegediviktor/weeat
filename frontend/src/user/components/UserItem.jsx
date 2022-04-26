import { Link } from "react-router-dom";

import Card from "../../shared/components/UI-elements/Card";
import UserAvatar from "../../shared/components/UI-elements/UserAvatar";

import "./userItem.css";

const UserItem = (props) => {
    return (
        <li className="user-item">
            <Card className="user-item_card-content">
                <Link to={`/${props.id}/places`}>
                    <div className="user-item_img">
                        <UserAvatar img={props.img} alt={props.alt} />
                    </div>

                    <div className="user-item_details">
                        <h2>{props.name}</h2>
                        <h3>
                            {props.numberOfSharedPlates}{" "}
                            {props.numberOfSharedPlates === 1
                                ? "Plate"
                                : "Plates"}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
