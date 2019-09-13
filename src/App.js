import React from 'react';
import './App.css';
import Timer from './components/Timer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '', 
      timecap: 0, 
      time: 0, 
      intervals: 1, 
      rest: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ timecap: this.state.value });
  }
  render() {
    const OPTIONS = { 
      delay: 100, 
      cap: this.state.time, 
      intervals: this.state.intervals, 
      rest: this.state.rest 
    };

    return (
      <div className="Timer">
        <div className="Timer-header">
          <h2>HeadDesk</h2>
        </div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Time(s):
            <input className="Timer-button" type="text" name="time" value={this.state.time} onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Intervals:
            <input className="Timer-button" type="text" name="intervals" value={this.state.intervals} onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Rest(s):
            <input className="Timer-button" type="text" name="rest" value={this.state.rest} onChange={this.handleChange}/>
          </label>
          <br />
          <input className="Timer-button" type="submit" value="SET" />
        </form>
        <Timer options={OPTIONS} />
      </div>
    );
  }
}

export default App;
