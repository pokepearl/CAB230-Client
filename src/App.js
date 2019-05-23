import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GetListOfOffences, GetListOfOffences2, updateToken, registerUser, loginUser, RunSearch, GetListOfAreas, setCaches, GetListOfAges, GetListOfGenders, GetListOfYears} from './api';
import ReactTable from 'react-table';
import "react-table/react-table.css";
//fakemail@notreal.com
//password

let getUrl = window.location;
let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" ;

//Cache variables - used for tempoarily storing the data from search fields for later use.
let offenceCache = null;
let areaCache = "ALL";
let ageCache = "ALL";
let genderCache = "ALL";
let yearCache = "ALL";
let monthCache = "ALL";

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
    ReactDOM.render("", document.getElementById("table"));
    if (localStorage.getItem("JWT")===null) {
        return <MakeLoginForm />;
    } else {
        updateToken();
        
        
        window.location.href = baseUrl+"search/";
        return "";
        
    }
    
}
function RouteRegister() {
    ReactDOM.render("", document.getElementById("table"));
    return <MakeRegisterForm />
}
function RouteSearch() {
    ReactDOM.render("", document.getElementById("table"));
    return (
        <>
        <RenderOffences />
        <RenderAreas />
        <RenderAges />
        <RenderGenders />
        <RenderYears />
        <RenderMonths />
        <DrawSearchTool />
        </>
    )
}
//
function RouteOffences() {
    ReactDOM.render("", document.getElementById("table"));
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
    let resstring = JSON.stringify(result);
    console.log("RES: "+resstring);
    return (
        <div>
            <ReactTable
              data={result}
              showPagination={false}
              columns={[
                  {
                      Header: "Offences",
                      columns: [
                          {
                              Header: "Offence",
                              accessor: ""
                          }
                      ]
                  }
              ]}
              defaultSorted={[
                  {
                      id: "",
                      desc: false
                  }
              ]}
              />
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

//Updates the cache variable with the selected data from the search field.
//TODO: Deduplicate into one function.
function onChangeOptionOffence(event) {
    var id = event.nativeEvent.target.selectedIndex;
    offenceCache = event.nativeEvent.target[id].text;
    ReactDOM.render("", document.getElementById("table"));
}
function onChangeOptionArea(event) {
    var id = event.nativeEvent.target.selectedIndex;
    areaCache = event.nativeEvent.target[id].text;
    ReactDOM.render("", document.getElementById("table"));
}
function onChangeOptionAge(event) {
    var id = event.nativeEvent.target.selectedIndex;
    ageCache = event.nativeEvent.target[id].text;
    ReactDOM.render("", document.getElementById("table"));
}
function onChangeOptionGender(event) {
    var id = event.nativeEvent.target.selectedIndex;
    genderCache = event.nativeEvent.target[id].text;
    ReactDOM.render("", document.getElementById("table"));
}
function onChangeOptionYear(event) {
    var id = event.nativeEvent.target.selectedIndex;
    yearCache = event.nativeEvent.target[id].text;
    ReactDOM.render("", document.getElementById("table"));
}
function onChangeOptionMonth(event) {
    var id = event.nativeEvent.target.selectedIndex;
    monthCache = event.nativeEvent.target[id].text;
    ReactDOM.render("", document.getElementById("table"));
}

//Takes given mapped data and creates an option entry in a dropdown list.
function ResultHT(props) {
    return (
        <option value={props.title}>{props.title}</option>
    );
}

//Calls the API to get a list of offences and generates a dropdown with the results.
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

//Calls the API to get a list of areas and generates a dropdown with the results.
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

//Calls the API to get a list of ages and generates a dropdown with the results.
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

//Calls the API to get a list of genders and generates a dropdown with the results.
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

//Calls the API to get a list of years and generates a dropdown with the results.
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

//Generates a dropdown with a list of months (1-12)
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

//Grabs the last offence written to the cache variable, URI Encodes it, constructs offence param and sends it to the function
//which starts the API calls.
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

//URI Encodes cache variables and sends them to a function in the API file before running function which makes the API call
//and rendering the result.
function RunSearchLoader(query) {
    ReactDOM.render("", document.getElementById("table"));
    setCaches(query, encodeURIComponent(areaCache), encodeURIComponent(ageCache), encodeURIComponent(genderCache), encodeURIComponent(yearCache), encodeURIComponent(monthCache));
    ReactDOM.render(<RunSearchLoaderFinal />, document.getElementById("table"));
}

//Calls function to search the API and creates the table structure before creating a map and inserting results from ResultTable.
function RunSearchLoaderFinal() {
    const {loading, result, error} = RunSearch();
    return (
        <div>
            <ReactTable
              data={result}
              showPagination={true}
              showPaginationTop={true}
              showPaginationBottom={false}
              minRows={0}
              defaultPageSize={100}
              columns={[
                  {
                      Header: "Results",
                      columns: [
                          {
                              Header: "Local Governnment Area",
                              accessor: "LGA"
                          },
                          {
                              Header: "Total",
                              accessor: "total"
                          }
                      ]
                  }
              ]}
              defaultSorted={[
                  {
                      id: "LGA",
                      desc: false
                  }
              ]}
              />
        </div>
    );
}

//Takes the mapped data passed to it and generates a table row with the appropriate data.
function ResultTable(props) {
    if (props.total==0) {
        return "";
    } else {
        return (
            <tr>
                <td>{props.LGA}</td>
                <td>{props.total}</td>
                <td>{props.lat}</td>
                <td>{props.lng}</td>
            </tr>
    );
    }
    
}