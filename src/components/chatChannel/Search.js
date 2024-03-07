import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../auth/AuthContext";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import {db} from "../../firebaseConfig";

const Search = () => {
  const [displayName, setDisplayName] = useState('');
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (displayName) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/search?query=${displayName}`)
          .then(response => response.json())
          .then(data => {
            setResults(data);
            setErr(data.length === 0); // Set error if no results
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setErr(true);
          });
      } else {
        setResults([]); // Clear results if username is cleared
        setErr(false); // Clear error
      }
    }, 300); // Debounce delay

    return () => clearTimeout(handler);
  }, [displayName]);

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // Create a chat in the "chats" collection
        await setDoc(doc(db, "chats", combinedId), {messages: []});

        // Check if currentUser chat document exists, create if not
        const currentUserChatDocRef = doc(db, "userChats", currentUser.uid);
        const currentUserChatDoc = await getDoc(currentUserChatDocRef);
        if (!currentUserChatDoc.exists()) {
          await setDoc(currentUserChatDocRef, {}); // Initialize the document if it doesn't exist
        }

        // Check if selected user chat document exists, create if not
        const selectedUserChatDocRef = doc(db, "userChats", user.uid);
        const selectedUserChatDoc = await getDoc(selectedUserChatDocRef);
        if (!selectedUserChatDoc.exists()) {
          await setDoc(selectedUserChatDocRef, {}); // Initialize the document if it doesn't exist
        }

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }, { merge: true });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }, { merge: true });
      }
    } catch (err) {
      console.error("Error handling chat selection: ", err);
    }

    // Assuming setUser and setUsername are defined elsewhere to update the UI accordingly
    setUser(null); // Reset selected user
    setDisplayName(""); // Clear username input
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          style={{
            width: '100%',
            maxWidth: '300px',
            minWidth: '100px',
            // width: '200px',
            backgroundColor: 'rgba(125, 185, 222, 0.2)',
            border: '1px solid rgba(123, 144, 210, 0.7)',
            borderRadius: '4px'

          }}
        />
      </div>

      {results.map((user) => (
        <div key={user.uid} className="userChat" onClick={() => handleSelect(user)}>
          <img src={user.photoURL} alt=""/>
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Search;
