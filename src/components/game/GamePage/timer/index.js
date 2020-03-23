import React from "react";
import ElapsedTime from "../timer/elapsed";
import Buttons from "../timer/button";
import "./styles.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //saving some timing events as an array
      //start, pause >> start, pause >> start, pause
      timingEvents: [],
      nonce: 0
    };

    //override the 'this' keyword to point to the component else the this keyword inside addTimeEvent() method will be pointing to the method instead of the component instance
    this.addTimerEvent = this.addTimerEvent.bind(this);
    this.tick = this.tick.bind(this);
    //fire every millisecond
    this.poll = setInterval(this.tick, 1000);
  }

  addTimerEvent() {
    this.setState({
      timingEvents: [...this.state.timingEvents, new Date()]
    });
  }

  tick() {
    this.setState(prevState => ({ nonce: prevState.nonce + 1 }));
  }
  render() {
    //in our gaming scenario, the handleClick event should be binding towards the obstacle
    return (
      <div className="container">
        <div className="move">
          <ElapsedTime timingEvents={this.state.timingEvents} />
          <Buttons
            handleClick={this.addTimerEvent}
            timingEvents={this.state.timingEvents}
          />
        </div>
      </div>
    );
  }
}

export default Timer;
