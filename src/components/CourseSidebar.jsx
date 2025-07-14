import { useEffect, useState } from "react";
import { CourseProgress } from "../components/CourseProgress";
import { fetchCourseById } from "../api/courses";
import { SidebarModule } from "../components/SidebarModule";
const CourseSidebar = ({ totalProgress, courseId }) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [modulesWithLessons, setModulesWithLessons] = useState([]);

  useEffect(() => {
    async function getCourseData() {
      try {
        const course = await fetchCourseById(courseId);
        setCourseDetail(course);

        // get all modules of the course
        const modulesRes = await fetch(
          `http://localhost:3001/modules?courseId=${courseId}`
        );
        const modules = await modulesRes.json();

        // get all the lessons
        const lessonsRes = await fetch(`http://localhost:3001/lessons`);
        const lessons = await lessonsRes.json();

        const modulesWithLessons = modules
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map((module) => {
            const matchedLessons = module.lessonIds
              .map((id) => lessons.find((l) => l.id === id))
              .filter(Boolean)
              .sort((a, b) => Number(a.order) - Number(b.order));
            return { ...module, lessonIds: matchedLessons };
          });
        setModulesWithLessons(modulesWithLessons);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }

    if (courseId) {
      getCourseData();
    }
  }, [courseId]);

  return (
    <div
      className="d-flex flex-column border-end shadow-sm"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="border-bottom p-4">
        <h5 className="fw-semibold mb-0">{courseDetail?.title}</h5>
        <div className="mt-4">
          <CourseProgress variant="success" value={totalProgress} />
        </div>
      </div>

      <div className="px-3">
        <SidebarModule courseId={courseId} modules={modulesWithLessons} />
      </div>
    </div>
  );
};

export default CourseSidebar;

// import { Container, Row, Col, Card } from "react-bootstrap";
// // import CourseProgress from "./CourseProgress";
// // import SidebarModule from "./SidebarModule";
// // import Quiz from "./Quiz";
// // import GiveReview from "./GiveReview";
// // import DownloadCertificate from "./DownloadCertificate";
// import { CourseProgress } from "../components/CourseProgress";
// import { useEffect, useState } from "react";
// import { fetchCourseById } from "../api/courses";
// const CourseSidebar = ({
//   course,
//   totalProgress,
//   courseId,
//   updateDataModules,
//   quizSet,
//   isQuizComplete,
// }) => {
//   const [courseDetail, setCourseDetail] = useState(null);

//   useEffect(() => {
//     async function getCourseData() {
//       try {
//         const course = await fetchCourseById(courseId);
//         setCourseDetail(course);
//       } catch (error) {
//         console.error("Lỗi khi lấy thông tin khóa học:", error);
//       }
//     }

//     if (courseId) {
//       getCourseData();
//     }
//   }, [courseId]);

//   return (
//     <div
//       className="d-flex flex-column border-end shadow-sm"
//       style={{ height: "100vh", overflowY: "auto" }}
//     >
//       {/* Course title & progress */}
//       <div className="border-bottom p-4">
//         <h5 className="fw-semibold mb-0">{courseDetail?.title}</h5>
//         <div className="mt-4">
//           <CourseProgress variant="success" value={100} />
//         </div>
//       </div>

//       {/* Sidebar modules */}
//       {/* <div className="px-3">
//         <SidebarModule courseId={courseId} modules={updateDataModules} />
//       </div> */}

//       {/* Quiz */}
//       {/* <div className="border-top px-4 pt-4">
//         {quizSet && (
//           <Quiz
//             courseId={courseId}
//             quizSet={quizSet}
//             isTaken={isQuizComplete}
//           />
//         )}
//       </div> */}

//       {/* Review & Certificate */}
//       {/* <div className="px-4 pt-4">
//         <GiveReview />
//         <DownloadCertificate
//           courseId={courseId}
//           totalProgress={totalProgress}
//         />
//       </div> */}

//       {/* Optional bottom padding */}
//       <div className="px-4 mb-5" />
//     </div>
//   );
// };

// export default CourseSidebar;
