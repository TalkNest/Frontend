import React, {useRef} from "react";
import './css/chatbutton.css'
import {signOut} from "firebase/auth";
function ChatButton({name, onClick, className, style, icon}){
    const buttonRef = useRef(null)
    const rippleRef = useRef(null)
    const handleClick = (e) => {
        const button = buttonRef.current
        const ripple = rippleRef.current
        const buttonRect = button.getBoundingClientRect()
        const {left, top} = buttonRect
        const leftPositioon = e.clientX - left
        const topPosition = e.clientY - top

        if(ripple){
            ripple.style.left = leftPositioon + 'px';
            ripple.style.top = topPosition + 'px';

            ripple.classList.add('active')
            setTimeout(() =>{
                ripple.classList.remove('active')
            },600);
        }

        if (onClick){
            onClick(e);
        }
    }
    const combinedStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        padding: '10px 20px',
        fontSize: '15px',
        background: 'linear-gradient(90deg, #00aced, #6f42c1)',
        boxShadow: '0px 3px 9px #1d72d4',
        ...style
    };

    return (
        <div ref={buttonRef} onClick={handleClick} className={`chatButton ${className || ''}`} style={combinedStyle}>
            {icon && <span className="buttonIcon" style={{ marginRight: '5px' }}>{icon}</span>}
            <span style={{ display: 'flex', alignItems: 'center' }}>{name}</span>
            <span ref={rippleRef} className="rippleEffect"></span>

        </div>

    );
}

export default ChatButton