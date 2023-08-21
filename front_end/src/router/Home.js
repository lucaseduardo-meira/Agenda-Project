import React, { useState, useContext, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import "../App.css";
import { getMonth } from "../util";
import CalendarHeader from "../components/CalendarHeader";
import SideBar from "../components/SideBar";
import Month from "../components/Month";
import GlobalContext from "../context/GlobalContext";
import EventModel from "../components/EventModel";
import axios from "axios";

function Home() {
  // const {user} = useAuthContext()

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     await axios
  //       .get("http://localhost:5000", {
  //         withCredentials: true,
  //       })
  //       .then(function (response) {
  //         return response.status;
  //       });
  //   };

  //   const status = checkLogin();
  //   if (status === 200) {
  //   }
  // }, []);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModel } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <React.Fragment>
      {showEventModel && <EventModel />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <SideBar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
