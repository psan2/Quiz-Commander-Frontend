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

const singularContentItem = contentType => {
  switch (contentType) {
    case "questions":
      return "question";
    case "rounds":
      return "rounds";
    case "quizzes":
      return "quiz";
    default:
      return contentType.slice(0, contentType.length - 1);
  }
};

const signup = (username, password, password_confirmation, email, persona) => {
  const key = persona.slice(0, persona.length - 1);
  return fetch(`${API_BASE_URL}/${persona}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      [key]: {
        username: username,
        password: password,
        password_confirmation: password_confirmation,
        email: email
      }
    })
  }).then(res => res.json());
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

const getItem = (contentType, id) => {
  return fetch(`${API_BASE_URL}/${contentType}/${id}`, {
    headers: { ...HEADERS, Authorization: token() }
  }).then(res => res.json());
};

const getItems = contentType => {
  return fetch(`${API_BASE_URL}/${contentType}`, {
    headers: { ...HEADERS, Authorization: token() }
  }).then(res => res.json());
};

const updateItem = (contentType, content_item) => {
  const submission = { [singularContentItem(contentType)]: content_item };

  return fetch(`${API_BASE_URL}/${contentType}/${content_item.id}`, {
    method: "PATCH",
    headers: { ...HEADERS, Authorization: token() },
    body: JSON.stringify(submission)
  }).then(res => res.json());
};

const createItem = (contentType, content_item) => {
  const submission = { [singularContentItem(contentType)]: content_item };

  return fetch(`${API_BASE_URL}/${contentType}/`, {
    method: "POST",
    headers: { ...HEADERS, Authorization: token() },
    body: JSON.stringify(submission)
  }).then(res => res.json());
};

const deleteItem = (contentType, content_id) => {
  return fetch(`${API_BASE_URL}/${contentType}/${content_id}`, {
    method: "DELETE",
    headers: { ...HEADERS, Authorization: token() }
  });
};

export default {
  login,
  signup,
  getCurrentUser,
  getItem,
  getItems,
  API_ROOT,
  API_WS_ROOT,
  HEADERS,
  token,
  updateItem,
  createItem,
  deleteItem
};
