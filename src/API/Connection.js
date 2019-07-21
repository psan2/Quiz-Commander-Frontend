const API_ROOT = "http://localhost:3000";
const API_WS_ROOT = "ws://localhost:3000/cable";
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

const API_BASE_URL = `http://localhost:3000`;
const token = () => {
  return localStorage.getItem("token");
};
const login = (username, password, persona) => {
  return fetch(`${API_BASE_URL}/${persona}/login`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ username, password })
  }).then(res => res.json());
};

const getCurrentUser = persona => {
  return fetch(`${API_BASE_URL}/${persona}/show`, {
    headers: { ...HEADERS, Authorization: token(), Persona: persona }
  }).then(res => res.json());
};

const getContent = content_type => {
  return fetch(`${API_BASE_URL}/${content_type}`, {
    headers: { ...HEADERS, Authorization: token() }
  }).then(res => res.json());
};

const updateQuestion = question => {
  return fetch(`${API_BASE_URL}/questions/${question.id}`, {
    method: "PATCH",
    headers: { ...HEADERS, Authorization: token() },
    body: JSON.stringify({ question: { ...question } })
  }).then(res => res.json());
};

const createQuestion = question => {
  return fetch(`${API_BASE_URL}/questions/`, {
    method: "POST",
    headers: { ...HEADERS, Authorization: token() },
    body: JSON.stringify({ question: { ...question } })
  }).then(res => res.json());
};

const deleteContent = (content_type, content_id) => {
  return fetch(`${API_BASE_URL}/${content_type}/${content_id}`, {
    method: "DELETE",
    headers: { ...HEADERS, Authorization: token() }
  });
};

export default {
  login,
  getCurrentUser,
  getContent,
  API_ROOT,
  API_WS_ROOT,
  HEADERS,
  token,
  updateQuestion,
  createQuestion,
  deleteContent
};
