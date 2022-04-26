import UserItem from "./UserItem";
import Card from "../../shared/components/UI-elements/Card";

import "./userList.css";

const UserList = (props) => {
    if (props.userData.length < 1) {
        return (
            <div className="centered-div">
                <Card>
                    <h2>OOOOPS, no users found.</h2>
                    <br />
                    <h4>Would you like to sign up?</h4>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.userData.map((item, i) => {
                return (
                    <UserItem
                        key={i}
                        id={item.id}
                        name={item.name}
                        img={item.img}
                        numberOfSharedPlates={item.sharedPlates}
                    />
                );
            })}
        </ul>
    );
};

export default UserList;
