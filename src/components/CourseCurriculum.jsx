import React from "react";
import { Card, Accordion, Row, Col } from "react-bootstrap";
import { BsBook, BsClock, BsBroadcast } from "react-icons/bs";
import CourseModuleList from "./CourseModuleList"; 
const CourseCurriculum = ({ course }) => {
  const totalDuration = course?.modules
    ?.map((item) => {
      return item.lessonIds.reduce((acc, obj) => acc + (obj.duration || 0), 0);
    })
    .reduce((acc, obj) => acc + obj, 0);

  return (
    <>
      {/* Info summary */}
      <Row className="text-secondary text-center mb-4 justify-content-center">
        <Col xs="auto" className="d-flex align-items-center me-3">
          <BsBook className="me-1" size={16} />
          <span>{course?.modules?.length} Chapters</span>
        </Col>
        <Col xs="auto" className="d-flex align-items-center me-3">
          <BsClock className="me-1" size={16} />
          <span>{(totalDuration / 3600).toPrecision(2)}+ Hours</span>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <BsBroadcast className="me-1" size={16} />
          <span>4 Live Classes</span>
        </Col>
      </Row>

      {/* Accordion content */}
      <Accordion alwaysOpen>
        {course?.modules?.map((module, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            {/* Bạn cần chỉnh lại CourseModuleList nếu nó dùng shadcn hoặc Tailwind */}
            {/* <CourseModuleList module={module} /> */}
            <CourseModuleList/>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default CourseCurriculum;
