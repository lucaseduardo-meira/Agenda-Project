import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useReducerAsync } from "use-reducer-async";
import axios from "axios";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    // await axios
    //   .post("http://localhost:5000/", {
    //     payload,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     return [...state, payload];
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    // await axios
    //   .put("http://localhost:5000/", {
    //     payload,
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //     return state.map((evt) => (evt.id === payload.id ? payload : evt));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    case "delete":
      //       async function deleteTask(event) {
      //   const id = event.id;
      //   await axios
      //     .delete("http://localhost:5000/", {
      //       id,
      //     })
      //     .then(function (response) {
      //       return console.log(response.data);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // }
      console.log(state.filter((evt) => evt.id !== payload.id));
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  // await axios
  //   .get("http://localhost:5000/")
  //   .then(function (response) {
  //     console.log(response.data);
  //     // return response.data;
  //     const storageEvents = localStorage.getItem("savedEvents");
  //     const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  //     console.log(parsedEvents);
  //     return parsedEvents;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  console.log(parsedEvents);
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModel, setShowEventModel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCallEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );
  // const filteredEvents = useMemo(() => {
  //   console.log(savedEvents);
  //   return savedEvents.filter((evt) =>
  //     labels
  //       .filter((lbl) => lbl.checked)
  //       .map((lbl) => lbl.label)
  //       .includes(evt.label)
  //   );
  // }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth != null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModel) {
      setSelectedEvent(null);
    }
  }, [showEventModel]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModel,
        setShowEventModel,
        dispatchCallEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        setLabels,
        labels,
        updateLabel,
        // filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
