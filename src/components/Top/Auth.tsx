import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Auth = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<boolean>(true);
  const [error, setError] = useState("");

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

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => navigate("/mypage/"))
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("正しいメールアドレスの形式で入力してください。");
            break;
          case "auth/user-not-found":
            setError("メールアドレスかパスワードに誤りがあります。");
            break;
          case "auth/wrong-password":
            setError("メールアドレスかパスワードに誤りがあります。");
            break;
          default:
            setError("メールアドレスかパスワードに誤りがあります。");
            break;
        }
      });
    setEmail("");
    setPass("");
  };

  // SignUp機能
  // emailの入力値
  const [newEmail, setNewEmail] = useState<string>("");
  const onChangeNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewEmail(e.target.value);
  };

  // passwordの入力値
  const [newPass, setNewPass] = useState<string>("");
  const onChangeNewPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewPass(e.target.value);
  };

  const handleSignUpSubmit = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, newEmail, newPass)
      .then(() => navigate("/"))
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("正しいメールアドレスの形式で入力してください。");
            break;
          case "auth/weak-password":
            setError("パスワードは6文字以上を設定する必要があります。");
            break;
          case "auth/email-already-in-use":
            setError("そのメールアドレスは登録済みです。");
            break;
          default:
            setError("メールアドレスかパスワードに誤りがあります。");
            break;
        }
      });
    setNewEmail("");
    setNewPass("");
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
        <form onSubmit={handleLoginSubmit} className="loginForm">
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
          {error && <p className="error">{error}</p>}
          {email && pass ? (
            <button>Login</button>
          ) : (
            <button disabled>Login</button>
          )}
          <button>Google Account Login</button>
        </form>
      ) : (
        <form onSubmit={handleSignUpSubmit} className="signUpForm">
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
          {error && <p className="error">{error}</p>}
          {newEmail && newPass ? (
            <button>SignUp</button>
          ) : (
            <button disabled>SignUp</button>
          )}
        </form>
      )}
    </>
  );
};

export default Auth;
