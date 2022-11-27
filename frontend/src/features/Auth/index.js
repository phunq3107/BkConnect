
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
function Auth() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login"/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
    );
}

export default Auth;
