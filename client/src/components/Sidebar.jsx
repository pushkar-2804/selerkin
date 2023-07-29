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
      <div className="sidebarIcon">Sellerkin</div>
      {menu.map((menuItem, index) => {
        return (
          <div className="sidebarElement" key={index}>
            {menuItem}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
