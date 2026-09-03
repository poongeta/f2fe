import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "../api/axios";

export default function Calendar({ roomID }) {
  const [selected, setSelected] = useState(null);
  const [today, setToday] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/current-date")
      .then((res) => setToday(new Date(res.data.currentDate)))
      .catch(() => {});
    api
      .get(`/reservations/room/${roomID}`)
      .then((res) => {
        const dates = res.data.data
          .filter((r) => r.status === "active")
          .map((r) => new Date(r.date));
        setBookedDates(dates);
      })
      .catch(() => {});
  }, [roomID]);

  const onConfirm = async () => {
    setSubmitting(true);
    try {
      await api.post("/reservations", {
        user: user._id,
        room: roomID,
        date: selected,
      });
      toast.success("Booking confirmed");
      navigate("/bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-panel">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        disabled={[{ before: today }, ...bookedDates]}
      />

      <div className="booking-status">
        {selected ? (
          <p>
            You selected{" "}
            <span className="mono">{selected.toLocaleDateString("en-GB")}</span>.
          </p>
        ) : (
          <p>Pick a day to book this room.</p>
        )}
      </div>

      <button className="btn btn-block" disabled={!selected || submitting} onClick={onConfirm}>
        {submitting ? "Booking…" : "Confirm booking"}
      </button>
    </div>
  );
}
