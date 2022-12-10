import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./commons/NotFound";
import Auth from "./features/Auth";
import HomePage from "./features/Home/pages/HomePage";
import User from "./features/User";
import Post from "./features/Post";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import sessionApi from "./apis/sessionApi";
import {HandleResponse} from "./utils/ResponseHandler";
import {setCurrentUser, setNotifications, setSessionError} from "./features/Auth/sessionSlice";
import Tutor from "./features/Tutor";
import {app_paths} from "./constants/router";
import notificationApi from "./apis/notificationApi";

//import Tutor from "./features/Tutor";

function App() {
    const currentUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (!currentUser){
            sessionApi.getCurrentUser().then(
                response => {
                    const data = HandleResponse(response, setSessionError)
                    const action = setCurrentUser(data)
                    dispatch(action)
                }
            )
        }
        if (currentUser){
            notificationApi.getNotifications().then(
                res => {
                    const data = HandleResponse(res, setSessionError)
                    const action = setNotifications(data)
                    dispatch(action)
                }
            )
        }
    },[currentUser])
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={app_paths.home}/>}/>
                <Route path={app_paths.home} element={<HomePage/>}/>
                <Route path={app_paths.auth} element={<Auth/>}/>
                <Route path={app_paths.user} element={<User/>}/>
                <Route path={app_paths.post} element={<Post/>}/>
                <Route path={app_paths.tutor} element={<Tutor/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;
