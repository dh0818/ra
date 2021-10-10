import React, { useState } from "react";
import RoomAllocation from "./Components/RoomAllocation";

function App() {
  let guest = 10; // room <= guest <= (room * 4)
  let room = 3;

  return (
    <div className='App'>
      <RoomAllocation
        guest={guest}
        room={room}
        onChange={(result) => console.log(result)}
      />
    </div>
  );
}

export default App;
