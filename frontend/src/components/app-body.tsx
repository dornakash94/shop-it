import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Stats from "./pages/stats";

function AppBody() {
  return (
    <div className="App-body">
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default AppBody;
