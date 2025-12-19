import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";

import Header from "./Common/Header";

function App() {
  let [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("http://localhost:5173/Stats.json");
        const st = await resp.json();
        setStats(st);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header></Header>
      <Outlet context={{ stats }}></Outlet>
    </>
  );
}

export default App;
