import React, { useEffect, useMemo, useReducer, useState } from "react";
import axios from "axios";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "start":
      if (state.length === 0) {
        return payload;
      } else {
        return state;
      }

    case "push":
      async function pushEvent(task) {
        await axios
          .post("http://localhost:5000/", {
            task,
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      pushEvent(payload);
      return [...state, payload];

    case "update":
      async function updateEvent(task) {
        await axios
          .put("http://localhost:5000/", {
            task,
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      // console.log(payload);
      updateEvent(payload);
      return state.map((evt) => (evt._id === payload.id ? payload : evt));

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
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
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
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/").then(function (response) {
        dispatchCallEvent({ type: "start", payload: response.data });
      });
    };
    fetchData();
  }, []);

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
