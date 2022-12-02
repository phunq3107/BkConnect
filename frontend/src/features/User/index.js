import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {app_paths} from "../../constants";
import UserInfoPage from "./pages/UserInfoPage";
import TutorInfoPage from "./pages/TutorInfoPage";
import NotFound from "../../commons/NotFound";

function User(props) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={app_paths.userInfo}/>}/>

            <Route path={"/info"} element={<UserInfoPage/>}/>
            <Route path={"/tutor-info"} element={<TutorInfoPage/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default User;