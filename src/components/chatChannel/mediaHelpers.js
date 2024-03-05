// mediaHelpers.js

// Function to get user's video (and optionally audio) stream
export const getVideoStream = async (audio = true, video = true) => {
  try {
    // Request media stream with given constraints
    const stream = await navigator.mediaDevices.getUserMedia({ video, audio });
    return stream;
  } catch (error) {
    // Handle any errors (e.g., user denied permission)
    console.error('Error accessing media devices:', error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
