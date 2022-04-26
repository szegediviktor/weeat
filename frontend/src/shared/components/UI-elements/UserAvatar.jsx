import "./userAvatar.css";

const UserAvatar = (props) => {
    return (
        <div className={`user-avatar ${props.className}`} style={props.style}>
            <img
                src={props.img}
                alt={props.name}
                style={{ width: props.width, height: props.height }}
            />
        </div>
    );
};

export default UserAvatar;
