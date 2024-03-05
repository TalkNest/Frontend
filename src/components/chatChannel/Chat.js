import React, {useContext, useEffect, useRef, useState} from "react";
import Input from "./Input";
import {ChatContext} from "../../auth/ChatContext";
import Messages from "./Messages";
import {VideoCameraOutlined, UserAddOutlined, EllipsisOutlined} from "@ant-design/icons";
import ChatButton from "./ChatButton";
import io from 'socket.io-client';
import Peer from 'simple-peer';
import {getVideoStream} from "./mediaHelpers";
import {AuthContext} from "../../auth/AuthContext";

const Chat = () => {
  const {data} = useContext(ChatContext);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_API_BASE_URL}`);

    // Emit a registration event with the user's ID
    if (currentUser && currentUser.uid) {
      socket.current.emit('register', {userId: currentUser.uid});
    }

    socket.current.on('callAccepted', (signal) => {
      setCallAccepted(true);
      // Signal the peer connection that the call has been accepted
      connectionRef.current.signal(signal);

    });

    socket.current.on('callUser', ({from, name: callerName, signal}) => {
      setCall({isReceivingCall: true, from, name: callerName, signal});
    });

    socket.current.on('hangUp', () => {
      if (connectionRef.current) {
        setCallEnded(true);
        connectionRef.current.destroy();
        // Reload the window to reset the state
        window.location.reload();
      }
    });

    // Ensure to clean up this effect to prevent memory leaks and unintended behavior
    return () => {
      socket.current.off('hangUp');
    };

  }, []);

  useEffect(() => {
    if (callAccepted) {
      getVideoStream().then(stream => {
        setStream(stream); // Update the local state with the new stream
        if (myVideo.current) myVideo.current.srcObject = stream;
      });
    }
  }, [callAccepted]);

  useEffect(() => {
    // This effect should run whenever the call is accepted and the remote stream is available.
    if (callAccepted && !callEnded && userVideo.current && stream) {
      userVideo.current.srcObject = stream;
    }
  }, [callAccepted, callEnded]); // Depend on callAccepted, callEnded, and stream

  const answerCall = () => {
    getVideoStream().then(stream => {
      setStream(stream); // Update the local state with the new stream
      setCallAccepted(true);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream, // Use the updated stream here
      });

      peer.on('signal', data => {
        socket.current.emit('answerCall', {signal: data, to: call.from});
      });

      peer.on('stream', currentStream => {
        if (userVideo.current) userVideo.current.srcObject = currentStream;
      });

      peer.signal(call.signal);
      connectionRef.current = peer;
    });
  };

  const callUser = (id) => {
    getVideoStream().then(stream => {
      setStream(stream);
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });
      peer.on('signal', data => {
        socket.current.emit('callUser', {userToCall: id, signalData: data, from: currentUser.uid});
      });
      // Do not set userVideo.srcObject here for the caller
      peer.on('stream', currentStream => {
        // This will now correctly set the receiver's stream for the caller when received
        userVideo.current.srcObject = currentStream;
      });
      connectionRef.current = peer;
    }).catch(err => console.log('Error getting user media:', err));
  };


  const leaveCall = () => {
    setCallEnded(true);

    // Emit hangUp signal to the server
    socket.current.emit('hangUp', {to: call.from});
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <ChatButton icon={<VideoCameraOutlined style={{marginLeft: '5px'}}/>}
                      onClick={() => {
                        if (data.user?.uid) {
                          callUser(data.user.uid);
                        } else {
                          // Handle the case where data.user?.uid is null or empty
                          console.log("User ID is missing");
                        }
                      }}
                      style={{
                        width: '40px',
                        height: '45px',
                        borderRadius: '10px',
                        display: 'flex',
                        lineHeight: '10px',
                        textAlign: 'center',

                        background: 'linear-gradient(45deg, #7B90D2, #00AA90)',
                        boxShadow: '0px 3px 9px #7B90D2'
                      }}/>
          <ChatButton icon={<UserAddOutlined style={{marginLeft: '5px'}}/>}
            // onClick={handleSend}
                      style={{
                        width: '40px',
                        height: '45px',
                        borderRadius: '10px',
                        display: 'flex',
                        lineHeight: '10px',
                        textAlign: 'center',

                        background: 'linear-gradient(45deg, #7B90D2, #00AA90)',
                        boxShadow: '0px 3px 9px #7B90D2'
                      }}/>
          <ChatButton icon={<EllipsisOutlined style={{marginLeft: '5px'}}/>}
            // onClick={handleSend}
                      style={{
                        width: '40px',
                        height: '45px',
                        borderRadius: '10px',
                        display: 'flex',
                        lineHeight: '10px',
                        textAlign: 'center',

                        background: 'linear-gradient(45deg, #7B90D2, #00AA90)',
                        boxShadow: '0px 3px 9px #7B90D2'
                      }}/>

        </div>
      </div>
      <Messages/>
      <Input/>

      <div className="videos-top-layer" style={{position: 'absolute', top: 0, left: 0, zIndex: 1}}>
        <div>
          {stream && <video playsInline muted ref={myVideo} autoPlay style={{width: "300px"}}/>}
          {callAccepted && !callEnded && (
            <video playsInline ref={userVideo} autoPlay style={{width: "300px"}}/>
          )}
        </div>
      </div>
      <div className="call-actions-top-layer" style={{position: 'absolute', top: '350px', left: 0, zIndex: 1}}>
        <div>
          {call.isReceivingCall && !callAccepted && (
            <button onClick={answerCall}>Answer</button>
          )}
          {callAccepted && <button onClick={leaveCall}>Hang Up</button>}
        </div>
      </div>

    </div>
  );
};

export default Chat;
