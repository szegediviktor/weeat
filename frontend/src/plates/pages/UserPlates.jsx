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
            "https://images.ctfassets.net/314o13npeir2/7uJeYpEuerm1C4nLLg3m3w/a4f8d91cf79c5b45af8ea59ceca6c295/stand-restaurant-budapest-16.jpg?w=1920&q=80",
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
