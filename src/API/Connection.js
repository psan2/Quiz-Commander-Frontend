const API_ROOT = "http://localhost:3000";
const API_WS_ROOT = "ws://localhost:3000/cable";
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

const singular_content_item = content_type => {
  switch (content_type) {
    case "questions":
      return "question";
    case "rounds":
      return "rounds";
    case "quizzes":
      return "quiz";
    default:
      return content_type.slice(0, content_type.length - 1);
  }
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

const getItems = content_type => {
  return fetch(`${API_BASE_URL}/${content_type}`, {
    headers: { ...HEADERS, Authorization: token() }
  }).then(res => res.json());
};

const updateItem = (content_type, content_item) => {
  const submission = { [singular_content_item(content_type)]: content_item };

  return fetch(`${API_BASE_URL}/${content_type}/${content_item.id}`, {
    method: "PATCH",
    headers: { ...HEADERS, Authorization: token() },
    body: JSON.stringify(submission)
  }).then(res => res.json());
};

const createItem = (content_type, content_item) => {
  const submission = { [singular_content_item(content_type)]: content_item };

  return fetch(`${API_BASE_URL}/${content_type}/`, {
    method: "POST",
    headers: { ...HEADERS, Authorization: token() },
    body: JSON.stringify(submission)
  }).then(res => res.json());
};

const deleteItem = (content_type, content_id) => {
  return fetch(`${API_BASE_URL}/${content_type}/${content_id}`, {
    method: "DELETE",
    headers: { ...HEADERS, Authorization: token() }
  });
};

export default {
  login,
  getCurrentUser,
  getItems,
  API_ROOT,
  API_WS_ROOT,
  HEADERS,
  token,
  updateItem,
  createItem,
  deleteItem
};
