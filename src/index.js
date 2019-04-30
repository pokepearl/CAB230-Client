import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GetListOfOffences, registerUser, loginUser, RunSearch, setOffenceCache} from './api';
//fakemail@notreal.com
//password

let offenceCache = null;

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
                //const usrQuery = document.getElementById('query').value;
                const usrQuery = offenceCache;
                const usrQuerySafe = encodeURIComponent(usrQuery);
                const finalQuery = 'offence='+usrQuerySafe;
                document.getElementById('searchTool').innerHTML = finalQuery;
                RunSearchLoader(finalQuery);
            }}>
            
            <button type="submit">Search</button>
            </form>
        </div>
    );
}
function RunSearchLoader(query) {
    setOffenceCache(query);
    ReactDOM.render(<RunSearchLoaderFinal />, document.getElementById("printDemo"));
}
function RunSearchLoaderFinal() {
    const {loading, result, error} = RunSearch();
    const res2 = JSON.stringify(result);
    console.log(result);
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Local Government Area</th>
                    <th>Total</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                </thead>
                <tbody>
                    {result.map(resp => (
                        <ResultTable LGA={resp.LGA} total={resp.total} lat={resp.lat} lng={resp.lng} />
                    ))}
                </tbody>
            </table>
        </div>
        
    );
}

function ResultTable(props) {
    return (
            <tr>
                <td>{props.LGA}</td>
                <td>{props.total}</td>
                <td>{props.lat}</td>
                <td>{props.lng}</td>
            </tr>

    );
}
function onChangeOption(event) {
    var id = event.nativeEvent.target.selectedIndex;
    //alert('native: ' + event.nativeEvent.target[id].text);
    offenceCache = event.nativeEvent.target[id].text;
}

//Template for creating entries
function ResultHT(props) {
    return (
        <option value={props.title}>{props.title}</option>
        /*<div className="ResultHT">
            <tr><td style={{border: '1px solid black'}}>{props.title}</td></tr>
        </div>*/
    );
}
function startOffenceRender() {
    ReactDOM.render(<RenderOffences />, document.getElementById("printDemo"));
}
function RenderOffences() {
    const {loading, result, error} = GetListOfOffences();
    return (
        <div>
            <select onChange={onChangeOption}>
            <option value="---">---</option>
            {result.map(resp => (
                        <ResultHT title={resp} />
                    ))}
            </select>
        </div>
        /*<div className="RenderOffences">
        <table style={{border: '1px solid black'}}>
                <tbody>
                    {result.map(resp => (
                        <ResultHT title={resp} />
                    ))}
                </tbody>
            </table>
        </div>*/
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
