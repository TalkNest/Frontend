import React from 'react';
import Sidebar from "../components/chatChannel/Sidebar";
import Chat from "../components/chatChannel/Chat";
import './css/homepage.scss';

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home
