import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/layout/Main";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/SignIn/ResetPassword/ResetPassword";
import NewPassword from "./pages/SignIn/ResetPassword/NewPassword";
import Home from "./pages/Home";
import Devices from "./pages/Devices";
import "antd/dist/reset.css";
import "./assets/styles/main.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/dang-nhap" element={<SignIn />} />
        <Route path="/quen-mat-khau" element={<ResetPassword />} />
        <Route path="/doi-mat-khau" element={<NewPassword />} />
        <Route
          path="/dashboard"
          element={
            <Main>
              <Home />
            </Main>
          }
        />
        <Route
          path="/thiet-bi"
          element={
            <Main>
              <Devices />
            </Main>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
