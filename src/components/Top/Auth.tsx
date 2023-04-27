import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase";

const Auth = () => {
  const navigate = useNavigate();

  // ログイン
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  // サインアップ
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");

  const [tab, setTab] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/mypage/");
      }
    });
  }, []);
  
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPass(e.target.value);
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const googleLogin = (e: any) => {
    e.preventDefault();
    signInWithPopup(auth, provider);
  };

  const onChangeNewEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewEmail(e.target.value);
  };

  const onChangeNewPass = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewPass(e.target.value);
  };

  const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, newEmail, newPass)
      .then(() => {
        navigate("/")
        setLoginMessage("登録完了！ログインしてください")
        setTab(true);
      })
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
          {loginMessage && <p className="message">{loginMessage}</p>}
          {error &&
          <p className="message">{error}</p>}
          {email && pass ? (
            <button>Login</button>
          ) : (
            <button disabled>Login</button>
          )}
          <button onClick={googleLogin}>Google Account Login</button>
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
