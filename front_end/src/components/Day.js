import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const week = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModel,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-[#2c3035] border-[thin] flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 text-[#b5b7ba]">
            {week[day.format("d").toUpperCase()]}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center text-[#9a9ea1] ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModel(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-500 p-1 mr-3 text-[#ffffff] text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
