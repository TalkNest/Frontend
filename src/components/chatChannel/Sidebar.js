import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="sidebar" style={{borderRadios: '200px 0px 0px 0px'}}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
