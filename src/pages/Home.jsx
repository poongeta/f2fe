import { Link } from "react-router-dom";
import { LuHouse, LuCalendarCheck } from "react-icons/lu";
function Home() {
  return (
    <div className="min-h-screen p-8 text-white bg-hero flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl md:text-3xl font-semibold">F2 Co-Working Space Reservation System</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/bookings">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition text-white">
            <LuCalendarCheck /> View Your Booking
          </button>
        </Link>

        <Link to="/rooms">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition text-white">
            <LuHouse size={20} /> View Room List
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
