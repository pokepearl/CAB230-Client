import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GetListOfOffences, updateToken, registerUser, loginUser, RunSearch, GetListOfAreas, setCaches, GetListOfAges, GetListOfGenders, GetListOfYears} from './api';
//fakemail@notreal.com
//password

let getUrl = window.location;
let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" ;

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
    
    if (localStorage.getItem("JWT")===null) {
        return <MakeLoginForm />;
    } else {
        updateToken();
        window.location.href = baseUrl+"search/";
        return "";
    }
    
}
function RouteRegister() {
    return <h2>Register</h2>;
}
function RouteSearch() {
    return <h2>Search</h2>;
}
function RouteOffences() {
    return <h2>Offences</h2>;
}

//Returns the HTML code to create the login form and runs the code to call the API and get a token on login.
function MakeLoginForm() {
    return (
        <div className="loginForm">
            <form onSubmit={(event) => {
                event.preventDefault();
                const usrEmail = document.getElementById('emailForm').value;
                const usrPwd = document.getElementById('pwdForm').value;
                loginUser(usrEmail, usrPwd);
            }}>
            <label htmlFor="email">Email Address:</label>
            <input id="emailForm" name="email" type="email" /><br/>
            <label htmlFor="pwd">Password:</label>
            <input id="pwdForm" name="pwd" type="password" /><br/>
            <button type="submit">Login</button>
            </form>
        </div>
    );
}

