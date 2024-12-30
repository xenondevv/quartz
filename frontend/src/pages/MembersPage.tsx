import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MembersPage = () => {
    const navigate = useNavigate();
    const [viewTaskModal, setviewTaskModal] = useState(false);  // Modal visibility state for Create Group

    const flipViewTask = () => { 
        setviewTaskModal(!viewTaskModal);
    }
    
  // Handle opening of Create Group modal
  const handleCreateGroupClick = () => {
    
  };

  // Handle opening of Join Group modal
  const handleJoinGroupClick = () => {
    
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
          <div className="container mx-auto bg-black rounded-4 p-0" style={{ minHeight: "2000px", maxWidth: "800px", }}> {/* Allow scrolling on content */}
        {/* Create and Join Group Buttons */}
        <div className="d-flex justify-content-between align-items-center px-3" style={{ paddingTop: "20px", marginBottom: "20px" }}>
          <button
            onClick={handleCreateGroupClick}  // Open modal on button click
            className="btn btn-outline-light btn-sm px-6 py-3 w-full rounded-3 hover:bg-white/10 transition-all duration-300">
                Leave Group
          </button>
          <button
            onClick={handleJoinGroupClick}  // Open modal for Join Group
            className="btn btn-outline-light btn-sm px-6 py-3 w-full rounded-3 hover:bg-white/10 transition-all duration-300">
           Delete Group
          </button>
        </div>

        {/* Group Title */}
        <h1 className="text-white text-2xl font-medium text-center mb-4" style={{ marginTop: "20px" }}>
          Group 1
        </h1>

        {/* Members Section */}
        <h2 className="text-white text-xl font-medium text-center mb-6" style={{ marginBottom: "30px" }}>
          Members
        </h2>

        {/* Members List */}
        <div className="space-y-3 mb-8 px-4">
          {['Person 1', 'Person 2', 'Person 3', 'Person 3', 'Person 3', 'Person 3'].map((person, index) => (
            <div key={index} className="fl items-center justify-between border border-white/20 rounded px-4 py-2" style={{ marginBottom: "10px" }}>
              <span className="text-white">{person}</span>
              {/* "View Tasks" button on the extreme right */}
              <button
                onClick={() => flipViewTask()}
                className="btn btn-outline-light btn-sm px-6 py-3 rounded-3 hover:bg-white/10 transition-all duration-300 ml-auto">
                View Tasks
              </button>
            </div>
          ))}
        </div>
        
        {viewTaskModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex",
          justifyContent: "center", alignItems: "center", zIndex: 50
        }}>
          <div style={{
            backgroundColor: "black", padding: "20px", borderRadius: "10px",
            width: "80%", maxWidth: "500px", textAlign: "center", border: "2px solid white"
          }}>
            <h2 className="text-white text-xl mb-4">MC's tasks</h2>            
            {/* Flex container for side-by-side buttons with a gap and margin */}
                          <div style={{ display: "flex",flexDirection: "column" , gap: "20px", justifyContent: "center", marginTop: "20px" }}>
                              
                          <div className="space-y-3 mb-8 px-4">
          {['Task 1', 'Task 2', 'Task 3', 'Task 3', 'Task 3', 'Task 3'].map((person, index) => (
            <div key={index} className="fl items-center justify-between border border-white/20 rounded px-4 py-2" style={{ marginBottom: "10px" }}>
              <span className="text-white">{person}</span>
              {/* "View Tasks" button on the extreme right */}
            </div>
          ))}
        </div>
              {/* Cancel Button */}
              <button
                onClick={() => flipViewTask()}  // Close modal without saving
                className="bg-black text-white px-6 py-3 rounded-3 border-2 border-white hover:bg-white/10 transition-all duration-300 w-full">
                Back
              </button>
            </div>
          </div>
        </div>
      )}


      </div>
    </div>
  );
};

export default MembersPage;
