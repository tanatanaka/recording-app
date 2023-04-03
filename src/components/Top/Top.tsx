import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Top.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ContentsCard from "../Tools/ContentsCard";

const Top = () => {
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
    <div className="body">
      <div className="flex">
        <div className="title">
          <h2>トレコード</h2>
          <p>Training×Recording</p>
        </div>

        <div className="formBox">
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
        </div>
      </div>

      <div className="contents">
        <ContentsCard
          image={
            "https://images.unsplash.com/photo-1616071906060-1f425a639465?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80"
          }
        >
          <Typography gutterBottom variant="h5" component="div">
            1. トレーニング記録管理
          </Typography>
          <Typography variant="body2" color="text.secondary">
            コンテンツ説明
          </Typography>
        </ContentsCard>

        <ContentsCard
          image={
            "https://images.unsplash.com/photo-1616071906060-1f425a639465?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80"
          }
        >
          <Typography gutterBottom variant="h5" component="div">
            2.  体重・体脂肪管理
          </Typography>
          <Typography variant="body2" color="text.secondary">
            コンテンツ説明
          </Typography>
        </ContentsCard>

        <ContentsCard
          image={
            "https://images.unsplash.com/photo-1616071906060-1f425a639465?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80"
          }
        >
          <Typography gutterBottom variant="h5" component="div">
            3.  目標を登録できる
          </Typography>
          <Typography variant="body2" color="text.secondary">
            コンテンツ説明
          </Typography>
        </ContentsCard>
      </div>
    </div>
  );
};

export default Top;
