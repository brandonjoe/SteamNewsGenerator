import React from 'react';
import {Switch, Route} from  'react-router-dom';
import './App.css';
import Landing from './Landing/Landing.js'
import Page from './Page/Page.js'
import Default from './Default/Default'
function App() {
  return (
    <div className="App">
      <Switch>
      <Route path= {"/"} exact component={Landing}/>
      <Route path= {"/:id/:value"} exact component={Page}/>
      <Route component={Default}/>
      </Switch>
        
    </div>
  );
}

export default App;
