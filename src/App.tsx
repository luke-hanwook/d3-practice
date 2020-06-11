import React from "react";
import "./styles.css";
import { Link, Route, Switch } from "react-router-dom";
import { Home, Rect, Line, Area, Scatter } from "./pages";

export default function App() {
  return (
    <div className="App">
      <h1>D3 Practice</h1>
      <h2>
        <Link to="/">Graph List</Link>
      </h2>
      <ul>
        <li>
          <Link to="/rect">Rect</Link>
        </li>
        <li>
          <Link to="/line">Line</Link>
        </li>
        <li>
          <Link to="/area">Area</Link>
        </li>
        <li>
          <Link to="/scatter">Scatter</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/rect" component={Rect} />
        <Route path="/line" component={Line} />
        <Route path="/area" component={Area} />
        <Route path="/scatter" component={Scatter} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
