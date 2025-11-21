import React, { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState("");
  function submit(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd(t);
    setText("");
  }
  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, width: "100%" }}>
      <input
        className="add-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task..."
      />
      <button className="btn primary" type="submit">
        Add
      </button>
    </form>
  );
}
