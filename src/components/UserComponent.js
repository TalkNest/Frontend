import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserComponent() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8383/user/rNOCLh71zjN6icHP9nae')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <h1>User Details</h1>
                    <p>Email: {userData.email}</p>
                    <p>Username: {userData.username}</p>
                    // Add more fields as needed
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default UserComponent;
