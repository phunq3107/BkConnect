import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {app_paths} from "../../constants";
import CreatePost from "./pages/CreatePost";
import NotFound from "../../commons/NotFound";
function Post() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={app_paths.postsPage}/>}/>

            <Route path="/create" element={<CreatePost/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default Post;
