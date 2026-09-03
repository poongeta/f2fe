import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function Room() {
  const { roomID } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/rooms/${roomID}`)
      .then((res) => setRoom(res.data.data))
      .catch(() => setError("Couldn't load this room."));
  }, [roomID]);

  if (error) return <p className="error-banner">{error}</p>;
  if (!room) return <p>Loading room…</p>;

  return (
    <div className="plaque plaque-detail">
      <h2 className="plaque-name">{room.name}</h2>
      <p className="plaque-address">{room.address}</p>
      <dl className="plaque-facts">
        <div>
          <dt>Hours</dt>
          <dd className="mono">
            {room.openHours}–{room.closeHours}
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd className="mono">{room.tel}</dd>
        </div>
      </dl>
      <Link to={`/rooms/${roomID}/book`} className="btn">
        Book this room
      </Link>
    </div>
  );
}
