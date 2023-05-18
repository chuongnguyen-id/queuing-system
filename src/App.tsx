import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/SignIn/ResetPassword/ResetPassword";
import NewPassword from "./pages/SignIn/ResetPassword/NewPassword";
import "antd/dist/reset.css";
import "./assets/styles/main.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/dang-nhap" element={<SignIn />} />
        <Route path="/quen-mat-khau" element={<ResetPassword />} />
        <Route path="/doi-mat-khau" element={<NewPassword />} />
        <Route path="/" element={<Main />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
