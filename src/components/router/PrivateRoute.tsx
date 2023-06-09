import { Navigate, Outlet } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

export const PrivateRoute = () => {
  const [currentUser, setCurrentUser] = useState<any>();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unSubscribe;
  }, []);

  return typeof currentUser === "undefined" ? (
    <h1 className="wrapper-center" style={{ height: "100vh" }}>
      <LoadingOutlined />
    </h1>
  ) : currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/dang-nhap" replace />
  );
};
