import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/reset.css";
import "./assets/styles/main.css";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/SignIn/ResetPassword/ResetPassword";
import NewPassword from "./pages/SignIn/ResetPassword/NewPassword";
import Home from "./pages/Home";
import Devices from "./pages/Devices";
import Service from "./pages/Service";
import OrdinalNumber from "./pages/OrdinalNumber";
import Report from "./pages/Report";
import Setting from "./pages/Setting";
import AddDevice from "./pages/Devices/AddDevice";
import Main from "./components/layout/Main";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/dang-nhap" element={<SignIn />} />
        <Route path="/quen-mat-khau" element={<ResetPassword />} />
        <Route path="/doi-mat-khau" element={<NewPassword />} />
        <Route path="/" element={<Main />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="thiet-bi/danh-sach-thiet-bi" element={<Devices />} />
          <Route
            path="/thiet-bi/danh-sach-thiet-bi/them-thiet-bi"
            element={<AddDevice />}
          />
          <Route path="dich-vu" element={<Service />} />
          <Route path="cap-so" element={<OrdinalNumber />} />
          <Route path="bao-cao" element={<Report />} />
          <Route path="cai-dat" element={<Setting />} />

          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
