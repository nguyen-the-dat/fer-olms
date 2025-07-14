import { useParams } from "react-router-dom";
import CourseLayout from "../layouts/LearnCourseLayout";
import LessonPage from "../pages/LessonPage";
const LearnCourseLayoutWrapper = () => {
  const { courseId } = useParams();
  console.log('courseId:', courseId);
  return (
    <CourseLayout courseId={courseId}>
      <LessonPage />
    </CourseLayout>
  );
};

export default LearnCourseLayoutWrapper;
