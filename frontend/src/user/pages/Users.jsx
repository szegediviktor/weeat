import UserList from "../components/UserList";

const Users = () => {
    const DUMMY_USERS = [
        {
            id: "user1",
            name: "Viktor Szegedi",
            img: "https://media-exp1.licdn.com/dms/image/C4E03AQGLVtriKkw4TA/profile-displayphoto-shrink_200_200/0/1648285172635?e=1654128000&v=beta&t=jhk_g_oMJ-NDByDl3Vur29QcXfuZLo-Hp7e-F4yei2o",
            sharedPlates: 2,
        },
    ];

    return <UserList userData={DUMMY_USERS} />;
};

export default Users;
