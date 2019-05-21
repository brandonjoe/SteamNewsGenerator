import React, { Component } from "react";
import Results from "../Results/Results";
import classes from "./Page.module.css";
import {Link} from 'react-router-dom';
class Page extends Component {
  render() {
    return (
  
        <div className={classes.container}>
          <div className={classes.title}>
            Here's a list of news for games you've played recently, as well as
            games you've put more than 100 hours in. If the list is small, check
            your steam privacy settings!
          </div>
           <Link style={{'text-decoration': 'none'}}  className={classes.link} to={`/`}><div className={classes.button}>New Search</div> </Link>
          <Results steamID={this.props.location.pathname} />
        </div>

    );
  }
}

export default Page;
