import React, { useState } from 'react'

const Auth = () => {
  // タブの選択状況
  const [tab, setTab] = useState<boolean>(true);

  // Login機能
  // emailの入力値のstate
  const [email, setEmail] = useState<string>("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  // passwordの入力値のstate
  const [pass, setPass] = useState<string>("");
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPass(e.target.value);
  };

  // SignUp機能
  // emailの入力値のstate
  const [newEmail, setNewEmail] = useState<string>("");
  const onChangeNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewEmail(e.target.value);
  };

  // passwordの入力値のstate
  const [newPass, setNewPass] = useState<string>("");
  const onChangeNewPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewPass(e.target.value);
  };
  return (
    <>
      <button
            className={tab ? "selectTab" : "tabButton"}
            onClick={() => setTab(true)}
          >
            Login
          </button>
          <button
            className={tab ? "tabButton" : "selectTab"}
            onClick={() => setTab(false)}
          >
            SignUp
          </button>

          {tab ? (
            <form className="loginForm">
              <input
                type="email"
                placeholder="email"
                onChange={onChangeEmail}
                value={email}
              />
              <input
                type="password"
                placeholder="password"
                onChange={onChangePass}
                value={pass}
              />
              {email && pass ? (
                <button>Login</button>
              ) : (
                <button disabled>Login</button>
              )}
              <button>Google Account Login</button>
            </form>
          ) : (
            <form className="signUpForm">
              <input
                type="email"
                placeholder="email"
                onChange={onChangeNewEmail}
                value={newEmail}
              />
              <input
                type="password"
                placeholder="password"
                onChange={onChangeNewPass}
                value={newPass}
              />
              {newEmail && newPass ? (
                <button>SignUp</button>
              ) : (
                <button disabled>SignUp</button>
              )}
            </form>
          )}
    </>
  )
}

export default Auth
