import { useParams, Link } from "react-router-dom";
import Calendar from "../components/Calendar";

export default function Book() {
  const { roomID } = useParams();

  return (
    <div>
      <Link to={`/rooms/${roomID}`} className="back-link">
        ‹ Back to room
      </Link>
      <h2 style={{ marginBottom: 16 }}>Pick a day</h2>
      <Calendar roomID={roomID} />
    </div>
  );
}
