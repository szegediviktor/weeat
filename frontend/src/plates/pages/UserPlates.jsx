import { useParams } from "react-router-dom";
import PlatesList from "../components/PlatesList";

const DUMMY_PLATES_DB = [
    {
        id: "p1",
        title: "Goulash Soup",
        restaurantName: "Stand Restaurant",
        chefName: "Széll Tamás",
        description:
            "Traditional Goulash soup from the two Michelin starred resturant, Budapest.",
        rate: 8,
        imageURL:
            "https://595050-1923799-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/03/hn-stand_014.jpg",
        address: "Székely Mihály street 2., 1061, Budapest, Hungary",
        location: {
            lat: 47.5001411,
            lng: 19.0594843,
        },
        creator: "user2",
    },
    {
        id: "p2",
        title: "Sterlet with cucumber salad",
        restaurantName: "Stand Restaurant",
        chefName: "Széll Tamás",
        description: "This plate was the winner in 2017, Bocuse D'or",
        rate: 9,
        imageURL:
            "https://lh3.googleusercontent.com/p/AF1QipPlYVaMpO4jOWy8Y7g4gxgEawNn-gc2XRpnsg2K=s1600-w400",
        address: "Székely Mihály street 2., 1061, Budapest, Hungary",
        location: {
            lat: 47.5001411,
            lng: 19.0594843,
        },
        creator: "user2",
    },
];

const UserPlates = () => {
    const userId = useParams().userId;
    const loadedPlates = DUMMY_PLATES_DB.filter((plate) => {
        return plate.creator === userId;
    });

    return <PlatesList items={loadedPlates} />;
};

export default UserPlates;
