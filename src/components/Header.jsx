import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [today, setToday] = useState(null);

  useEffect(() => {
    if (!user) {
      setToday(null);
      return;
    }
    api
      .get("/current-date")
      .then((res) => setToday(new Date(res.data.currentDate)))
      .catch((err) => console.error("Error fetching current date:", err));
  }, [user]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="nav">
      <Link to="/" className="brand">
        F2 Co-Working
      </Link>

      {user && (
        <nav className="nav-links">
          <Link to="/rooms">Rooms</Link>
          <Link to="/bookings">Bookings</Link>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
        </nav>
      )}

      <div className="nav-right">
        {today && <span className="nav-date mono">{today.toLocaleDateString("en-GB")}</span>}
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button className="btn btn-outline btn-sm" onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">
              Log in
            </Link>
            <Link to="/register" className="btn btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
