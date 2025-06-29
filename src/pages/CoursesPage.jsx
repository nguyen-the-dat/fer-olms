import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import { getCourseList } from '../api/course';
import CourseCard from '../components/CourseCard';
import SearchCourse from '../components/SearchCourse';
import SortCourse from '../components/SortCourse';
import FilterCourse from '../components/FilterCourse';
import FilterCourseMobile from '../components/FilterCourseMobile';
import ActiveFilters from '../components/ActiveFilters';

const courses = [
    {
      "id": 1,
      "title": "Learn Python",
      "subtitle": "Learn Python Like a Pro",
      "thumbnail": "python_thumbnail.png",
      "modules": [],
      "price": 29.99,
      "category": {
        "id": 1,
        "title": "Development",
        "description": "Developments Courses",
        "thumbnail": "development.jpg"
      },
      "instructor": {
        "id": 1,
        "firstName": "Pter",
        "lastName": "Josh Does",
        "email": "datloan14081@gmail.com",
        "role": "instructor",
        "bio": "",
        "profilePicture": "https://i.pravatar.cc",
        "designation": ""
      },
      "testimonials": []
    },
    {
      "id": 2,
      "title": "Mastering JavaScript updated",
      "subtitle": "Learn Javascript from the scratch",
      "thumbnail": "learn_js_thumbnail.jpeg",
      "modules": [],
      "price": 56,
      "category": {
        "id": 7,
        "title": "Photography",
        "description": "Photography Courses",
        "thumbnail": "photography.jpg"
      },
      "instructor": {
        "id": 1,
        "firstName": "Pter",
        "lastName": "Josh Does",
        "email": "datloan14081@gmail.com",
        "role": "instructor",
        "bio": "",
        "profilePicture": "https://i.pravatar.cc",
        "designation": ""
      },
      "testimonials": []
    },
    {
      "id": 3,
      "title": "Next.js 15 Full Stack Complete Learning Management System",
      "subtitle": "subtitle",
      "thumbnail": "Screenshot 2025-06-11 120734.png",
      "modules": [],
      "price": 23,
      "category": {
        "id": 1,
        "title": "Development",
        "description": "Developments Courses",
        "thumbnail": "development.jpg"
      },
      "instructor": {
        "id": 1,
        "firstName": "Pter",
        "lastName": "Josh Does",
        "email": "datloan14081@gmail.com",
        "role": "instructor",
        "bio": "",
        "profilePicture": "https://i.pravatar.cc",
        "designation": ""
      },
      "testimonials": []
    }
  ]

 const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const courseData = await getCourseList();
//       setCourses(courseData);
//     };
//     fetchCourses();
//   }, []);

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="align-items-end border-bottom pb-4 mb-4">
        <Col xs={12} lg={6} className="mb-3 mb-lg-0">
          <SearchCourse />
        </Col>
        <Col xs={12} lg={6} className="d-flex justify-content-end gap-2">
          <SortCourse />
          <FilterCourseMobile />
        </Col>
      </Row>

      {/* Active Filters */}
      <Row className="mb-4">
        <Col>
          <ActiveFilters
            filter={{
              categories: ['development'],
              price: ['free'],
              sort: '',
            }}
          />
        </Col>
      </Row>

      {/* Main content */}
      <Row>
        {/* Filters */}
        <Col lg={3} className="mb-4 mb-lg-0">
          <FilterCourse />
        </Col>

        {/* Courses grid */}
        <Col lg={9}>
          <Row className="g-4">
            {courses.map((course) => (
              <Col key={course.id} sm={6} md={6} lg={4}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CoursesPage;