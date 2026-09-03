import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function RoomList() {
  const [rooms, setRooms] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/rooms")
      .then((res) => setRooms(res.data.data))
      .catch(() => setError("Couldn't load the room list."));
  }, []);

  if (error) return <p className="error-banner">{error}</p>;
  if (!rooms) return <p>Loading rooms…</p>;
  if (rooms.length === 0) {
    return <p className="empty-state">No rooms have been added yet.</p>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Rooms</h2>
      <div className="grid-rooms">
        {rooms.map((room) => (
          <Link to={`/rooms/${room._id}`} className="plaque" key={room._id}>
            <h3 className="plaque-name">{room.name}</h3>
            <p className="plaque-address">{room.address}</p>
            <p className="plaque-meta mono">
              {room.openHours}–{room.closeHours}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
