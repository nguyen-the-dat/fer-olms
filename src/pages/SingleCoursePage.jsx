import { use, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import CourseDetailsIntro from "../components/CourseDetailsIntro";
import CourseDetails from "../components/CourseDetails";
import { fetchCourseById } from "../api/courses";
import { useAuth } from "../context/AuthContext";
import { getTestimonialsByCourseId } from "../api/testimonials";
import Testimonials from "../components/Testimonials";
import RelatedCourses from "../components/RelatedCourse";
export const SingleCoursePage = () => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [hasEnrollment, setHasEnrollment] = useState(false);
  const [testimonialList, setTestimonialList] = useState([]);
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
        console.log("matched", matched);
        setHasEnrollment(!!matched);
      } catch (error) {
        console.error("Lỗi khi kiểm tra enrollments:", error);
      }
    }

    async function getAllTestimonialsCourse() {
      try {
        const res = await getTestimonialsByCourseId(courseId);
        setTestimonialList(res);
      } catch (error) {
        console.error("Lỗi khi lấy testimonials:", error);
      }
    }

    if (user && user.id && courseId) {
      getCourseDetail();
      checkEnroll();
      getAllTestimonialsCourse();
    }
  }, [courseId, user]);

  return (
    <>
      <CourseDetailsIntro course={courseDetail} hasEnrollment={hasEnrollment} />
      <CourseDetails course={courseDetail} />
      {testimonialList?.length > 0 && (
        <Testimonials testimonials={testimonialList} />
      )}

      {/* <CourseDetails course={course} />
      {course?.testimonials?.length > 0 && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )} */}

      <RelatedCourses />
    </>
  );
};
