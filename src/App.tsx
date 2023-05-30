import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/reset.css";
import "./assets/styles/main.css";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/SignIn/ResetPassword/ResetPassword";
import NewPassword from "./pages/SignIn/ResetPassword/NewPassword";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Devices from "./pages/Devices";
import AddDevice from "./pages/Devices/AddDevice";
import DeviceInfo from "./pages/Devices/DeviceInfo";
import EditDevice from "./pages/Devices/EditDevice";
import Service from "./pages/Services";
import AddService from "./pages/Services/AddService";
import ServiceInfo from "./pages/Services/ServiceInfo";
import EditService from "./pages/Services/EditService";
import OrdinalNumber from "./pages/OrdinalNumber";
import Report from "./pages/Reports";
import Setting from "./pages/Setting";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/dang-nhap" element={<SignIn />} />
        <Route path="/quen-mat-khau" element={<ResetPassword />} />
        <Route path="/doi-mat-khau" element={<NewPassword />} />
        <Route path="/" element={<Main />}>
          <Route path="dashboard" element={<Home />} />

          {/* Device */}
          <Route path="thiet-bi/danh-sach-thiet-bi" element={<Devices />} />
          <Route
            path="/thiet-bi/danh-sach-thiet-bi/them-thiet-bi"
            element={<AddDevice />}
          />
          <Route
            path="/thiet-bi/danh-sach-thiet-bi/chi-tiet-thiet-bi"
            element={<DeviceInfo />}
          />
          <Route
            path="/thiet-bi/danh-sach-thiet-bi/chi-tiet-thiet-bi/cap-nhat-thiet-bi"
            element={<EditDevice />}
          />

          {/* Service */}
          <Route path="dich-vu" element={<Service />} />
          <Route
            path="/dich-vu/danh-sach-dich-vu/them-dich-vu"
            element={<AddService />}
          />
          <Route
            path="/dich-vu/danh-sach-dich-vu/chi-tiet-dich-vu"
            element={<ServiceInfo />}
          />
          <Route
            path="/dich-vu/danh-sach-dich-vu/chi-tiet-dich-vu/cap-nhat-dich-vu"
            element={<EditService />}
          />

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
