import UserList from "../components/UserList";

const Users = () => {
    const DUMMY_USERS = [
        {
            id: "user1",
            name: "Viktor Szegedi",
            img: "https://images.unsplash.com/photo-1579935110464-fcd041be62d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHlvZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
            sharedPlates: 2,
        },
    ];

    return <UserList userData={DUMMY_USERS} />;
};

export default Users;
