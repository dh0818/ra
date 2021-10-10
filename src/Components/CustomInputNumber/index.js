import React, { useState, useRef, useEffect } from "react";
import styles from "./style.css";

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [isPlus, setIsPlus] = useState(false);
  const [event, setEvent] = useState(null);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const onMouseDown = () => {
    event.target.name = name;
    let newVal;

    if (isPlus) {
      newVal = +value + step;
      if (newVal > max) return;
      event.target.value = newVal;
    } else {
      newVal = +value - step;
      if (newVal < min) return;
      event.target.value = newVal;
    }

    onChange(event);
  };

  useInterval(onMouseDown, isMouseDown ? 100 : null);

  return (
    <div
      className='customInputNum'
      tabIndex={1}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          e.target.name = name;
          e.target.value = value;
          onBlur(e);
        }
      }}
    >
      <button
        className='mpButton mButton'
        onMouseDown={(e) => {
          let newVal = +value - step;
          if (newVal < min) return;
          setMouseDown(true);
          setIsPlus(false);
          setEvent(e);
          e.target.name = name;
          e.target.value = newVal;
          onChange(e);
        }}
        onMouseUp={() => {
          setMouseDown(false);
          setEvent(null);
        }}
        disabled={disabled}
        style={
          disabled
            ? { backgroundColor: "#C6C6C6" }
            : { backgroundColor: "White" }
        }
      ></button>
      <input
        type='number'
        className='inputNum'
        value={value}
        onChange={(e) => {
          e.target.name = name;
          if (e.target.value > max) e.target.value = max;
          else if (e.target.value < min) e.target.value = min;
          onChange(e);
        }}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        style={
          disabled
            ? { backgroundColor: "#C6C6C6" }
            : { backgroundColor: "White" }
        }
      />
      <button
        className='mpButton pButton'
        onMouseDown={(e) => {
          let newVal = +value + step;
          if (newVal > max) return;
          setMouseDown(true);
          setIsPlus(true);
          setEvent(e);
          e.target.name = name;
          e.target.value = newVal;
          onChange(e);
        }}
        onMouseUp={() => {
          setMouseDown(false);
          setEvent(null);
        }}
        disabled={disabled}
        style={
          disabled
            ? { backgroundColor: "#C6C6C6" }
            : { backgroundColor: "White" }
        }
      ></button>
    </div>
  );
};

export default CustomInputNumber;
