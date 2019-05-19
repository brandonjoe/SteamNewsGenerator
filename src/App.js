import React from 'react';
import {Switch, Route} from  'react-router-dom';
import './App.css';
import Landing from './Landing/Landing.js'
import Results from './Results/Results.js'

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path= {"/"} exact component={Landing}/>
        <Route path= {"/:id"} exact component={Results}/>
      </Switch>
        
    </div>
  );
}

export default App;
