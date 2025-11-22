import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [today, setToday] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const token = user?.token || null;

  const fetchCurrentDate = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/current-date",
        { withCredentials: true , headers: token? { Authorization: `Bearer ${token}` } : {}
        }
      );
      const fetchedDate = new Date(res.data.data.date);
      // store globally if needed
      window.currentDate = fetchedDate;
      setToday(fetchedDate);
    } catch (err) {
      console.error("Error fetching current date:", err);
    }
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    fetchCurrentDate();
  }, []);

  return (
    <header className="header">
      <ul>
        <p>
          <strong>Today's Date:</strong>{" "}
          {today ? today.toLocaleDateString("en-GB") : "Loading..."}
        </p>
      </ul>
      {user && <button onClick={onLogout}>Logout</button>}
    </header>
  );
}

export default Header;
