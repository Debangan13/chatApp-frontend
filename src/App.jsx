import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { useAppStore } from "@/store";

const PublicRoutes = () => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  const location = useLocation();
  return isAuthenticated && location.pathname === "/auth" ? (
    userInfo.profileSetup ? (
      <Navigate to="/chat" />
    ) : (
      <Navigate to="/profile" />
    )
  ) : (
    <Outlet />
  );
  // return isAuthenticated ? <Outlet /> : <Navigate to="/chat" />;0
};

const PrivateRoutes = () => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route path="/" element={<Navigate to="/auth" />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
