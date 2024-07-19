import React, { useState } from "react";

const Tasks = ({ onFormSubmit }) => {
  const [checked, setChecked] = useState(false);
  const [task, setTask] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // Call the onFormSubmit function passed as a prop
    onFormSubmit(task, checked);
    setTask(""); // Clear the input field
    setChecked(false); // Reset checkbox
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          Mark as completed
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default Tasks;
