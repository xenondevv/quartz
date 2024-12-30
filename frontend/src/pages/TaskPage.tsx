import { useState } from "react";
import { Trash2 } from "lucide-react";
import st from "../assets/stickman.svg";

const TaskPage = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean; isAnimating?: boolean }[]>([
    { id: 1, text: "", completed: false },
    { id: 2, text: "", completed: false },
    { id: 3, text: "", completed: false },
    { id: 4, text: "", completed: false },
  ]);

  const getNextTaskId = () => {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  };

  const handleTaskChange = (id: number, value: string) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, text: value } : task
    );
    setTasks(newTasks);
  };

  const handleCheckboxChange = (id: number) => {
    const taskToAnimate = tasks.find(task => task.id === id);
    if (!taskToAnimate) return;

    // First, mark the task as animating
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, isAnimating: true } : task
    ));

    // After animation starts, update completion and sort
    setTimeout(() => {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed, isAnimating: false } : task
        );
        return [...updatedTasks.sort((a, b) => Number(a.completed) - Number(b.completed))];
      });
    }, 500); // Match this with CSS animation duration
  };

  const addTask = () => {
    const newTaskId = getNextTaskId();
    setTasks([...tasks, { id: newTaskId, text: "", completed: false }]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
          <button className="btn btn-outline-light btn-sm px-4">Create Group</button>
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
              <h2 className="text-light mb-3 text-center text-md-start">Today</h2>

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
                      placeholder={`Task ${task.id}`}
                      className={`taskcolor form-control bg-transparent ${
                        task.completed ? "completed-task" : ""
                      }`}
                      value={task.text}
                      onChange={(e) => handleTaskChange(task.id, e.target.value)}
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
      </div>
    </div>
  );
};

export default TaskPage;