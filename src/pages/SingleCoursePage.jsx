import { use } from "react";
import { useParams } from "react-router-dom";
import CourseDetailsIntro from "../components/CourseDetailsIntro";
import CourseDetails from "../components/CourseDetails";
const course = {
  title: "Learn Python",
  description:
    "Learn Python programming language from scratch with hands-on exercises.",
  thumbnail: "python_thumbnail.png",
  modules: [
    {
      _id: "663a0893bfe65e5778eedf3c",
      title: "Python Basics",
      description: "Learn the fundamentals of Python programming language.",
      slug: "python-basics",
      course: "6648184a6fe803e9128d7fba",
      lessonIds: [],
      duration: 2286,
      active: "true",
      order: "1",
      __v: 1,
    },
    {
      _id: "663a0893bfe65e5778eedf3d",
      title: "HTML5 and CSS3 Essentials",
      description: "Master HTML5 and CSS3 for modern web development.",
      slug: "html5-css3-essentials",
      course: "6648184a6fe803e9128d7fba",
      lessonIds: [],
      duration: 2286,
      active: "true",
      order: "2",
    },
  ],
  price: 29.99,
  active: true,
  category: {
    _id: "664813cc6fe803e9128d7fae",
    title: "Development",
    description: "Developments Courses",
    thumbnail: "development.jpg",
    __v: 0,
  },
  instructor: {
    _id: "682d9d5e6e8533c7d716781a",
    firstName: "Pter",
    lastName: "Josh Does",
    password: "$2b$10$6u24rx4NBvu20/YtdeyXUe.O3yoQPQ3LOShlAkktpwTcTkZNvRAqi",
    email: "datloan14081@gmail.com",
    role: "instructor",
    bio: "",
    profilePicture: "https://i.pravatar.cc",
    designation: "",
    __v: 0,
  },
  __v: 3,
  testimonials: [
    {
      _id: "663a0a05bfe65e5778eedf58",
      content: "Great course! I learned a lot.",
      rating: 5,
      courseId: "6648184a6fe803e9128d7fba",
      user: {}, // Thêm dữ liệu user nếu cần
    },
  ],
  quizSet: {
    _id: "663a096ebfe65e5778eedf4a",
    title: "Python Basics Quiz Set update new ver 2",
    description: "Test your knowledge about Python fundamentals.",
    slug: "python-basics-quiz",
    quizIds: [{}, {}], // Thêm quiz nếu cần
    active: true,
  },
  subtitle: "Learn Python Like a Pro",
  learning: [
    "Learn Python from the basic fundamentals",
    "Learn how to apply the fundamentals to build things",
    "Learn to make projects that are production ready",
    "Get a bonus chapter on using Python for Machine Learning",
  ],
  createdOn: new Date("2024-02-12T00:00:00.000Z"),
  modifiedOn: new Date("2024-04-11T00:00:00.000Z"),
  id: "6648184a6fe803e9128d7fba",
};

export const SingleCoursePage = () => {
  const params = useParams();
  const courseId = params.id;
  console.log("SingleCoursePage courseId:", courseId);
  return (
    <>
      <CourseDetailsIntro course={course} hasEnrollment={false}/>
      <CourseDetails course={course} />
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
