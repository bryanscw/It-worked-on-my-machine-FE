import React from "react";

export default function Buttons(props) {
  const label =
    props.timingEvents.length % 2 === 0
      ? //even is stop button
        "Start"
      : //odd is start button
        "Stop";

  //in our scenario, we do not need to have buttons, we will be tying this to the obstacle
  //calling the handleClick function from the index.js under src
  return (
    <div className="buttons">
      <button onClick={props.handleClick}>{label}</button>
    </div>
  );
}
