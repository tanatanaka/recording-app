import React from "react";
import "./Menu.css";
import TimelineIcon from "@mui/icons-material/Timeline";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Link } from "react-router-dom";

const Menu = ({ children }: any) => {
  return (
    <div className="header">
      <Link to={"/"} className="linkColor">
        <div className="homeLink">
          <h2>トレコード</h2>
          <p>Training×Recording</p>
        </div>
      </Link>

      <div className="icon">
        <Link className="menu linkColor" to={"/training/"}>
          <FitnessCenterIcon />
          Training
        </Link>
        <Link className="menu linkColor" to={"/graph/"}>
          <TimelineIcon />
          Graph
        </Link>
        <Link className="menu linkColor" to={"/mypage/"}>
          <PersonRoundedIcon />
          My Page
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Menu;
