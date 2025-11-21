import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <div className="left">
        <div
          className={`checkbox ${todo.completed ? "checked" : ""}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className={`todo-text ${todo.completed ? "completed" : ""}`}>
            {todo.title}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
            {todo.due ? `Due: ${todo.due}` : ""}
          </div>
        </div>
      </div>
      <div className="actions">
        <button
          className="icon-btn"
          title="Delete"
          onClick={() => onDelete(todo.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
