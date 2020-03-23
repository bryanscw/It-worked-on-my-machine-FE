import React from "react";
import formatDuration from "format-duration";

function elapsedTime(events) {
  //return "00:00";
  let elapsed = 0;
  for (let i = 0; i < events.length; i += 2) {
    const start = events[i];
    const stop = events[i + 1] || new Date();
    elapsed += stop - start;
  }
  return elapsed;
}

export default function ElapsedTime(props) {
  return (
    <div className="elapsed-time">
      {formatDuration(elapsedTime(props.timingEvents))}
    </div>
  );
}
