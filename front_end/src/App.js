import React from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import SideBar from "./components/SideBar";
import Month from "./components/Month";

function App() {
  console.table(getMonth());
  return (
    <React.Fragment>
      <div className="h-screen flex flex-columns">
        <CalendarHeader />
        <div className="flex flex-1">
          <SideBar />
          <Month />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
