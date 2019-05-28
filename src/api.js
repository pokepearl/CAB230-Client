import { useState, useEffect } from "react";


let getUrl = window.location;
let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" ;
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
          window.alert("Registered Successfully!");
          window.location.href = baseUrl;
        })
        .catch(function(error) {
            window.alert("ERROR: Was not able to register, this address might already be in use.");
        });
}

//Sends a post to the API with login info, returns the auth token.
export function loginUser(email, password) {
    let response = runActualLogin(email, password);
    response.then(function(result) {
        if (result.ok) {
            return result.json();
        }
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            //ReactDOM.render('Authenticated Successfully!', document.getElementById('loginFormResult'));
            TOKEN = result.token;
            localStorage.setItem("JWT", TOKEN);
            console.log(TOKEN);
            window.alert("Authenticated Successfully!");
            window.location.href = baseUrl+"search/";
    }).catch(function(err) {
        window.alert("ERROR: Was not able to authenticate, check that your credentials are valid.");
    })
    
}   
function runActualLogin(email, password) {
    return fetch("https://cab230.hackhouse.sh/login", {
        method: "POST",
        body: JSON.stringify({
            email: encodeURIComponent(email),
            password: encodeURIComponent(password)
        }),
        headers: {
          "Content-type": "application/json"
        },
    }).then(response => {return response});
};


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

export function GetListOfOffences2() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);

    useEffect (() => {
        LoadListOfOffences2()
            .then(result =>{
                setResult(result);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, []);
    //setResult(JSON.stringify(result));
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
    //let head = { Authorization: `Bearer ${TOKEN}`};
    //getParam.headers = head;
    return fetch(url, getParam, {mode: 'no-cors'})
    .then(res => res.json())
    .then(res => res.offences)
}
function LoadListOfOffences2() {
    let url = "https://cab230.hackhouse.sh/offences";
    let getParam = {method: "GET"};
    //let head = { Authorization: `Bearer ${TOKEN}`};
    //getParam.headers = head;
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
    if (offenceCache === "offence=null") {
        window.alert("ERROR: You must set the offence parameter to continue");
        return "";
    }


    useEffect (() => {
        POSTSearch(urlFinal)
            .then(result =>{
                setResult(result);
                setLoading(false);
                return result.json();
            }).then(function(res2) {
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
    let head = { Authorization: `Bearer ${localStorage.getItem("JWT")}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.result)

}