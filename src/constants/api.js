const API_ROOT = "http://localhost:3000";
const API_WS_ROOT = "ws://localhost:3000/cable";
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

const API_BASE_URL = `http://localhost:3000`;

const login = (username, password, persona) => {
  return fetch(`${API_BASE_URL}/${persona}/create`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ username, password })
  }).then(res => res.json());
};

const getCurrentUser = (token, persona) => {
  return fetch(`${API_BASE_URL}/${persona}/show`, {
    headers: { ...HEADERS, Authorization: token }
  }).then(res => res.json());
};

// const getPosts = token => {
//   return fetch(`${API_BASE_URL}/posts`, {
//     headers: { ...HEADERS, Authorization: token }
//   }).then(res => res.json());
// };

export default {
  login,
  getCurrentUser,
  // getPosts,
  API_ROOT,
  API_WS_ROOT,
  HEADERS
};
