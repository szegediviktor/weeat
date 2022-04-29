import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Users from "./user/pages/Users";
import UserPlates from "./plates/pages/UserPlates";
import AddNewPlate from "./plates/pages/AddNewPlate";

import MainNav from "./shared/components/navigation/MainNav";
import UpdatePlate from "./plates/pages/UpdatePlate";
import Auth from "./user/pages/Auth";

import { AuthenticationContext } from "./shared/context/auth-usecontext";
import { useCallback, useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    let routes;

    if (isLoggedIn) {
        routes = (
            <>
                <Route path="/" element={<Users />} />
                <Route path="/:userId/plates" element={<UserPlates />} exact />
                <Route path="/plates/add" element={<AddNewPlate />} />
                <Route path="/plates/:plateId" element={<UpdatePlate />} />
                <Route path="*" element={<Navigate to="/" />} />
            </>
        );
    } else {
        routes = (
            <>
                <Route path="/" element={<Users />} />
                <Route path="/:userId/plates" element={<UserPlates />} exact />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Navigate to="/auth" />} />
            </>
        );
    }

    return (
        <AuthenticationContext.Provider
            value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
        >
            <div className="App">
                <BrowserRouter>
                    <MainNav />
                    <Routes>{routes}</Routes>
                </BrowserRouter>
            </div>
        </AuthenticationContext.Provider>
    );
}

export default App;
