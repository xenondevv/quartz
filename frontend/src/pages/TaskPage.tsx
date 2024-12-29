import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Logo from "../assets/MainProfile.png";
import st from "../assets/stickman.svg";

const TaskPage = () => {
  const [tasks, setTasks] = useState<string[]>(["Task 1", "Task 2", "Task 3", "Task 4"]);
  const [listName, setListName] = useState<string>("");

  const handleTaskChange = (index: number, value: string) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = value;
      return newTasks;
    });
  };

  const addTask = () => {
    setTasks((prevTasks) => [...prevTasks, ""]);
  };

  const deleteTask = (index: number) => {
    console.log(`Deleting task at index: ${index}`);
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("Tasks array after render:", tasks);
  }, [tasks]);

  return (
    <div className="bod min-h-screen p-4">
      <div
        className="bod container mx-auto bg-black rounded-4 p-4"
        style={{ maxWidth: "1000px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <button className="btn btn-outline-light btn-sm px-4">Create Group</button>
          <img src={Logo} alt="Quartz Logo" className="w-8 h-8" height="50px" />
          <button className="btn btn-outline-light btn-sm px-4">Join Group</button>
        </div>

        <div className="bg-black rounded-4 p-4">
          <h1 className="text-light text-center mb-4">To-do List</h1>

          <div className="row">
            <div className="col-md-8">
              <h2 className="text-light mb-3">Today</h2>

              <input
                type="text"
                placeholder="List Name"
                className="form-control bg-transparent text-light mb-4 w-25"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                style={{ border: "1px solid #666" }}
              />

              <div className="d-flex flex-column gap-3">
                {tasks.map((task, index) => (
                  <div key={index} className="d-flex align-items-center gap-3">
                    {/* Checkbox inside the form, styled to be circular and white */}
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input custom-checkbox"
                        id={`task-${index}`}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={`Task ${index + 1}`}
                      className="form-control bg-transparent text-light"
                      value={task}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      style={{ border: "1px solid #666" }}
                    />
                    <button
                      onClick={() => deleteTask(index)}
                      className="btn text-secondary p-0 d-flex align-items-center justify-content-center"
                      style={{
                        cursor: "pointer", // Clear indication it's clickable
                        padding: "10px", // Make the button larger
                        position: "relative", // Ensure it's not obstructed
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
              >
                Add Task
              </button>
            </div>

            {/* Side image column */}
            <div className="col-md-4 d-flex justify-content-center pt-4" style={{ marginTop: '20px' }}>
              <img src={st} alt="Stick Figure" className="w-40 opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
