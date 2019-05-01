import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GetListOfOffences, registerUser, loginUser, RunSearch, GetListOfAreas, setCaches, GetListOfAges, GetListOfGenders, GetListOfYears} from './api';
//fakemail@notreal.com
//password

let offenceCache = null;
let areaCache = "ALL";
let ageCache = "ALL";
let genderCache = "ALL";
let yearCache = "ALL";
let monthCache = "ALL";

// General button render, display buttons to call different searches
function OffenceButtons() {
    return (
        <div className="crimeBtns">
            <br/><button onClick={LoadSearchTool}>Search Data</button>
        </div>
    );
}

function LoadSearchTool() {
    ReactDOM.render(<RenderOffences />, document.getElementById("OffenceList"));
    ReactDOM.render(<RenderAreas />, document.getElementById("AreaList"));
    ReactDOM.render(<RenderAges />, document.getElementById("AgeList"));
    ReactDOM.render(<RenderGenders />, document.getElementById("GenderList"));
    ReactDOM.render(<RenderYears />, document.getElementById("YearList"));
    ReactDOM.render(<RenderMonths />, document.getElementById("MonthList"));
    ReactDOM.render(<DrawSearchTool />, document.getElementById('searchTool'));
}
function DrawSearchTool() {
    return (
        <div className="searchTool">
            <form onSubmit={(event) => {
                event.preventDefault();
                const finalQuery = 'offence='+encodeURIComponent(offenceCache);
                RunSearchLoader(finalQuery);
            }}>
            
            <button type="submit">Search</button>
            </form>
        </div>
    );
}
function RunSearchLoader(query) {
    setCaches(query, encodeURIComponent(areaCache), encodeURIComponent(ageCache), encodeURIComponent(genderCache), encodeURIComponent(yearCache), encodeURIComponent(monthCache));
    ReactDOM.render(<RunSearchLoaderFinal />, document.getElementById("searchResults"));
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
function onChangeOptionOffence(event) {
    var id = event.nativeEvent.target.selectedIndex;
    offenceCache = event.nativeEvent.target[id].text;
}
function onChangeOptionArea(event) {
    var id = event.nativeEvent.target.selectedIndex;
    areaCache = event.nativeEvent.target[id].text;
}
function onChangeOptionAge(event) {
    var id = event.nativeEvent.target.selectedIndex;
    ageCache = event.nativeEvent.target[id].text;
}
function onChangeOptionGender(event) {
    var id = event.nativeEvent.target.selectedIndex;
    genderCache = event.nativeEvent.target[id].text;
}
function onChangeOptionYear(event) {
    var id = event.nativeEvent.target.selectedIndex;
    yearCache = event.nativeEvent.target[id].text;
}
function onChangeOptionMonth(event) {
    var id = event.nativeEvent.target.selectedIndex;
    monthCache = event.nativeEvent.target[id].text;
}

//Template for creating entries
function ResultHT(props) {
    return (
        <option value={props.title}>{props.title}</option>
    );
}

function RenderOffences() {
    const {loading, result, error} = GetListOfOffences();
    return (
        <div>
            <label>Offences: </label>
            <select onChange={onChangeOptionOffence}>
            <option value="---">---</option>
            {result.map(resp => (
                    <ResultHT title={resp} />
                ))}
            </select>
        </div>
    );
}

function RenderAreas() {
    const {loading, result, error} = GetListOfAreas();
    return (
        <div>
            <label>Areas: </label>
            <select onChange={onChangeOptionArea}>
            <option value="ALL">ALL</option>
            {result.map(resp => (
                    <ResultHT title={resp} />
                ))}
            </select>
        </div>
    );
}
function RenderAges() {
    const {loading, result, error} = GetListOfAges();
    return (
        <div>
            <label>Ages: </label>
            <select onChange={onChangeOptionAge}>
            <option value="ALL">ALL</option>
            {result.map(resp => (
                    <ResultHT title={resp} />
                ))}
            </select>
        </div>
    );
}
function RenderGenders() {
    const {loading, result, error} = GetListOfGenders();
    return (
        <div>
            <label>Genders: </label>
            <select onChange={onChangeOptionGender}>
            <option value="ALL">ALL</option>
            {result.map(resp => (
                    <ResultHT title={resp} />
                ))}
            </select>
        </div>
    );
}
function RenderYears() {
    const {loading, result, error} = GetListOfYears();
    return (
        <div>
            <label>Years: </label>
            <select onChange={onChangeOptionYear}>
            <option value="ALL">ALL</option>
            {result.map(resp => (
                    <ResultHT title={resp} />
                ))}
            </select>
        </div>
    );
    
}
function RenderMonths() {
    return (
        <div>
            <label>Months: </label>
            <select onChange={onChangeOptionMonth}>
            <option value="ALL">ALL</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            </select>
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
