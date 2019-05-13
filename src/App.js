import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GetListOfOffences, updateToken, registerUser, loginUser, RunSearch, GetListOfAreas, setCaches, GetListOfAges, GetListOfGenders, GetListOfYears} from './api';
//fakemail@notreal.com
//password

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/register/">Register</Link>
                        </li>
                        <li>
                            <Link to="/search/">Search</Link>
                        </li>
                        <li>
                            <Link to="/offences/">Offences</Link>
                        </li>
                    </ul>
                    <Route path="/" exact component={RouteLogin} />
                    <Route path="/register/" component={RouteRegister} />
                    <Route path="/search/" component={RouteSearch} />
                    <Route path="/offences/" component={RouteOffences} />
                </nav>
            </div>
        </Router>
    )

}
export default AppRouter;

function RouteLogin() {
    return <h2>Login</h2>;
}
function RouteRegister() {
    return <h2>Login</h2>;
}
function RouteSearch() {
    return <h2>Login</h2>;
}
function RouteOffences() {
    return <h2>Login</h2>;
}