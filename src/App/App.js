import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from 'react'
import landing from "../pages/landing";
import dashboard from "../pages/dashboard";
import login from "../pages/login";
import register from "../pages/register"
import '../css/main.css'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={landing}/>
                <Route exact path="/dashboard" component={dashboard}/>
                <Route exact path="/login" component={login}/>
                <Route exact path="/register" component={register}/>
            </Switch>
        </Router>
    );
}

export default App;
