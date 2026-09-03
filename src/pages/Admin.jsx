import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../api/axios";

const emptyRoom = { name: "", address: "", tel: "", openHours: "", closeHours: "" };

export default function Admin() {
  const { user } = useSelector((state) => state.auth);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [dateInput, setDateInput] = useState("");
  const [newRoom, setNewRoom] = useState(emptyRoom);

  const loadRooms = () => api.get("/rooms").then((res) => setRooms(res.data.data));
  const loadUsers = () => api.get("/users").then((res) => setUsers(res.data.data));
  const loadDate = () =>
    api.get("/current-date").then((res) => setCurrentDate(new Date(res.data.currentDate)));

  useEffect(() => {
    if (user?.role !== "admin") return;
    loadRooms();
    loadUsers();
    loadDate();
  }, [user]);

  if (user?.role !== "admin") {
    return <p className="error-banner">Admins only.</p>;
  }

  const onCreateRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post("/rooms", newRoom);
      toast.success("Room added");
      setNewRoom(emptyRoom);
      loadRooms();
    } catch (err) {
      toast.error(err.response?.data?.error || "Couldn't add room");
    }
  };

  const onDeleteRoom = async (id) => {
    try {
      await api.delete(`/rooms/${id}`);
      toast.success("Room removed");
      loadRooms();
    } catch {
      toast.error("Couldn't remove room");
    }
  };

  const onDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("User removed");
      loadUsers();
    } catch {
      toast.error("Couldn't remove user");
    }
  };

  const setDate = async (date) => {
    try {
      const res = await api.put("/current-date", date ? { date } : {});
      setCurrentDate(new Date(res.data.data.date));
      toast.success(res.data.message);
    } catch {
      toast.error("Couldn't update the date");
    }
  };

  return (
    <div className="admin">
      <h2>Admin</h2>

      <section className="admin-section">
        <h3>Clock</h3>
        <p>
          The app's current date is{" "}
          <span className="mono">{currentDate?.toLocaleDateString("en-GB") ?? "…"}</span>.
          Reservations before this date are treated as expired.
        </p>
        <form
          className="inline-form"
          onSubmit={(e) => {
            e.preventDefault();
            setDate(dateInput);
            setDateInput("");
          }}
        >
          <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
          <button className="btn btn-sm" type="submit">
            Set date
          </button>
          <button className="btn btn-outline btn-sm" type="button" onClick={() => setDate(null)}>
            Reset to today
          </button>
        </form>
      </section>

      <section className="admin-section">
        <h3>Rooms</h3>
        <form className="room-form" onSubmit={onCreateRoom}>
          <input
            placeholder="Name"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            required
          />
          <input
            placeholder="Address"
            value={newRoom.address}
            onChange={(e) => setNewRoom({ ...newRoom, address: e.target.value })}
            required
          />
          <input
            placeholder="Phone"
            value={newRoom.tel}
            onChange={(e) => setNewRoom({ ...newRoom, tel: e.target.value })}
            required
          />
          <input
            placeholder="Opens (e.g. 09:00)"
            value={newRoom.openHours}
            onChange={(e) => setNewRoom({ ...newRoom, openHours: e.target.value })}
            required
          />
          <input
            placeholder="Closes (e.g. 21:00)"
            value={newRoom.closeHours}
            onChange={(e) => setNewRoom({ ...newRoom, closeHours: e.target.value })}
            required
          />
          <button className="btn btn-sm" type="submit">
            Add room
          </button>
        </form>
        <table className="admin-table">
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.name}</td>
                <td className="mono">
                  {room.openHours}–{room.closeHours}
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => onDeleteRoom(room._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-section">
        <h3>People</h3>
        <table className="admin-table">
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td className="mono">{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => onDeleteUser(u._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
