import React, { useEffect, useState } from "react";
import Tasks from "./Tasks"; // Ensure correct path to Tasks component
import TaskItem from "./TaskItem"; // Ensure correct path to TaskItem component

const App = () => {
  const API_KEY = "xfiQdAc1fXme9XE3u78DyCEeh6hX3ikMG6mRRbQBPcdq4AEbgw";
  const [taskList, setTaskList] = useState([]);

  // Fetch existing tasks
  useEffect(() => {
    fetch("https://crudapi.co.uk/app/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        setTaskList(
          data.items.map((task) => ({
            task: task.task,
            checked: task.checked,
            id: task._uuid,
          }))
        );
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Function to handle form submission
  const onFormSubmit = (task, checked) => {
    fetch("https://crudapi.co.uk/app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ task, checked }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add task");
        }
        return res.json();
      })
      .then((data) => {
        setTaskList((prev) => [
          ...prev,
          { task: data.task, checked: data.checked, id: data.id },
        ]);
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  return (
    <div>
      <Tasks onFormSubmit={onFormSubmit} />
      {taskList.map((task) => (
        <TaskItem
          task={task.task}
          prevStatus={task.checked}
          key={task.id}
          id={task.id}
        />
      ))}
    </div>
  );
};

export default App;
