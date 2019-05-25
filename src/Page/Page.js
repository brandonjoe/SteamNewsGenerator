import React, { Component } from "react";
import Results from "../Results/Results";
import classes from "./Page.module.css";
import { Link } from "react-router-dom";
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      s: "s",
      m: "s"
    };
  }
  //#3a9ed8
  componentWillMount() {
    const getpersonaname = () => { //get the name of the steamID
      return fetch(
        `https://ancient-dusk-43980.herokuapp.com/${this.props.match.params.id}/name`
      )
        .then(response => response.json())
        .then(data => {
          return data;
        });
    };
    getpersonaname().then(val => {
      this.setState({
        name: val.response.players[0].personaname
      });
    });
    if (this.props.location.pathname.endsWith("/1")) {
      //check to see if they put more than 1 hour, if they did, "hours" is plural, if they didn't "hour" is singular without "s"
      this.setState({
        m: ""
      });
    }
    if (this.props.location.pathname.includes("/1/")) {
      this.setState({
        s: ""
      });
    }
  }
  render() {
    let pathArray = this.props.location.pathname.split("/"); //we need to split the array to pass in steamID and hours as props
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          Hey <span style={{color: "#3a9dd7"}}>{this.state.name}</span>, here's news within the past{" "}
          <span className={classes.amount}>{pathArray[3]}</span> month
          {this.state.m} for games you've played recently, as well as games
          you've played for more than{" "}
          <span className={classes.hour}>{pathArray[2]}</span> hour
          {this.state.s}. If the list is smaller than you think, check your
          steam privacy settings!
        </div>
        <Link
          style={{ textDecoration: "none" }}
          className={classes.link}
          to={`/`}
        >
          <div className={classes.button}>New Search</div>{" "}
        </Link>
        <Results
          steamID={pathArray[1]}
          value={pathArray[2]}
          months={pathArray[3]}
        />
      </div>
    );
  }
}

export default Page;
