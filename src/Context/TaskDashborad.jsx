import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const TaskDashborad = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Urgent");
  const [selectedTask, setSelectedTask] = useState(null);

  // UseEffect For StoredTasks in Local Stroage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // With Help Of State Management We Handle Input Change
  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };
  // handlePriorityChange
  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  // Handle Function When Click On Submit
  const handleTaskSubmit = () => {
    if (textInput.trim() === "") {
      return;
    }
    // Selecting The New Task To Put
    const newTask = {
      text: textInput,
      priority: selectedPriority,
    };

    setTasks([...tasks, newTask]);
    setTextInput("");
    setSelectedPriority("Urgent");
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const handleEditTask = (editedText) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  return (
    <div className="p-8">
      <div className="lg:flex grid gap-2 items-center font-main">
        <div className="">
          <input
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="w-full lg:w-96 border rounded p-2"
            placeholder="Enter task"
          />
        </div>
        <div className="">
          <select
            value={selectedPriority}
            onChange={handlePriorityChange}
            className="w-full border rounded p-2"
          >
            <option value="Urgent">Urgent</option>
            <option value="Future">Future</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <button onClick={handleTaskSubmit} className="btn btn-secondary">
          Save
        </button>
      </div>

      <div className="mt-8 space-y-4 text-black ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Urgent */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            level="Urgent"
          />
          {/* Future */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            level="Future"
          />
          {/* Overdue */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            level="Overdue"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDashborad;
