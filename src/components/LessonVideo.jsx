import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { updateLessonWatch } from "../api/lessons";
import { useAuth } from "../context/AuthContext";
export const LessonVideo = ({ courseId, lesson, module }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const { user } = useAuth();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    if (started) {
      updateLessonWatch({
        courseId,
        lessonId: lesson.id,
        moduleSlug: module,
        userId: user.id,
        state: "started",
        lastTime: 0,
      }).then(() => setStarted(false));
    }
  }, [started]);

  useEffect(() => {
    if (ended) {
      updateLessonWatch({
        courseId,
        lessonId: lesson.id,
        moduleSlug: module,
        userId: user.id,
        state: "completed",
        lastTime: duration,
      }).then(() => setEnded(false));
    }
  }, [ended]);

  const handleOnStart = () => {
    console.log("Video started");
    setStarted(true);
  };

  const handleOnEnded = () => {
    console.log("Video ended");
    setEnded(true);
  };

  const handleOnDuration = (durationInSeconds) => {
    console.log("Video duration:", durationInSeconds);
    setDuration(durationInSeconds);
  };

  //   return (
  //     <>
  //       {hasWindow && (
  //         <ReactPlayer
  //         //   url={lesson.video_url}
  //         url="https://www.youtube.com/watch?v=5Jmb7mO3TbM"
  //           width="100%"
  //           height="470px"
  //           controls
  //         //   onStart={handleOnStart}
  //         //   onEnded={handleOnEnded}
  //         //   onDuration={handleOnDuration}
  //         />
  //       )}
  //     </>
  //   );

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <ReactPlayer
        url="https://youtu.be/umYlbLLh0xY?si=CnTCVwmcx18S3qo_"

        width="100%"
        height="470px"
        controls
      />
    </div>
  );
};
