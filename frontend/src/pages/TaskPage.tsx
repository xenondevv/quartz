import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import st from "../assets/stickman.svg";
import { hitpoint } from "../HitPoint";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean; isAnimating?: boolean }[]>([]);
  const [message, setMessage] = useState("");
  const [groupname, setGroupname] = useState("");

  
    if (localStorage.getItem("token") === null || localStorage.getItem("username") === null){
      useEffect(() => {
        window.location.reload();
      }, [navigate]);
    }  
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);  
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

    const newTask = { id: "", title: " ", completed: false, isAnimating: false };

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

  

  const joinGroup = async (id: string) => {
    const token = localStorage.getItem("token");
  if (!token) {
    setMessage("Authorization token not found.");
    return;
  }
  try {
    const response = await axios.post(
      hitpoint + "/api/group/join",
      { groupid: id, },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    alert("Group joined!");
    setIsJoinModalOpen(false);
    setMessage(response.data.message || "Task updated successfully.");

      window.location.reload();
  } catch (error : any) {
    alert("error joining grp");
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
          <button className="btn btn-outline-light btn-sm px-4"
          onClick={ () => navigate("/group")}>View Group</button>
          <button className="btn btn-outline-light btn-sm px-4"
          onClick={(e) => {setIsJoinModalOpen(true)}}
          >Join Group</button>
        </div>

        <div className="bg-black rounded-4 p-4" style={{ height: "calc(100% - 60px)", overflow: "hidden" }}>
          <h1 className="text-light text-center mb-4" style={{ fontFamily: "Sixtyfour"}}>ToDo List</h1>

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
                      value={task.title.trim()}
                      placeholder="New Task"
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
        
      {/* Join Group Modal */}
      {isJoinModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex",
          justifyContent: "center", alignItems: "center", zIndex: 50
        }}>
          <div style={{
            backgroundColor: "black", padding: "20px", borderRadius: "10px",
            width: "80%", maxWidth: "500px", textAlign: "center", border: "2px solid white"
          }}>
            <h2 className="text-white text-xl mb-4">Join a Group</h2>
            <input
              type="text"
              value={groupname}
              onChange={(e) => {setGroupname(e.target.value)}}
              className="w-full p-3 border-2 border-white rounded-lg mb-8 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter group code"
            />
            
            {/* Flex container for side-by-side buttons with a gap and margin */}
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
              {/* Cancel Button */}
              <button
                onClick={() => setIsJoinModalOpen(false)}  // Close modal without joining
                className="bg-black text-white px-6 py-3 rounded-3 border-2 border-white hover:bg-white/10 transition-all duration-300 w-full">
                Cancel
              </button>

              {/* Join Button */}
              <button
                onClick={(e) => { joinGroup(groupname)}}  // Join group on click
                className="bg-black text-white px-6 py-3 rounded-3 border-2 border-white hover:bg-white/10 transition-all duration-300 w-full">
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      </div>
  );
};

export default TaskPage;
