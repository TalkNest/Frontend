# TalkNest's frontend - React
## Overview

This project is a robust real-time chat and video calling application developed with modern web technologies, focusing on real-time interactions among users. It provides functionalities like user authentication, live chat, and peer-to-peer video communication.

🌐: http://talknest.online

## Technology Stack

- **React**: Utilized for building the user interface, leveraging hooks and context for state management.
- **Socket.io-client**: For real-time bi-directional event-based communication.
- **Simple-peer**: A WebRTC library for peer-to-peer communication, enabling real-time video and audio streams.
- **Firebase**: Used for user authentication, storing user profiles, and managing chat data in Firestore.
- **Express**: Serves as the backend server, facilitating RESTful API requests and integrating with Firebase for user authentication and database operations.

## Features

- User Registration and Authentication
- Real-time Text Chat
- Live Video Calling
- Profile Creation and Updates
- Search Functionality for Users

## Installation

1. Clone the repository 
   ```bash
   git clone https://github.com/TalkNest/backend.git
   ```
2. Install dependencies using
   ```bash
   npm install
   ```
3. Set up Firebase/Backend APIs' route and create a `.env` file with your Firebase project credentials.
   ```bash
   REACT_APP_API_KEY=
   REACT_APP_AUTH_DOMAIN=
   REACT_APP_DATABASE_URL=
   REACT_APP_PROJECT_ID=
   REACT_APP_STORAGE_BUCKET=
   REACT_APP_MESSAGING_SENDER_ID=
   REACT_APP_APP_ID=
   REACT_APP_MEASUREMENT_ID=
    
   REACT_APP_API_BASE_URL=
   ```
4. Run the application using 
   ```bash
   npm start
   ```

## Usage

- **Login/Register**: New users can register, and existing users can log in using their credentials or Google SignIn.
- **Chat**: Users can search for other users and initiate real-time text chats.
- **Video Call**: Users can start peer-to-peer video calls with others.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
