import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function UserComponent() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        fetchUserDetails(uid);
      } else {
        // No user is signed in.
        setError("No authenticated user found");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

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

  if (error) {
    return <div>Error fetching user details: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.username}</p>
      {userData.profilePicture && <img src={userData.profilePicture} alt="User" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
    </div>
  );
}

export default UserComponent;
