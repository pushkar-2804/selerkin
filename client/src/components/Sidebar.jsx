import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const menu = [
    "Dashboard",
    "Keyword Finder",
    "List analyser",
    "Follow up Reminder",
  ];
  return (
    <div className="sidebar">
      {menu.map((menuItem) => {
        return <div className="sidebarElement">{menuItem}</div>;
      })}
    </div>
  );
};

export default Sidebar;
