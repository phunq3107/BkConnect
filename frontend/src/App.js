import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import NotFound from "./commons/NotFound";
import Auth from "./features/Auth";
import HomePage from "./features/Home/pages/HomePage";
import {app_paths} from "./constants";
import User from "./features/User";
import Post from "./features/Post";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={app_paths.home}/>}/>
                <Route path={app_paths.home} element={<HomePage/>}/>
                <Route path={app_paths.auth} element={<Auth/>}/>
                <Route path={app_paths.user} element={<User/>}/>
                <Route path={app_paths.post} element={<Post/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;
