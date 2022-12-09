import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import UserInfoPage from "./pages/UserInfoPage";
import TutorInfoPage from "./pages/TutorInfoPage";
import NotFound from "../../commons/NotFound";
import AllTutorPage from "../Tutor/pages/AllTutorPage";
import MyClassesPage from "./pages/MyClassesPage";
import {app_paths} from "../../constants/router";

function User(props) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={app_paths.userInfo}/>}/>

            <Route path={"/info"} element={<UserInfoPage/>}/>
            <Route path={"/tutor"} element={<AllTutorPage/>}/>
            <Route path={"/tutor-info"} element={<TutorInfoPage/>}/>
            <Route path={"/classes"} element={<MyClassesPage/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default User;