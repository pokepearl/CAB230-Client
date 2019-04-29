import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GetListOfOffences, registerUser, loginUser, RunSearch} from './api';
//fakemail@notreal.com
//password


// General button render, display buttons to call different searches
function OffenceButtons() {
    return (
        <div className="crimeBtns">
            <button onClick={startOffenceRender}>Offences</button>
            <button onClick={LoadSearchTool}>Search Data</button>
        </div>
    );
}

function LoadSearchTool() {
    ReactDOM.render(<DrawSearchTool />, document.getElementById('searchTool'));
}
function DrawSearchTool() {
    return (
        <div className="searchTool">
            <form onSubmit={(event) => {
                event.preventDefault();
                const usrQuery = document.getElementById('query').value;
                const usrQuerySafe = encodeURIComponent(usrQuery);
                const finalQuery = '?offence='+usrQuerySafe;
                document.getElementById('searchTool').innerHTML = finalQuery;
                RunSearchLoader(finalQuery);
                
            }}>
            <label htmlFor="query">Search Query:</label>
            <input id="query" name="query" />
            <button type="submit">Search</button>
            </form>
        </div>
    );
}
function RunSearchLoader(query) {
    
    ReactDOM.render(<RunSearchLoaderFinal query={query} />, document.getElementById("printDemo"));
}
function RunSearchLoaderFinal(query) {
    const {loading, result, error} = RunSearch(query);
    //console.log(JSON.stringify(result));
    return (
        <div></div>
    );
}

//Template for creating entries
function ResultHT(props) {
    return (
        <div className="ResultHT">
            <tr><td style={{border: '1px solid black'}}>{props.title}</td></tr>
        </div>
    );
}
function startOffenceRender() {
    ReactDOM.render(<RenderOffences />, document.getElementById("printDemo"));
}
function RenderOffences() {
    const {loading, result, error} = GetListOfOffences();
    return (
        <div className="RenderOffences">
        <table style={{border: '1px solid black'}}>
                <tbody>
                    {result.map(resp => (
                        <ResultHT title={resp} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}









const genLoginForm = () => {
    ReactDOM.render(<MakeLoginForm />, document.getElementById('loginForm'));
};
const genSignupForm = () => {
    ReactDOM.render(<MakeRegisterForm />, document.getElementById('loginForm'));
};
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
            <button type="submit">Submit</button>
            </form>
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
                //console.log(usrEmail);
                //console.log(usrPwd);
            }}>
            <label htmlFor="email">Email Address:</label>
            <input id="emailForm" name="email" type="email" /><br/>
            <label htmlFor="pwd">Password:</label>
            <input id="pwdForm" name="pwd" type="password" /><br/>
            <button type="submit">Submit</button>
            </form>
        </div>
    );
}


function LoginForm() {
    return (
        <div className="LoginFormButton">
            <button onClick={genLoginForm}>Login</button>
            <button onClick={genSignupForm}>Register</button>
        </div>
    );
};

ReactDOM.render(<LoginForm />, document.getElementById('loginFormButton'));
ReactDOM.render(<OffenceButtons />, document.getElementById('crimeBtns'));
