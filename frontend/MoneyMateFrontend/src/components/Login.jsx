import React, { useState } from 'react';
import './login.css';

export default function Login() {
  const [isShowed, setisShowed] = useState(false);

  function handleCheckPassword() {
      setisShowed(!isShowed);
  }

  function handleSignIn() {
    const emailForm = document.getElementById("exampleInputEmail1").value
    const passwordForm = document.getElementById("exampleInputPassword1").value
    // alert(`${emailForm} ${passwordForm}`)
    if (emailForm == '' || passwordForm == '') {
      alert('Riempire tutti i campi')
    } else {
      //logica get
    }
  }

  return (
    <div>
      <div className="mainDivLogin">
        <div className="loginDiv">
          <div className="title">
            <h1>Accedi a BlockVision</h1>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type={isShowed ? 'text' : 'password'}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onClick={handleCheckPassword} 
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Show Password
              </label>
            </div>
            <div className="divButton">
              <button type="submit" className="btn btn-primary" onClick={handleSignIn}>
                Submit
              </button>
              
            </div>
            <div className="signuplink">
              <a href="/signup">Non sei registrato?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}