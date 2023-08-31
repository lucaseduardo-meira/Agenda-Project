import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

export default function SideBar() {
  return (
    <aside className="border p-5 w-64 bg-[#191919] border-[#2c3035]">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
