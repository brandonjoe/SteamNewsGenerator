import React, { Component } from "react";
import {Link} from 'react-router-dom';
import classes from "./Landing.module.css";
//not played in 2 weeks 76561198018232960 3dayrespawn
//has played 2 games in 2 weeks kast master
//plays lots of games
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  componentDidMount() {
   
    
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
    console.log(this.state)
  }
  render() {
    
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <div className={classes.header}>Steam News Generator</div>
          <div className={classes.subheader}>Recent news for games you've played!</div>
        </div>
        <div class={classes.main}>
          <input className={classes.input} type="search" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="Enter steam ID"/>
      <Link style={{'text-decoration': 'none'}}  className={classes.link} to={`/${this.state.inputValue}`}><div className={classes.button}>search</div> </Link></div>
        
      </div>
    );
  }
}

export default Landing;
