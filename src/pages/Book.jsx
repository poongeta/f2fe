import { useParams } from 'react-router-dom';
import Calendar from "../components/Calendar";

export default function Book () {
  const { roomID } = useParams();
  
  return (
    <div>
        <p>Booking for Room ID: {roomID}</p>
      <Calendar roomID={roomID} />
    </div>
  );
}