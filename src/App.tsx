import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/reset.css";
import "./assets/styles/main.css";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/SignIn/ResetPassword/ResetPassword";
import NewPassword from "./pages/SignIn/ResetPassword/NewPassword";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Devices from "./pages/Devices";
import AddDevice from "./pages/Devices/AddDevice";
import DeviceInfo from "./pages/Devices/DeviceInfo";
import EditDevice from "./pages/Devices/EditDevice";
import Service from "./pages/Services";
import AddService from "./pages/Services/AddService";
import ServiceInfo from "./pages/Services/ServiceInfo";
import EditService from "./pages/Services/EditService";
import OrdinalNumbers from "./pages/OrdinalNumbers";
import AddOrdinalNumber from "./pages/OrdinalNumbers/AddOrdinalNumber";
import OrdinalNumberInfo from "./pages/OrdinalNumbers/OrdinalNumberInfo";
import Reports from "./pages/Reports";
import RoleManagement from "./pages/Setting/RoleManagement";
import AddRole from "./pages/Setting/RoleManagement/AddRole";
import EditRole from "./pages/Setting/RoleManagement/EditRole";
import AccountManagement from "./pages/Setting/AccountManagement";
import AddAccount from "./pages/Setting/AccountManagement/AddAccount";
import ActivityLogs from "./pages/Setting/ActivityLogs";

function App() {
  return (
    <div>
      <Routes>
        {/* Sign In */}
        <Route path="/dang-nhap" element={<SignIn />} />
        <Route path="/quen-mat-khau" element={<ResetPassword />} />
        <Route path="/doi-mat-khau" element={<NewPassword />} />

        <Route path="/" element={<Main />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="profile" element={<Profile />} />

          {/* Device */}
          <Route path="thiet-bi/danh-sach-thiet-bi" element={<Devices />} />
          <Route
            path="thiet-bi/danh-sach-thiet-bi/them-thiet-bi"
            element={<AddDevice />}
          />
          <Route
            path="thiet-bi/danh-sach-thiet-bi/chi-tiet"
            element={<DeviceInfo />}
          />
          <Route
            path="thiet-bi/danh-sach-thiet-bi/chi-tiet/cap-nhat"
            element={<EditDevice />}
          />

          {/* Service */}
          <Route path="dich-vu/danh-sach-dich-vu" element={<Service />} />
          <Route
            path="dich-vu/danh-sach-dich-vu/them-dich-vu"
            element={<AddService />}
          />
          <Route
            path="dich-vu/danh-sach-dich-vu/chi-tiet"
            element={<ServiceInfo />}
          />
          <Route
            path="dich-vu/danh-sach-dich-vu/chi-tiet/cap-nhat"
            element={<EditService />}
          />

          {/* Ordinal Number */}
          <Route path="cap-so/danh-sach-cap-so" element={<OrdinalNumbers />} />
          <Route
            path="cap-so/danh-sach-cap-so/cap-so-moi"
            element={<AddOrdinalNumber />}
          />
          <Route
            path="cap-so/danh-sach-cap-so/chi-tiet"
            element={<OrdinalNumberInfo />}
          />

          {/* Report */}
          <Route path="bao-cao/lap-bao-cao" element={<Reports />} />

          {/* Setting */}
          {/* Role */}
          <Route
            path="cai-dat-he-thong/quan-ly-vai-tro"
            element={<RoleManagement />}
          />
          <Route
            path="cai-dat-he-thong/quan-ly-vai-tro/them-vai-tro"
            element={<AddRole />}
          />
          <Route
            path="cai-dat-he-thong/quan-ly-vai-tro/cap-nhat-vai-tro"
            element={<EditRole />}
          />
          {/* Account */}
          <Route
            path="cai-dat-he-thong/quan-ly-tai-khoan"
            element={<AccountManagement />}
          />
          <Route
            path="cai-dat-he-thong/quan-ly-tai-khoan/them-tai-khoan"
            element={<AddAccount />}
          />
          <Route
            path="cai-dat-he-thong/quan-ly-tai-khoan/cap-nhat-tai-khoan"
            element={<AccountManagement />}
          />
          {/* Activity Log */}
          <Route
            path="cai-dat-he-thong/nhat-ky-hoat-dong"
            element={<ActivityLogs />}
          />

          {/* Not Found */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
