import React, { useContext, useState } from "react";
import Img from "../../img/img.png";
import Attach from "../../img/attach.png";
import { AuthContext } from "../../auth/AuthContext";
import { ChatContext } from "../../auth/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {auth, db, storage} from "../../firebaseConfig";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import './css/chatbutton.css'
import ChatButton from "./ChatButton";
import {SendOutlined, PictureOutlined, PaperClipOutlined} from "@ant-design/icons";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{
          marginRight: '10px',
          maxWidth: '520px',
          backgroundColor: 'rgba(125, 185, 222, 0.2)',
          border: '1px solid rgba(123, 144, 210, 0.7)',
          borderRadius: '4px'
        }}
      />
        <div className="send">
            {/*<img src={Attach} alt=""/>*/}
            <label  style={{marginTop: '8px', marginRight: '5px'}}>
                <ChatButton icon={<PaperClipOutlined style={{marginLeft: '5px'}}/>}
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
            </label>
            <input
                type="file"
                style={{display: "none"}}
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file" style={{marginTop: '8px', marginRight: '5px'}}>
                <ChatButton icon={<PictureOutlined style={{marginLeft: '5px'}}/>}
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
            </label>
            <ChatButton name={'Send'}
                        icon={<SendOutlined/>}
                        onClick={handleSend}
                        style={{
                            width: '75px',
                            height: '45px',
                            borderRadius: '10px',
                            lineHeight: '10px',
                            textAlign: 'center',
                            background: 'linear-gradient(45deg, #7B90D2, #00AA90)',
                            boxShadow: '0px 3px 9px #7B90D2'
                        }}/>
        </div>
    </div>
  );
};

export default Input;
