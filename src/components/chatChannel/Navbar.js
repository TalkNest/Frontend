import React, {useContext, useEffect, useRef} from 'react';
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
          <div className="App">
              <ChatButton name={'logout'}
                          icon={<LogoutOutlined/>}
                          onClick={() => signOut(auth)}
                          style={{width: '75px', height: '30px', lineHeight: '10px', textAlign: 'center'}}/>
          </div>
          <div className="user">
              <img src={currentUser.photoURL} alt=""/>
              <span>{currentUser.displayName}</span>
              {/*<button onClick={() => signOut(auth)}>logout</button>*/}

          </div>
      </div>
  )
}

export default Navbar
