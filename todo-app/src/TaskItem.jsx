import React, { useState } from "react";

const TaskItem = ({ task, prevStatus, id, onUpdateTask }) => {
  const [checked, setChecked] = useState(prevStatus);
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Notify parent about the change
    if (onUpdateTask) {
      onUpdateTask(id, editedTask, checked);
    }
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task}</h3>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          {checked ? "Checked" : "Unchecked"}
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
