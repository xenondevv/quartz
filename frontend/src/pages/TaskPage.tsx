import { useState } from "react";
import { Trash2 } from "lucide-react";
import Logo from "../assets/MainProfile.png";
import st from "../assets/stickman.svg";

const TaskPage = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: false },
    { id: 3, text: "Task 3", completed: false },
    { id: 4, text: "Task 4", completed: false },
  ]);

  // Function to generate the next task ID, ensuring it is unique.
  const getNextTaskId = () => {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  };

  // Update task text
  const handleTaskChange = (id: number, value: string) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, text: value } : task
    );
    setTasks(newTasks);
  };

  // Toggle task completion status
  const handleCheckboxChange = (id: number) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    // Sort tasks so completed ones come last
    const sortedTasks = newTasks.sort((a, b) => Number(a.completed) - Number(b.completed));

    setTasks([...sortedTasks]); // Update the state with sorted tasks
  };

  // Add new task with a unique id
  const addTask = () => {
    const newTaskId = getNextTaskId(); // Get the next unique task ID
    setTasks([
      ...tasks,
      { id: newTaskId, text: "", completed: false }
    ]);
  };

  // Delete task
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bod min-h-screen p-4">
      <div
        className="bod container mx-auto bg-black rounded-4 p-4"
        style={{ maxWidth: "1000px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <button className="btn btn-outline-light btn-sm px-4">
            Create Group
          </button>
          <img src={Logo} alt="Quartz Logo" className="w-8 h-8" height="50px" />
          <button className="btn btn-outline-light btn-sm px-4">
            Join Group
          </button>
        </div>

        <div className="bg-black rounded-4 p-4">
          <h1 className="text-light text-center mb-4">To-do List</h1>

          <div className="row">
            <div className="col-md-8">
              <h2 className="text-light mb-3">Today</h2>

              <div className="d-flex flex-column gap-3">
                {tasks.map((task) => (
                  <div key={task.id} className="d-flex align-items-center gap-3">
                    {/* Checkbox inside the form, styled to be circular and white */}
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input custom-checkbox"
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onChange={() => handleCheckboxChange(task.id)} // Toggle completion of specific task
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={`Task ${task.id}`}
                      className="taskcolor form-control bg-transparent"
                      value={task.text}
                      onChange={(e) => handleTaskChange(task.id, e.target.value)}
                      style={{
                        border: task.completed
                          ? "1px solid #888"
                          : "1px solid #fff",
                        textDecoration: task.completed
                          ? "line-through solid #888"
                          : "solid #888",
                        color: task.completed
                          ? "#888"
                          : "#fff"
                        
                      }}
                    />
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="btn text-secondary p-0 d-flex align-items-center justify-content-center"
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        position: "relative",
                        transition: "transform 0.2s ease, color 0.2s ease",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addTask}
                className="btn btn-outline-secondary btn-sm mt-4"
                style={{
                  border: "1px solid white",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                Add Task
              </button>
            </div>

            <div
              className="col-md-4 d-flex justify-content-center pt-4"
              style={{ marginTop: "20px" }}
            >
              <img src={st} alt="Stick Figure" className="w-40 opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
