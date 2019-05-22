import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
var classNames = require("classnames");

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      value: 10,
      months: 6,
      disabled: true,
      s: "s",
      m: "s"
    };
  }
  componentDidMount() {

    fetch(`https://ancient-dusk-43980.herokuapp.com/440/news`) //I make this call to the server to wake up heroku's free server.
      .then(res => res.json()) //This call does nothing, the freeplan puts the server to sleep after 30 minutes
      .then(data => {
        //This call will wake the server up so by the time the user gets to the next page, it's alread loaded.
        console.log(data);
      });
  }
  handleChangeMonths = months => {
    this.setState({
      months: months
    })
     
    if (months == 1) {
      //toggles between "hours" and hour"
      this.setState({
        m: ""
      });
    } else {
      this.setState({
        m: "s"
      });
    }
    console.log(this.state.months)
  }
  handleChange = value => {
    this.setState({
      //set the state as value
      value: value
    });
    
    if (value == 1) {
      //toggles between "hours" and hour"
      this.setState({
        s: ""
      });
    } else {
      this.setState({
        s: "s"
      });
    }
  };

  updateInputValue(evt) {
    if (evt.target.value.length === 17) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });

    }
    this.setState({
      inputValue: evt.target.value
    });
  }
  render() {
    const { value, months } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <div className={classes.header}>Steam News Generator</div>
          <div className={classes.subheader}>
            Recent news within <span className={classes.amount}>{months}</span> month{this.state.m} for your most recent and favorite games!
          </div>
        </div>
        <div className={classes.main}>
          <input
            className={classes.input}
            type="search"
            value={this.state.inputValue}
            onChange={evt => this.updateInputValue(evt)}
            placeholder="Enter 17 digit steam ID"
          />

          <div className="slider">
            <Slider
              min={1}
              max={100}
              value={value}
              onChange={this.handleChange}
            />
            <div className="slider">
              <Slider
                min={1}
                max={12}
                step={1}
                value={months}
                onChange={this.handleChangeMonths}
              />
              <div className="value">{value}</div>
              <Link
              style={{ textDecoration: "none" }}
              className={classes.link}
              to={`/${this.state.inputValue}/${this.state.value}/${this.state.months}`}
            >
              <button disabled={this.state.disabled} className={classes.button}>
                Search games above <span className={classes.hour}>{value}</span> hour{this.state.s}
              </button>{" "}
            </Link>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
