import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Book from "./pages/Book";
import Room from "./pages/Room";
import RoomList from "./pages/RoomList";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/rooms/:roomID" element={<Room />} />
            <Route path="/rooms/:roomID/book" element={<Book />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </>
  );
}
export default App;
