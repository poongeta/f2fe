import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="hero">
      <h1>Book a room at F2 Co-Working.</h1>
      <p>Pick a space, check the day, reserve it.</p>
      <div className="hero-actions">
        {user ? (
          <>
            <Link to="/rooms" className="btn">
              Browse rooms
            </Link>
            <Link to="/bookings" className="btn btn-outline">
              Your bookings
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="btn">
              Create an account
            </Link>
            <Link to="/login" className="btn btn-outline">
              Log in
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
export default Home;
