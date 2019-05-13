import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';

//Token variable for authentication.
let TOKEN = null;

//Cache of the data used for searching.
let offenceCache = null;
let areaCache = null;
let ageCache = null;
let genderCache = null;
let yearCache = null;
let monthCache = null;

//Sets the requested variables into the cache for use in searches.
export function setCaches(offence, area, age, gender, year, month) {
    offenceCache = offence;
    areaCache = area;
    ageCache = age;
    genderCache = gender;
    yearCache = year;
    monthCache = month;
    console.log("Updated offence: "+offenceCache);
    console.log("Updated area: "+areaCache);
    console.log("Updated age: "+ageCache);
    console.log("Updated gender: "+genderCache);
    console.log("Updated year: "+yearCache);
    console.log("Updated month: "+monthCache);
}
//Updates token stored in the variable with the one in local storage.
export function updateToken() {
    TOKEN = localStorage.getItem("JWT");
}

//Sends a POST to the API with registration info.
export function registerUser(email, password) {
    fetch("https://cab230.hackhouse.sh/register", {
        method: "POST",
        body: 'email='+ encodeURIComponent(email) +'&password=' + encodeURIComponent(password)  + '',
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok");
        })
        .then(function(result) {
          ReactDOM.render('', document.getElementById('loginForm'));
          ReactDOM.render('Registered Successfully!', document.getElementById('loginFormResult'));
        })
        .catch(function(error) {
            ReactDOM.render('ERROR: Was not able to register, this address might already be in use.', document.getElementById('loginFormResult'));
        });
}

//Sends a post to the API with login info, returns the auth token.
export function loginUser(email, password) {
    fetch("https://cab230.hackhouse.sh/login", {
        method: "POST",
        body: 'email='+ encodeURIComponent(email) +'&password=' + encodeURIComponent(password)  + '',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            ReactDOM.render('Authenticated Successfully!', document.getElementById('loginFormResult'));
            TOKEN = result.token;
            localStorage.setItem("JWT", TOKEN);
            console.log(TOKEN);
            ReactDOM.render('', document.getElementById('loginForm'));
            ReactDOM.render('', document.getElementById('loginFormButton'))
        })
        .catch(function(error) {
            ReactDOM.render('ERROR: Was not able to authenticate, check that your credentials are valid.', document.getElementById('loginFormResult'));
        });
}

//Initial function for calling API for list of offences. Consider merging.
export function GetListOfOffences() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);

    useEffect (() => {
        LoadListOfOffences()
            .then(result =>{
                setResult(result);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, []);
    return {
        loading,
        result,
        error
    };

};

//Calls API to get list of offences. TODO: Consider merging.
function LoadListOfOffences() {
    let url = "https://cab230.hackhouse.sh/offences";
    let getParam = {method: "GET"};
    let head = { Authorization: `Bearer ${TOKEN}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.offences)
}

export function GetListOfAreas() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);    

    useEffect (() => {
        LoadListOfAreas()
            .then(result =>{
                setResult(result);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, []);
    return {
        loading,
        result,
        error
    };

};
function LoadListOfAreas() {
    let url = "https://cab230.hackhouse.sh/areas";
    let getParam = {method: "GET"};
    let head = { Authorization: `Bearer ${TOKEN}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.areas)
}

export function GetListOfAges() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);

    useEffect (() => {
        LoadListOfAges()
            .then(result =>{
                setResult(result);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, []);
    return {
        loading,
        result,
        error
    };

};
function LoadListOfAges() {
    let url = "https://cab230.hackhouse.sh/ages";
    let getParam = {method: "GET"};
    let head = { Authorization: `Bearer ${TOKEN}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.ages)
}

export function GetListOfGenders() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);

    useEffect (() => {
        LoadListOfGenders()
            .then(result =>{
                setResult(result);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, []);
    return {
        loading,
        result,
        error
    };

};
function LoadListOfGenders() {
    let url = "https://cab230.hackhouse.sh/genders";
    let getParam = {method: "GET"};
    let head = { Authorization: `Bearer ${TOKEN}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.genders)
}

export function GetListOfYears() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);
    
    useEffect (() => {
        LoadListOfYears()
            .then(result =>{
                setResult(result);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, []);
    return {
        loading,
        result,
        error
    };

};
function LoadListOfYears() {
    let url = "https://cab230.hackhouse.sh/years";
    let getParam = {method: "GET"};
    let head = { Authorization: `Bearer ${TOKEN}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.years)
}

//Constructs the request to the main search API, adding optional parameters as needed, and returning the final JSON data.
export function RunSearch() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);
    let urlBase = "https://cab230.hackhouse.sh/search?";
    let urlFinal = urlBase+offenceCache;
    if (areaCache !== "ALL") {
        let payload = "&area="+areaCache;
        urlFinal = urlFinal+payload;
    }
    if (ageCache !== "ALL") {
        let payload = "&age="+ageCache;
        urlFinal = urlFinal+payload;
    }
    if (genderCache !== "ALL") {
        let payload = "&gender="+genderCache;
        urlFinal = urlFinal+payload;
    }
    if (yearCache !== "ALL") {
        let payload = "&year="+yearCache;
        urlFinal = urlFinal+payload;
    }
    if (monthCache !== "ALL") {
        let payload = "&month="+monthCache;
        urlFinal = urlFinal+payload;
    }
    /*if (offenceCache == null) {
        return (
            <p>ERROR: Missing offence.</p>
        );
    }*/
    console.log(urlFinal);


    useEffect (() => {
        POSTSearch(urlFinal)
            .then(result =>{
                setResult(result);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, []);
    return {
        loading,
        result,
        error
    };
    
}

//Sends GET request the API with the URL created with the parameters and the required authentication token.
function POSTSearch(url) {
    let getParam = {method: "GET"};
    let head = { Authorization: `Bearer ${TOKEN}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.result)

}