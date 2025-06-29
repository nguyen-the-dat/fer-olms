import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchCourses = async () => {
  const res = await axios.get(`${API_BASE_URL}/courses`);
  return res.data;
};

export const fetchCourseById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/courses/${id}`);
  return res.data;
};
