import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const cores = {
    indigo: "Índigo",
    red: "Vermelho",
    blue: "Azul",
    purple: "Roxo",
    gray: "Cinza",
    green: "Verde",
  };
  const hex = {
    indigo: "#6366f1",
    red: "#ef4444",
    blue: "#3b82f6",
    purple: "#a855f7",
    gray: "#6b7280",
    green: "#84cc16",
  };
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-[#a2a3a5] font-bold mt-10">Selo</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded border-${lbl}-500 border-[medium] bg-[#191919] focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer`}
          />
          <span className="ml-2 text-[#B4BABC] capitalize">{cores[lbl]}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
