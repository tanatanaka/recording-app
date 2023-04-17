import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Top.css";
import ContentsCard from "./ContentsCard";

import Typography from "@mui/material/Typography";
import Auth from "./Auth";

const Top = () => {
  

  return (
    <div className="body">
      <div className="flex">
        <div className="title">
          <h2>トレコード</h2>
          <p>Training×Recording</p>
        </div>

        <div className="formBox">
          <Auth />
          {/* <button
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
          )} */}
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
