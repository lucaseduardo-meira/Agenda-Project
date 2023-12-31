import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { useAuthContext } from "../hooks/useAuthContext";
const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModel() {
  const semana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const { setShowEventModel, daySelected, dispatchCallEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const { user } = useAuthContext();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      return;
    }

    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      date: daySelected,
      _id: selectedEvent ? selectedEvent._id : null,
    };
    if (selectedEvent) {
      async function updateEvent(task) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
          method: "PUT",
          body: JSON.stringify(task),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        const json = await response.json();
        if (!response.ok) {
          console.log(json.error);
        }
        if (response.ok) {
          dispatchCallEvent({ type: "update", payload: json });
        }
      }
      updateEvent(calendarEvent);
    } else {
      delete calendarEvent.id;
      async function pushEvent(task) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
          method: "POST",
          body: JSON.stringify(task),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        const json = await response.json();
        if (!response.ok) {
          console.log(json.error);
        }
        if (response.ok) {
          dispatchCallEvent({
            type: "push",
            payload: json,
          });
        }
      }
      pushEvent(calendarEvent);
    }
    setShowEventModel(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-[#080808] rounded-lg shadow-2xl w-1/4">
        <header className="bg-[#101010] px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCallEvent({
                    type: "delete",
                    payload: selectedEvent,
                    auth: user.accessToken,
                  });
                  setShowEventModel(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModel(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>

        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Adicionar Título"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl bg-[#101010] font-semibold pb-2 w-full border-b-2 border-[#101010]-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p className="text-[#C6C6C6]">
              {semana[daySelected.format("d")]}
              {", "}
              {daySelected.format("D")}
              {" de "}
              {meses[daySelected.format("M") - 1]}
            </p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Adicionar uma descrição"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 bg-[#101010] border-[#101010]-200  focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 border-[#858585] hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Salvar
          </button>
        </footer>
      </form>
    </div>
  );
}
