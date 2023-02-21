import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

export default function App() {
    return (
        <div className="App">
            <div>This is an app</div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
