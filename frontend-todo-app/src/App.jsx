// src/App.jsx
import React, { useEffect, useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import AddTaskForm from "./components/AddTaskForm";
import TodoItem from "./components/TodoItem";
import * as api from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeout = useRef(null);

  // fetch from backend
  const fetchTodos = async (q = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTodos(q);
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchTodos error:", err);
      setError("Failed to fetch todos. Check server or console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchTodos(search.trim());
    }, 360);
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;

  const handleAdd = async (title) => {
    setSaving(true);
    setError(null);
    try {
      const created = await api.addTodo({ title });
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      console.error("add error:", err);
      setError("Failed to add task.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id) => {
    setError(null);
    const prev = todos;
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    try {
      await api.toggleTodo(id);
    } catch (err) {
      console.error("toggle error:", err);
      setError("Failed to update task. Reverting.");
      setTodos(prev); // rollback
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    const prev = todos;
    setTodos((s) => s.filter((t) => t.id !== id));
    try {
      await api.deleteTodo(id);
    } catch (err) {
      console.error("delete error:", err);
      setError("Failed to delete task. Reverting.");
      setTodos(prev);
    }
  };

  return (
    <div className="app-wrap">
      <div className="todo-card">
        <div className="header">
          <div className="logo">TD</div>
          <div>
            <h1>To-Do Manager</h1>
            <p className="lead">Connected to Spring Boot API.</p>
          </div>
        </div>

        <div className="controls">
          <SearchBar value={search} onChange={setSearch} />
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: 420 }}>
              <AddTaskForm onAdd={handleAdd} />
            </div>
          </div>
        </div>

        <div className="meta">
          <div className="pill">Total: {total}</div>
          <div className="pill">Completed: {completed}</div>
          <div className="pill">{loading ? "Loading..." : "Synced"}</div>
        </div>

        {error && (
          <div style={{ marginTop: 12, color: "#ffb4a6", fontSize: 13 }}>
            {error}
          </div>
        )}

        <div className="todo-list" aria-busy={loading}>
          {loading ? (
            <div className="empty">Loading tasks...</div>
          ) : todos.length === 0 ? (
            <div className="empty">No todos found. Add your first task above.</div>
          ) : (
            todos.map((t) => (
              <TodoItem key={t.id} todo={t} onToggle={handleToggle} onDelete={handleDelete} />
            ))
          )}
        </div>

        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: 13 }}>
          {/* <div>Tip: Search calls server. Use server-side search for large lists.</div> */}
          <div>{saving ? "Saving..." : "Live"}</div>
        </div>
      </div>
    </div>
  );
}

