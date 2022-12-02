
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import {app_paths} from "../../constants";
import NotFound from "../../commons/NotFound";
function Auth() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={app_paths.login}/>}/>

            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<RegisterPage/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default Auth;
