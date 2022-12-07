import {Route, Routes} from "react-router-dom";
import React from "react";
import AllTutorPage from "./pages/AllTutorPage";
import ViewTutor from "./pages/ViewTutor";
import TutorBookings from "./pages/TutorBookings";

function Tutor() {
    return (
        <Routes>
            <Route path="/" element={<AllTutorPage/>}/>
            <Route path={"/view/:id"} element={<ViewTutor/>}/>
            <Route path={"/requests"} element={<TutorBookings/>}/>
        </Routes>
    )
}

export default Tutor;
