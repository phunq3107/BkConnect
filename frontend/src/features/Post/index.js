import React from 'react';
import {Route, Routes} from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import AllPost from "./pages/AllPost";
import NotFound from "../../commons/NotFound";
import ViewPost from "./pages/ViewPost";

function Post() {
    return (
        <Routes>
            {/*<Route path="/" element={<Navigate to={app_paths.postsPage}/>}/>*/}
            <Route path="/" element={<AllPost/>}/>
            <Route path="/create" element={<CreatePost/>}/>
            <Route path="/view/:id" element={<ViewPost/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default Post;
