import React, {useContext, useEffect, useRef, useState} from 'react';
import {signOut} from "firebase/auth";
import {AuthContext} from "../../auth/AuthContext";
import {auth} from '../../firebaseConfig';
import './css/chatbutton.css'
import ChatButton from "./ChatButton";
import {LogoutOutlined} from '@ant-design/icons';
const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  //const buttonRef = useRef();

  return (
      <div className='navbar'>
          <span className="logo">TalkNest</span>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <div className="user" style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', marginRight: '20px'}}>
              <img src={currentUser.photoURL} alt=""/>
              <span style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '150px'
              }}>{currentUser.displayName}</span>
          </div>

          <div className="App" >
              <ChatButton name={'logout'}
                          icon={<LogoutOutlined/>}
                          onClick={() => signOut(auth)}
                          style={{width: '75px', height: '30px', lineHeight: '10px', textAlign: 'center'}}/>
          </div>
      </div>

      </div>
  )
}

export default Navbar
