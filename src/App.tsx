import React from "react";
import "./styles.css";
import { Link, Route, Switch } from "react-router-dom";
import { HomePage, RectPage, LinePage, AreaPage, ScatterPage } from "./pages";

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
        <Route path="/rect" component={RectPage} />
        <Route path="/line" component={LinePage} />
        <Route path="/area" component={AreaPage} />
        <Route path="/scatter" component={ScatterPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
