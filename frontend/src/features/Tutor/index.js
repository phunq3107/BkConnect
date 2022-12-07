import React from 'react';
import {Route, Routes} from "react-router-dom";
import ViewTutor from "./pages/ViewTutor";
import TutorBookings from "./pages/TutorBookings";


function Tutor(props) {
    return (
        <Routes>
            <Route path={"/view/:id"} element={<ViewTutor/>}/>
            <Route path={"/requests"} element={<TutorBookings/>}/>
        </Routes>
    );
}

export default Tutor;