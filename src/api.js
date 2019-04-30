import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
let TOKEN = null;
let lastQuery = null;
let offenceCache = null;

export function setOffenceCache(contents) {
    offenceCache = contents;
    console.log("Updated to: "+offenceCache);
}

export function registerUser(email, password) {
    fetch("https://cab230.hackhouse.sh/register", {
        method: "POST",
        body: 'email='+ email +'&password=' + password + '',
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
          let appDiv = document.getElementById("loginFormResult");
          //appDiv.innerHTML = JSON.stringify(result);
          appDiv.innerHTML = "Registered Successfully!";
          ReactDOM.render('', document.getElementById('loginForm'));
          //regButton.disabled = true;
        })
        .catch(function(error) {
            let appDiv = document.getElementById("loginFormResult");
            appDiv.innerHTML = "ERROR: Was not able to authenticate, check that your credentials are valid.";
        });
}

export function loginUser(email, password) {
    fetch("https://cab230.hackhouse.sh/login", {
        method: "POST",
        body: 'email='+ email +'&password=' + password + '',
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
            let appDiv = document.getElementById("loginFormResult");
            //appDiv.innerHTML = JSON.stringify(result);
            appDiv.innerHTML = "Authenticated Successfully!";
            TOKEN = result.token;
            console.log(TOKEN);
            ReactDOM.render('', document.getElementById('loginForm'));
            ReactDOM.render('', document.getElementById('loginFormButton'))
            //ReactDOM.render(<OffenceButtons />, document.getElementById('crimeBtns'));
        })
        .catch(function(error) {
            let appDiv = document.getElementById("loginFormResult");
            appDiv.innerHTML = "ERROR: Was not able to authenticate, check that your credentials are valid.";
        });
}


export function GetListOfOffences() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);
    //
    //getParam.headers = head;
    

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
function LoadListOfOffences() {
    let url = "https://cab230.hackhouse.sh/offences";
    let getParam = {method: "GET"};
    let head = { Authorization: `Bearer ${TOKEN}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.offences)
}


export function RunSearch() {
    const [loading,setLoading] = useState(true);
    const [result,setResult] = useState([]);
    const [error,setError] = useState(null);
    let urlBase = "https://cab230.hackhouse.sh/search?";
    let urlFinal = urlBase+offenceCache;

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

function POSTSearch(url) {
    let getParam = {method: "GET"};
    let head = { Authorization: `Bearer ${TOKEN}`};
    getParam.headers = head;
    return fetch(url, getParam)
    .then(res => res.json())
    .then(res => res.result)

}