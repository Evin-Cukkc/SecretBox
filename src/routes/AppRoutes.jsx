import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Journal from "../pages/Journal";
import History from "../pages/History";
import Stats from "../pages/Stats";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/history" element={<History />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}