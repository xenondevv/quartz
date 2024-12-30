import { useState } from "react";

const GroupPage = () => {
  const [groups] = useState([
    { id: 1, name: "Project Alpha", members: 5 },
    { id: 2, name: "Design Team", members: 8 },
    { id: 3, name: "Marketing", members: 4 },
    { id: 4, name: "Development", members: 12 }
  ]);

  const handleGroupClick = (groupId: number) => {
    console.log(`Opening group ${groupId}`);
    // Handle navigation/modal open here
  };

  return (
    <div className="min-h-screen p-4" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="container mx-auto bg-black rounded-4 p-4" style={{ maxWidth: "1000px", height: "100%" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <button className="btn btn-outline-light btn-sm px-4">Create Group</button>
          <button className="btn btn-outline-light btn-sm px-4">Join Group</button>
        </div>

        <div className="bg-black rounded-4 p-4" style={{ height: "calc(100% - 60px)", overflow: "hidden" }}>
          <h1 className="text-white text-center mb-8 text-2xl">Your Groups</h1>

          <div style={{ height: "calc(100% - 60px)" }}>
            <div className="overflow-x-auto pb-4" style={{ 
              msOverflowStyle: "none",
              scrollbarWidth: "none"
            }}>
              <div className="flex gap-4 min-w-min p-2">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => handleGroupClick(group.id)}
                    className="flex-none w-64 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <h3 className="text-white text-lg mb-2 p-2 border-2 border-white rounded-full">
                      {group.name}
                    </h3>
                    <p className="text-gray-400 text-sm p-2 border-2 border-white rounded-full">
                      {group.members} members
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
