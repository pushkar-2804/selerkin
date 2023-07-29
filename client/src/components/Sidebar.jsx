import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const nav = useNavigate();
  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Keyword Finder", path: "/keywordFinder" },
    { name: "List analyser", path: "/listAnalyser" },
    { name: "Follow up Reminder", path: "/emailReminder" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebarIcon">Sellerkin</div>
      {menu.map((menuItem, index) => {
        return (
          <div
            className="sidebarElement"
            key={index}
            onClick={() => nav(`${menuItem.path}`)}
          >
            {menuItem.name}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
