import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes } from 'react-router-dom';



export default function Room() {
  const [roomDetails, setRoomDetails] = useState<roomDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        const response = await axios.get<{ data: RoomDetails }>(
          'http://localhost:5000/api/v1/rooms/690b46b23c9edfd1c557c50c',
          { withCredentials: true }
        );
        setRoomDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setError('Failed to load room details');
      }
    }

    fetchRoomDetails();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!roomDetails) {
    return <div>Loading room details...</div>;
  }

  return (
    <div>
      <h2>Room Details</h2>
      <p>Room Name: {roomDetails.name}</p>
      <p>Address: {roomDetails.address}</p>
      <p>Telephone: {roomDetails.tel}</p>
      <p>Opening Hours: {roomDetails.openHours}</p>
      <p>Closing Hours: {roomDetails.closeHours}</p>

        <Routes>
            <Route path="/:roomID/book" element={<Book />} />
        </Routes>
        
    </div>
  );
}
