import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from 'react'
import dashboard from "../pages/dashboard";
import '../css/main.css'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={dashboard}/>
            </Switch>
        </Router>
    );
}

export default App;
