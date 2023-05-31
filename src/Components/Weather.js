import React, { useEffect, useRef, useState } from "react";

const Weather = () => {
  let inpVal = useRef(null);
  const [state, setState] = useState({
    location: {},
    current: {},
    condition: {},
    style: "none",
  });
  const { location, current, condition, style } = state;
  const search = () => {
    if (inpVal.current.value !== "") {
      fetch(
        "https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=$location=" +
          inpVal.current.value
      )
        .then((res) => res.json())
        .then((data) => {
          state.location = data.location;
          state.current = data.current;
          state.condition = data.current.condition;
          setState({ ...state, style: "block" });
        });
    } else {
      setState({ ...state, style: "none" });
    }
  };

  useEffect(() => {
    if (inpVal.current) {
      inpVal.current.focus();
    }
  }, []);

  return (
    <div className={`nothing ${condition.text}`}>
      <h1 style={{ color: "white" }}>Weather App</h1>
      <input placeholder="Search..." ref={inpVal} />
      <button onClick={search}>Search</button>
      <div className={style}>
        <img src={condition.icon} alt="" />
        <label className="city">
          {location.name},{location.country}
        </label>
        <label className="label">{location.localtime}&nbsp;Today</label>
        <h1 className="temp">{current.temp_c}°C</h1>
        <h1 className="text">{condition.text}</h1>
      </div>
    </div>
  );
};

export default Weather;
