import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "./user/pages/Users";
import UserPlates from "./plates/pages/UserPlates";
import AddNewPlate from "./plates/pages/AddNewPlate";

import MainNav from "./shared/components/navigation/MainNav";
import UpdatePlate from "./plates/pages/UpdatePlate";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <MainNav />
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route
                        path="/:userId/plates"
                        element={<UserPlates />}
                        exact
                    />
                    <Route path="/plates/add" element={<AddNewPlate />} />
                    <Route path="/plates/:plateId" element={<UpdatePlate />} />
                    <Route path="*" element={<Users />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
