import React, { useState } from "react";
import CustomInputNumber from "../CustomInputNumber";
import styles from "./style.css";

const Room = ({ id, dis, roomRes, notAssignedNum, onChange }) => {
  const [aValue, setAValue] = useState(+roomRes.adult);
  const [cValue, setCValue] = useState(+roomRes.child);
  const [aMin, setAMin] = useState(1);
  const [cMin, setCMin] = useState(0);
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(dis);
  const ROOM_SIZE = 4;

  const handleAOnChange = (e) => {
    // console.log("handleAOnChange:", e.target.name, e.target.value);
    setAValue(e.target.value);
    roomRes.adult = +e.target.value;
    onChange(id, roomRes);
  };

  const handleCOnChange = (e) => {
    // console.log("handleCOnChange:", e.target.name, e.target.value);
    setCValue(e.target.value);
    roomRes.child = +e.target.value;
    onChange(id, roomRes);
  };

  const handleAOnBlur = (e) => {
    // console.log("handleAOnBlur:", e.target.name, e.target.value);
  };

  const handleCOnBlur = (e) => {
    // console.log("handleCOnBlur:", e.target.name, e.target.value);
  };

  const calcAMax = () => {
    let val = Math.min(+aValue + notAssignedNum, ROOM_SIZE - cValue);
    return val;
  };

  const calcCMax = () => {
    let val = Math.min(+cValue + notAssignedNum, ROOM_SIZE - aValue);
    return val;
  };

  return (
    <div className='room'>
      <div className='title1'>房間 : {+aValue + +cValue}人</div>
      <div className='panel'>
        <span className='leftPart'>
          <div className='title2'>大人</div>
          <div className='description'>年齡 20+</div>
        </span>
        <span className='rightPart'>
          <CustomInputNumber
            min={aMin}
            max={calcAMax()}
            step={step}
            name={"CustomInputNumber1"}
            value={aValue}
            disabled={disabled}
            onChange={handleAOnChange}
            onBlur={handleAOnBlur}
          />
        </span>
      </div>
      <div className='panel'>
        <span className='leftPart'>
          <div className='title2'>小孩</div>
        </span>
        <span className='rightPart'>
          <CustomInputNumber
            min={cMin}
            max={calcCMax()}
            step={step}
            name={"CustomInputNumber2"}
            value={cValue}
            disabled={disabled}
            onChange={handleCOnChange}
            onBlur={handleCOnBlur}
          />
        </span>
      </div>
    </div>
  );
};

export default Room;
