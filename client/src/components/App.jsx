import React, { useState, useEffect } from "react";
import MainContainer from "./MainContainer.jsx";

const CLIENT_ID = "8327f086b19ab61b8eb0";
const CLIENT_SECRET = "8eaef1b15e646e35edd54595f69647dc5b6de11b";

const App = () => {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    //  localhost:8080/
    //the window.location.search below is linked to the window.location.assign further down
    //the queryString loads the Client-Code that is returned from the GitHub portal...
    //and puts it in "codeParam"
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log("KM codeParam: ", codeParam);

    //local storage persist thru login: leave our web page for a while and till be logged in with GitHub
    //if we have the codeParam (we probably just got a redirect from github) and the Access Token is null, then go
    //to the backend and get the AccessToken
    if (codeParam && localStorage.getItem("AccessToken") === null) {
      console.log("CP2: requesting access token, codeparam=", codeParam);
      console.log("localStorage: ", localStorage);

      async function getAccessToken() {
        console.log("**CP2A**");
        await fetch("http://localhost:3000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log("CP5: data: ", data);
            if (data.access_token) {
              console.log("CP6:data.access_token ");
              //localStorage by itself does not force a re-render
              localStorage.setItem("accessToken", data.access_token);
              //leverages useState to force a re-render
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    let myToken = localStorage.getItem("accessToken");
    console.log("**CP8A localStorage.getitem('accessToken'): ", myToken);
    await fetch("http://localhost:3000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("accessToken"), //Bearer ACCESSTOKEN
      },
    })
      .then((response) => {
        console.log("**CP9A**");
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }

  //Github Flow: Forward the user to the github login screen (we passin the Client_ID)
  //user is now on the github side and logs in (github.com/login)
  //when user decides to login: they get forwarded back to localhost:3000...
  //but the code is included as a query string: localhost:3000/?code=ASDAFA
  //we then use that code to get the access token (which can only be used once)

  function loginWithGitHub() {
    window.location.assign(
      //**CP1 */
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }

  return (
    <>
      <div className="App">
        <h4>MainContainer Below</h4>
        <MainContainer />

        {localStorage.getItem("accessToken") ? (
          <>
            <h1> We have the Access Token! </h1>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                setRerender(!rerender);
              }}
            >
              LogOut
            </button>

            <h2> Get User Data from GitHub API</h2>
            <button onClick={getUserData}>Get Data</button>
            {Object.keys(userData).length !== 0 ? (
              <>
                <h2>Hello, {userData.login}</h2>
                <img
                  width="100px"
                  height="100px"
                  src={userData.avatar_url}
                ></img>
                <a href={userData.html_url} style={{ color: "white" }}>
                  Link to the GitHub profile
                </a>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <h3>User is not logged in</h3>
            <button onClick={loginWithGitHub}>Login with GitHub</button>
          </>
        )}
      </div>
    </>
  );
};
export default App;
