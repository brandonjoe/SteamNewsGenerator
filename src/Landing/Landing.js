import React, { Component } from "react";
import {Link} from 'react-router-dom';
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
      <div>
        <input type="search" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="Enter steam ID"/>
      <Link to={`/${this.state.inputValue}`}><div>search</div> </Link>
      </div>
    );
  }
}

export default Landing;
