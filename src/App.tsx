import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Graph from "./components/Graph/Graph";
import Mypage from "./components/Mypage/Mypage";
import Top from "./components/Top/Top";
import Training from "./components/Training/Training";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Top />} />
          <Route path={`/training/`} element={<Training />} />
          <Route path={`/graph/`} element={<Graph />} />
          <Route path={`/mypage/`} element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
