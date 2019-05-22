import React, { Component } from 'react';
import classes from './Default.module.css';
import { Link } from "react-router-dom";
class Default extends Component {
    render() {
        return (
            <div className={classes.container}>
                 <h1>error</h1>
                <h2>page not found</h2>
                <h3>the requested URL <span className={classes.text}>{this.props.location.pathname}</span> was not found</h3>
                <Link style={{'textDecoration': 'none'}}  className={classes.link} to={`/`}><div className={classes.button}>Click here to go back</div> </Link>
            </div>
        );
    }
}

export default Default;