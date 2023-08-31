import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModel } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModel(true)}
      className="border border-[#191919] p-2 rounded-full flex items-center shadow-md hover:shadow-2xl transition duration-150 bg-[#191919]"
    >
      {/* <img src={plusImg} alt="create_event" className="w-7 h-7" /> */}
      <svg width="36" height="36" viewBox="0 0 36 36">
        <path fill="#34A853" d="M16 16v14h4V20z"></path>
        <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
        <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
        <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
        <path fill="none" d="M0 0h36v36H0z"></path>
      </svg>
      <span className="pl-3 pr-7 text-[#afb3b5]">Criar</span>
    </button>
  );
}
