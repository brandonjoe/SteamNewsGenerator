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
      disabled: true,
      s: "s"
    };
  }
  componentDidMount() {
    fetch(`https://ancient-dusk-43980.herokuapp.com/`) //I make this call to the server to wake up heroku's free server.
      .then(res => res.json()) //This call does nothing, the freeplan puts the server to sleep after 30 minutes
      .then(data => {
        //This call will wake the server up so by the time the user gets to the next page, it's alread loaded.
        console.log(data);
      });
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
      console.log(evt.target.value.length);
      console.log(this.state.disabled);
    } else {
      this.setState({
        disabled: true
      });
      console.log(evt.target.value.length);
      console.log(this.state.disabled);
    }
    this.setState({
      inputValue: evt.target.value
    });
  }
  render() {
    const { value } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <div className={classes.header}>Steam News Generator</div>
          <div className={classes.subheader}>
            Recent news for your most recent and favorite games!
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
            <Link
              style={{ textDecoration: "none" }}
              className={classes.link}
              to={`/${this.state.inputValue}/${this.state.value}`}
            >
              <button disabled={this.state.disabled} className={classes.button}>
                Search games above {value} hour{this.state.s}
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
