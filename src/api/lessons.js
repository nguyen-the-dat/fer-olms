import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export async function getLessonsDetail(lessonId) {
  try {
    const res = await axios.get(`${API_BASE_URL}/lessons/${lessonId}`);
    return res.data;
  } catch (error) {
    console.log("error", error.message);
  }
}

export async function createLesson(formData) {
  const data = Object.fromEntries(formData.entries());
  const fullLesson = {
    ...data,
    description: "",
    duration: 0,
    video_url: "",
    access: "private",
    active: false,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullLesson),
    });
    if (!res.ok) throw new Error("Failed to save course");

    const newLesson = await res.json();
    return newLesson;
  } catch (error) {
    console.error("[createLesson]", error);
    throw error;
  }
}

export const reorderLessons = async (data) => {
  try {
    const promises = data.map((element) =>
      updateLesson(element.id, { order: element.order })
    );

    await Promise.all(promises);
  } catch (error) {
    console.error("Error in reorderLessons:", error);
    throw error;
  }
};

export const updateLesson = async (lessonId, updatedField) => {
  try {
    const res = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedField),
    });

    const updateLesson = await res.json();
    return updateLesson;
  } catch (error) {
    console.error("[updateLesson]", error);
    throw error;
  }
};
