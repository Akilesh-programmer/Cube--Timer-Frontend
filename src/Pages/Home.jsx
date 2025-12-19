import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "../Styles/home.css";

function Home() {
  const [time, setTime] = useState("0.00");
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const scramble = "R U R' U' L' U L U' F' U F U' R U R' U'";

  const outlet = useOutletContext();
  const stats = outlet.stats;

  useEffect(() => {
    let interval;
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setTime((elapsed / 1000).toFixed(2));
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!isRunning) {
          setIsRunning(true);
          setStartTime(Date.now());
        } else {
          const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
          setTime(finalTime);
          setIsRunning(false);
          saveSolve(finalTime);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRunning, startTime]);

  const saveSolve = async (finalTime) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/solves`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            time: finalTime,
            userId: userId,
          }),
        }
      );

      if (response.ok) {
        console.log("Solve saved");
      }
    } catch (error) {
      console.log("Error saving solve");
    }
  };

  return (
    <div className="home-container">
      <div className="scramble-box">
        <h3>Scramble</h3>
        <p>{scramble}</p>
      </div>

      <div className="main-row">
        <div className="left-side">
          <div className="stats-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Current</th>
                  <th>Best</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr key={stat.type}>
                    <td>{stat.type}</td>
                    <td>{stat.current}</td>
                    <td>{stat.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="avg-display">
            <h4>Overall Average</h4>
            <p>14.52</p>
          </div>
        </div>

        <div className="timer-display">
          <h1>{time}</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
