import axios from "axios";

const BASE =  "http://localhost:8080"; // empty -> use proxy or same origin
const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});


const PATHS = {
  LIST: "/api/todos",
  CREATE: "/api/todos",
  TOGGLE: (id) => `/api/todos/${id}/toggle`,
  DELETE: (id) => `/api/todos/${id}`,
};

export const getTodos = (search) =>
  api
    .get(PATHS.LIST, { params: search ? { search } : {} })
    .then((r) => r.data);

export const addTodo = (payload) =>
  api.post(PATHS.CREATE, payload).then((r) => r.data);

export const toggleTodo = (id) =>
  api.put(PATHS.TOGGLE(id)).then((r) => r.data);

export const deleteTodo = (id) => api.delete(PATHS.DELETE(id)).then((r) => r.data);

export default api;
