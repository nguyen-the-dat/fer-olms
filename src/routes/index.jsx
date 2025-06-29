import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import { LoginPage } from "../components/LoginPage";
import { RegisterPage } from "../components/RegisterPage";
import  CoursePage  from "../pages/CoursesPage";
import { SingleCoursePage } from "../pages/SingleCoursePage";
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<SingleCoursePage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />
      <Route path="/register/:role" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);
export default AppRoutes;
// json-server --watch lib/db.json --port 3001
