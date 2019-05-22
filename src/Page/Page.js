import React, { Component } from "react";
import Results from "../Results/Results";
import classes from "./Page.module.css";
import {Link} from 'react-router-dom';
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      s: "s"
    };
  }
componentDidMount(){
  if(this.props.location.pathname.endsWith("/1")){ //check to see if they put more than 1 hour, if they did, "hours" is plural, if they didn't "hour" is singular without "s"
    this.setState({
      s: ""
    })
  } 
}
  render() {
    let pathArray = this.props.location.pathname.split('/') //we need to split the array to pass in steamID and hours as props
    return (
  
        <div className={classes.container}>
          <div className={classes.title}>
            Here's news within the past 6 months for games you've played recently, as well as
            games you've played for more than {pathArray[2]} hour{this.state.s}. If the list is smaller than you think, check
            your steam privacy settings!
          </div>
           <Link style={{'textDecoration': 'none'}}  className={classes.link} to={`/`}><div className={classes.button}>New Search</div> </Link>
          <Results steamID={pathArray[1]} value={pathArray[2]} />
        </div>

    );
  }
}

export default Page;
