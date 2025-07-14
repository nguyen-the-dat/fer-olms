import { use, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import CourseDetailsIntro from "../components/CourseDetailsIntro";
import CourseDetails from "../components/CourseDetails";
import { fetchCourseById } from "../api/courses";
import { useAuth } from "../context/AuthContext";

export const SingleCoursePage = () => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [hasEnrollment, setHasEnrollment] = useState(false);
  const params = useParams();
  const courseId = params.id;
  const { user } = useAuth();
  useEffect(() => {
    async function getCourseDetail() {
      try { 
        const course = await fetchCourseById(courseId);
        setCourseDetail(course);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khoá học:", error);
      }
    }

    async function checkEnroll() {
      try {
        const res = await fetch(`http://localhost:3001/enrollments`);
        const enrollments = await res.json();

        const matched = enrollments.find(
          (e) =>
            e.userId === Number(user.id) &&
            e.courseId === Number(courseId) &&
            e.status === "PAID"
        );
          console.log('matched', matched);
        setHasEnrollment(!!matched);
      } catch (error) {
        console.error("Lỗi khi kiểm tra enrollments:", error);
      }
    }

    if (user && user.id && courseId) {
      getCourseDetail();
      checkEnroll();
    }
  }, [courseId, user]);

  return (
    <>
      <CourseDetailsIntro course={courseDetail} hasEnrollment={hasEnrollment} />
      <CourseDetails course={courseDetail} />
      {/* <CourseDetails course={course} />
      {course?.testimonials?.length > 0 && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )} */}

      {/* <RelatedCourses /> */}
    </>
  );
};
