import React from 'react'
import { useState } from 'react';
import './signup.css'

  function SignUp() {
    const [isShowed, setisShowed] = useState(false);

    function handleCheckPassword() {
      setisShowed(!isShowed);
    }

    function handleSignUp() {

    }

    return (
      <div>
        <div className="mainDivSignUp">
          <div className="loginDiv">
            <div className="title">
              <h1>Benvenuto su BlockVision</h1>
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Nome
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Cognome
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Indirizzo Mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Conferma indirizzo Mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Conferma Password
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
                  Mostra Password
                </label>
              </div>
              <div className="divButton">
                <button type="submit" className="btn btn-primary" onClick={handleSignUp}>
                  Registrati
                </button>

              </div>
              <div className="loginlink">
                <a href="/login">Sei già registrato?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

export default SignUp
