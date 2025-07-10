import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../api/courses";
import {
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Button,
  Form,
} from "react-bootstrap";
import CourseActions from "../components/CourseAction";
import { TitleForm } from "../components/TitleForm";
import { SubTitleForm } from "../components/SubTitleForm";
import { DescriptionForm } from "../components/DescriptionForm";
import { ImageForm } from "../components/ImageForm";
import { CategoryForm } from "../components/CategoryForm";
import { ModulesForm } from "../components/ModuleForm";
import { PriceForm } from "../components/PriceForm";
import { useState } from "react";
import { fetchCategories } from "../api/categories";
import { getModuleDetail } from "../api/modules";
const EditCourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const [categories, setCategoires] = useState([]);
  const [courseModule, setCourseModule] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await fetchCourseById(id);
        setCourse(course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const listCategories = await fetchCategories();
        setCategoires(listCategories);
      } catch (error) {}
    };
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      if (!course?.modules?.length) {
        setCourseModule([]);
        return;
      }

      try {
        const fetchedModules = await Promise.all(
          course.modules.map((moduleId) => getModuleDetail(moduleId))
        );

        const sortedModules = fetchedModules.sort((a, b) => a.order - b.order);

        setCourseModule(sortedModules);
      } catch (error) {
        console.error("Failed to fetch module details:", error);
      }
    };

    fetchModules();
  }, [course?.modules]);

  const handleCourseUpdate = (updatedValues) => {
    setCourse((prev) => ({
      ...prev,
      ...updatedValues,
    }));
  };
  return (
    <>
      {course?.active === false && (
        <Alert variant="warning">
          This course is unpublished. It will not be visible in the course.
        </Alert>
      )}
      <Container className="my-4">
        <div>
          <CourseActions courseId={course?.id} isActive={course?.active} onUpdate={handleCourseUpdate}/>
        </div>

        <div className="row mt-5 gx-3 gy-3">
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-gear"></i>
              <h5 className="mb-0">Customize your course</h5>
            </div>
            <TitleForm
              courseId={course?.id}
              initialData={{ title: course?.title }}
              onUpdate={handleCourseUpdate}
            />
            <SubTitleForm
              initialData={{ subtitle: course?.subtitle }}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />

            <DescriptionForm
              initialData={{ description: course?.description }}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />

            <ImageForm
              initialData={{
                imageUrl: course?.thumbnail,
              }}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />
            <CategoryForm
              initialData={{ value: course?.category?.title }}
              courseId={course?.id}
              options={categories}
              onUpdate={handleCourseUpdate}
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-sliders"></i>
              <h5 className="mb-0">Courses Module</h5>
            </div>

            <ModulesForm
              initialData={courseModule}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />
            <div className="d-flex align-items-center gap-2 mt-3">
              <i className="bi bi-coin"></i>
              <h5 className="mb-0">Sell your course</h5>
            </div>
            <PriceForm
              initialData={{ price: course?.price }}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditCourseDetailPage;
