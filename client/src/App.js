import React, { useEffect } from "react";
import axios from "axios";
import LandingPage from "./component/LandingPage";
import { Switch, Route } from "react-router-dom";
import Car from "./component/Car/container/Car";
import ErrorPage from "./component/ErrorPage";

function App() {
  useEffect(() => {
    getCarData();
  }, []);
  const getCarData = async () => {
    // const car = await fetch("/api/car", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const car = await axios.get("/api/car");
    console.log(car);
  };
  return (
    <div>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/car' component={Car} />
        <Route path='*' component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
