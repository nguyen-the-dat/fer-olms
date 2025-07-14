import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import { LoginPage } from "../components/LoginPage";
import { RegisterPage } from "../components/RegisterPage";
import CoursePage from "../pages/CoursesPage";
import { SingleCoursePage } from "../pages/SingleCoursePage";
import Profile from "../pages/Profile";
import InstructorDashboardLayout from "../layouts/InstructorDashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import InstructorCoursesPage from "../pages/InstructorCoursesPage";
import AddCourse from "../components/AddCourse";
import EditCourseDetailPage from "../pages/EditCourseDetailPage";
import QuizSets from "../components/QuizSets";
import ProtectedInstructorRoute from "../components/ProtectedInstructorRoute";
import EditModuleDetailPage from "../pages/EditModuleDetailPage";
import EnrollSucess from "../pages/EnrollSuccess";
import ProtectedEnrollmentRoute from "../components/ProtectedEnrollmentRoute";
import LearnCourseLayoutWrapper from "../components/LearnCourseLayoutWrapper";
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<SingleCoursePage />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/enroll-success" element={<EnrollSucess />} />
        {/* Course Enroll */}

        <Route
          path="/courses/:courseId/lesson"
          element={
            <ProtectedEnrollmentRoute>
              <LearnCourseLayoutWrapper />
            </ProtectedEnrollmentRoute>
          }
        />
      </Route>

      {/* Instructor dashboard */}
      <Route path="/dashboard" element={<ProtectedInstructorRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="courses" element={<InstructorCoursesPage />} />
        <Route path="quiz-sets" element={<QuizSets />} />
        <Route path="courses/add" element={<AddCourse />} />
        <Route path="courses/:id" element={<EditCourseDetailPage />} />
        <Route
          path="courses/:courseId/modules/:moduleId"
          element={<EditModuleDetailPage />}
        />
      </Route>

      {/* Auth pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/:role" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

// json-server --watch lib/db.json --port 3001
