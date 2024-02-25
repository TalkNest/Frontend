import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import './landingPages/css/iofrm-style.css';
import { LogoutOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Button, Flex, Avatar, Space } from 'antd';

function UserComponent() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const auth = getAuth();
  const [size, setSize] = useState('default');
  const onChange = (e) => {
    console.log('size checked', e.target.value);
    setSize(e.target.value);
  };

  useEffect(() =>  {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        fetchUserDetails(uid);
      } else {
        // No user is signed in.
        setError("No authenticated user found");
        navigate('/login');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  const fetchUserDetails = async (uid) => {
    try {
      const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch current user details:", error);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    try {
      signOut(auth).then(() => {
        navigate('/login');
      })
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to log out");
    };
  };

  if (error) {
    return <div>Error fetching user details: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }



  return (

    <div>
      <Flex align="center" justify="space-between" style={{ width: '100%' }}>
      <p>Email: {userData.email}</p>
      <Button type="primary" onClick={handleLogout} size="small" icon={<LogoutOutlined />}>
        Loogout
      </Button>
      </Flex>
      <p>Username: {userData.username}</p>
      <Flex align="center" gap="small" vertical>
      <div>
        <Space wrap size={16}>
          {userData.profilePicture ? (
              <img src={userData.profilePicture} alt="User" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }} />
          ) : (
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
          )}
        </Space>
      </div>

      </Flex>
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default UserComponent;
