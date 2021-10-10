import React, { useState } from "react";
import CustomInputNumber from "./Components/CustomInputNumber";

function App() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("CustomInputNumber");
  const [value, setValue] = useState(min);
  const [disabled, setDisabled] = useState(false);

  const handleOnChange = (e) => {
    console.log("handleOnChange:", e.target.name, e.target.value);
    setValue(e.target.value);
  };

  const handleOnBlur = (e) => {
    console.log("handleOnBlur:", e.target.name, e.target.value);
  };

  return (
    <div className='App'>
      <CustomInputNumber
        min={min}
        max={max}
        step={step}
        name={name}
        value={value}
        disabled={disabled}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </div>
  );
}

export default App;
