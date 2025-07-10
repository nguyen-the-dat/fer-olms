import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button } from "react-bootstrap";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { formatDuration } from "../../lib/date";

import { updateLesson } from "../api/lessons";
import { VideoPlayer } from "./VideoPlayer";
const formSchema = z.object({
  url: z.string().min(1, { message: "Required" }),
  duration: z.string().min(1, { message: "Required" }),
});

export const VideoUrlForm = ({
  initialData,
  courseId,
  lessonId,
  updateListLesson,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState({
    url: initialData?.url || "",
    duration: formatDuration(initialData?.duration) || "00:00:00",
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      url: initialData?.url,
      duration: formatDuration(initialData?.duration) || "00:00:00",
    },
  });

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values) => {
    try {
      const payload = {
        video_url: values.url,
      };

      const duration = values.duration;
      const parts = duration.split(":");

      if (parts.length === 3) {
        payload.duration =
          parseInt(parts[0]) * 3600 +
          parseInt(parts[1]) * 60 +
          parseInt(parts[2]);
      } else if (parts.length === 2) {
        payload.duration = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      } else {
        payload.duration = parseInt(parts[0]);
      }
      const updatedLesson = await updateLesson(lessonId, payload);
      updateListLesson(updatedLesson);
      setState({
        url: values.url,
        duration: formatDuration(payload.duration),
      });

      toast.success("Lesson updated");
      toggleEdit();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border rounded p-3 bg-light mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Video URL</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil size={16} className="me-1" />
              Edit URL
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          <p className="text-muted">{state.url}</p>
          <div className="mt-3">
            <VideoPlayer url={state.url} />
          </div>
        </>
      )}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Video URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 'https://...'"
              {...register("url")}
              isInvalid={!!errors.url}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {errors.url?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Video Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. '10:30' or '01:12:45'"
              {...register("duration")}
              isInvalid={!!errors.duration}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duration?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" disabled={isSubmitting || !isValid}>
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};
