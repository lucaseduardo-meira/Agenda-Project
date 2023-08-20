import React, { useContext } from "react";
import { useLogout } from "../hooks/useLogout";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function CalendarHeader() {
  const { logout } = useLogout();
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      <header className="px-4 py-2 flex items-center">
        <img src={logo} alt="logo" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl text-gray-500 fond-bold">Agenda</h1>
        <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>

        <h2 className="ml-4 text-xl text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
        <nav className="flex items-end">
          <div>
            <button
              className="rounded cursor-pointer text-[1em] px-2.5 py-1.5 border-2 border-solid border-[#1aac83] text-[#1aac83]"
              onClick={handleClick}
            >
              Log out
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
