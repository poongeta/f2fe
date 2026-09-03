import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function Bookings() {
  const { user } = useSelector((state) => state.auth);
  const [reservations, setReservations] = useState(null);
  const [rooms, setRooms] = useState({});
  const [error, setError] = useState(null);

  const load = () => {
    if (!user) return;
    Promise.all([api.get(`/reservations/user/${user._id}`), api.get("/rooms")])
      .then(([reservationsRes, roomsRes]) => {
        setReservations(reservationsRes.data.data);
        const map = {};
        roomsRes.data.data.forEach((room) => {
          map[room._id] = room.name;
        });
        setRooms(map);
      })
      .catch(() => setError("Couldn't load your bookings."));
  };

  useEffect(load, [user]);

  const onCancel = async (id) => {
    try {
      await api.delete(`/reservations/${id}`);
      toast.success("Booking cancelled");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't cancel booking");
    }
  };

  if (!user) return <p>Log in to see your bookings.</p>;
  if (error) return <p className="error-banner">{error}</p>;
  if (!reservations) return <p>Loading your bookings…</p>;
  if (reservations.length === 0) {
    return (
      <p className="empty-state">
        No bookings yet. <Link to="/rooms">Browse rooms</Link>.
      </p>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>Your bookings</h2>
      <ul className="booking-list">
        {reservations.map((r) => (
          <li key={r._id} className="booking-row">
            <div>
              <p className="booking-room">{rooms[r.room] || "Room"}</p>
              <p className="booking-date mono">{new Date(r.date).toLocaleDateString("en-GB")}</p>
            </div>
            <span className={`tag tag-${r.status}`}>{r.status}</span>
            {r.status === "active" && (
              <button className="btn btn-danger btn-sm" onClick={() => onCancel(r._id)}>
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
