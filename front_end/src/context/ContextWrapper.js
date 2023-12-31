import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload, auth }) {
  switch (type) {
    case "start":
      return payload;

    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt._id === payload._id ? payload : evt));

    case "delete":
      async function deleteTask(task) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
          method: "DELETE",
          body: JSON.stringify(task),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        const json = await response.json();
        if (!response.ok) {
          console.log(json.error);
        }
      }
      deleteTask(payload);
      return state.filter((evt) => evt._id !== payload._id);

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

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatchCallEvent({ type: "start", payload: json });
      }
    };

    if (user) {
      fetchData();
    }
    if (!user) {
      console.log("error");
    }
  }, []);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

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
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
