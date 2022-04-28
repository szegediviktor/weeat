import UserList from "../components/UserList";

const Users = () => {
    const DUMMY_USERS = [
        // {
        //     id: "user1",
        //     name: "Rasmus Kofoed",
        //     img: "https://www.ateriet.com/wp-content/uploads/2016/04/Geranium-69-Rasmus-Kofoed-Head-Chef-Co-owner.jpg-1-2.jpg",
        //     sharedPlates: 5,
        // },
        {
            id: "user1",
            name: "Széll Tamás",
            img: "https://image-api.nosalty.hu/nosalty/images/articles/7f/cs/Yc3l1ZE5jmujpz6FdXiDFNzI8EMfkbmiqdeARMvj.jpeg?w=640&h=640&fit=crop&s=ebd438bff0eb5b4c463ae94e2eec23ad",
            sharedPlates: 2,
        },
        // {
        //     id: "user3",
        //     name: "Dalnoki Bence",
        //     img: "https://vince.hu/media-library/less-than-p-greater-than-dalnoki-bence-kepviseli-a-magyar-szineket-less-than-p-greater-than.jpg?id=29558094",
        //     sharedPlates: 1,
        // },
    ];

    return <UserList userData={DUMMY_USERS} />;
};

export default Users;
