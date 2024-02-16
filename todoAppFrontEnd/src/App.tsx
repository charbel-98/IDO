import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import PersistLogin from "./Pages/PersistLogin";
import RequireAuth from "./Pages/RequireAuth";
import { useEffect } from "react";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/login");
  }, []);
  return <></>;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
