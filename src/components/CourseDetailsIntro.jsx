import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CourseDetailsIntro = ({ course, hasEnrollment }) => {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={10} lg={8}>
            <h5 className="text-muted">{course?.subtitle}</h5>
            <h1 className="display-4 fw-bold">{course?.title}</h1>

            <div className="mt-4 d-flex justify-content-center flex-wrap gap-3">
              {hasEnrollment ? (
                <Link to={`/courses/${course?.id}/lesson`}>
                  <Button size="lg" variant="primary">
                    Access Course
                  </Button>
                </Link>
              ) : (
                <Button size="lg" variant="success">
                  Enroll Now
                </Button>
              )}

              <Button size="lg" variant="outline-secondary">
                See Intro
              </Button>

              <Button size="lg" variant="danger">
                Price ${course?.price}
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={10} lg={8}>
            <img
              src={`/assets/images/courses/${course?.thumbnail}`}
              alt={course?.title}
              className="img-fluid rounded d-block mx-auto"
              width={768}
              height={463}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseDetailsIntro;
