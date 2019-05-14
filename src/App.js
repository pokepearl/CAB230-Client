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
                <Link to="/">Login</Link>  
                <Link to="/register/">Register</Link>  
                <Link to="/search/">Search</Link>  
                <Link to="/offences/">Offences</Link>
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
    return <MakeRegisterForm />
}
function RouteSearch() {
    return <h2>Search</h2>;
}
function RouteOffences() {
    return <RenderOffencePage />;
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
            <Link to="/register/">Register Here</Link>
        </div>
    );
}
function MakeRegisterForm() {
    return (
        <div className="loginForm">
            <form onSubmit={(event) => {
                event.preventDefault();
                const usrEmail = document.getElementById('emailForm').value;
                const usrPwd = document.getElementById('pwdForm').value;
                registerUser(usrEmail, usrPwd);
            }}>
            <label htmlFor="email">Email Address:</label>
            <input id="emailForm" name="email" type="email" /><br/>
            <label htmlFor="pwd">Password:</label>
            <input id="pwdForm" name="pwd" type="password" /><br/>
            <button type="submit">Register</button>
            </form>
        </div>
    );
}

function RenderOffencePage() {
    const {loading, result, error} = GetListOfOffences();
    return (
        <div>
            <table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
            <tbody>
            {result.map(resp => (
                    <OffenceTable offence={resp} />
                ))}
            </tbody>
            </table>
        </div>
    );
}

function OffenceTable(props) {
    return (
            <tr style={{border: '1px solid black'}}>
                <td style={{border: '1px solid black'}}>{props.offence}</td>
            </tr>

    );
}
