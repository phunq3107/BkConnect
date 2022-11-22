import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import NotFound from "./commons/NotFound";
import Auth from "./features/Auth";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/auth"/>}/> /*Home page*/
                <Route path="/auth/*" element={<Auth/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;
