import React, { useState } from "react";
import Room from "../Room";
import styles from "./style.css";

const RoomAllocation = ({ guest, room, onChange }) => {
  const [notAssignedNum, setNotAssignedNum] = useState(guest - room);

  const [res, setRes] = useState(() => {
    let arr = [];
    for (let i = 0; i < room; i++) arr.push({ adult: 1, child: 0 });
    return arr;
  });

  const calcNotAssigned = () => {
    let total = 0;

    for (let obj of res) {
      total += obj.adult;
      total += obj.child;
    }

    setNotAssignedNum(guest - total);
  };

  const roomRows = () => {
    let rows = [];

    for (var i = 0; i < room; i++) {
      rows.push(
        <Room
          key={i}
          id={i}
          dis={guest === room}
          roomRes={res[i]}
          notAssignedNum={notAssignedNum}
          onChange={handleOnChange}
        />
      );

      if (i < room - 1)
        rows.push(
          <div className='lineContainer'>
            <hr className='line' />
          </div>
        );
    }

    return rows;
  };

  const handleOnChange = (id, roomRes) => {
    let newR = [...res];
    let roomR = { ...newR[id] };
    roomR.adult = roomRes.adult;
    roomR.child = roomRes.child;
    newR[id] = roomR;
    setRes(newR);
    calcNotAssigned();
    onChange(res);
  };

  return (
    <div className='roomAllocation'>
      <div className='title'>
        住客人數 : {guest}人 / {room}房
      </div>
      <div className='notYetAssign'>尚未分配人數 : {notAssignedNum}人</div>
      {roomRows()}
    </div>
  );
};

export default RoomAllocation;
