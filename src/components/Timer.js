import React, { PropTypes } from 'react'
import SecondsTohhmmss from '../utils/secondstodate'

let offset = null, interval = null

export default class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      type: false, 
      clock: 0, 
      time: '00:00:00.00', 
      timeCap: props.options.cap, 
      interval: 0, 
      rest: 0, 
      background: 'white'
    }
  }
  componentWillUnmount() {
    this.pause()
  }
  play() {
    this.setState({
      timeCap: this.props.options.cap, 
      interval: this.props.options.intervals
    });
    if (!interval) {
      offset = Date.now();
      interval = setInterval(this.update.bind(this), this.props.options.delay);
      this.setState({ background: '#588C7E' });
    }
  }
  pause() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
  reset() {
    this.pause();
    let clockReset = 0;
    this.setState({clock: clockReset });
    let time = SecondsTohhmmss(clockReset / 1000);
    this.setState({time: time, background: 'white', interval: 0, rest: 0 });
  }
  update() {
      //If we are still in an interval
    if (this.state.clock < (this.state.timeCap * 1000)) {
      let clock = this.state.clock
      clock += this.calculateOffset()
      this.setState({clock: clock })
      let time = SecondsTohhmmss(clock / 1000)
      this.setState({time: time })
    } else {
      //Interval has ended
      if (this.state.interval > 1) {
        //reset clock
        let clockReset = 0
        this.setState({clock: clockReset })
        let time = SecondsTohhmmss(clockReset / 1000)
        this.setState({time: time});
        if (this.state.type) {
          this.setState({
            timeCap: this.props.options.cap,
            interval: --this.state.interval,
            background: '#588C7E'
          });
        } else {
          this.setState({
            timeCap: this.props.options.rest,
            background: '#2a52be'
          });
        }
        let curType = this.state.type;
        this.setState({ type: !curType });
      }
    }
  }

  calculateOffset() {
    let now = Date.now()
    let newOffset = now - offset
    offset = now
    return newOffset
  }

  render() {
    const timerStyle = {
      margin: "0px",
      padding: "2em",
      background: this.state.background
    };

    return (
      <div style={timerStyle}>
        <h3 className="Timer-seconds"> {this.state.time}</h3>
        <br />
        <button className="Timer-button" onClick={this.reset.bind(this)}>RESET</button>
        <button className="Timer-button" onClick={this.play.bind(this)}>PLAY</button>
        <button className="Timer-button" onClick={this.pause.bind(this)}>PAUSE</button>
      </div>
    )
  }
}

Timer.propTypes = {
  options: PropTypes.object
}