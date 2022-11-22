
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
function Auth() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login"/>}/>

            <Route path="/login" element={<Login/>}/>
            {/*<Route path="/register" element={<Register/>}/>*/}
        </Routes>
    );
}

export default Auth;
