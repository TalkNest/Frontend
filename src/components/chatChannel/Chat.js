import React, { useContext } from "react";
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Input from "./Input";
import {ChatContext} from "../../auth/ChatContext";
import Messages from "./Messages";
import {VideoCameraOutlined, UserAddOutlined, EllipsisOutlined} from "@ant-design/icons";
import ChatButton from "./ChatButton";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          {/*<img src={Cam} alt="" />*/}
          {/*<img src={Add} alt="" />*/}
          {/*<img src={More} alt="" />*/}
            <ChatButton icon={<VideoCameraOutlined style={{marginLeft: '5px'}}/>}
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
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
