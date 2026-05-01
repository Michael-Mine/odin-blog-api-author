import { useState } from "react";
import PropTypes from "prop-types";
import SignUp from "../components/SignUp";

function Login({ setLoggedIn }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  const openSignUpForm = () => {
    setSignUpForm(!signUpForm);
  };

  const sendLogin = () => {
    console.log("logging in");
    setLoggingIn(true);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: inputEmail, password: inputPass }),
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => setLoggingIn(false));
  };

  if (loggingIn) return <p>Logging In...</p>;

  if (response && response.token) {
    localStorage.setItem("JWT", response.token);
    setLoggedIn(true);
  }

  return (
    <div>
      <h4>Login to post Comments</h4>
      <div className="input-container">
        <label htmlFor="username">Email:</label>
        <input
          className="input-field"
          id="username"
          data-testid="username-input"
          type="text"
          value={inputEmail}
          onChange={(event) => setInputEmail(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          className="input-field"
          id="password"
          data-testid="password-input"
          type="text"
          value={inputPass}
          onChange={(event) => setInputPass(event.target.value)}
        />
      </div>
      <button onClick={sendLogin}>Login</button>
      <button onClick={openSignUpForm}>or Sign Up</button>
      {error && <p className="characters">A network error was encountered</p>}
      {response && <p className="characters">{response.message}</p>}
      {signUpForm && <SignUp />}
    </div>
  );
}

Login.propTypes = {
  setLoggedIn: PropTypes.func,
};

export default Login;
