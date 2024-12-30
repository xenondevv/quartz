import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import st from "../assets/stickman.svg";
import { hitpoint } from "../HitPoint";

const TaskPage = () => {
  const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean; isAnimating?: boolean }[]>([]);
  const [message, setMessage] = useState("");

  const handleTaskChange = (id: string, value: string) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, title: value } : task
    );
    setTasks(newTasks);
  };

  const updateTask = async (id: string) => {
    const newtask = tasks.filter((task) => task.id === id)[0];
    
    const token = localStorage.getItem("token");
  if (!token) {
    setMessage("Authorization token not found.");
    return;
  }

  try {
    const response = await axios.post(
      hitpoint + "/api/task/updatetitle",
      { taskid: newtask.id, newtitle: newtask.title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setMessage(response.data.message || "Task updated successfully.");
  } catch (error : any) {
    setMessage(error.response?.data?.message || "An error occurred while updating the task.");
  }
  }

  const handleCheckboxChange = async (id: string) => {
    const taskToAnimate = tasks.find(task => task.id === id);
    if (!taskToAnimate) return;

    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, isAnimating: true } : task
    ));

    setTimeout(() => {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed, isAnimating: false } : task
        );
        return [...updatedTasks.sort((a, b) => Number(a.completed) - Number(b.completed))];
      });
    }, 500);



    const token = localStorage.getItem("token");
  if (!token) {
    setMessage("Authorization token not found.");
    return;
  }
  try {
    const response = await axios.post(
      hitpoint + "/api/task/completed",
      { taskid: id, },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setMessage(response.data.message || "Task updated successfully.");
  } catch (error : any) {
    setMessage(error.response?.data?.message || "An error occurred while updating the task.");
  }
    
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authorization token not found.");
      return;
    }

    try {
      const response = await axios.get(hitpoint + "/api/task/gettasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedTasks = response.data.tasks.map((task: any) => ({
        id: task.taskid,
        title: task.title,
        completed: task.completed,
      }));
      setTasks(fetchedTasks);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred while fetching tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authorization token not found.");
      return;
    }

    const newTask = { id: "", title: "new task", completed: false, isAnimating: false };

    try {
      const response = await axios.post(
        hitpoint + "/api/task/create",
        {
          title: newTask.title, // Default title
          subtitle: "Default Subtitle", // Default subtitle
          priority: "Low", // Default priority
          due: "2024-12-31", // Default due date
          repeatition: "None", // Default repeatition
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      setMessage(response.data.message || "Task added successfully.");
      newTask.id = response.data.task.taskid;
      setTasks([...tasks, newTask]);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  const deleteTask = async (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    
    
    const token = localStorage.getItem("token");
  if (!token) {
    setMessage("Authorization token not found.");
    return;
  }
  try {
    const response = await axios.post(
      hitpoint + "/api/task/delete",
      { taskid: id, },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setMessage(response.data.message || "Task updated successfully.");
  } catch (error : any) {
    setMessage(error.response?.data?.message || "An error occurred while updating the task.");
  }
    
  };

  return (
    <div className="bod min-h-screen p-4" style={{ height: "100vh", overflow: "hidden" }}>
      <style>
        {`
          @keyframes slideDown {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(40px); opacity: 0; }
          }
          .task-item {
            transition: all 0.3s ease;
          }
          .task-animating {
            animation: slideDown 0.5s ease-in-out;
          }
          .completed-task {
            text-decoration: line-through;
            opacity: 0.6;
          }
        `}
      </style>
      <div
        className="bod container mx-auto bg-black rounded-4 p-4"
        style={{ maxWidth: "1000px", height: "100%" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <button className="btn btn-outline-light btn-sm px-4">View Group</button>
          <button className="btn btn-outline-light btn-sm px-4">Join Group</button>
        </div>

        <div className="bg-black rounded-4 p-4" style={{ height: "calc(100% - 60px)", overflow: "hidden" }}>
          <h1 className="text-light text-center mb-4">To-do List</h1>

          <div className="row" style={{ height: "calc(100% - 60px)" }}>
            <div
              className="col-12 col-md-8 d-flex flex-column align-items-center align-items-md-start"
              style={{
                height: "100%",
                overflowY: "auto",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              <div className="d-flex flex-column gap-3 w-100">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`d-flex align-items-center gap-3 task-item ${task.isAnimating ? 'task-animating' : ''}`}
                  >
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input custom-checkbox"
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onChange={() => handleCheckboxChange(task.id)}
                      />
                    </div>
                    <input
                      type="text"
                      className={`taskcolor form-control bg-transparent ${task.completed ? "completed-task" : ""
                        }`}
                      value={task.title}
                      onChange={(e) => handleTaskChange(task.id, e.target.value)}
                      onBlur={(_e) => updateTask(task.id)}
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
                className="btn btn-outline-secondary btn-sm mt-4 align-self-center align-self-md-start"
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
              className="col-md-4 d-none d-md-flex justify-content-center pt-4"
              style={{ marginTop: "20px" }}
            >
              <img src={st} alt="Stick Figure" className="w-40 opacity-80" />
            </div>
          </div>
        </div>
        {message && <p className="text-center text-light mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default TaskPage;
