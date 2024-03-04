import React, {useState, useContext} from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import ChatButton from "./ChatButton";
import {LogoutOutlined, MenuOutlined} from "@ant-design/icons";
import {signOut} from "firebase/auth";
import {auth} from "../../firebaseConfig";
import {AuthContext} from "../../auth/AuthContext";
import {Drawer, theme} from 'antd';


const Sidebar = () => {
    const {currentUser} = useContext(AuthContext);
    const {token} = theme.useToken();
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const drawerStyles = {
        header: {
            background: '#2f2d52',
        }, body: {
            background: '#3e3c61',
        }
    };


    return (
        <div className="sidebar">
            <Navbar/>
            <div className='side-components' style={{minWidth:'40px'}}>
                `
                <div className='navbar'
                     style={{
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'space-between',
                         flexWrap: 'nowrap',
                         marginTop:'-40px'
                     }}>
                    <div className="user" style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        marginRight: '20px'
                    }}>
                        <img src={currentUser.photoURL} alt=""/>
                        <span style={{
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px'
                        }}>{currentUser.displayName}</span>
                    </div>

                    <div className="App" style={{paddingLeft:'40px'}}>
                        <ChatButton name={'logout'}
                                    icon={<LogoutOutlined/>}
                                    onClick={() => signOut(auth)}
                                    style={{
                                        width: '75px',
                                        height: '30px',
                                        lineHeight: '10px',
                                        textAlign: 'center',
                                    }}/>
                    </div>
                    `
                </div>

                <Search/>
                <Chats/>
            </div>
            <div className="chat-button-container">
                <ChatButton icon={<MenuOutlined style={{marginLeft: '5px'}}/>}
                            onClick={showDrawer}
                            style={{
                                width: '40px',
                                height: '45px',
                                borderRadius: '10px',
                                display: 'flex',
                                lineHeight: '10px',

                                background: 'linear-gradient(45deg, #7B90D2, #00AA90)',
                                boxShadow: '0px 3px 9px #7B90D2'
                            }}/>
            </div>
            <div style={{borderRadius: '20px, 20px, 20px, 20px', overflow: 'hidden'}}>
                <Drawer

                    title={<div className="sidebar">
                        <div className='navbar'
                             style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'space-between',
                                 flexWrap: 'nowrap'
                             }}>
                            <div className="user" style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                justifyContent: 'space-between',
                                marginRight: '20px'
                            }}>
                                <img src={currentUser.photoURL} alt=""/>
                                <span style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '150px'
                                }}>{currentUser.displayName}</span>
                            </div>

                            <div className="App" style={{paddingLeft:'55px'}}>
                                <ChatButton name={'logout'}
                                            icon={<LogoutOutlined/>}
                                            onClick={() => signOut(auth)}
                                            style={{
                                                width: '75px', height: '30px', lineHeight: '10px', textAlign: 'center'
                                            }}/>
                            </div>
                        </div>
                    </div>}
                    placement="left"
                    closable={true}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                    mask={false}
                    maskClosable={true}
                    styles={drawerStyles}
                >

                    <Search/>
                    <Chats/>
                </Drawer>
            </div>
        </div>);

};

export default Sidebar;
